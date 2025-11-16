/**
 * This file contains all the functions that relate to getting properties and
 * attributes.
 *
 * @remarks
 * This involves direct property accessing, extracting from strings, and
 * normalising any obtained values numerically.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

/**
 * Extracts the numerical value/content of a string using Regex.
 *
 * @param   string - The input string to extract the numbers from.
 *
 * @returns        The extracted and parsed number.
 *
 * @example
 *
 * ```ts
 * console.log(numericalValue("123.45sec/km")); // => Outputs 123.45
 * ```
 *
 * @see Functions that utilise this one:
 * @see {@link cssPropertyValue | cssPropertyValue()}
 * @see {@link normalisedValue| normalisedValue()}
 */
function numericalValue(string: string): number {
    return parseFloat(string.replace(/\D+$/g, ""));
}

/**
 * Gets the normal un-altered string value of a CSS property of an element.
 *
 * @param   el       - The element whose property we are getting.
 * @param   property - The string property we are getting.
 *
 * @returns          The value of the property from the computed style of the
 *   input element.
 *
 * @example
 *
 * ```css
 * .panel {
 *      transition-duration: 0.2s;
 * }
 * ```
 *
 * Given the above style, calling the function as below will output the
 * following:
 *
 * ```ts
 * const panel: HTMLElement = document.querySelector(".panel") as HTMLElement;
 * console.log(cssProperty(panel, "transition-duration")); // => Outputs "0.2s" as a string
 * ```
 *
 * @see {@link cssPropertyValue | cssPropertyValue()}
 * @see {@link numericalValue | numericalValue()}
 * @see {@link normalisedCssPropertyValue | normalisedCssPropertyValue()}
 */
function cssProperty(el: HTMLElement, property: string): string {
    return window.getComputedStyle(el).getPropertyValue(property);
}

/**
 * Gets the numerical value of the CSS property of an element directly.
 *
 * @param   el       - The element whose property we are getting.
 * @param   property - The target property.
 *
 * @returns          The extracted and parsed value of the CSS property of the
 *   element as a number.
 *
 * @example
 *
 * ```css
 * .panel {
 *      transition-duration: 0.2s;
 * }
 * ```
 *
 * Given the above style, calling the function as below will output the
 * following:
 *
 * ```ts
 * const panel: HTMLElement = document.querySelector(".panel") as HTMLElement;
 * console.log(cssPropertyValue(panel, "transition-duration")); // => Outputs 0.2 as a number
 * ```
 *
 * @see {@link cssProperty | cssProperty()} , the function to obtain the CSS property as a string
 * @see {@link numericalValue | numericalValue()} , the function that extracts and parses the number in a string
 */
function cssPropertyValue(el: HTMLElement, property: string): number {
    return numericalValue(cssProperty(el, property));
}

/**
 * Extracts and returns the normalised value of a string.
 *
 * @remarks
 * This normalises length/size units into pixels, and timing units into
 * milliseconds.
 *
 * @param   input - The string to parse, extract, and normalise the value of.
 *
 * @returns       The normalised number in pixels/milliseconds/etc from the
 *   input string.
 *
 * @example
 *
 * ```ts
 * console.log(normalisedValue("0.2s")); // => Outputs 200 as a number
 * ```
 *
 * @see {@link normalisedCssPropertyValue | normalisedCssPropertyValue()} , the function that uses this one to parse and normalise the numerical value of a CSS property.
 */
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
}

/**
 * Gets and normalises the CSS property of an element.
 *
 * @param   el       - The element to extract and normalise the property from.
 * @param   property - The target property to extract and normalise.
 *
 * @returns          The extracted and normalised numerical value of the CSS
 *   property.
 *
 * @example
 *
 * ```css
 * .panel {
 *      transition-duration: 0.2s;
 * }
 * ```
 *
 * Given the above style, calling the function as below will output the
 * following:
 *
 * ```ts
 * const panel: HTMLElement = document.querySelector(".panel") as HTMLElement;
 * console.log(normalisedCssPropertyValue(panel, "transition-duration")); // => Outputs 200 as a number
 * ```
 *
 * @see {@link cssProperty | cssProperty()} , the function to obtain the CSS property as a string
 * @see {@link normalisedValue | normalisedValue()} , the main function used in this one
 */
function normalisedCssPropertyValue(el: HTMLElement, property: string): number {
    return normalisedValue(cssProperty(el, property));
}

export {
    cssProperty,
    cssPropertyValue,
    normalisedCssPropertyValue,
    normalisedValue,
    numericalValue,
};
