import * as type from "./defs.js";
import * as get from "./accessors.js"


function ignoreEventHandler(e) : void {
    e.stopPropagation();
}

function clamp(num : number, min : number, max : number) : number {
    return Math.min(Math.max(num, min), max);
}

function roundToNearest(num : number, stepSize : number) : number {
    let diminished = num / stepSize;
    diminished = Math.round(diminished);
    diminished *= stepSize;
    return diminished;
}

function areaCollisionWithElement(area : type.Area, el) : boolean {
    return !(
        ((area.y + area.height) < (el.offsetTop + 10)) ||
        (area.y >= (el.offsetTop + el.offsetHeight)) ||
        ((area.x + area.width) < (el.offsetLeft)) ||
        (area.x > (el.offsetLeft + el.offsetWidth - 10))
    );
}

function collidesWithAnyPanel(self : HTMLElement, area : type.Area, panels) : boolean {
    
    var flag = false;
    
    panels.forEach(i => {
        if (i.dataset.panelId != self.dataset.callerId && areaCollisionWithElement(area, i)) {
            flag = true;  
        }
    });

    return flag;
}

function moveElementWithinScreen(el, e, initData) : void {
    
    el.style.setProperty("--x", clamp(initData.panelPos.x + (e.pageX - initData.eventCoords.x), 0, window.innerWidth - el.offsetWidth) + "px");
    el.style.setProperty("--y", clamp(initData.panelPos.y + (e.pageY - initData.eventCoords.y), 0, window.innerHeight - el.offsetHeight) + "px");
}

function resizeElement(el : HTMLElement, e, initData) : void {

    el.style.setProperty("--width", clamp(initData.panelSize.width + e.pageX - initData.eventCoords.x, get.normalisedCssPropertyValue(el, "--min-width") - 10, window.innerWidth - el.offsetLeft) + "px");
    el.style.setProperty("--height", clamp(initData.panelSize.height + e.pageY - initData.eventCoords.y, get.normalisedCssPropertyValue(el, "--min-height") - 10, window.innerHeight - el.offsetTop) + "px");

}

function setItemArea(el: HTMLElement, area: type.Area): void {
    el.style.setProperty("--x", area.x + "px");
    el.style.setProperty("--y", area.y + "px");

    el.style.setProperty("--width", area.width + "px");
    el.style.setProperty("--height", area.height + "px");
}

export {
    ignoreEventHandler,
    clamp,
    roundToNearest,
    collidesWithAnyPanel,
    moveElementWithinScreen,
    resizeElement,
    setItemArea
}