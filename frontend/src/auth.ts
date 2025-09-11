import type { AuthResponse } from "@supabase/supabase-js";
import { AuthWeakPasswordError, isAuthApiError } from "@supabase/supabase-js";

import { supabase, user } from "./app.js";
import { AlertLevel, spawnAlert } from "./elements/alert.js";

const unexpectedErrorMessage =
    "You... Somehow broke this in a way I... didn't really see coming? Please post an Issue on this website's <a href=\"https://github.com/radioactive-exe/SmorgasBoard\">GitHub Repository</a>, and let me know what happened.";
let statusMessage: {
    error?: string;
    success?: string;
    requirements?: string[];
};

async function register(
    username: string,
    email: string,
    password: string,
): Promise<void> {
    if (username == "") {
        statusMessage = { error: "Please enter a username!" };
        spawnAlert(statusMessage.error as string, AlertLevel.ERROR);
        return;
    }
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

    if (
        isAuthApiError(registrationResult.error)
        || registrationResult.error instanceof AuthWeakPasswordError
    ) {
        switch (registrationResult.error.code) {
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
                    requirements: (
                        registrationResult.error as AuthWeakPasswordError
                    ).reasons,
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
                if (registrationResult.error.message.includes("email")) {
                    statusMessage = { error: "Invalid Email Address!" };
                } else if (
                    registrationResult.error.message.includes("password")
                ) {
                    statusMessage = { error: "Please enter a password!" };
                }
                break;
            default:
                statusMessage = { error: unexpectedErrorMessage };
                break;
        }
    } else if (registrationResult.data.user) {
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

async function login(email: string, password: string): Promise<void> {
    statusMessage = {};
    const loginResult: AuthResponse = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (isAuthApiError(loginResult.error)) {
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
        statusMessage = {
            success: `Welcome back, ${user?.username ?? "Placeholder_User"}!`,
        };
    }
    spawnAlert(
        statusMessage.error ?? statusMessage.success ?? "",
        statusMessage.error ? AlertLevel.ERROR : AlertLevel.INFO,
    );
}

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

function logout(): void {
    supabase.auth.signOut();
}

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

function goToRegisterScreen(): void {
    form?.classList.add("visible");
    form?.classList.add("new-user");
    usernameInput.setAttribute("required", "true");
}

function goToLoginScreen(): void {
    form?.classList.add("visible");
    form?.classList.remove("new-user");
    usernameInput.removeAttribute("required");
}

loginFormClickable?.addEventListener("click", goToLoginScreen);
registerFormClickable?.addEventListener("click", goToRegisterScreen);
loginClickable?.addEventListener("click", goToLoginScreen);
registerClickable?.addEventListener("click", goToRegisterScreen);
logoutClickable?.addEventListener("click", logout);

function hidePassword(): void {
    passwordVisibilityButton?.style.setProperty(
        "background",
        "var(--input-secondary)",
    );
    passwordInput?.setAttribute("type", "password");
    document.removeEventListener("mouseup", hidePassword);
}

passwordVisibilityButton?.addEventListener("mousedown", () => {
    passwordVisibilityButton.style.setProperty(
        "background",
        "var(--input-accent)",
    );
    passwordInput?.setAttribute("type", "text");
    document.addEventListener("mouseup", hidePassword);
});

registerButton?.addEventListener("click", () => {
    register(usernameInput.value, emailInput.value, passwordInput?.value);
});

loginButton?.addEventListener("click", () => {
    login(emailInput.value, passwordInput.value);
});

closeFormButton?.addEventListener("click", () => {
    form?.classList.remove("visible");
});

form?.addEventListener("submit", (e) => {
    e.preventDefault();
});

export { form, login, logout, register, statusMessage };
