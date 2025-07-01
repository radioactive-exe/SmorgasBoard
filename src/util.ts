import * as type from "./defs.js";

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function getCssProperty(el, property) {
    return window.getComputedStyle(el).getPropertyValue(property);
}

function roundToNearest(num, stepSize) {
    let diminished = num / stepSize;
    diminished = Math.round(diminished);
    diminished *= stepSize;
    return diminished;
}

function getNumericalValue(string) {
    return string.replace(/\D+$/g, "")
}

function getCssPropertyValue(el, property) {
    return getNumericalValue(getCssProperty(el, property));
}

function getNormalisedCssPropertyValue(el, property) {

    if (getCssProperty(el, property) == "0") return 0; // No unit is often specified with 0

    const temp = /[a-zA-Z]+/.exec(getCssProperty(el, property))
    const propertyUnit = temp ? temp[0] : "";

    switch (propertyUnit) {
        case "rem":
            return getCssPropertyValue(el, property) * 10;
            break;
        case "px":
            return getCssPropertyValue(el, property);
            break;
        case "s":
            return getCssPropertyValue(el, property) * 1000;
            break;
        case "ms":
            return getCssPropertyValue(el, property);
            break;
        case "fr":
            if (property.toLowerCase().includes("width")) return getCssPropertyValue(el, property) * (window.innerWidth) / getCssPropertyValue(document.body, "--num-of-cols");
            else if (property.toLowerCase().includes("height")) return getCssPropertyValue(el, property) * (window.innerHeight) / getCssPropertyValue(document.body, "--num-of-rows");
        default:
            return getCssPropertyValue(el, property);

    }
}

function areaCollisionWithElement(area : type.Area, el) {
    return !(
        ((area.x + area.height) <= (el.offsetTop) + 10) ||
        (area.y >= (el.offsetTop + el.offsetHeight)) ||
        ((area.x + area.width) <= (el.offsetLeft)) ||
        (area.x >= (el.offsetLeft + el.offsetWidth) - 10)
    );
}

function collidesWithAnyPanel(self, area, panels) {
    
    var flag = false;
    
    panels.forEach(i => {
        if (i.dataset.panelId != self.dataset.callerId && areaCollisionWithElement(area, i)) {
            flag = true;  
        }
    });

    return flag;
}

function moveElementWithinScreen(el, e, initData) {
    
    el.style.setProperty("--x", clamp(initData.panelPos.x + (e.pageX - initData.eventCoords.x), 0, window.innerWidth - el.offsetWidth) + "px");
    el.style.setProperty("--y", clamp(initData.panelPos.y + (e.pageY - initData.eventCoords.y), 0, window.innerHeight - el.offsetHeight) + "px");
}

function resizeElement(el, e, initData) {

    el.style.setProperty("--width", clamp(initData.panelSize.width + e.pageX - initData.eventCoords.x, getNormalisedCssPropertyValue(el, "--min-width") - 10, window.innerWidth - el.offsetLeft) + "px");
    el.style.setProperty("--height", clamp(initData.panelSize.height + e.pageY - initData.eventCoords.y, getNormalisedCssPropertyValue(el, "--min-height") - 10, window.innerHeight - el.offsetTop) + "px");
}

function setItemArea(el, area : type.Area) {

    el.style.setProperty("--x", area.x + "px");
    el.style.setProperty("--y", area.y + "px");

    el.style.setProperty("--width", area.width + "px");
    el.style.setProperty("--height", area.height + "px");

}

export {
    clamp,
    getCssProperty,
    roundToNearest,
    getCssPropertyValue,
    getNormalisedCssPropertyValue,
    collidesWithAnyPanel,
    moveElementWithinScreen,
    resizeElement,
    setItemArea
}