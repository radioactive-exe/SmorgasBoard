/**
 * This file contains all the logic and functions for the authentication system.
 *
 * @remarks
 * The file includes the functions to login and register, the authentication
 * elements in the webpage, as well as all the handling for errors and
 * exceptions.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import type { AuthApiError, AuthResponse } from "@supabase/supabase-js";
import { AuthWeakPasswordError, isAuthApiError } from "@supabase/supabase-js";

import { setFirstTime, supabase, user } from "./app.js";
import { AlertLevel, spawnAlert } from "./elements/alert.js";

// ? All the necessary HTML elements for the authentication procedures.

const form: HTMLFormElement | null = document.querySelector("form");

const usernameInput: HTMLInputElement =
    form?.querySelector("#username") ?? document.createElement("input");
const emailInput: HTMLInputElement =
    form?.querySelector("#email") ?? document.createElement("input");
const passwordInput: HTMLInputElement =
    form?.querySelector("#password") ?? document.createElement("input");
const loginFormClickable: HTMLInputElement | null = form?.querySelector(
    "#login-subtitle-clickable",
) as HTMLInputElement | null;
const registerFormClickable: HTMLElement | null = form?.querySelector(
    "#register-subtitle-clickable",
) as HTMLElement | null;
const loginClickable: HTMLInputElement | null = document?.querySelector(
    "#login-clickable",
) as HTMLInputElement | null;
const registerClickable: HTMLElement | null = document?.querySelector(
    "#register-clickable",
) as HTMLElement | null;
const logoutClickable: HTMLElement | null = document?.querySelector(
    "#logout-clickable",
) as HTMLElement | null;
const registerButton: HTMLButtonElement | null = form?.querySelector(
    "#register-button",
) as HTMLButtonElement | null;
const loginButton: HTMLButtonElement | null = form?.querySelector(
    "#login-button",
) as HTMLButtonElement | null;
const closeFormButton: HTMLButtonElement | null = form?.querySelector(
    "#close-form-button",
) as HTMLButtonElement | null;

const passwordVisibilityButton: HTMLElement | null = form?.querySelector(
    "#password-visibility-button",
) as HTMLElement | null;

/**
 * This variable contains the basic error message when the registration/login
 * fails in an un-handled way.
 */
const unexpectedErrorMessage =
    "You... Somehow broke this in a way I... didn't really see coming? Please post an Issue on this website's <a href=\"https://github.com/radioactive-exe/SmorgasBoard\">GitHub Repository</a>, and let me know what happened.";
/**
 * This variable will hold the status message as either an error or a success
 * message.
 *
 * @remarks
 * The presence of an error or success field will be used to check the result of
 * the login/signup. If it's a password error, the requirements field will also
 * be populated.
 */
let statusMessage: {
    error?: string;
    success?: string;
    requirements?: string[];
};

/**
 * This method signs up the user with the inputted fields.
 *
 * @remarks
 * The Supabase Auth API is called directly, and any errors are handled with
 * appropriate alerts informing the user.
 *
 * @param username - The username the user wants to choose.
 * @param email    - The email the user will be using to sign up and log in.
 *   They will receive a welcome email if it is a valid address.
 * @param password - Self-explanatory, this will be the user's desired password.
 *   This is subject ot length, capitalisation, and special character
 *   requirements.
 *
 * @example
 *
 * This would register a new user, given that the email format and password
 * requirements are met. Additionally, this will succeed if there is no other
 * "pro_coder_33":
 *
 * ```ts
 * register("pro_coder_33", "real_email@someplace.com", "ILoveMyDog123#");
 * ```
 *
 * @see {@link AuthApiError}
 * @see {@link AuthWeakPasswordError}
 * @see {@link https://supabase.com/docs/guides/auth | Supabase#Auth}
 */
