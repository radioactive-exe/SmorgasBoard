import type {
    AuthChangeEvent,
    Session,
    SupabaseClient,
} from "@supabase/supabase-js";

import { createClient } from "@supabase/supabase-js";

import { form } from "./auth.js";
import type { Size } from "./classes/area.js";
import { Area } from "./classes/area.js";
import { Dashboard } from "./classes/dashboard.js";
import { Panel } from "./classes/panel/panel.js";
import { PanelType, PanelTypeConfig } from "./classes/panel/panel_type.js";
import { Theme } from "./classes/theme.js";

import {
    deletePanelButton,
    editModeButton,
    hoverItems,
    innerMenu,
    keepContextMenuOnScreen,
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

import * as utils from "./functions/util.js";
import type { Database } from "./types/database.types.js";

//#region Constant Declarations

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables not properly configured!");
}

const supabase: SupabaseClient = createClient<Database>(
    supabaseUrl,
    supabaseKey,
);

let user: {
    id: string;
    email: string;
    username: string;
    access_token: string;
} | null = null;

let firstTime = false;
function setFirstTime(val: boolean): void {
    firstTime = val;
}

let wasLocalChange = false;
function setLocalChange(val: boolean): void {
    wasLocalChange = val;
}

const spawnablePanelTypes: [string, PanelType][] =
    Object.entries(PanelType).slice(2);

const loader: HTMLElement = document.querySelector(".loader") as HTMLElement;
const dashboard: Dashboard = document.querySelector(
    "smorgas-board",
) as Dashboard;
const holdHandler = {
    drag: (_e: PointerEvent): void => {
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
    pointerdown: function (panel: Panel): void {
        clearTimeout(utils.previewDeletionTimeout);
        current.panel = panel;
        panel.classList.add(current.flag, "being-manipulated");
        panel.initPreview();
        setDocumentHandlers();
    },

    drag: function (panel: Panel, e: PointerEvent): void {
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

const modalLayer: HTMLElement =
    document.querySelector("#modal-layer") ?? document.createElement("div");

const navButtons: NodeListOf<HTMLElement> =
    document.querySelectorAll(".nav-entry .button");

const personalNavButton: HTMLElement | null = document.querySelector(
    ".personal-nav .button",
);

const mainNavButton: HTMLElement | null =
    document.querySelector(".main-nav .button");

const contextNavButton: HTMLElement | null = document.querySelector(
    ".context-nav .button",
);

navButtons.forEach((navButton) => {
    navButton?.addEventListener("click", () => {
        if (navButton != contextNavButton) navButton.classList.toggle("active");

        navButtons.forEach((otherButton) => {
            if (
                otherButton != navButton
                && !(navButton != mainNavButton && otherButton == mainNavButton)
            )
                otherButton.classList.remove("active");
        });
    });
});

contextNavButton?.addEventListener("click", spawnContextMenu);

const anonOptions: HTMLElement | null = document.querySelector(
    ".personal-nav .anon-options",
);
const loggedInOptions: HTMLElement | null = document.querySelector(
    ".personal-nav .logged-in-options",
);
const matrix: HTMLElement | null = document.querySelector(".matrix");

const offscreenDownArrow: HTMLElement | null =
    document.querySelector("#off-screen-down");
const offscreenRightArrow: HTMLElement | null =
    document.querySelector("#off-screen-right");

const sizeWarningOverlay: HTMLElement | null = document.querySelector(
    "#size-warning-overlay",
);

const shrinkButton: HTMLButtonElement | null =
    document.querySelector("#shrink-button");

shrinkButton?.addEventListener("click", () => {
    dashboard.setDimensions(Dashboard.getMaxDimensions(), true);
    sizeWarningOverlay?.classList.remove("visible");
});

const overlayDismissButtons: NodeListOf<HTMLButtonElement> | null =
    document.querySelectorAll("button.dismiss-button");

overlayDismissButtons?.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest(".warning-overlay")?.classList.remove("visible");
    });
});

//#endregion

