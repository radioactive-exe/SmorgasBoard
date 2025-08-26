import * as get from "./functions/accessors.js";
import * as utils from "./functions/util.js";

import { Area } from "./classes/area.js";
import { PanelType, PanelTypeConfig } from "./classes/panel/panel_type.js";
import { Panel } from "./classes/panel/panel.js";
import { Dashboard, Theme } from "./classes/dashboard.js";

import {
    snapElementToTarget,
    rotatePanel,
    rotateElementStyle,
} from "./functions/manip.js";
import {
    deletePanelButton,
    editModeButton,
    panelMenu,
    removeContextMenu,
    spawnContextMenu,
    themeMenu,
} from "./elements/context_menu.js";

//#region

const current = {
    flag: "" as string,
    panel: Panel.defaultPanel() as Panel,
};

const loader: HTMLElement = document.querySelector(".loader") as HTMLElement;

const dashboard: Dashboard = document.querySelector(
    "smorgas-board",
) as Dashboard;
dashboard.loadStoredPanels();
const holdHandler = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    drag: (e: MouseEvent): void => {
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

function releaseHandler(): void {
    snapElementToTarget(current.panel, preview);

    snapElementToTarget(preview, preview);
    preview.classList.remove("visible");
    current.panel.classList.remove(current.flag, "being-manipulated");

    dashboard.updateStoredPanels();

    document.removeEventListener("mouseup", holdHandler.release);
    document.removeEventListener("mousemove", holdHandler.drag);

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
            dashboard.spawnPanelOfType(PanelType.DEFAULT);
            break;
        case "ArrowUp":
            dashboard.setCurrentTheme(Theme.CONSOLE);
            break;
        case "ArrowRight":
            dashboard.toggleEditMode();
            break;
        case "ArrowLeft":
            dashboard.spawnPanelOfType(PanelType.CLOCK);
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

Object.entries(Theme).forEach((theme) => {
    const menuEntry: HTMLElement = document.createElement("li");
    menuEntry.classList.add("item");
    menuEntry.id = `${theme[0].toLowerCase()}-entry`;
    menuEntry.innerHTML = `<span class="item-text">${theme[1].name}</span>`;
    menuEntry.addEventListener("mousedown", () => {
        localStorage.setItem("last-theme", theme[0]);
        dashboard.setCurrentTheme(theme[1]);
    });
    themeMenu.appendChild(menuEntry);
});

Object.entries(PanelType).forEach((panelType) => {
    if (panelType[0] == "DEFAULT" || panelType[0] == "PREVIEW") return;
    const menuEntry: HTMLElement = document.createElement("li");
    menuEntry.classList.add("item");
    menuEntry.id = `${panelType[0].toLowerCase()}-entry`;
    menuEntry.innerHTML = `<span class="item-text">${panelType[1].typeName}</span>`;
    menuEntry.addEventListener("mousedown", () => {
        dashboard.spawnPanelOfType(panelType[1]);
    });
    panelMenu.appendChild(menuEntry);
});

//#endregion

export {
    current,
    loader,
    commonHandler,
    preview,
    holdHandler,
    hoverHandler,
    dashboard,
    setDocumentHandlers,
};