async function register(
    username: string,
    email: string,
    password: string,
): Promise<void> {
    /**
     * This updates the variable stored in the main module to track that this
     * was a first time register, and not a returning signin.
     */
    setFirstTime(true);

    // ? If the user tries to register without an entered username
    if (username == "") {
        statusMessage = { error: "Please enter a username!" };
        spawnAlert(statusMessage.error as string, AlertLevel.ERROR);
        return;
    }

    // ? The resulting AuthResponse object holding the data and error.
    const registrationResult: AuthResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
        },
    });

    statusMessage = {};

    // ? If there was a sign up error, we check with the builtin Supabase methods and we handle accordingly.
    if (
        isAuthApiError(registrationResult.error)
        || registrationResult.error instanceof AuthWeakPasswordError
    ) {
        // ? The error type is parsed, and the resulting error message is assigned to the `statusMessage` object, to be later utilised to spawn the relevant alert.

        const typedError = registrationResult.error as
            | AuthApiError
            | AuthWeakPasswordError;

        switch (typedError.code) {
            case "user_already_exists":
                statusMessage = {
                    error: "Email already registered! Try Logging in instead.",
                };
                break;
            case "email_address_invalid":
            case "anonymous_provider_disabled":
                statusMessage = { error: "Invalid Email Address!" };
                break;
            case "weak_password":
                statusMessage = {
                    error: "Weak Password! A password must:\n",
                    requirements: (typedError as AuthWeakPasswordError).reasons,
                };
                break;
            case "over_request_rate_limit":
                statusMessage = {
                    error: "Too many Registration Attempts! Please wait a few minutes before trying again.",
                };
                break;
            case "anonymous_provider_disabled":
                statusMessage = {
                    error: "Invalid Email Domain! Please use a valid email address domain, such as `gmail`, `outlook`, etc.",
                };
                break;
            case "validation_failed":
                if (typedError.message.includes("email")) {
                    statusMessage = { error: "Invalid Email Address!" };
                } else if (typedError.message.includes("password")) {
                    statusMessage = { error: "Please enter a password!" };
                }
                break;
            default:
                // ? In case the particular error was not parsed and there is a general/unaccounted for error, this catches it.
                // ! The issue here is that a duplicate username throws the same error, even when the error is a result of a unique column violation. I have still not figured out how to send the explained duplicate username error from the Supabase trigger that handles new users and inserts the dashboard data row in the database.

                statusMessage = { error: unexpectedErrorMessage };
                break;
        }
    } else if (registrationResult.data.user) {
        // ? If we get here, the signin was successful, and we have a stored user (in the `SIGNED_IN` handler)!

        statusMessage = {
            success: `Great! Welcome to SmorgasBoard, ${user?.username ?? "Placeholder_User"}. Enjoy your stay!`,
        };
    }
    spawnAlert(
        (statusMessage.error ?? statusMessage.success ?? "")
            + (registrationResult.error?.code == "weak_password"
                ? (
                      statusMessage.requirements?.map(
                          (reason) => "\n> " + parsedReason(reason),
                      ) as string[]
                  ).join("\n")
                : ""),
        statusMessage.error ? AlertLevel.ERROR : AlertLevel.INFO,
    );
}

/**
 * Attempts to log the user in using Supabase Auth API with the inputted
 * credentials.
 *
 * @remarks
 * Similarly to the {@link register} method, this function calls the Supabase
 * Auth API directly and handles any errors that arise.
 *
 * @param email    - The email of the user attempting to sign in.
 * @param password - Self explanatory, the attempted password for the account
 *   (if it exists).
 *
 * @example
 *
 * This would successfully sign in the registered user:
 *
 * ```ts
 * login("real_email@someplace.com", "ILoveMyDog123#");
 * ```
 *
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link AuthApiError}
 * @see {@link https://supabase.com/docs/guides/auth | Supabase#Auth}
 */
async function login(email: string, password: string): Promise<void> {
    /**
     * This updates the variable stored in {@link "./app.ts"} to clarify on the
     * `SIGNED_IN` event that this is a returning login.
     */
    setFirstTime(false);
    statusMessage = {};
    const loginResult: AuthResponse = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (isAuthApiError(loginResult.error)) {
        // ? The error type is parsed, and the resulting error message is assigned to the `statusMessage` object, to be later utilised to spawn the relevant alert.

        switch (loginResult.error.code) {
            case "validation_failed":
                statusMessage = {
                    error: "Missing Credentials, please fill out all the information and try again!",
                };
                break;
            case "invalid_credentials":
                statusMessage = {
                    error: "Invalid email/password credentials. Please try again.",
                };
                break;
            case "over_request_rate_limit":
                statusMessage = {
                    error: "Too many Login Attempts! Please wait a few minutes before trying again.",
                };
                break;
            default:
                statusMessage = { error: unexpectedErrorMessage };
                break;
        }
    } else if (loginResult.data.user) {
        // ? If we get here, the user has successfully logged in, and we have populated the local user with all necessary information (in the `SIGNED_IN` handler)!
        statusMessage = {
            success: `Welcome back, ${user?.username ?? "Placeholder_User"}!`,
        };
    }
    spawnAlert(
        statusMessage.error ?? statusMessage.success ?? "",
        statusMessage.error ? AlertLevel.ERROR : AlertLevel.INFO,
    );
}

