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

function getNumericalValueOfCssProperty(el, property) {
    return getNumericalValue(getCssProperty(el, property));
}