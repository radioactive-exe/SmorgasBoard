function numericalValue(string: string): number {
    return parseFloat(string.replace(/\D+$/g, ""));
}

function cssProperty(el: HTMLElement, property: string): string {
    return window.getComputedStyle(el).getPropertyValue(property);
}

function cssPropertyValue(el: HTMLElement, property: string): number {
    return numericalValue(cssProperty(el, property));
}

function normalisedValue(input: string): number {
    // INFO: This is separate so we can call this manually if we need to

    if (input == "0") return 0; // No unit is often specified with 0

    const temp = /[a-zA-Z]+/.exec(input);
    const propertyUnit = temp ? temp[0] : "";

    switch (propertyUnit) {
        case "rem":
            return numericalValue(input) * 10;
        case "px":
            return numericalValue(input);
        case "s":
            return numericalValue(input) * 1000;
        case "ms":
            return numericalValue(input);
        default:
            return numericalValue(input);
    }

    return 1;
}

function normalisedCssPropertyValue(el: HTMLElement, property: string): number {
    return normalisedValue(cssProperty(el, property));
}

function elementAspectRatio(el: HTMLElement): number {
    const string = cssProperty(el, "--forced-aspect-ratio");
    if (string == "") {
        return 0;
    }
    const split: string[] = string.split(":");

    return parseInt(split[0]) / parseInt(split[1]);
}

export {
    cssProperty,
    cssPropertyValue,
    elementAspectRatio,
    normalisedCssPropertyValue,
    normalisedValue,
};
