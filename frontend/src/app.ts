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
let flag: string, currentPanel: Panel;
let contextMenuDeleteTimeout: NodeJS.Timeout;

const preview: Panel = new Panel(Area.INIT, PanelType.PREVIEW, -1);
preview.classList.add("final-preview");
export let dragHandler: (e: Event) => void;

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

export function releaseHandler(): void {
    snapElementToTarget(currentPanel, preview);

    snapElementToTarget(preview, preview);
    preview.classList.remove("visible");
    currentPanel.classList.remove(flag, "being-manipulated");

    dashboard.updateStoredPanels();

    document.removeEventListener("mouseup", releaseHandler);
    document.removeEventListener("mousemove", dragHandler);

    utils.deleteAfterTransition(preview);
}

export function enterPanelHoverHandler(e: MouseEvent): void {
    if (dashboard.isEditing()) return;
    const target: Panel = e.currentTarget as Panel;
    const panel: Panel = target?.shadowRoot?.querySelector(".panel-body") as Panel;

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

export function movePanelHoverHandler(e: MouseEvent): void {
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

export function exitPanelHoverHandler(e: MouseEvent): void {
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

export function setDocumentHandlers(): void {
    document.addEventListener("mousemove", dragHandler);
    document.addEventListener("mouseup", releaseHandler);
}

export function removePanelHoverListeners(panel: Panel): void {
    panel.removeEventListener("mouseenter", enterPanelHoverHandler);
    panel.removeEventListener("mousemove", movePanelHoverHandler);
    panel.dispatchEvent(new Event("mouseleave"));
    panel.removeEventListener("mouseleave", exitPanelHoverHandler);
}

export function addPanelHandleListeners(panel: Panel): void {
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

            dragHandler = (e): void => {
                e.preventDefault();
                movePanelWithinScreen(panel, e as MouseEvent, initData);
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

            dragHandler = (e): void => {
                e.preventDefault();
                resizePanel(panel, e as MouseEvent, initData);
                updateElementDestinationPreview(panel);
            };

            setDocumentHandlers();
        });
}

function initPreview(i: Panel): void {
    preview.dataset.callerId = i.dataset.panelId;
    i.parentElement?.prepend(preview);
    snapElementToTarget(preview, i, false);
    preview.classList.add("visible");
    updateElementDestinationPreview(i);
}

function updateElementDestinationPreview(el: Panel): void {
    snapElementToGrid(dashboard?.querySelector(".final-preview") as Panel, el);
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
    const themeMenu = document.querySelector<HTMLElement>(".theme-menu");
    if (contextMenu == null || themeMenu == null) return;

    if (e.target instanceof Panel) {
        currentPanel = e.target;
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
    dashboard.deletePanel(currentPanel);
});

// ~ Function Calls

window.addEventListener("resize", () => {
    dashboard.organiseElements();
});
