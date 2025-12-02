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

import type {
    AuthApiError,
    AuthResponse,
    UserResponse,
} from "@supabase/supabase-js";

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
const confirmPasswordInput: HTMLInputElement =
    form?.querySelector("#confirm-password") ?? document.createElement("input");
const loginFormClickable: HTMLInputElement | null = form?.querySelector(
    "#login-subtitle-clickable",
) as HTMLInputElement | null;
const registerFormClickable: HTMLElement | null = form?.querySelector(
    "#register-subtitle-clickable",
) as HTMLElement | null;
const backToLoginFormClickable: HTMLElement | null = form?.querySelector(
    "#back-to-login-clickable",
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
const resetPasswordClickable: HTMLElement | null = document?.querySelector(
    "#reset-password-clickable",
) as HTMLElement | null;
const registerButton: HTMLButtonElement | null = form?.querySelector(
    "#register-button",
) as HTMLButtonElement | null;
const loginButton: HTMLButtonElement | null = form?.querySelector(
    "#login-button",
) as HTMLButtonElement | null;
const resetPasswordButton: HTMLButtonElement | null = form?.querySelector(
    "#reset-password-button",
) as HTMLButtonElement | null;
const closeFormButton: HTMLButtonElement | null = form?.querySelector(
    "#close-form-button",
) as HTMLButtonElement | null;

const passwordVisibilityButtons: NodeListOf<HTMLElement> | null =
    form?.querySelectorAll(
        ".password-visibility-button",
    ) as NodeListOf<HTMLElement> | null;

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
 * @param username             - The username the user wants to choose.
 * @param email                - The email the user will be using to sign up and
 *   log in. They will receive a welcome email if it is a valid address.
 * @param password             - Self-explanatory, this will be the user's
 *   desired password. This is subject ot length, capitalisation, and special
 *   character requirements.
 * @param passwordConfirmation - The password confirmation value (i.e. The value
 *   of the "Confirm Password" input). This is validated to be the same as
 *   {@link password}.
 *
 * @example
 *
 * This would register a new user, given that the email format and password
 * requirements are met. Additionally, this will succeed if there is no other
 * "pro_coder_33":
 *
 * ```ts
 * register("pro_coder_33", "real_email@someplace.com", "ILoveMyDog123#", "ILoveMyDog123#");
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
    passwordConfirmation: string,
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

    if (password != passwordConfirmation) {
        statusMessage = {
            error: "Password and its confirmation must be identical!",
        };
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
        // ? If we get here, the signup was successful, and all that is left is for the user to confirm/verify their email!

        statusMessage = {
            success: `Great! Welcome to SmorgasBoard, ${user?.username ?? "Placeholder_User"}. One last step, just check the confirmation email you just got (or should get in a bit) to confirm your email address.`,
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
            case "email_not_confirmed":
                statusMessage = {
                    error: "Whoops! One last step before you can log in - just confirm your email address with the confirmation link you received when you signed up!",
                };
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
 * Validates password and confirmation equality, after which the user's password
 * is directly updated through the Supabase Auth.
 *
 * @param newPassword             - The new password the user wishes to set.
 * @param newPasswordConfirmation - The confirmation for the new password. This
 *   must be identical to {@link newPassword} for the password reset to go
 *   through.
 *
 * @example
 *
 * ```ts
 * validateAndResetPassword("IForgotTheOldOne#12", "IForgotTheOldOne#13");
 * ```
 *
 * The above fails, and an alert is spawned informing the user of that, as the
 * confirmation is not identical to the new password.
 *
 * @example
 *
 * ```ts
 * validateAndResetPassword("IForgotTheOldOne#12", "IForgotTheOldOne#12");
 * ```
 *
 * The above succeeds, as both passwords are identical. An informative alert is
 * spawned, the user is updated in the Auth system, and the login menu is
 * focused/opened.
 *
 * @see {@link resetPasswordButton}
 * @see {@link https://supabase.com/docs/guides/auth | Supabase#Auth}
 */
async function validateAndResetPassword(
    newPassword: string,
    newPasswordConfirmation: string,
): Promise<void> {
    if (newPassword.length == 0)
        spawnAlert(
            "Please enter a new password to reset to!",
            AlertLevel.ERROR,
        );
    else if (newPasswordConfirmation !== newPassword)
        spawnAlert(
            "New password and password confirmation must be identical!",
            AlertLevel.ERROR,
        );
    else {
        const { error }: UserResponse = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            spawnAlert(error.message, AlertLevel.ERROR);
        } else {
            // ? Remove the # from the URL after resetting the password
            history.pushState("", document.title, window.location.pathname);

            // ? Send an alert informing the user
            spawnAlert(
                "Password successfully reset! Go ahead and log in!",
                AlertLevel.INFO,
            );

            // ? Go to the login screen
            goToLoginScreen();
        }
    }
}

/**
 * Focuses on or opens the Register screen.
 *
 * @remarks
 * This method is called either when the user clicks the Sign Up button in the
 * Nav menu, or when the user clicks on the "Sign Up Instead" button on the
 * authentication screen.
 *
 * @see {@link goToLoginScreen | goToLoginScreen()}
 * @see {@link goToPasswordResetScreen | goToPasswordResetScreen()}
 */
function goToRegisterScreen(): void {
    form?.classList.add("visible");
    form?.classList.add("new-user");
    form?.classList.remove("resetting-password");

    // ? Make the username input required and tab-focusable (i.e. let the user focus on it by pressing tab)
    usernameInput.setAttribute("required", "true");
    usernameInput.removeAttribute("tabIndex");

    // ? Do the same for the email input
    emailInput.setAttribute("required", "true");
    emailInput.removeAttribute("tabIndex");

    // ? Do the same for the password confirmation input
    confirmPasswordInput.setAttribute("required", "true");
    confirmPasswordInput.removeAttribute("tabIndex");

    // ? Make the register button tab-focusable
    registerButton?.removeAttribute("tabIndex");

    // ? Make the login button non-focusable
    loginButton?.setAttribute("tabIndex", "-1");

    // ? Make the password reset button non-focusable
    resetPasswordButton?.setAttribute("tabIndex", "-1");
}

/**
 * Focuses on or opens the Login screen.
 *
 * @remarks
 * This method is called either when the user clicks the Login button in the Nav
 * menu, or when the user clicks on the "Log In Instead" button on the
 * authentication screen.
 *
 * @see {@link goToRegisterScreen | goToRegisterScreen()}
 * @see {@link goToPasswordResetScreen | goToPasswordResetScreen()}
 */
function goToLoginScreen(): void {
    form?.classList.add("visible");
    form?.classList.remove("new-user");
    form?.classList.remove("resetting-password");

    // ? Make the username input non-required and non-focusable by pressing tab
    usernameInput.removeAttribute("required");
    usernameInput.setAttribute("tabIndex", "-1");

    // ? Do the same for the password confirmation input
    confirmPasswordInput.removeAttribute("required");
    confirmPasswordInput.setAttribute("tabIndex", "-1");

    // ? Make the email input required and tab-focusable
    emailInput.setAttribute("required", "true");
    emailInput.removeAttribute("tabIndex");

    // ? Make the login button tab-focusable
    loginButton?.removeAttribute("tabIndex");

    // ? Make the register button non-focusable
    registerButton?.setAttribute("tabIndex", "-1");

    // ? Make the password reset button non-focusable
    resetPasswordButton?.setAttribute("tabIndex", "-1");
}

/**
 * Focuses on or opens the Password Reset screen.
 *
 * @remarks
 * This method is called when the user clicks the link sent in a password reset
 * email, after clicking the "Forgot Password" button in the login form.
 *
 * @see {@link goToLoginScreen | goToLoginScreen()}
 * @see {@link goToRegisterScreen | goToRegisterScreen()}
 */
function goToPasswordResetScreen(): void {
    form?.classList.add("visible");
    form?.classList.remove("new-user");
    form?.classList.add("resetting-password");

    // ? Make the username input non-required and non-focusable by pressing tab
    usernameInput.removeAttribute("required");
    usernameInput.setAttribute("tabIndex", "-1");

    // ? Do the same for the email input
    emailInput.removeAttribute("required");
    emailInput.setAttribute("tabIndex", "-1");

    // ? Make the confirm password input required and tab-focusable
    confirmPasswordInput.removeAttribute("tabIndex");
    confirmPasswordInput.setAttribute("required", "true");

    // ? Make the login button non-focusable
    loginButton?.setAttribute("tabIndex", "-1");

    // ? Make the register button non-focusable
    registerButton?.setAttribute("tabIndex", "-1");

    // ? Make the password reset button tab-focusable
    resetPasswordButton?.removeAttribute("tabIndex");
}

// ? Makes the password visible while holding down on the Show Password button, by temporarily converting the password input concerned into a regular text input, removing the redaction.
passwordVisibilityButtons?.forEach((button) => {
    button.addEventListener("pointerdown", () => {
        button.style.setProperty("background", "var(--input-accent)");

        // ? Set the concerned password input as a regular text input, removing redaction
        button.parentElement
            ?.querySelector('input[type="password"]')
            ?.setAttribute("type", "text");
        document.addEventListener("pointerup", hidePasswords);
    });
});

/**
 * Hides the password again.
 *
 * @remarks
 * This is the release handler for the "show password" button, which converts
 * the inputs back into a password type, as opposed to a regular text input.
 */
function hidePasswords(): void {
    passwordVisibilityButtons?.forEach((button) => {
        button.style.setProperty("background", "var(--input-secondary)");
    });

    // ? Set the inputs to be password inputs again
    passwordInput?.setAttribute("type", "password");
    confirmPasswordInput?.setAttribute("type", "password");

    // ? Remove this function as an event listener
    document.removeEventListener("pointerup", hidePasswords);
}

confirmPasswordInput.addEventListener("input", () => {
    if (
        confirmPasswordInput.value
        && confirmPasswordInput.value != passwordInput.value
    )
        confirmPasswordInput.setCustomValidity("Passwords must match!");
    else confirmPasswordInput.setCustomValidity("");
    confirmPasswordInput.reportValidity();
});

// ? Focuses/opens the login menu.
loginFormClickable?.addEventListener("click", goToLoginScreen);
loginClickable?.addEventListener("click", goToLoginScreen);
backToLoginFormClickable?.addEventListener("click", goToLoginScreen);

// ? Focuses/opens the register menu.
registerFormClickable?.addEventListener("click", goToRegisterScreen);
registerClickable?.addEventListener("click", goToRegisterScreen);

// ? Sends the password reset email
resetPasswordClickable?.addEventListener("click", () => {
    if (!emailInput.value)
        spawnAlert(
            "Please enter an Email to send the reset email to!",
            AlertLevel.ERROR,
        );
    else {
        supabase.auth.resetPasswordForEmail(emailInput.value);
        spawnAlert(
            "If the email is registered on Smorgasboard, you'll get a password reset email. Open it and follow the instructions! You might have to wait up to an hour for the email to show up (given the current Mail plan, whoops).",
            AlertLevel.INFO,
        );
    }
});

// ? Signs the user out.
logoutClickable?.addEventListener("click", logout);

// ? Clicking the register button calls the register function with the input values.
registerButton?.addEventListener("click", () => {
    register(
        usernameInput.value,
        emailInput.value,
        passwordInput.value,
        confirmPasswordInput.value,
    );
});

// ? Clicking the password reset button calls the validation and resetting function
resetPasswordButton?.addEventListener("click", () => {
    validateAndResetPassword(passwordInput.value, confirmPasswordInput.value);
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
[emailInput, usernameInput, passwordInput, confirmPasswordInput].forEach(
    (input) => {
        input.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
                e.stopPropagation();

                // ? If the user is on the register menu, we register with all 3 inputs.
                if (form?.classList.contains("new-user")) {
                    register(
                        usernameInput.value,
                        emailInput.value,
                        passwordInput.value,
                        confirmPasswordInput.value,
                    );

                    // ? If resetting the password, do that with the content of both password inputs
                } else if (form?.classList.contains("resetting-password")) {
                    validateAndResetPassword(
                        passwordInput.value,
                        confirmPasswordInput.value,
                    );
                    // ? Otherwise, we log in with 2 of the inputs
                } else login(emailInput.value, passwordInput.value);
            }
        });
    },
);

export {
    form,
    goToPasswordResetScreen,
    login,
    logout,
    register,
    statusMessage,
};
