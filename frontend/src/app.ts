import * as utils from "./util.js";
import * as type from "./defs.js";
import * as get from "./accessors.js";

import {
    resizePanel,
    movePanelWithinScreen,
    snapElementToGrid,
    snapElementToTarget,
    rotateElement,
} from "./manip.js";

export const dashboard = document.querySelector("#dashboard");
export var panels : type.Panel[] = loadStoredPanels();
export var releaseHandler, dragHandler, currentTheme: type.Theme;
const header = document.querySelector<HTMLElement>("#result");

function toggleEditMode() {
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

function updateElementDestinationPreview(el) {
    snapElementToGrid(el.parentElement.querySelector(".final-preview"), el);
}

function addPanelHoverListeners(panel) {
    panel.addEventListener("mousemove", panelHoverHandler);
    panel.addEventListener("mouseleave", resetPanelHoverHandler);
    panel.addEventListener("mouseenter", enterPanelHoverHandler);
}

function removePanelHoverListeners(panel) {
    panel.removeEventListener("mouseenter", enterPanelHoverHandler);
    panel.removeEventListener("mousemove", panelHoverHandler);
    panel.dispatchEvent(new Event("mouseleave"));
    panel.removeEventListener("mouseleave", resetPanelHoverHandler);
}

function init(): void {
    for (var i = 0; i < get.dashboardRows() * get.dashboardCols(); i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        dashboard?.prepend(cell);
    }
}

function initPanel(panel: type.Panel) {
    // panel.setArea(
    //     new type.Area(
    //         {
    //             x: 0,
    //             y: 0,
    //         },
    //         {
    //             width: get.normalisedCssPropertyValue(panel, "--min-width"),
    //             height: get.normalisedCssPropertyValue(panel, "--min-height"),
    //         }
    //     )
    // );

    panel.updateArea();

    panel.updateContent();

    panel.setType(new type.PanelType(0));

    // addPanelHoverListeners(panel);
}

function initPreview(i: type.Panel, preview: type.Panel) {
    preview.dataset.callerId = i.dataset.panelId;
    i.parentElement?.prepend(preview);

    preview.classList.add("appearing");
    updateElementDestinationPreview(i);

    setTimeout(() => {
        preview.classList.remove("appearing");
    }, get.normalisedCssPropertyValue(preview, "transition-duration"));
}

function updateStoredPanels() {
    var panelStorage : type.PanelInstance[] = panels.map((i) : type.PanelInstance  => {
        return {
            panel_id: parseInt(i.dataset.panelId ? i.dataset.panelId : "0"),
            panel_type_id: i.getType().getId(),
            area: i.getArea().toJson(),
            content: i.getContent()
        }
        
    });

    localStorage.setItem("local-panel-storage", JSON.stringify(panelStorage));

}

function loadStoredPanels() : type.Panel[] {

    let queriedPanels : type.Panel[] = [...document.querySelectorAll<type.Panel>("panel-element")];

    if (queriedPanels.length != 0) {
        console.warn("Panels in body found. Failed to load panels from storage");
        return queriedPanels;
    }

    let loadedString = localStorage.getItem("local-panel-storage");
    if (loadedString == null) {
        console.warn("No stored panels! Initiating base board.");
        return [new type.Panel(
            type.Area.INIT,
            new type.PanelType(0),
            0,
            type.PanelContent.DEFAULT
        )];
    }

    let loadedPanels : type.PanelInstance[] = JSON.parse(loadedString);

    var index = 0;
    const formattedPanels: type.Panel[] = loadedPanels.map(
        (i: type.PanelInstance) => {
            return new type.Panel(
                new type.Area(
                    {
                        x: i.area.pos.x,
                        y: i.area.pos.y
                    },
                    {
                        width: i.area.size.width,
                        height: i.area.size.height
                    }
                ),
                new type.PanelType(i.panel_type_id),
                index++,
                i.content
            );
        }
    );

    dashboard?.append(...formattedPanels);

    return formattedPanels;
}

function commonReleaseHandler(i, preview) {
    snapElementToTarget(i, preview);
    preview.classList.add("disappearing");

    updateStoredPanels();

    setTimeout(() => {
        preview.classList.remove("disappearing");
        i.parentElement.removeChild(preview);
    }, get.normalisedCssPropertyValue(preview, "transition-duration"));

    document.removeEventListener("mouseup", releaseHandler);
    document.removeEventListener("mousemove", dragHandler);
}

function setDocumentHandlers() {
    document.addEventListener("mousemove", dragHandler);
    document.addEventListener("mouseup", releaseHandler);
}

panels.forEach((i) => {
    initPanel(i);

    console.log(i.getArea());

    const preview: type.Panel = new type.Panel(
        i.getArea(),
        new type.PanelType(-1),
        -1
    );

    preview.classList.add("final-preview");

    i.addEventListener("hover", (e) => {
        e.stopImmediatePropagation();
    });

    i.querySelector<HTMLElement>(".drag-handle")?.addEventListener(
        "mousedown",
        (e) => {
            i.classList.add("being-dragged");

            initPreview(i, preview);

            const initData = {
                eventCoords: {
                    x: e.pageX,
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

            releaseHandler = (e) => {
                i.classList.remove("being-dragged");
                commonReleaseHandler(i, preview);
            };

            setDocumentHandlers();
        }
    );

    i.querySelector<HTMLElement>(".resize-handle")?.addEventListener(
        "mousedown",
        (e) => {
            i.classList.add("being-resized");

            initPreview(i, preview);

            const initData = {
                eventCoords: {
                    x: e.pageX,
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

            releaseHandler = (e) => {
                i.classList.remove("being-resized");
                commonReleaseHandler(i, preview);
            };

            setDocumentHandlers();
        }
    );
});

document.addEventListener("keydown", async (e) => {
    switch (e.key) {
        case "ArrowDown":
            utils.setCurrentTheme(type.Theme.DEFAULT);
            currentTheme = type.Theme.DEFAULT;
            break;
        case "ArrowUp":
            utils.setCurrentTheme(type.Theme.YELLOW);
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

function panelHoverHandler(e) {
    e.stopPropagation();
    if (
        !e.currentTarget
            .querySelector(".panel-body")
            .classList.contains("moving")
    ) {
        rotateElement(e, e.currentTarget);
    }
}

function resetPanelHoverHandler(e) {
    e.target.style.setProperty("--rotate-x", 0 + "deg");
    e.target.style.setProperty("--rotate-y", 0 + "deg");
    e.target.style.setProperty("--shadow-offset-x", 0 + "rem");
    e.target.style.setProperty("--shadow-offset-y", 0 + "rem");

    const panel = e.currentTarget.querySelector(".panel-body");
    panel.classList.remove("in-motion");
    e.currentTarget.classList.remove("hovering");
}

function enterPanelHoverHandler(e) {
    const target = e.currentTarget;
    const panel = target.querySelector(".panel-body");
    if (!panel.classList.contains("moving")) {
        target.classList.add("hovering");
        setTimeout(() => {
            if (target.classList.contains("hovering")) {
                panel.classList.add("in-motion");
            }
        }, get.normalisedCssPropertyValue(panel, "transition-duration"));
    }
}

// ~ Function Calls

init();
