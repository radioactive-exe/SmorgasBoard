import * as utils from "./util.js";
import * as type from "./defs.js";
import * as get from "./accessors.js";

import {
    resizePanel,
    movePanelWithinScreen,
    snapElementToGrid,
    snapElementToTarget,
    rotatePanel,
    rotateElementStyle,
} from "./manip.js";

export const dashboard = document.querySelector<HTMLElement>("#dashboard")
    ? document.querySelector<HTMLElement>("#dashboard")
    : document.createElement("div");
export var panels: type.Panel[] = loadStoredPanels();
export var dragHandler, currentTheme: type.Theme;

var flag: string, currentPanel: type.Panel;
const preview: type.Panel = new type.Panel(
    type.Area.INIT,
    type.PanelType.PREVIEW,
    -1
);
preview.classList.add("final-preview");

function toggleEditMode(): void {
    dashboard?.classList.toggle("in-edit-mode");
    if (utils.isEditing())
        panels.forEach((i) => {
            removePanelHoverListeners(i);
        });
    else
        panels.forEach((i) => {
            addPanelHoverListeners(i);
        });
}

function setCurrentTheme(theme: type.Theme): void {
    currentTheme = theme;
    const themeFileLink: HTMLElement | null =
        document.querySelector<HTMLElement>("#app-theme");
    if (themeFileLink == null) return;
    themeFileLink.setAttribute("href", theme.getUrl());
}

export function releaseHandler(e) {
    snapElementToTarget(currentPanel, preview);

    preview.classList.add("disappearing");
    currentPanel.classList.remove(flag);

    updateStoredPanels();

    utils.removeClassAfterTransition(preview, "disappearing", true);

    document.removeEventListener("mouseup", releaseHandler);
    document.removeEventListener("mousemove", dragHandler);
}

