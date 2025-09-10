import type {
    AuthChangeEvent,
    Session,
    SupabaseClient,
} from "@supabase/supabase-js";

import { createClient } from "@supabase/supabase-js";

import { Area } from "./classes/area.js";
import type { Dashboard } from "./classes/dashboard.js";
import { Theme } from "./classes/dashboard.js";
import { Panel } from "./classes/panel/panel.js";
import { PanelType, PanelTypeConfig } from "./classes/panel/panel_type.js";

import {
    deletePanelButton,
    editModeButton,
    panelMenu,
    removeContextMenu,
    spawnContextMenu,
    themeMenu,
} from "./elements/context_menu.js";

import * as get from "./functions/accessors.js";

import {
    rotateElementStyle,
    rotatePanel,
    snapElementToTarget,
} from "./functions/manip.js";

// eslint-disable-next-line import/order
import * as utils from "./functions/util.js";

//#region Constant Declarations

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables not properly configured!");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

let user: { email: string; username: string; access_token: string } | null =
    null;

// eslint-disable-next-line import/order
import { login, logout, register } from "./auth.js";

const spawnablePanelTypes: [string, PanelType][] =
    Object.entries(PanelType).slice(2);

const loader: HTMLElement = document.querySelector(".loader") as HTMLElement;

const dashboard: Dashboard = document.querySelector(
    "smorgas-board",
) as Dashboard;
const holdHandler = {
    drag: (_e: MouseEvent): void => {
        return;
    },
    release: releaseHandler,
};
const hoverHandler = {
    enter: enterPanelHoverHandler,
    move: movePanelHoverHandler,
    exit: exitPanelHoverHandler,
};

const commonHandler = {
    mouseDown: function (panel: Panel): void {
        clearTimeout(utils.previewDeletionTimeout);
        current.panel = panel;
        panel.classList.add(current.flag, "being-manipulated");
        panel.initPreview();
        setDocumentHandlers();
    },

    drag: function (panel: Panel, e: MouseEvent): void {
        e.preventDefault();
        panel.updatePreview();
    },
};

const preview: Panel = new Panel(
    Area.INIT,
    PanelType.PREVIEW,
    -1,
    PanelTypeConfig.NONE,
);
preview.classList.add("final-preview");

const current = {
    flag: "" as string,
    panel: preview,
};

dashboard.load().then(() => {
    finishLoading(loader);
});

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

const personalNavButton: HTMLElement | null = document.querySelector(
    ".personal-nav .button",
);

personalNavButton?.addEventListener("click", () => {
    personalNavButton.classList.toggle("active");
});

const anonOptions: HTMLElement | null = document.querySelector(
    ".personal-nav .anon-options",
);
const loggedInOptions: HTMLElement | null = document.querySelector(
    ".personal-nav .logged-in-options",
);

//#endregion

function releaseHandler(): void {
    snapElementToTarget(current.panel, preview);

    snapElementToTarget(preview, preview);
    preview.classList.remove("visible");
    current.panel.classList.remove(current.flag, "being-manipulated");

    dashboard.save();

    document.removeEventListener("mouseup", holdHandler.release);
    document.removeEventListener("mousemove", holdHandler.drag);
    preview.dataset.callerId = "-1";
    utils.deleteAfterTransition(preview);
}

function enterPanelHoverHandler(e: MouseEvent): void {
    if (dashboard.isEditing()) return;
    const target: Panel = e.currentTarget as Panel;
    const panel: Panel = target?.shadowRoot?.querySelector(
        ".panel-body",
    ) as Panel;

    if (!panel?.classList.contains("moving")) {
        target.classList.add("hovering");
        setTimeout(
            () => {
                if (target.classList.contains("hovering")) {
                    if (panel) panel.part.add("in-motion");
                }
            },
            get.normalisedCssPropertyValue(panel, "transition-duration"),
        );
    }
}

function movePanelHoverHandler(e: MouseEvent): void {
    if (dashboard.isEditing()) return;
    e.stopPropagation();
    if (
        !(e.currentTarget as Panel)?.shadowRoot
            ?.querySelector(".panel-body")
            ?.classList.contains("moving")
    ) {
        rotatePanel(e);
    }
}