/**
 * Translates the Supabase Auth API reason into a user-friendly one.
 *
 * @remarks
 * Reasons provided by Supabase Auth API are one word items, and are returned in
 * the array of reasons when the error is a {@link AuthWeakPasswordError}. This
 * function returns the user-friendly translation to be placed into the alert.
 *
 * @param   reason - The AuthAPI reason string to be translated.
 *
 * @returns        The translated version for the alert.
 *
 * @example
 *
 * The following would output "Be 8 or more characters." in the console
 *
 * ```ts
 *     console.log(parsedReason("length"));
 * ```
 *
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/auth | Supabase#Auth}
 * @see {@link AuthApiError}
 */
function parsedReason(reason: string): string {
    switch (reason) {
        case "length":
            return "Be 8 or more characters.";
        case "characters":
            return "Have at least 1 capital and lowercase letter, number, and special character.";
        default:
            return "Just a horrible password, really.";
    }
}

/**
 * Signs the user out.
 *
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/auth | Supabase#Auth}
 */
function logout(): void {
    supabase.auth.signOut();
}

/**
 * Focuses on or opens the Register screen.
 *
 * @remarks
 * This method is called either when the user clicks the Sign Up button in the
 * Nav menu, or when the user clicks on the "Sign Up Instead" button on the
 * authentication screen.
 */
function goToRegisterScreen(): void {
    form?.classList.add("visible");
    form?.classList.add("new-user");
    usernameInput.setAttribute("required", "true");
}

/**
 * Focuses on or opens the Login screen.
 *
 * @remarks
 * This method is called either when the user clicks the Login button in the Nav
 * menu, or when the user clicks on the "Log In Instead" button on the
 * authentication screen.
 */
function goToLoginScreen(): void {
    form?.classList.add("visible");
    form?.classList.remove("new-user");
    usernameInput.removeAttribute("required");
}

// ? Makes the password visible while holding down on the Show Password button, by temporarily converting the password input into a regular text input, removing the redaction.
passwordVisibilityButton?.addEventListener("pointerdown", () => {
    passwordVisibilityButton.style.setProperty(
        "background",
        "var(--input-accent)",
    );
    passwordInput?.setAttribute("type", "text");
    document.addEventListener("pointerup", hidePassword);
});

/**
 * Hides the password again.
 *
 * @remarks
 * This is the release handler for the "show password" button, which converts
 * the input back into a password type, as opposed to a regular text input.
 */
function hidePassword(): void {
    passwordVisibilityButton?.style.setProperty(
        "background",
        "var(--input-secondary)",
    );
    passwordInput?.setAttribute("type", "password");
    document.removeEventListener("pointerup", hidePassword);
}

// ? Focuses/opens the login menu.
loginFormClickable?.addEventListener("click", goToLoginScreen);
loginClickable?.addEventListener("click", goToLoginScreen);

// ? Focuses/opens the register menu.
registerFormClickable?.addEventListener("click", goToRegisterScreen);
registerClickable?.addEventListener("click", goToRegisterScreen);

// ? Signs the user out.
logoutClickable?.addEventListener("click", logout);

// ? Clicking the register button calls the register function with the input values.
registerButton?.addEventListener("click", () => {
    register(usernameInput.value, emailInput.value, passwordInput?.value);
});

// ? Clicking the Sign In button calls the login function with the input values.
loginButton?.addEventListener("click", () => {
    login(emailInput.value, passwordInput.value);
});

// ? Closes the authentication form. This is the "Maybe Later" button.
closeFormButton?.addEventListener("click", () => {
    form?.classList.remove("visible");
});

// ? Stops the default behaviour of form submission/action when the enter button is pressed.
form?.addEventListener("submit", (e) => {
    e.preventDefault();
});

// ? Handles the enter presses when the user is typing in any of the inputs.
[emailInput, usernameInput, passwordInput].forEach((input) => {
    input.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            e.stopPropagation();

            // ? If the user is on the register menu, we register with all 3 inputs.
            if (form?.classList.contains("new-user")) {
                register(
                    usernameInput.value,
                    emailInput.value,
                    passwordInput?.value,
                );

                // ? Otherwise, we log in with 2 of the inputs
            } else login(emailInput.value, passwordInput.value);
        }
    });
});

export { form, login, logout, register, statusMessage };
