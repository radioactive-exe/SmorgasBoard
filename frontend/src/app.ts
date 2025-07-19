import * as type from "./definitions/types.js";
import { Dashboard, Panel, Area, PanelType } from "./definitions/classes.js";

import * as utils from "./util.js";
import * as get from "./accessors.js";
import {
    resizePanel,
    movePanelWithinScreen,
    snapElementToGrid,
    snapElementToTarget,
    rotatePanel,
    rotateElementStyle,
} from "./manip.js";

export const dashboard: Dashboard =
    <Dashboard>document.querySelector("smorgas-board") ??
    <Dashboard>document.createElement("smorgas-board");
const contextMenu = document.querySelector<HTMLElement>(".context-menu");
const editModeButton = document.querySelector<HTMLElement>("#edit-mode-button");
const deletePanelSection = document.querySelector<HTMLElement>("#remove-panel-section");
const deletePanelButton = document.querySelector<HTMLElement>("#remove-panel-button");
var flag: string, currentPanel: Panel;
var contextMenuDeleteTimeout;

const preview: Panel = new Panel(Area.INIT, PanelType.PREVIEW, -1);
preview.classList.add("final-preview");
export var dragHandler;

function keepContextMenu(e: Event) {
    clearTimeout(contextMenuDeleteTimeout);
}

function removeContextMenu(e: Event) {
    if (!contextMenu) return;

    contextMenuDeleteTimeout = setTimeout(() => {
        contextMenu.style.visibility = "hidden";
        contextMenu.removeEventListener("mouseleave", removeContextMenu);
    }, 1000);

}

export function releaseHandler(e) {
    snapElementToTarget(currentPanel, preview);

    snapElementToTarget(preview, preview);
    preview.classList.remove("visible");
    currentPanel.classList.remove(flag, "being-manipulated");

    dashboard.updateStoredPanels();

    document.removeEventListener("mouseup", releaseHandler);
    document.removeEventListener("mousemove", dragHandler);

    utils.deleteAfterTransition(preview);
}

export function enterPanelHoverHandler(e) {
    if (dashboard.isEditing()) return;
    const target = e.currentTarget;
    const panel = target.shadowRoot?.querySelector(".panel-body");

    if (!panel.classList.contains("moving")) {
        target.classList.add("hovering");
        setTimeout(() => {
            if (target.classList.contains("hovering")) {
                panel.part = "panel-body in-motion";
            }
        }, get.normalisedCssPropertyValue(panel, "transition-duration"));
    }
}

export function movePanelHoverHandler(e) {
    if (dashboard.isEditing()) return;
    e.stopPropagation();
    if (
        !e.currentTarget.shadowRoot
            ?.querySelector(".panel-body")
            .classList.contains("moving")
    ) {
        rotatePanel(e);
    }
}

export function exitPanelHoverHandler(e) {
    rotateElementStyle(e.target, {
        rotation: { x: 0, y: 0 },
        shadow: { x: 0, y: 0 },
    });
    
    if (dashboard.isEditing()) return;
    const panel = e.currentTarget.shadowRoot?.querySelector(".panel-body");
    panel.part = "panel-body";
    e.currentTarget.classList.remove("hovering");
}

export function setDocumentHandlers() {
    document.addEventListener("mousemove", dragHandler);
    document.addEventListener("mouseup", releaseHandler);
}

export function removePanelHoverListeners(panel): void {
    panel.removeEventListener("mouseenter", enterPanelHoverHandler);
    panel.removeEventListener("mousemove", movePanelHoverHandler);
    panel.dispatchEvent(new Event("mouseleave"));
    panel.removeEventListener("mouseleave", exitPanelHoverHandler);
}

export function addPanelHandleListeners(panel: Panel) {

    panel.shadowRoot
        ?.querySelector<HTMLElement>(".drag-handle")
        ?.addEventListener("mousedown", (e) => {
            flag = "being-dragged";
            currentPanel = panel;
            panel.classList.add(flag, "being-manipulated");

            initPreview(panel);

            const initData = {
                eventCoords: {
                    x: e.clientX,
                    y: e.pageY,
                },
                panelPos: {
                    x: panel.offsetLeft,
                    y: panel.offsetTop,
                },
            };

            dragHandler = (e) => {
                e.preventDefault;
                movePanelWithinScreen(panel, e, initData);
                updateElementDestinationPreview(panel);
            };

            setDocumentHandlers();
        });

    panel.shadowRoot
        ?.querySelector<HTMLElement>(".resize-handle")
        ?.addEventListener("mousedown", (e) => {
            flag = "being-resized";
            currentPanel = panel;

            panel.classList.add(flag, "being-manipulated");

            initPreview(panel);

            const initData = {
                eventCoords: {
                    x: e.clientX,
                    y: e.pageY,
                },
                panelSize: {
                    width: panel.offsetWidth,
                    height: panel.offsetHeight,
                },
            };

            dragHandler = (e) => {
                e.preventDefault;
                resizePanel(panel, e, initData);
                updateElementDestinationPreview(panel);
            };

            setDocumentHandlers();
        });
}

function initPreview(i: Panel) {
    preview.dataset.callerId = i.dataset.panelId;
    i.parentElement?.prepend(preview);
    snapElementToTarget(preview, i, false);
    preview.classList.add("visible");
    updateElementDestinationPreview(i);
}

function updateElementDestinationPreview(el): void {
    snapElementToGrid(<Panel>dashboard?.querySelector(".final-preview"), el);
}

document.addEventListener("keydown", async (e) => {
    switch (e.key) {
        case "ArrowDown":
            dashboard.setCurrentTheme(type.Theme.DEFAULT);
            break;
        case "ArrowUp":
            dashboard.setCurrentTheme(type.Theme.YELLOW);
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
    var themeMenu = document.querySelector<HTMLElement>(".theme-menu");
    if (contextMenu == null || themeMenu == null) return;

    if (e.target instanceof Panel) {
        currentPanel = e.target;
        deletePanelSection?.classList.add("visible");
    }
    else (deletePanelSection?.classList.remove("visible"))

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
    dashboard.deletePanel(currentPanel);
})

// ~ Function Calls

window.addEventListener("resize", () => {
    dashboard.organiseElements();
});
