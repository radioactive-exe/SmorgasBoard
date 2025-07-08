import * as type from "./defs.js"

function numericalValue(string): number {
    return string.replace(/\D+$/g, "");
}

function cssProperty(el, property): string {
    return window.getComputedStyle(el).getPropertyValue(property);
}
function cssPropertyValue(el, property): number {
    return numericalValue(cssProperty(el, property));
}

function normalisedCssPropertyValue(el, property): number {
    if (cssProperty(el, property) == "0") return 0; // No unit is often specified with 0

    const temp = /[a-zA-Z]+/.exec(cssProperty(el, property));
    const propertyUnit = temp ? temp[0] : "";

    switch (propertyUnit) {
        case "rem":
            return cssPropertyValue(el, property) * 10;
            break;
        case "px":
            return cssPropertyValue(el, property);
            break;
        case "s":
            return cssPropertyValue(el, property) * 1000;
            break;
        case "ms":
            return cssPropertyValue(el, property);
            break;
        case "fr":
            if (property.toLowerCase().includes("width"))
                return (
                    (cssPropertyValue(el, property) * window.innerWidth) /
                    dashboardCols()
                );
            else if (property.toLowerCase().includes("height"))
                return (
                    (cssPropertyValue(el, property) * window.innerHeight) /
                    dashboardRows()
                );
            break;
        default:
            return cssPropertyValue(el, property);
    }

    return 1;
}

function elementAspectRatio(el: HTMLElement): number {
    var string = cssProperty(el, "--forced-aspect-ratio");
    if (string == "") {
        return 0;
    }
    var split = string.split(":");

    return parseInt(split[0]) / parseInt(split[1]);
}

function dashboardRows(): number {
    return cssPropertyValue(document.body, "--num-of-rows");
}

function dashboardCols(): number {
    return cssPropertyValue(document.body, "--num-of-cols");
}

export {
    cssProperty,
    cssPropertyValue,
    normalisedCssPropertyValue,
    dashboardRows,
    dashboardCols,
    elementAspectRatio
};
