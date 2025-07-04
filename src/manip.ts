import * as type from "./defs.js"
import * as utils from "./util.js"
import * as get from "./accessors.js"

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

export {
    moveElementWithinScreen,
    resizeElement,
    setItemArea
}