/**
 * This file contains utility math functions used throughout Smorgasboard.
 *
 * @remarks
 * Any functions, tools, etc. that involve mathematical operations/offer quick
 * mathematical conversions will be here.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import type { Size } from "../classes/area";

/**
 * Clamps an input number between two bounds.
 *
 * @param   num - The input number to clamp.
 * @param   min - The lower bound to clamp with.
 * @param   max - The upper bound to clamp with.
 *
 * @returns     The clamped result, either the number itself if it is between
 *   bounds, or one of the bounds if the number exceeds them in either
 *   direction.
 *
 * @example
 *
 * ```ts
 * console.log(clamp(12, 10, 15)); // => Outputs 12
 * console.log(clamp(12, 15, 20)); // => Outputs 15
 * console.log(clamp(12, 5, 10)); // => Outputs 10
 * ```
 */
function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

/**
 * Snaps an input number to the closest multiple of the inputted step number.
 *
 * @remarks
 * This behaviour is akin to regular numerical rounding on a larger scale. This
 * function was utilised in the snapping on the grid before the Area's absolute
 * handling was implemented. However, it will remain as it could be reused
 * somewhere else.
 *
 * @param   num      - The input number we want to snap/round up/down.
 * @param   stepSize - The step size, which is the number whose multiples we are
 *   rounding to.
 *
 * @returns          The rounded number to the inputted step size.
 *
 * @example
 *
 * ```ts
 * console.log(roundToNearest(131, 20)); // => Outputs 140
 * ```
 *
 * The above rounds to the nearest 20.
 *
 * @example
 *
 * ```ts
 * console.log(roundToNearest(1.7, 1)); // => Outputs 2
 * ```
 *
 * Rounding to the nearest 1 behaves identically to regular mathematical
 * rounding.
 */
function roundToNearest(num: number, stepSize: number): number {
    let converted = num / stepSize;
    converted = Math.round(converted);
    converted *= stepSize;
    return converted;
}

/**
 * Finds the greatest common divisor/factor of 2 input numbers.
 *
 * @param   a - The first number.
 * @param   b - The second number.
 *
 * @returns   The found GCD of the 2 input numbers.
 *
 * @example
 *
 * ```ts
 * console.log(gcd(6, 15)); // => Outputs 3
 * console.log(gcd(4, 12)); // => Outputs 4
 * console.log(gcd(9, 8)); // => Outputs 1, as there are no other common factors
 * ```
 */
function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

/**
 * Gets the simplified aspect ratio of a given size.
 *
 * @remarks
 * This converts the inputted dimensions into a simplified aspect ratio.
 *
 * @param   dimensions - The size to simplify.
 *
 * @returns            The aspect ratio of the inputted dimensions.
 *
 * @example
 *
 * ```ts
 * console.log(getAspectRatio({width: 2, height: 4}));
 * // => Outputs a size of {width: 1, height: 2}
 * ```
 *
 * @see {@link gcd | gcd()}
 */
function getAspectRatio(dimensions: Size): Size {
    if (dimensions.width <= 0 || dimensions.height <= 0) {
        return { width: 0, height: 0 };
    }

    const commonDivisor = gcd(dimensions.width, dimensions.height);
    const ratioWidth = dimensions.width / commonDivisor;
    const ratioHeight = dimensions.height / commonDivisor;

    return {
        width: ratioWidth,
        height: ratioHeight,
    };
}

export { clamp, getAspectRatio, roundToNearest };
