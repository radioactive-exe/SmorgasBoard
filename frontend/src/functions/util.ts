/**
 * This file contains miscellaneous utility functions.
 *
 * @remarks
 * Most of these functions are boolean checks, with a few class/DOM utility
 * functions in between.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { dashboard, preview } from "../app.js";
import type { Area, Size } from "../classes/area.js";
import type { ListSelectionOption } from "../classes/config/config_entry.js";
import { Panel } from "../classes/panel/panel.js";

import * as get from "./accessors.js";

let previewDeletionTimeout: NodeJS.Timeout,
    elementDeletionTimeout: NodeJS.Timeout;

/**
 * Checks if an inputted Area collides with a particular HTMLElement.
 *
 * @param   area - The area input we are checking for collision.
 * @param   el   - The HTML Element we are checking for collision with the area.
 *
 * @returns      True if area and element collide. False otherwise.
 *
 * @example
 *
 * Returns `true` if `someConstDivElement` overlaps with the Area at coordinates
 * (3, 1) and with an equal height and width of 2 cells/units.
 *
 * ```ts
 * areaCollisionWithElement(new Area({x: 3, y: 1}, {width: 2, height: 2}), someConstDivElement)
 *
 * ```
 */
function areaCollisionWithElement(area: Area, el: HTMLElement): boolean {
    // * A margin of 10/20 pixels is given because elements will line up side-to-side, and would otherwise
    // * fire off false positives when 2 panels would occupy neighbouring cells.
    const elX = get.normalisedCssPropertyValue(el, "--x");
    const elY = get.normalisedCssPropertyValue(el, "--y");
    const elWidth = get.normalisedCssPropertyValue(el, "--width");
    const elHeight = get.normalisedCssPropertyValue(el, "--height");
    return !(
        area.getAbsoluteY() + area.getAbsoluteHeight() < elY + 10
        || area.getAbsoluteY() >= elY + elHeight - 20
        || area.getAbsoluteX() + area.getAbsoluteWidth() < elX + 10
        || area.getAbsoluteX() > elX + elWidth - 20
    );
}

/**
 * Checks whether an inputted area collides with any panel at all.
 *
 * @param   area - The area we are checking for collision with the dashboard
 *   panels.
 *
 * @returns      Whether the inputted area is free and non-colliding with all
 *   occupying panels in the dashboard.
 *
 * @example
 *
 * `willFit` will be true if any panel overlaps (2, 1) (coordinates) + [1, 3]
 * (size)
 *
 * ```ts
 * const testArea = new Area({x: 2, y: 1}, {width: 1, height: 3});
 * const willFit = collidesWithAnyPanel(testArea);
 * ```
 */
function collidesWithAnyPanel(area: Area): boolean {
    let flag = false;

    // ? Go through all the panels on the dashboard
    dashboard.getPanels().forEach((i: Panel) => {
        // ? If it collides with a panel that is not the panel that
        // ? called/triggered the preview to show, then we have found
        // ? a collision. We ignore the panel that triggered the preview.
        if (
            areaCollisionWithElement(area, i)
            && i.dataset.panelId != preview.dataset.callerId
        ) {
            flag = true;
        }
    });

    return flag;
}

/**
 * Checks if the given panels would fit in the potential layout dimensions.
 *
 * @remarks
 * This is used when we are attempting to switch to new dashboard dimensions.
 * The function is declared with generic terms and uses, because it can be
 * implemented to check for enough space in any scenario.
 *
 * @param   potentialSize - The potential layout size/dimensions we are
 *   attempting to switch to.
 * @param   panels        - The panels we iterate through to check if they fit
 *   within the potential size.
 *
 * @returns               Whether or not all panels would still fit if we switch
 *   to the potential dimensions.
 *
 * @example
 *
 * If any of the dashboard panels would lie fully/partially outside a potential
 * size of 2x2, then `fullyContained` would be false. Otherwise, it would be
 * true
 *
 * ```ts
 * const fullyContained = wouldFit({width: 2, height: 2}, dashboard.getPanels());
 * ```
 */
function wouldFit(potentialSize: Size, panels: Panel[]): boolean {
    let flag = true;
    panels.forEach((panel: Panel) => {
        if (
            panel.getArea().getX() > potentialSize.width
            || panel.getArea().getX() + panel.getArea().getWidth()
                > potentialSize.width
            || panel.getArea().getY() > potentialSize.height
            || panel.getArea().getY() + panel.getArea().getHeight()
                > potentialSize.height
        )
            flag = false;
    });
    return flag;
}

/**
 * Removes a specified class from an element after its transition duration.
 *
 * @param el - The element we want to remove the class from.
 * @param cl - The class we want to remove.
 *
 * @example
 *
 * ```ts
 * RemoveClassAfterTransition(alert, "visible");
 * ```
 *
 * After the transition duration, the class "visible" is removed from the
 * `alert` element.
 */
