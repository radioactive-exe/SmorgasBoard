/* eslint-disable @typescript-eslint/no-empty-function */
import * as get from "./accessors.js";
import * as utils from "./util.js";

import { Area } from "./definitions/area.js";
import { Panel, PanelType } from "./definitions/panel.js";
import { Dashboard, Theme } from "./definitions/dashboard.js";

import {
    snapElementToTarget,
    rotatePanel,
    rotateElementStyle,
} from "./manip.js";

const dashboard: Dashboard =
    (document.querySelector("smorgas-board") as Dashboard) ??
    (document.createElement("smorgas-board") as Dashboard);
const contextMenu = document.querySelector<HTMLElement>(".context-menu");
const editModeButton = document.querySelector<HTMLElement>("#edit-mode-button");
const deletePanelSection = document.querySelector<HTMLElement>(
    "#remove-panel-section"
);
const deletePanelButton = document.querySelector<HTMLElement>(
    "#remove-panel-button"
);
const current = {
    flag: "",
    panel: Panel.defaultPanel(),
};
const handler = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    drag: function (e: MouseEvent): void {},
    release: function (): void {},
};
let contextMenuDeleteTimeout: NodeJS.Timeout;

const preview: Panel = new Panel(Area.INIT, PanelType.PREVIEW, -1);
preview.classList.add("final-preview");

function keepContextMenu(): void {
    clearTimeout(contextMenuDeleteTimeout);
}

function removeContextMenu(): void {
    if (!contextMenu) return;

    contextMenuDeleteTimeout = setTimeout(() => {
        contextMenu.style.visibility = "hidden";
        contextMenu.removeEventListener("mouseleave", removeContextMenu);
    }, 1000);
}

handler.release = function (): void {
    snapElementToTarget(current.panel, preview);

    snapElementToTarget(preview, preview);
    preview.classList.remove("visible");
    current.panel.classList.remove(current.flag, "being-manipulated");

    dashboard.updateStoredPanels();

    document.removeEventListener("mouseup", handler.release);
    document.removeEventListener("mousemove", handler.drag);

    utils.deleteAfterTransition(preview);
};

function enterPanelHoverHandler(e: MouseEvent): void {
    if (dashboard.isEditing()) return;
    const target: Panel = e.currentTarget as Panel;
    const panel: Panel = target?.shadowRoot?.querySelector(
        ".panel-body"
    ) as Panel;

    if (!panel?.classList.contains("moving")) {
        target.classList.add("hovering");
        setTimeout(
            () => {
                if (target.classList.contains("hovering")) {
                    if (panel) panel.part = "panel-body in-motion";
                }
            },
            get.normalisedCssPropertyValue(panel, "transition-duration")
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
        ".panel-body"
    );
    if (panel) panel.part = "panel-body";
    (e.currentTarget as Panel)?.classList.remove("hovering");
}

function setDocumentHandlers(): void {
    document.addEventListener("mousemove", handler.drag);
    document.addEventListener("mouseup", handler.release);
}

// ~ Listener Initialisation

window.addEventListener("resize", () => {
    dashboard.organiseElements();
});

document.addEventListener("keydown", async (e) => {
    switch (e.key) {
        case "ArrowDown":
            dashboard.setCurrentTheme(Theme.DEFAULT);
            break;
        case "ArrowUp":
            dashboard.setCurrentTheme(Theme.YELLOW);
            break;
        case "ArrowRight":
            dashboard.toggleEditMode();
            break;
        case "ArrowLeft":
            dashboard.spawnPanelOfType(PanelType.NOTEPAD);
    }
});

dashboard.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const themeMenu = document.querySelector<HTMLElement>(".theme-menu");
    if (contextMenu == null || themeMenu == null) return;

    if (e.target instanceof Panel) {
        current.panel = e.target;
        deletePanelSection?.classList.add("visible");
    } else deletePanelSection?.classList.remove("visible");

    try {
        if (e.pageX > window.innerWidth - 2 * contextMenu.offsetWidth)
            themeMenu.style.left = "-102%";
        else themeMenu.style.left = "98%";

        clearTimeout(contextMenuDeleteTimeout);

        contextMenu.style.left =
            utils.clamp(
                e.pageX,
                0,
                window.innerWidth - contextMenu.offsetWidth - 10
            ) + "px";
        contextMenu.style.top =
            utils.clamp(
                e.pageY - 0.5 * contextMenu.offsetHeight,
                0,
                window.innerHeight - contextMenu.offsetHeight + 10
            ) + "px";
        contextMenu.style.visibility = "visible";

        contextMenu.addEventListener("mouseenter", keepContextMenu);
        contextMenu.addEventListener("mouseleave", removeContextMenu);
    } catch (error) {
        console.error(error);
    }
});

editModeButton?.addEventListener("click", () => {
    dashboard.toggleEditMode();
});

deletePanelButton?.addEventListener("click", () => {
    dashboard.deletePanel(current.panel);
});

export {
    current,
    preview,
    handler,
    dashboard,
    setDocumentHandlers,
    enterPanelHoverHandler,
    movePanelHoverHandler,
    exitPanelHoverHandler,
};
