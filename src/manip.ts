import * as type from "./defs.js"
import * as utils from "./util.js"
import * as get from "./accessors.js"
import { releaseHandler, dragHandler, panels } from "./app.js";


var x, y, width, height, potentialX, potentialY, potentialWidth, potentialHeight;

function moveElementWithinScreen(el, e, initData) : void {
    
    el.style.setProperty("--x", utils.clamp(initData.panelPos.x + (e.pageX - initData.eventCoords.x), 0, window.innerWidth - el.offsetWidth) + "px");
    el.style.setProperty("--y", utils.clamp(initData.panelPos.y + (e.pageY - initData.eventCoords.y), 0, window.innerHeight - el.offsetHeight) + "px");
}

function resizeElement(el : HTMLElement, e, initData) : void {

    el.style.setProperty("--width", utils.clamp(initData.panelSize.width + e.pageX - initData.eventCoords.x, get.normalisedCssPropertyValue(el, "--min-width") - 10, window.innerWidth - el.offsetLeft) + "px");
    el.style.setProperty("--height", utils.clamp(initData.panelSize.height + e.pageY - initData.eventCoords.y, get.normalisedCssPropertyValue(el, "--min-height") - 10, window.innerHeight - el.offsetTop) + "px");

}

function setItemArea(el: HTMLElement, area: type.Area): void {
    el.style.setProperty("--x", area.x + "px");
    el.style.setProperty("--y", area.y + "px");

    el.style.setProperty("--width", area.width + "px");
    el.style.setProperty("--height", area.height + "px");
}

function snapElementToGrid(el, source = el, shouldAnimate = true) {
    if (shouldAnimate) el.classList.add("snapping");

    const aspectRatio = get.elementAspectRatio(source);

    x = el.offsetLeft;
    y = el.offsetTop;
    width = el.offsetWidth;
    height = el.offsetHeight;

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

    
    potentialX = utils.clamp(utils.roundToNearest(
        get.normalisedCssPropertyValue(source, "--x"),
        window.innerWidth /
            get.cssPropertyValue(document.body, "--num-of-cols")),
        0,
        window.innerWidth
    );
    potentialY = utils.roundToNearest(
        get.normalisedCssPropertyValue(source, "--y"),
        window.innerHeight /
        get.cssPropertyValue(document.body, "--num-of-rows")
    );
    potentialWidth = utils.clamp(
        utils.roundToNearest(
            get.normalisedCssPropertyValue(source, "--width"),
            window.innerWidth /
                get.cssPropertyValue(document.body, "--num-of-cols")
        ),
        get.normalisedCssPropertyValue(source, "--min-width"),
        window.innerWidth - source.offsetLeft
    );
    potentialHeight = utils.clamp(
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

    var potentialRatio = parseFloat(((potentialWidth * get.dashboardCols() / window.innerWidth) /  (potentialHeight * get.dashboardRows() / window.innerHeight)).toFixed(3))

    if (utils.collidesWithAnyPanel(el, potentialArea, panels) || (aspectRatio != 0 && potentialRatio != aspectRatio)) {
        setItemArea(el, originalArea);
    } else setItemArea(el, potentialArea);

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

export {
    moveElementWithinScreen,
    resizeElement,
    setItemArea,
    snapElementToGrid,
    snapElementToTarget
}