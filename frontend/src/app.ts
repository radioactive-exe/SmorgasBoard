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
import { patchIntoSmorgasBase } from "./querying.js";
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
const matrix: HTMLElement | null = document.querySelector(".matrix");

//#endregion

function init(): void {
    const linkFiles = document.head.querySelectorAll("link");
    linkFiles.forEach((link) => {
        if (link.href.includes("themes")) link.id = "app-theme";
    });
}

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
            }

            matrixCell.addEventListener("mouseenter", cellMouseEnterHandler);
            matrixCell.addEventListener("click", () => {
                dashboard.setDimensions({ width: j + 1, height: i + 1 });
                patchIntoSmorgasBase("dimensions", {
                    width: j + 1,
                    height: i + 1,
                });
                console.log(
                    "Dashboard is now "
                        + (j + 1).toString()
                        + "x"
                        + (i + 1).toString(),
                );
            });
            matrix?.appendChild(matrixCell);
        }
    }
}

init();
updateDimensionsMatrix();

// ~ Listener Initialisation

window.addEventListener("resize", () => {
    dashboard.organiseElements();
    if (current.panel.classList.contains("configuring"))
        current.panel.moveToCentre();
    updateDimensionsMatrix();
});

matrix?.addEventListener("mouseleave", () => {
    [...(matrix?.children ?? [])].forEach((cell) => {
        cell.classList.remove("active");
    });
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

            if (!firstTime) {
                dashboard.load().then(() => {
                    finishLoading(loader);
                });
            } else {
                dashboard.setCurrentTheme(dashboard.getCurrentTheme());
                dashboard.save();
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
                    finishLoading(loader);
                });
        }
        // console.log("!!", e, session);
    },
);

export {
    commonHandler,
    current,
    dashboard,
    finishLoading,
    holdHandler,
    hoverHandler,
    loader,
    preview,
    setDocumentHandlers,
    setFirstTime,
    spawnablePanelTypes,
    supabase,
    user,
};