function releaseHandler(): void {
    snapElementToTarget(current.panel, preview);

    snapElementToTarget(preview, preview);
    preview.classList.remove("visible");
    current.panel.classList.remove(current.flag, "being-manipulated");

    dashboard.triggerDelayedSave();

    document.removeEventListener("pointerup", holdHandler.release);
    document.removeEventListener("pointermove", holdHandler.drag);
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
    document.addEventListener("pointermove", holdHandler.drag);
    document.addEventListener("pointerup", holdHandler.release);
}

function finishLoading(loader: HTMLElement): void {
    loader.classList.add("despawning");
}

let lastMax: Size;

function updateDimensionsMatrix(): void {
    const max = Dashboard.getMaxDimensions();

    if (lastMax && lastMax.width == max.width && lastMax.height == max.height)
        return;
    else {
        document.body.style.setProperty("--matrix-width", max.width.toString());
        document.body.style.setProperty(
            "--matrix-height",
            max.height.toString(),
        );
        lastMax = max;
        matrix?.replaceChildren();
    }

    for (let i = 0; i < max.height; i++) {
        for (let j = 0; j < max.width; j++) {
            const matrixCell = document.createElement("div");
            matrixCell.classList.add("matrix-cell");
            matrixCell.dataset.row = i.toString();
            matrixCell.dataset.column = j.toString();
            matrixCell.title = `${i + 1}x${j + 1}`;

            function cellMouseEnterHandler(): void {
                [
                    ...((matrix?.childNodes as NodeListOf<HTMLElement>) ?? []),
                ].forEach((cell: HTMLElement) => {
                    if (
                        parseInt(cell.dataset.row as string)
                            <= parseInt(matrixCell.dataset.row as string)
                        && parseInt(cell.dataset.column as string)
                            <= parseInt(matrixCell.dataset.column as string)
                    )
                        cell.classList.add("active");
                    else cell.classList.remove("active");
                });

                dashboard.getCells().forEach((c: HTMLElement) => {
                    if (
                        parseInt(c.dataset.row as string)
                            <= parseInt(matrixCell.dataset.row as string)
                        && parseInt(c.dataset.column as string)
                            <= parseInt(matrixCell.dataset.column as string)
                    )
                        c.part.add("previewing");
                    else c.part.remove("previewing");
                });

                if (
                    parseInt(matrixCell.dataset.row as string)
                    >= Dashboard.getRows()
                ) {
                    offscreenDownArrow?.classList.add("visible");
                } else offscreenDownArrow?.classList.remove("visible");
                if (
                    parseInt(matrixCell.dataset.column as string)
                    >= Dashboard.getCols()
                ) {
                    offscreenRightArrow?.classList.add("visible");
                } else offscreenRightArrow?.classList.remove("visible");
            }

            matrixCell.addEventListener("mouseenter", cellMouseEnterHandler);
            matrixCell.addEventListener("click", () => {
                dashboard.setDimensions({ width: j + 1, height: i + 1 });
                offscreenDownArrow?.classList.remove("visible");
                offscreenRightArrow?.classList.remove("visible");
            });
            matrix?.appendChild(matrixCell);
        }
    }
}

function contextMenuLoseFocusHandler(e: MouseEvent): void {
    const target: HTMLElement = e.target as HTMLElement;
    if (
        target != innerMenu
        && target.closest(".context-menu") == null
        && target != contextNavButton
    )
        removeContextMenu();
}

function init(): void {
    if (
        Dashboard.getFractionalWidth() < 100
        || Dashboard.getFractionalHeight() < 100
    ) {
        sizeWarningOverlay?.classList.add("visible");
    }

    if (!document.body.contains(modalLayer)) {
        modalLayer.id = "modal-layer";
        document.body.appendChild(modalLayer);
    }

    updateDimensionsMatrix();
}

// TODO: WHEN I COME BACK FROM CAIRO, DO THE 1. WEATHER PANEL (temp.html/js), THEN ONE MORE THEME, THEN DOCUMENTATION, THEN BLABBERING!

// ~ Listener Initialisation

window.addEventListener("resize", () => {
    dashboard.organiseElements();
    if (current.panel.classList.contains("configuring"))
        current.panel.moveToCentre();
    updateDimensionsMatrix();
    if (
        Dashboard.getFractionalWidth() < 100
        || Dashboard.getFractionalHeight() < 100
    )
        sizeWarningOverlay?.classList.add("visible");
    else sizeWarningOverlay?.classList.remove("visible");
});

