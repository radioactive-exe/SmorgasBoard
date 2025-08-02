function numericalValue(string: string): number {
    return parseFloat(string.replace(/\D+$/g, ""));
}

function cssProperty(el: HTMLElement, property: string): string {
    return window.getComputedStyle(el).getPropertyValue(property);
}

function cssPropertyValue(el: HTMLElement, property: string): number {
    return numericalValue(cssProperty(el, property));
}

function normalisedValue(input: string, property: string): number {
    // INFO: This is separate so we can call this manually if we need to, and pass by "width" or "height" simply to give the function a flag to show which axis we need to get the fractional dimensions in

    if (input == "0") return 0; // No unit is often specified with 0

    const temp = /[a-zA-Z]+/.exec(input);
    const propertyUnit = temp ? temp[0] : "";

    switch (propertyUnit) {
        case "rem":
            return numericalValue(input) * 10;
            break;
        case "px":
            return numericalValue(input);
            break;
        case "s":
            return numericalValue(input) * 1000;
            break;
        case "ms":
            return numericalValue(input);
            break;
        case "fr":
            if (property.toLowerCase().includes("width"))
                return numericalValue(input) * fractionalWidth();
            else if (property.toLowerCase().includes("height"))
                return numericalValue(input) * fractionalHeight();
            break;
        default:
            return numericalValue(input);
    }

    return 1;
}

function normalisedCssPropertyValue(el: HTMLElement, property: string): number {
    return normalisedValue(cssProperty(el, property), property);
}

function elementAspectRatio(el: HTMLElement): number {
    const string = cssProperty(el, "--forced-aspect-ratio");
    if (string == "") {
        return 0;
    }
    const split: string[] = string.split(":");
    
    return parseInt(split[0]) / parseInt(split[1]);
}

function dashboardRows(): number {
    return cssPropertyValue(document.body, "--num-of-rows");
}

function dashboardCols(): number {
    return cssPropertyValue(document.body, "--num-of-cols");
}

function fractionalWidth(): number {
    return window.innerWidth / dashboardCols();
}

function fractionalHeight(): number {
    return window.innerHeight / dashboardRows();
}

export {
    cssProperty,
    cssPropertyValue,
    normalisedValue,
    normalisedCssPropertyValue,
    dashboardRows,
    dashboardCols,
    fractionalWidth,
    fractionalHeight,
    elementAspectRatio,
};