function removeClassAfterTransition(el: HTMLElement, cl: string): void {
    setTimeout(
        () => {
            el.classList.remove(cl);
        },
        get.normalisedCssPropertyValue(el, "transition-duration"),
    );
}

/**
 * Deletes/removes an element from the DOM after its transition duration.
 *
 * @remarks
 * `parent.removeChild()` is used as opposed to `child.remove()` for IE11 and
 * older browser compatibility.
 *
 * @param el     - The child element to be removed.
 * @param parent - The parent from which the child is being removed.
 *
 * @example
 *
 * ```ts
 * deleteAfterTransition(spawnedAlert, modalLayer);
 * ```
 */
function deleteAfterTransition(
    el: HTMLElement,
    parent: HTMLElement = dashboard,
): void {
    const deletionTimeout = setTimeout(
        () => {
            if (parent.contains(el)) parent.removeChild(el);
        },
        get.normalisedCssPropertyValue(el, "transition-duration"),
    );
    if (el instanceof Panel) previewDeletionTimeout = deletionTimeout;
    else elementDeletionTimeout = deletionTimeout;
}

/**
 * Checks whether a particular config value is valid/part of the possible
 * options.
 *
 * @remarks
 * The possible options are stored in an array of {@link ListSelectionOption}
 * objects, and the potential value is checked against the `optionValue`
 * property of all these options.
 *
 * @param   possibleOptions - The options that are allowed/possible in the given
 *   context.
 * @param   potentialValue  - The potential value we are checking to see if it's
 *   one of the possible options.
 *
 * @returns                 Whether or not this potential value is part of the
 *   possible options, and thus a valid one in the given context.
 *
 * @example
 *
 * ```ts
 * const options = [ { optionLabel: "Option 1", optionValue: "one"}, { optionLabel: "Option 2", optionValue: "two" } ];
 * console.log(isValidOption(options, "one")); // => Outputs true
 * console.log(isValidOption(options, "three")); // => Outputs false
 * ```
 */
function isValidOption(
    possibleOptions: ListSelectionOption[],
    potentialValue: string,
): boolean {
    return possibleOptions.some(
        (op: ListSelectionOption): boolean => potentialValue == op.optionValue,
    );
}

/**
 * Gets the corresponding label for the option with the inputted value.
 *
 * @param   possibleOptions - The list of options we will check for the label.
 * @param   targetValue     - The value whose label we are attempting to fetch
 *   from the possible options.
 *
 * @returns                 The label, if found. If it is not found, the
 *   function returns `null`.
 *
 * @example
 *
 * ```ts
 * const options = [
 *      {
 *          optionLabel: "Option 1",
 *          optionValue: "one"
 *      }, {
 *          optionLabel: "Option 2",
 *      optionValue: "two"
 *      }
 * ];
 *
 * console.log(getOptionLabelFromList(options, "one")); // => Outputs "Option 1"
 * console.log(getOptionLabelFromList(options, "three")); // => Outputs `null`
 * ```
 */
function getOptionLabelFromList(
    possibleOptions: ListSelectionOption[],
    targetValue: string,
): string | null {
    let foundLabel = "";
    possibleOptions.forEach((option: ListSelectionOption) => {
        if (option.optionValue == targetValue) foundLabel = option.optionLabel;
    });

    return foundLabel != "" ? foundLabel : null;
}

/**
 * Deeply compares two arrays of objects or primitives for equal contents.
 *
 * @param   a1 - The first array of objects/primitives.
 * @param   a2 - The second array of objects/primitives.
 *
 * @returns    True if the two arrays contain the same elements and values,
 *   regardless of order, false otherwise.
 *
 * @example
 *
 * ```ts
 * const a1: number[] = [2, 4, 3, 1];
 * const a2: number[] = [1, 4, 3, 2];
 * const a3: number[] = [3, 2, 6];
 *
 * console.log (areEqual(a1, a2)); // => Outputs `true`
 * console.log (areEqual(a1, a3)); // => Outputs `false`
 * ```
 *
 * @example
 *
 * ```ts
 * const ob1 = {
 *     name: "Kyle",
 *     hobbies: ["tennis", "video_games"],
 *     best_friend: { name: "Joe", age: 21 },
 * };
 * const ob2 = {
 *     name: "Kyle",
 *     best_friend: { name: "Joe", age: 21 },
 *     hobbies: ["video_games", "tennis"],
 * };
 * const ob3 = {
 *     name: "Maria",
 *     best_friend: { name: "Ibrahim", age: 24 },
 *     hobbies: ["reading", "baseball"],
 * };
 *
 * console.log(areEqual([ob1, ob2], [ob2, ob1])); // => Outputs `true`
 * console.log(areEqual([ob1, ob2], [ob3, ob1])); // => Outputs `false`
 * ```
 *
 * @see {@link areDeeplyEqual | areDeeplyEqual()}
 */
