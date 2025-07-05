import * as utils from "./util.js";
import * as type from "./defs.js";
import * as get from "./accessors.js"

import { resizeElement, moveElementWithinScreen, setItemArea, snapElementToGrid, snapElementToTarget, rotateElement } from "./manip.js";

export const panels = [...document.querySelectorAll<HTMLElement>(".panel")];
export const dashboard = document.querySelector("#dashboard");
export var releaseHandler, dragHandler, currentTheme : type.Theme;

const header = document.querySelector<HTMLElement>("#result");


function toggleEditMode() {
    dashboard?.classList.toggle("in-edit-mode");
    if (dashboard?.classList.contains("in-edit-mode")) panels.forEach(i => {
        removePanelHoverListeners(i);
        console.log("bye bye");
    }); 
    else panels.forEach((i) => {
        addPanelHoverListeners(i);
        console.log("Hellooo");
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
    setTimeout(() => {
        
    }, get.normalisedCssPropertyValue(panel, "transition;duration"));
    panel.removeEventListener("mouseleave", resetPanelHoverHandler);
}

function init() : void {
    const dashboard = document.querySelector<HTMLElement>("#dashboard");
    for (var i = 0; i < (get.dashboardRows() * get.dashboardCols()); i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        dashboard?.prepend(cell);
    }
}

function initPanel(panel) {
    panel.style.setProperty("--x", "0px");
    panel.style.setProperty("--y", "0px");
    panel.style.setProperty(
        "--width",
        get.normalisedCssPropertyValue(panel, "--min-width") + "px"
    );
    panel.style.setProperty(
        "--height",
        get.normalisedCssPropertyValue(panel, "--min-height") + "px"
    );
    addPanelHoverListeners(panel);
}

function initPreview(i, preview) {
    preview.dataset.callerId = i.dataset.panelId;
    i.parentElement.prepend(preview);
    updateElementDestinationPreview(i);
}

function commonReleaseHandler(i, preview) {
    document.removeEventListener("mouseup", releaseHandler);
    document.removeEventListener("mousemove", dragHandler);
    snapElementToTarget(i, preview);
    preview.classList.add("disappearing");
    preview.style.width;
    setTimeout(() => {
        i.parentElement.removeChild(preview);
    }, get.normalisedCssPropertyValue(preview, "transition-duration"));
}

panels.forEach((i) => {
    initPanel(i);

    const preview = document.createElement("div");
    preview.classList.add("final-preview");

    i.addEventListener(
        "hover",
        (e) => {
            e.stopImmediatePropagation();
        }
    );

    i.querySelector<HTMLElement>(".drag-handle")?.addEventListener(
        "mousedown",
        (e) => {
            i.classList.add("being-dragged");
            initPreview(i, preview);

            const initData = {
                eventCoords : {
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
                moveElementWithinScreen(i, e, initData);
                updateElementDestinationPreview(i);
            };

            releaseHandler = (e) => {
                i.classList.remove("being-dragged");
                commonReleaseHandler(i, preview);
            };

            document.addEventListener("mousemove", dragHandler);
            document.addEventListener("mouseup", releaseHandler);
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
                    y: e.pageY
                },
                panelSize: {
                    width: i.offsetWidth,
                    height: i.offsetHeight
                },
            };

            dragHandler = (e) => {
                e.preventDefault;
                resizeElement(i, e, initData);
                updateElementDestinationPreview(i);
            };

            releaseHandler = (e) => {
                i.classList.remove("being-resized");
                commonReleaseHandler(i, preview);
            };

            document.addEventListener("mouseup", releaseHandler);

            document.addEventListener("mousemove", dragHandler);
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
})

window.addEventListener("resize", () => {
    panels.forEach((i) => {
        snapElementToGrid(i, i, false);
    });
});

function panelHoverHandler(e) {
    e.stopPropagation();
    if (!e.currentTarget.querySelector(".panel-body").classList.contains("moving")) {
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
    if (utils.isEditing()) return;

    // console.log("Entered");
    const target = e.currentTarget;
    const panel = target.querySelector(".panel-body");
    if (!panel.classList.contains("moving")) {
        target.classList.add("hovering");
        setTimeout(() => {
            if (target.classList.contains("hovering")) {
                panel.classList.add("in-motion");
            }
        }, 300);
    }
    // console.log(panel);
}







// ~ Function Calls

init();