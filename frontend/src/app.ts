/**
 * This is the main module for the Smorgasboard app.
 *
 * @remarks
 * Almost all handlers, event listeners, and miscellaneous connections between
 * different classes are housed here.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

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
import { PanelType } from "./classes/panel/panel_type.js";
import { Theme } from "./classes/theme.js";

import {
    deletePanelButton,
    editModeButton,
    fitContextMenuOnScreen,
    hoverEntries,
    innerMenu,
    panelMenu,
    spawnContextMenu,
    themeMenu,
} from "./elements/context_menu.js";

import { snapElementToTarget } from "./functions/manip.js";
import * as utils from "./functions/util.js";

//#region Constant Declarations

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables not properly configured!");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

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

const commonHandler = {
    pointerdown: function (panel: Panel): void {
        clearTimeout(utils.previewDeletionTimeout);
        current.panel = panel;
        current.originalArea = new Area(panel.getPosition(), panel.getSize());
        panel.classList.add(current.flag, "being-manipulated");
        panel.initPreview();
        setDocumentHandlers();
        window.getSelection()?.empty();
    },

    drag: function (panel: Panel, e: PointerEvent): void {
        e.preventDefault();
        panel.updatePreview();
    },
};

/**
 * The Preview panel, used whenever a panel is being moved around or resized,
 * previewing where it could possibly snap to the grid to.
 */
const preview: Panel = new Panel(Area.INIT, PanelType.PREVIEW, -1);
preview.classList.add("final-preview");

const current = {
    flag: "" as string,
    panel: preview,
    originalArea: Area.INIT as Area,
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
    const areaChanged =
        current.originalArea.getX() != preview.getArea().getX()
        || current.originalArea.getY() != preview.getArea().getY()
        || current.originalArea.getWidth() != preview.getArea().getWidth()
        || current.originalArea.getHeight() != preview.getArea().getHeight();

    snapElementToTarget(current.panel, preview);

    snapElementToTarget(preview, preview);
    preview.classList.remove("visible");
    current.panel.classList.remove(current.flag, "being-manipulated");

    if (areaChanged) dashboard.triggerDelayedSave();

    document.removeEventListener("pointerup", holdHandler.release);
    document.removeEventListener("pointermove", holdHandler.drag);
    preview.dataset.callerId = "-1";
    utils.deleteAfterTransition(preview);
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

// TODO: DOCUMENTATION

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
    }
});

dashboard.addEventListener("contextmenu", spawnContextMenu);

editModeButton?.addEventListener("click", (_e: MouseEvent) => {
    if (!innerMenu) return;
    dashboard.toggleEditMode();
    if (dashboard.isEditing()) {
        fitContextMenuOnScreen();
    }
});

deletePanelButton?.addEventListener("click", () => {
    dashboard.deletePanel(current.panel);
});

hoverEntries.forEach((item) => {
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
                // .on("broadcast", { event: "INSERT" }, (payload) =>
                //     console.log(payload),
                // )
                .on("broadcast", { event: "UPDATE" }, (_payload) => {
                    console.log(_payload);
                    if (!wasLocalChange) {
                        dashboard.load();
                    } else {
                        setTimeout(() => {
                            wasLocalChange = false;
                        }, 1000);
                    }
                })
                .subscribe();

            if (!firstTime) {
                dashboard.load();
            } else {
                dashboard.save();
                await supabase.functions.invoke("hello-world", {
                    body: {
                        email: user.email,
                        username: user.username,
                    },
                });
            }
        } else if (e == "SIGNED_OUT") {
            user = null;
            anonOptions?.style.setProperty("display", "inherit");
            loggedInOptions?.style.setProperty("display", "none");
            dashboard.clear();
            dashboard.load();
            personalNavButton?.classList.remove("active");
        } else if (e == "INITIAL_SESSION") {
            if (!user) dashboard.load();
        }
        // console.log("!!", e);
    },
);

export {
    commonHandler,
    contextNavButton,
    current,
    dashboard,
    finishLoading,
    holdHandler,
    init,
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