matrix?.addEventListener("mouseleave", () => {
    [...(matrix?.children ?? [])].forEach((cell) => {
        cell.classList.remove("active");
    });
    dashboard.getCells().forEach((cell) => {
        cell.part.remove("previewing");
    });
    offscreenDownArrow?.classList.remove("visible");
    offscreenRightArrow?.classList.remove("visible");
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
            console.log(supabase.realtime.getChannels());
    }
});

dashboard.addEventListener("contextmenu", spawnContextMenu);

editModeButton?.addEventListener("click", (_e: MouseEvent) => {
    if (!innerMenu) return;
    dashboard.toggleEditMode();
    if (dashboard.isEditing()) {
        keepContextMenuOnScreen();
    }
});

deletePanelButton?.addEventListener("click", () => {
    dashboard.deletePanel(current.panel);
});

hoverItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        item.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
        item.classList.remove("active");
    });

    item.addEventListener("touchend", (e) => {
        if (e.target == item) item.classList.toggle("active");
    });
});

// ~ Panel Data Functionality

Object.entries(Theme).forEach((theme: [string, Theme]) => {
    const menuEntry: HTMLElement = document.createElement("li");
    menuEntry.classList.add("item");
    menuEntry.id = `${theme[0].toLowerCase()}-entry`;
    menuEntry.innerHTML = `<span class="item-text">${theme[1]}</span>`;
    menuEntry.addEventListener("pointerdown", () => {
        dashboard.setCurrentTheme(theme[1]);
    });
    themeMenu.appendChild(menuEntry);
});

spawnablePanelTypes.forEach((panelType: [string, PanelType]) => {
    const menuEntry: HTMLElement = document.createElement("li");
    menuEntry.classList.add("item");
    menuEntry.id = `${panelType[0].toLowerCase()}-entry`;
    menuEntry.innerHTML = `<span class="item-text">${panelType[1].getName()}</span>`;
    menuEntry.addEventListener("pointerdown", () => {
        dashboard.spawnPanelOfType(panelType[1]);
    });
    panelMenu.appendChild(menuEntry);
});

//#endregion

let _smorgasbaseChangesListener;

supabase.auth.onAuthStateChange(
    async (e: AuthChangeEvent, session: Session | null) => {
        if (e == "SIGNED_IN" && session && session.user) {
            user = {
                id: session.user.id,
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

            _smorgasbaseChangesListener = supabase
                .channel(`changes_user_${user.id}`, {
                    config: { private: true },
                })
                .on("broadcast", { event: "INSERT" }, (payload) =>
                    console.log(payload),
                )
                .on("broadcast", { event: "UPDATE" }, (_payload) => {
                    console.log(_payload);
                    if (!wasLocalChange) {
                        dashboard.clearLoadedPanels();
                        dashboard.load().then(() => {
                            init();
                            finishLoading(loader);
                        });
                    } else {
                        setTimeout(() => {
                            wasLocalChange = false;
                        }, 2000);
                    }
                })
                .subscribe();

            if (!firstTime) {
                dashboard.load().then(() => {
                    init();
                    finishLoading(loader);
                });
            } else {
                dashboard.saveTheme();
                dashboard.saveDimensions();
                dashboard.updateStoredPanels();
            }
        } else if (e == "SIGNED_OUT") {
            user = null;
            anonOptions?.style.setProperty("display", "inherit");
            loggedInOptions?.style.setProperty("display", "none");
            dashboard.clear();
            dashboard.load();
            personalNavButton?.classList.remove("active");
        } else if (e == "INITIAL_SESSION") {
            if (!user)
                dashboard.load().then(() => {
                    init();
                    finishLoading(loader);
                });
        }
        // console.log("!!", e);
    },
);

export {
    commonHandler,
    contextMenuLoseFocusHandler,
    current,
    dashboard,
    finishLoading,
    holdHandler,
    hoverHandler,
    loader,
    modalLayer,
    preview,
    setDocumentHandlers,
    setFirstTime,
    setLocalChange,
    spawnablePanelTypes,
    supabase,
    user,
};
