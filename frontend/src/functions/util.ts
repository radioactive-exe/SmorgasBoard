import * as get from "./accessors.js";

import { Area } from "../classes/area.js";
import { Panel } from "../classes/panel.js";

import { dashboard, preview } from "../app.js";

function ignoreEventHandler(e: Event): void {
    e.stopPropagation();
}

function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

function roundToNearest(num: number, stepSize: number): number {
    let converted = num / stepSize;
    converted = Math.round(converted);
    converted *= stepSize;
    return converted;
}

function areaCollisionWithElement(area: Area, el: Panel): boolean {
    return !(
        area.getAbsoluteY() + area.getAbsoluteHeight() < el.offsetTop + 10 ||
        area.getAbsoluteY() >= el.offsetTop + el.offsetHeight - 20 ||
        area.getAbsoluteX() + area.getAbsoluteWidth() < el.offsetLeft + 10 ||
        area.getAbsoluteX() > el.offsetLeft + el.offsetWidth - 20
    );
}

function collidesWithAnyPanel(area: Area): boolean {
    let flag = false;

    dashboard.getPanels().forEach((i) => {
        if (
            i.dataset.panelId != preview.dataset.callerId &&
            areaCollisionWithElement(area, i)
        ) {
            flag = true;
        }
    });

    return flag;
}

function removeClassAfterTransition(
    el: HTMLElement,
    cl: string,
    removeFromDashboard?: boolean
): void {
    setTimeout(
        () => {
            el.classList.remove(cl);
            if (removeFromDashboard) {
                dashboard?.removeChild(el);
            }
        },
        get.normalisedCssPropertyValue(el, "transition-duration")
    );
}

function deleteAfterTransition(el: HTMLElement, parent: HTMLElement = dashboard): void {
    setTimeout(
        () => {
            parent?.removeChild(el);
        },
        get.normalisedCssPropertyValue(el, "transition-duration")
    );
}

export {
    ignoreEventHandler,
    clamp,
    roundToNearest,
    areaCollisionWithElement,
    collidesWithAnyPanel,
    removeClassAfterTransition,
    deleteAfterTransition,
};
