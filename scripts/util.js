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

    const propertyUnit = /[a-zA-Z]+/.exec(getCssProperty(el, property))[0];

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

function areaCollisionWithElement(area, el) {
    return !(
        ((area[1] + area[3]) <= (el.offsetTop) + 10) ||
        (area[1] >= (el.offsetTop + el.offsetHeight)) ||
        ((area[0] + area[2]) <= (el.offsetLeft)) ||
        (area[0] >= (el.offsetLeft + el.offsetWidth) - 10)
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

function moveElementWithinScreen(el, e, eventCoordsInit, elPosInit) {
    
    var [xInit, yInit] = eventCoordsInit;
    var [elLeftInit, elTopInit] = elPosInit;

    el.style.setProperty("--x", clamp(elLeftInit + (e.pageX - xInit), 0, window.innerWidth - el.offsetWidth) + "px");
    el.style.setProperty("--y", clamp(elTopInit + (e.pageY - yInit), 0, window.innerHeight - el.offsetHeight) + "px");
}

function resizeElement(el, e, eventCoordsInit, elSizeInit) {
    
    var [xInit, yInit] = eventCoordsInit;
    var [elWidthInit, elHeightInit] = elSizeInit;

    el.style.setProperty("--width", clamp(elWidthInit + e.pageX - xInit, getNormalisedCssPropertyValue(el, "--min-width") - 10, window.innerWidth - el.offsetLeft) + "px");
    el.style.setProperty("--height", clamp(elHeightInit + e.pageY - yInit, getNormalisedCssPropertyValue(el, "--min-height") - 10, window.innerHeight - el.offsetTop) + "px");
}

function setItemArea(el, area) {

    el.style.setProperty("--x", area[0] + "px");
    el.style.setProperty("--y", area[1] + "px");

    el.style.setProperty("--width", area[2] + "px");
    el.style.setProperty("--height", area[3] + "px");

}