function areEqualArrays(
    a1: (object | string | number | boolean)[] | undefined,
    a2: (object | string | number | boolean)[] | undefined,
): boolean {
    // ? If either variable is undefined but not both
    if ((!a1 && a2) || (a1 && !a2)) return false;

    // ? If they are both undefined, then technically equal, albeit not very useful
    if (!a1 && !a2) return true;

    // ? If both variables point to the same object in memory, then they are equal
    if (a1 === a2) return true;

    // ? If both arrays have different lengths, immediately return false
    if (a1?.length != a2?.length) return false;

    // ? Otherwise iterate through each entry in each array,
    // ? and check that an identical copy exists in the other (knowing by this point
    // ? that they both have the same number of elements and are not undefined).
    // ! This has to be done twice, once in either direction, as in case the first array has more than one element
    // ! that match the same element in the second array, then there will be one (or more) elements unaccounted
    // ! for in the second array. The alternative is copying the first array and splicing all the found elements,
    // ! but that is more complex, and more expensive due to the continuous splicing and index changes.
    if (a1 && a2) {
        // ? Use a regular for loop as opposed to a forEach loop as this way a flag is not needed
        // ? (due to the `Not all code paths return a value` issue).
        for (const entry of a1) {
            // ? If an identical match cannot be found, then there is a mismatch between the 2 arrays.
            // ? Deeply compare the members to find matches
            if (!a2.some((i) => areDeeplyEqual(entry, i))) return false;
        }
        for (const entry of a2) {
            // ? If an identical match cannot be found, then there is a mismatch between the 2 arrays.
            // ? Deeply compare the members to find matches
            if (!a1.some((i) => areDeeplyEqual(entry, i))) return false;
        }
    }

    // ? If the function reaches this point, there were no mismatches and both entries were
    // ? arrays of identical elements (regardless of order)
    return true;
}

/**
 * Recursively deeply compares objects/variables of any primitive or object
 * type.
 *
 * @remarks
 * If the passed parameters are arrays, the original method to compare arrays is
 * called.
 *
 * @param   obj1 - The first variable/object in the comparison.
 * @param   obj2 - The second variable/object in the comparison.
 *
 * @returns      True whether the objects are deeply equal (have the same
 *   values/properties), and false otherwise.
 *
 * @example
 *
 * ```ts
 * const ob1 = { name: "June", age: 18, hobbies: ["tennis", "reading"] };
 * const ob2 = { name: "June", hobbies: ["tennis", "reading"], age: 18 };
 * const ob3 = { name: "May", age: 21, hobbies: ["puzzles", "science"] };
 *
 * console.log(areDeeplyEqual(ob1, ob2)); // => Outputs `true`
 * console.log(areDeeplyEqual(ob1, ob3)); // => Outputs `false`
 * ```
 *
 * @see {@link areEqualArrays | areEqualArrays()}
 */
function areDeeplyEqual(
    obj1:
        | object
        | string
        | number
        | boolean
        | (object | string | number | boolean)[],
    obj2:
        | object
        | string
        | number
        | boolean
        | (object | string | number | boolean)[],
): boolean {
    // ? If both arguments are both primitive types or point to the same object in memory
    if (obj1 === obj2) return true;

    // ? If both arguments are arrays, then call `areEqualArrays` to do the checking
    if (Array.isArray(obj1) && Array.isArray(obj2))
        return areEqualArrays(obj1, obj2);

    // ? Otherwise, check the following, all of which result in an inequality
    if (
        // ? (1) If they do not have the same type (primitive or not both objects)
        typeof obj1 !== typeof obj2
        // ? (2) If one is an array and the other is not (as "typeof" could not check)
        || (Array.isArray(obj1) && !Array.isArray(obj2))
        || (!Array.isArray(obj1) && Array.isArray(obj2))
        // ? (3) If both of them are objects, but they are not objects of the same type
        || (typeof obj1 == "object"
            && typeof obj2 == "object"
            && obj1.constructor !== obj2.constructor)
    ) {
        return false;
    }

    // * The keys/properties of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // ? If they do not have the same quantity of properties, then they are not equal
    if (keys1.length !== keys2.length) return false;

    // ? Use a regular for loop as opposed to a forEach loop as this way a flag is not needed
    // ? (due to the `Not all code paths return a value` issue).
    for (const key of keys1) {
        // ? Iterate over all the keys of the first object, and if
        if (
            // ? (1) You cannot find a match in the second object, or
            !keys2.includes(key)
            // ? (2) A match is found but the values for those keys are not deeply equal
            || !areDeeplyEqual(
                obj1[key as keyof typeof obj1],
                obj2[key as keyof typeof obj2],
            )
        ) {
            // ? Then the objects are not equal
            return false;
        }
    }

    // ? If no other issue is found here, then the objects are equal
    return true;
}

export {
    areEqualArrays,
    areaCollisionWithElement,
    collidesWithAnyPanel,
    deleteAfterTransition,
    elementDeletionTimeout,
    getOptionLabelFromList,
    isValidOption,
    previewDeletionTimeout,
    removeClassAfterTransition,
    wouldFit,
};
