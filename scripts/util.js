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
        default:
            return getCssPropertyValue(el, property);

    }
}