function enterPanelHoverHandler(e) {
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

function movePanelHoverHandler(e) {
    e.stopPropagation();
    if (
        !e.currentTarget
            .shadowRoot?.querySelector(".panel-body")
            .classList.contains("moving")
    ) {
        rotatePanel(e);
    }
}

function exitPanelHoverHandler(e) {
    rotateElementStyle(e.target, {
        rotation: { x: 0, y: 0 },
        shadow: { x: 0, y: 0 },
    });

    const panel = e.currentTarget.shadowRoot?.querySelector(".panel-body");
    panel.part = "panel-body";
    e.currentTarget.classList.remove("hovering");
}

function setDocumentHandlers() {
    document.addEventListener("mousemove", dragHandler);
    document.addEventListener("mouseup", releaseHandler);
}

function addPanelHoverListeners(panel: type.Panel): void {
    panel.addEventListener("mousemove", movePanelHoverHandler);
    panel.addEventListener("mouseleave", exitPanelHoverHandler);
    panel.addEventListener("mouseenter", enterPanelHoverHandler);
}

function removePanelHoverListeners(panel): void {
    panel.removeEventListener("mouseenter", enterPanelHoverHandler);
    panel.removeEventListener("mousemove", movePanelHoverHandler);
    panel.dispatchEvent(new Event("mouseleave"));
    panel.removeEventListener("mouseleave", exitPanelHoverHandler);
}

function init(): void {
    for (var i = 0; i < get.dashboardRows() * get.dashboardCols(); i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        dashboard?.prepend(cell);
    }
}

function initPanel(panel: type.Panel): void {
    panel.updateContent();
    panel.setType(type.PanelType.DEFAULT);

    snapElementToGrid(panel, panel, false);

    addPanelHoverListeners(panel);
}

function initPreview(i: type.Panel) {
    preview.dataset.callerId = i.dataset.panelId;
    i.parentElement?.prepend(preview);
    snapElementToTarget(preview, i, false);

    preview.classList.add("appearing");
    updateElementDestinationPreview(i);

    utils.removeClassAfterTransition(preview, "appearing");
}

function updateElementDestinationPreview(el): void {
    snapElementToGrid(
        <type.Panel>dashboard?.querySelector(".final-preview"),
        el
    );
}

function updateStoredPanels() {
    var panelStorage: type.PanelInstance[] = panels.map(
        (i): type.PanelInstance => {
            return {
                panel_id: parseInt(i.dataset.panelId ? i.dataset.panelId : "0"),
                panel_type_id: i.getType().getId(),
                area: i.getArea().toJson(),
                content: i.getContent(),
            };
        }
    );

    localStorage.setItem("local-panel-storage", JSON.stringify(panelStorage));
}

function loadStoredPanels(): type.Panel[] {
    let queriedPanels: type.Panel[] = [
        ...document.querySelectorAll<type.Panel>("panel-element"),
    ];

    if (queriedPanels.length != 0) {
        console.warn(
            "Panels in body found. Failed to load panels from storage"
        );
        queriedPanels.forEach((i) => {
            i.updateArea();
        });
        return queriedPanels;
    }

    let loadedString = localStorage.getItem("local-panel-storage");

    if (loadedString == null) {
        console.warn("No stored panels! Initiating base board.");

        const createdPanel: type.Panel = new type.Panel(
            type.Area.INIT,
            type.PanelType.DEFAULT,
            0,
            type.PanelTypeTemplate.DEFAULT
        );

        dashboard?.append(createdPanel);

        return [createdPanel];
    }

    let loadedPanels: type.PanelInstance[] = JSON.parse(loadedString);

    var index = 0;
    const formattedPanels: type.Panel[] = loadedPanels.map(
        (i: type.PanelInstance) => {
            return new type.Panel(
                new type.Area(i.area.pos, i.area.size),
                type.PanelType.getTypeFromId(i.panel_type_id),
                i.panel_id,
                i.content
            );
        }
    );

    dashboard?.append(...formattedPanels);

    return formattedPanels;
}

panels.forEach((i) => {
    initPanel(i);

    i.shadowRoot?.querySelector<HTMLElement>(".drag-handle")?.addEventListener(
        "mousedown",
        (e) => {
            flag = "being-dragged";
            currentPanel = i;
            i.classList.add(flag);

            initPreview(i);

            const initData = {
                eventCoords: {
                    x: e.clientX,
                    y: e.pageY,
                },
                panelPos: {
                    x: i.offsetLeft,
                    y: i.offsetTop,
                },
            };

            dragHandler = (e) => {
                e.preventDefault;
                movePanelWithinScreen(i, e, initData);
                updateElementDestinationPreview(i);
            };

            setDocumentHandlers();
        }
    );

    i.shadowRoot?.querySelector<HTMLElement>(".resize-handle")?.addEventListener(
        "mousedown",
        (e) => {
            flag = "being-resized";
            currentPanel = i;

            i.classList.add(flag);

            initPreview(i);

            const initData = {
                eventCoords: {
                    x: e.clientX,
                    y: e.pageY,
                },
                panelSize: {
                    width: i.offsetWidth,
                    height: i.offsetHeight,
                },
            };

            dragHandler = (e) => {
                e.preventDefault;
                resizePanel(i, e, initData);
                updateElementDestinationPreview(i);
            };

            setDocumentHandlers();
        }
    );
});

document.addEventListener("keydown", async (e) => {
    switch (e.key) {
        case "ArrowDown":
            setCurrentTheme(type.Theme.DEFAULT);
            currentTheme = type.Theme.DEFAULT;
            break;
        case "ArrowUp":
            setCurrentTheme(type.Theme.YELLOW);
            break;

        case "ArrowRight":
            toggleEditMode();
        // case "ArrowLeft":
        //     const result = await fetch(
        //         "https://smorgas-board-backend.vercel.app/"
        //     ).then((res) => res.text());
        //     console.log(result);
        //     if (header != null) header.innerText = result;
    }
});

window.addEventListener("resize", () => {
    panels.forEach((i) => {
        snapElementToGrid(i, i, false);
    });
});

// ~ Function Calls

init();
