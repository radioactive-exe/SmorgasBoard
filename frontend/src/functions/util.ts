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
    return !(
        area.getAbsoluteY() + area.getAbsoluteHeight() < el.offsetTop + 10
        || area.getAbsoluteY() >= el.offsetTop + el.offsetHeight - 20
        || area.getAbsoluteX() + area.getAbsoluteWidth() < el.offsetLeft + 10
        || area.getAbsoluteX() > el.offsetLeft + el.offsetWidth - 20
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

export {
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