function exitPanelHoverHandler(e: MouseEvent): void {
    rotateElementStyle(e.target as HTMLElement, {
        rotation: { x: 0, y: 0 },
        shadow: { x: 0, y: 0 },
    });

    if (dashboard.isEditing()) return;
    const panel = (e.currentTarget as Panel)?.shadowRoot?.querySelector(
        ".panel-body",
    );
    panel?.part.remove("in-motion");
    (e.currentTarget as Panel)?.classList.remove("hovering");
}

function setDocumentHandlers(): void {
    document.addEventListener("mousemove", holdHandler.drag);
    document.addEventListener("mouseup", holdHandler.release);
}

function finishLoading(loader: HTMLElement): void {
    loader.classList.add("despawning");
}

// ~ Listener Initialisation

window.addEventListener("resize", () => {
    dashboard.organiseElements();
    if (current.panel.classList.contains("configuring"))
        current.panel.moveToCentre();
});

document.addEventListener("keydown", async (e) => {
    switch (e.key) {
        case "ArrowDown":
            dashboard.setCurrentTheme(Theme.DEFAULT);
            break;
        case "ArrowUp":
            dashboard.setCurrentTheme(Theme.CONSOLE);
            break;
        case "ArrowRight":
            dashboard.toggleEditMode();
            break;
        case "ArrowLeft":
            const fetched = await fetch(
                import.meta.env.VITE_BACKEND_URL + "smorgasbase/get?target=id",
            );
            console.log(fetched);
    }
});

dashboard.addEventListener("contextmenu", spawnContextMenu);

// dashboard.addEventListener("loaded", loader.remove);

editModeButton?.addEventListener("click", () => {
    dashboard.toggleEditMode();
    removeContextMenu();
});

deletePanelButton?.addEventListener("click", () => {
    dashboard.deletePanel(current.panel);
});

// ~ Panel Data Functionality

Object.entries(Theme).forEach((theme: [string, Theme]) => {
    const menuEntry: HTMLElement = document.createElement("li");
    menuEntry.classList.add("item");
    menuEntry.id = `${theme[0].toLowerCase()}-entry`;
    menuEntry.innerHTML = `<span class="item-text">${theme[1]}</span>`;
    menuEntry.addEventListener("mousedown", () => {
        localStorage.setItem("last-theme", theme[0]);
        dashboard.setCurrentTheme(theme[1]);
    });
    themeMenu.appendChild(menuEntry);
});

spawnablePanelTypes.forEach((panelType: [string, PanelType]) => {
    const menuEntry: HTMLElement = document.createElement("li");
    menuEntry.classList.add("item");
    menuEntry.id = `${panelType[0].toLowerCase()}-entry`;
    menuEntry.innerHTML = `<span class="item-text">${panelType[1].getName()}</span>`;
    menuEntry.addEventListener("mousedown", () => {
        dashboard.spawnPanelOfType(panelType[1]);
    });
    panelMenu.appendChild(menuEntry);
});

//#endregion

supabase.auth.onAuthStateChange(
    (e: AuthChangeEvent, session: Session | null) => {
        if (e == "SIGNED_IN" && session && session.user) {
            user = {
                email: session.user.email as string,
                username:
                    session.user.identities?.at(0)?.identity_data?.["username"],
                access_token: session.access_token,
            };
            (
                document.querySelectorAll(
                    ".username",
                ) as NodeListOf<HTMLElement>
            )?.forEach((u: HTMLElement) => {
                if (u) u.textContent = user?.username as string;
            });

            anonOptions?.style.setProperty("display", "none");
            loggedInOptions?.style.setProperty("display", "inherit");

            personalNavButton?.classList.remove("active");
            form?.classList.remove("visible");
        } else if (e == "SIGNED_OUT") {
            user = null;
            anonOptions?.style.setProperty("display", "inherit");
            loggedInOptions?.style.setProperty("display", "none");

            personalNavButton?.classList.remove("active");
        }
        // console.log("!!", e, session);
    },
);

export {
    commonHandler,
    current,
    dashboard,
    holdHandler,
    hoverHandler,
    loader,
    preview,
    setDocumentHandlers,
    spawnablePanelTypes,
    supabase,
    user,
};
