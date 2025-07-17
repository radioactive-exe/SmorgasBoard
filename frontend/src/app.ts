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


export const dashboard: Dashboard = document.querySelector<Dashboard>(
    "smorgas-board"
)
    ? <Dashboard>document.querySelector<Dashboard>("smorgas-board")
    : <Dashboard>document.createElement("smorgas-board");

export var dragHandler;

var flag: string, currentPanel: Panel;

const preview: Panel = new Panel(Area.INIT, PanelType.PREVIEW, -1);
preview.classList.add("final-preview");

export function releaseHandler(e) {
    snapElementToTarget(currentPanel, preview);

    preview.classList.add("disappearing");
    currentPanel.classList.remove(flag, "being-manipulated");

    updateStoredPanels();

    utils.removeClassAfterTransition(preview, "disappearing", true);

    document.removeEventListener("mouseup", releaseHandler);
    document.removeEventListener("mousemove", dragHandler);
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
    if (dashboard.isEditing()) return;
    rotateElementStyle(e.target, {
        rotation: { x: 0, y: 0 },
        shadow: { x: 0, y: 0 },
    });

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
    panel.addEventListener("auxclick", () => {
        dashboard.deletePanel(panel);
    });

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
    preview.classList.add("appearing");
    updateElementDestinationPreview(i);

    utils.removeClassAfterTransition(preview, "appearing");
}

function updateElementDestinationPreview(el): void {
    snapElementToGrid(<Panel>dashboard?.querySelector(".final-preview"), el);
}

function updateStoredPanels() {
    var panelStorage: type.PanelInstance[] = dashboard.panels.map(
        (i): type.PanelInstance => {
            return {
                panel_id: parseInt(i.dataset.panelId ? i.dataset.panelId : "0"),
                panel_type_id: i.getType().getId(),
                area: i.getArea().toJson(),
                content: i.innerHTML,
            };
        }
    );

    localStorage.setItem("local-panel-storage", JSON.stringify(panelStorage));
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
            dashboard.spawnPanelOfType(PanelType.PHOTO);
    }
});

// ~ Function Calls

window.addEventListener("resize", () => {
    dashboard.organiseElements();
});
