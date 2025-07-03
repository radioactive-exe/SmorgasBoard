import * as utils from "./util.js";
import * as type from "./defs.js";
import * as get from "./accessors.js"

const panels = [...document.querySelectorAll<HTMLElement>(".panel")];
var releaseHandler, dragHandler;

function snapElementToGrid(el, source = el, shouldAnimate = true) {
    if (shouldAnimate) el.classList.add("snapping");

    var x = el.offsetLeft;
    var y = el.offsetTop;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var originalArea : type.Area = {
        x: utils.roundToNearest(
            x,
            window.innerWidth /
                get.cssPropertyValue(document.body, "--num-of-cols")
        ),
        y: utils.roundToNearest(
            y,
            window.innerHeight /
                get.cssPropertyValue(document.body, "--num-of-rows")
        ),
        width: utils.roundToNearest(
            width,
            window.innerWidth /
                get.cssPropertyValue(document.body, "--num-of-cols")
        ),
        height: utils.roundToNearest(
            height,
            window.innerHeight /
                get.cssPropertyValue(document.body, "--num-of-rows")
        ),
    };

    var potentialX = utils.roundToNearest(
        get.normalisedCssPropertyValue(source, "--x"),
        window.innerWidth /
            get.cssPropertyValue(document.body, "--num-of-cols")
    );
    var potentialY = utils.roundToNearest(
        get.normalisedCssPropertyValue(source, "--y"),
        window.innerHeight /
            get.cssPropertyValue(document.body, "--num-of-rows")
    );
    var potentialWidth = utils.clamp(
        utils.roundToNearest(
            get.normalisedCssPropertyValue(source, "--width"),
            window.innerWidth /
                get.cssPropertyValue(document.body, "--num-of-cols")
        ),
        get.normalisedCssPropertyValue(source, "--min-width"),
        window.innerWidth - source.offsetLeft
    );
    var potentialHeight = utils.clamp(
        utils.roundToNearest(
            get.normalisedCssPropertyValue(source, "--height"),
            window.innerHeight /
                get.cssPropertyValue(document.body, "--num-of-rows")
        ),
        get.normalisedCssPropertyValue(source, "--min-height"),
        window.innerHeight - source.offsetTop
    );

    var potentialArea: type.Area = {
        x: potentialX,
        y: potentialY,
        width: potentialWidth,
        height: potentialHeight,
    };

    if (utils.collidesWithAnyPanel(el, potentialArea, panels)) {
        utils.setItemArea(el, originalArea);
    } else utils.setItemArea(el, potentialArea);

    setTimeout(() => {
        el.classList.remove("snapping");
    }, get.normalisedCssPropertyValue(el, "transition-duration"));
}

function snapElementToTarget(el, target) {
    el.classList.add("snapping");

    el.style.setProperty("--x", get.cssProperty(target, "--x"));
    el.style.setProperty("--y", get.cssProperty(target, "--y"));
    el.style.setProperty("--width", get.cssProperty(target, "--width"));
    el.style.setProperty("--height", get.cssProperty(target, "--height"));

    setTimeout(() => {
        el.classList.remove("snapping");
    }, get.normalisedCssPropertyValue(el, "transition-duration"));
}

function updateElementDestinationPreview(el) {
    snapElementToGrid(el.parentElement.querySelector(".final-preview"), el);
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
    setTimeout(() => {
        i.parentElement.removeChild(preview);
    }, get.normalisedCssPropertyValue(preview, "transition-duration"));
}

panels.forEach((i) => {
    initPanel(i);

    const preview = document.createElement("div");
    preview.classList.add("final-preview");

    i.querySelector<HTMLElement>(".drag-handle")?.addEventListener(
        "hover",
        (e) => {
            e.stopPropagation();
        }
    );

    i.querySelector<HTMLElement>(".drag-handle")?.addEventListener(
        "mousedown",
        (e) => {
            i.classList.add("being-dragged");
            initPreview(i, preview);

            console.log(get.cssProperty(i, "--forced-aspect-ratio"));

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
                utils.moveElementWithinScreen(i, e, initData);
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
                utils.resizeElement(i, e, initData);
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

window.addEventListener("resize", () => {
    panels.forEach((i) => {
        snapElementToGrid(i, i, false);
    });
});

// ~ panel FANCY STUFF

[...document.querySelectorAll(".panel")].forEach((i) => {
    // i.addEventListener("mousemove", panelHoverHandler);
    // i.addEventListener("mouseleave", resetPanelHoverHandler);
    // i.addEventListener("mouseenter", enterPanelHoverHandler);
});

function panelHoverHandler(e) {
    e.stopPropagation();
    if (!e.currentTarget.children.item(1).classList.contains("moving")) {
        rotateElement(e, e.currentTarget);
    }
}

function resetPanelHoverHandler(e) {
    e.target.style.setProperty("--rotate-x", 0 + "deg");
    e.target.style.setProperty("--rotate-y", 0 + "deg");
    e.target.style.setProperty("--shadow-offset-x", 0 + "rem");
    e.target.style.setProperty("--shadow-offset-y", 0 + "rem");
    const panel = e.currentTarget.querySelector(".panel-wrap");
    panel.classList.remove("in-motion");
    e.currentTarget.classList.remove("hovering");
}

function enterPanelHoverHandler(e) {
    e.stopImmediatePropagation();
    const target = e.currentTarget;
    const panel = target.querySelector(".panel-wrap");
    if (!panel.classList.contains("moving")) {
        target.classList.add("hovering");
        setTimeout(() => {
            if (target.classList.contains("hovering")) {
                
                panel.classList.add("in-motion");
            }
        }, 300);
    }
}

function rotateElement(e, elem) {

    if (!elem.classList.contains("hovering")) {
        elem.dispatchEvent(new Event("mouseenter"));
    }

    const x = e.clientX;
    const y = e.clientY;

    var left, top, right, bottom;

    if (elem.classList.contains("focused")) {
        left = -0.5 * window.innerWidth;
        right = window.innerWidth * 1.5;
        top = -0.5 * window.innerHeight;
        bottom = window.innerHeight * 1.5;
    } else {
        const box = elem.getBoundingClientRect();
        left = box.left;
        right = box.right;
        top = box.top;
        bottom = box.bottom;
    }

    let centreX = (left + right) / 2;
    let centreY = (top + bottom) / 2;
    const offsetX = ((x - centreX) / (right - left)) * 60;
    const offsetY = ((y - centreY) / (bottom - top)) * 40;
    const shadowOffsetX = ((x - centreX) / (right - left)) * -8;
    const shadowOffsetY = ((y - centreY) / (top - bottom)) * -6;
    elem.style.setProperty("--rotate-x", offsetY + "deg");
    elem.style.setProperty("--rotate-y", offsetX + "deg");
    elem.style.setProperty("--shadow-offset-x", shadowOffsetX + "rem");
    elem.style.setProperty("--shadow-offset-y", shadowOffsetY + "rem");
}





// ~ Function Calls

init();