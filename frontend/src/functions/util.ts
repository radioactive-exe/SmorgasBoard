
import { dashboard, preview } from "../app.js";
import type { Area } from "../classes/area.js";
import type { ListSelectionOption } from "../classes/config/config_entry.js";
import { Panel } from "../classes/panel/panel.js";

import * as get from "./accessors.js";

let previewDeletionTimeout: NodeJS.Timeout,
    elementDeletionTimeout: NodeJS.Timeout;

/**
 * @description Checks if an inputted Area collides with a particular HTMLElement.
 * @param {Area} area - The area input we are checking for collision.
 * @param {HTMLElement} el - The HTML Element we are checking for collision with @param area.
 * @returns {boolean} - True if @param area and @param el collide. False otherwise.
 * @example areaCollisionWithElement(new Area({x: 3, y: 1}, {width: 2, height: 2}), someConstDivElement) -> true if the defined Area at the coordinates (3, 1) and with a size of (2, 2) overlaps our arbitrary "someConstantDivElement".
 */
function areaCollisionWithElement(area: Area, el: HTMLElement): boolean {
    return !(
        area.getAbsoluteY() + area.getAbsoluteHeight() < el.offsetTop + 10
        || area.getAbsoluteY() >= el.offsetTop + el.offsetHeight - 20
        || area.getAbsoluteX() + area.getAbsoluteWidth() < el.offsetLeft + 10
        || area.getAbsoluteX() > el.offsetLeft + el.offsetWidth - 20
    );
}

function collidesWithAnyPanel(area: Area): boolean {
    let flag = false;

    dashboard.getPanels().forEach((i: Panel) => {
        if (
            areaCollisionWithElement(area, i)
            && i.dataset.panelId != preview.dataset.callerId
        ) {
            flag = true;
        }
    });

    return flag;
}

function removeClassAfterTransition(
    el: HTMLElement,
    cl: string,
    removeFromDashboard = false,
): void {
    setTimeout(
        () => {
            el.classList.remove(cl);
            if (removeFromDashboard) {
                dashboard?.removeChild(el);
            }
        },
        get.normalisedCssPropertyValue(el, "transition-duration"),
    );
}

function deleteAfterTransition(
    el: HTMLElement,
    parent: HTMLElement = dashboard,
): void {
    const deletionTimeout = setTimeout(
        () => {
            parent?.removeChild(el);
        },
        get.normalisedCssPropertyValue(el, "transition-duration"),
    );
    if (el instanceof Panel) previewDeletionTimeout = deletionTimeout;
    else elementDeletionTimeout = deletionTimeout;
}

function isValidOption(
    possibleOptions: ListSelectionOption[],
    potentialValue: string,
): boolean {
    return possibleOptions.some(
        (op: ListSelectionOption): boolean => potentialValue == op.optionValue,
    );
}

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
};
