import * as get from "./accessors.js";

import { Area } from "../classes/area.js";
import { Panel } from "../classes/panel.js";

import { dashboard, preview } from "../app.js";
import { ListSelectionOption } from "../classes/config/config_entry.js";

let previewDeletionTimeout: NodeJS.Timeout,
    elementDeletionTimeout: NodeJS.Timeout;

function areaCollisionWithElement(area: Area, el: Panel): boolean {
    return !(
        area.getAbsoluteY() + area.getAbsoluteHeight() < el.offsetTop + 10
        || area.getAbsoluteY() >= el.offsetTop + el.offsetHeight - 20
        || area.getAbsoluteX() + area.getAbsoluteWidth() < el.offsetLeft + 10
        || area.getAbsoluteX() > el.offsetLeft + el.offsetWidth - 20
    );
}

function collidesWithAnyPanel(area: Area): boolean {
    let flag = false;

    dashboard.getPanels().forEach((i) => {
        if (
            i.dataset.panelId != preview.dataset.callerId
            && areaCollisionWithElement(area, i)
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
    removeClassAfterTransition,
    previewDeletionTimeout,
    elementDeletionTimeout,
    deleteAfterTransition,
    isValidOption,
    getOptionLabelFromList,
};
