import * as type from "./definitions/types.js";
import { Area, Panel } from "./definitions/classes.js";
import { dashboard } from "./app.js";
import * as get from "./accessors.js";

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

function collidesWithAnyPanel(self: HTMLElement, area: Area): boolean {
    var flag = false;

    dashboard.getPanels().forEach((i) => {
        if (
            i.dataset.panelId !=
                (self.dataset.callerId ?? self.dataset.panelId) &&
            areaCollisionWithElement(area, i)
        ) {
            flag = true;
        }
    });

    return flag;
}

function removeClassAfterTransition(
    el: Element,
    cl: string,
    removeFromDashboard?: boolean
): void {
    setTimeout(() => {
        el.classList.remove(cl);
        if (removeFromDashboard) dashboard?.removeChild(el);
    }, get.normalisedCssPropertyValue(el, "transition-duration"));
}

function deleteAfterTransition(
    el: Element
): void {
    setTimeout(() => {
        dashboard?.removeChild(el);
    }, get.normalisedCssPropertyValue(el, "transition-duration"));
}

export {
    ignoreEventHandler,
    clamp,
    roundToNearest,
    areaCollisionWithElement,
    collidesWithAnyPanel,
    removeClassAfterTransition,
    deleteAfterTransition
};
