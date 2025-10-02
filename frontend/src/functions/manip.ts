import { current } from "../app.js";
import type { Coordinate, Offset, Size } from "../classes/area.js";
import { Area } from "../classes/area.js";
import { Dashboard } from "../classes/dashboard.js";
import type { Panel } from "../classes/panel/panel.js";

import * as get from "./accessors.js";
import * as math from "./math.js";
import * as utils from "./util.js";

let top: number,
    right: number,
    left: number,
    bottom: number,
    potentialX: number,
    potentialY: number,
    potentialWidth: number,
    potentialHeight: number,
    panel: Panel;

function movePanelWithinScreen(
    panel: Panel,
    e: PointerEvent,
    initData: { eventCoords: Coordinate; panelPos: Coordinate },
): void {
    panel.setPosition(
        math.clamp(
            initData.panelPos.x + (e.clientX - initData.eventCoords.x),
            0,
            window.innerWidth - panel.offsetWidth,
        ),
        math.clamp(
            initData.panelPos.y + (e.pageY - initData.eventCoords.y),
            0,
            window.innerHeight - panel.offsetHeight,
        ),
    );
}

function resizePanel(
    panel: Panel,
    e: PointerEvent,
    initData: { eventCoords: Coordinate; panelSize: Size },
): void {
    panel.setSize(
        math.clamp(
            initData.panelSize.width + e.clientX - initData.eventCoords.x,
            panel.getType().getMinWidth() * Dashboard.getFractionalWidth() - 10,
            window.innerWidth - panel.offsetLeft,
        ),
        math.clamp(
            initData.panelSize.height + e.pageY - initData.eventCoords.y,
            panel.getType().getMinHeight() * Dashboard.getFractionalHeight()
                - 10,
            window.innerHeight - panel.offsetTop,
        ),
    );
}

function rotatePanel(e: MouseEvent): void {
    panel = e.currentTarget as Panel;
    if (!panel.classList.contains("hovering")) {
        panel.dispatchEvent(new Event("mouseenter"));
    }

    const eventCoords: Coordinate = { x: e.clientX, y: e.clientY };

    if (panel.classList.contains("focused")) {
        left = -0.5 * window.innerWidth;
        right = window.innerWidth * 1.5;
        top = -0.5 * window.innerHeight;
        bottom = window.innerHeight * 1.5;
    } else {
        const box = panel.getBoundingClientRect();
        left = box.left;
        right = box.right;
        top = box.top;
        bottom = box.bottom;
    }

    const centreX = (left + right) / 2;
    const centreY = (top + bottom) / 2;

    const offsetX = ((eventCoords.x - centreX) / (right - left)) * 30;
    const offsetY = ((eventCoords.y - centreY) / (bottom - top)) * 20;

    const shadowOffsetX = ((eventCoords.x - centreX) / (right - left)) * -4;
    const shadowOffsetY = ((eventCoords.y - centreY) / (top - bottom)) * -3;

    rotateElementStyle(panel, {
        rotation: {
            x: offsetY,
            y: offsetX,
        },
        shadow: {
            x: shadowOffsetX,
            y: shadowOffsetY,
        },
    });
}

function rotateElementStyle(el: HTMLElement, offset: Offset): void {
    el.style.setProperty("--rotate-x", offset.rotation.x + "deg");
    el.style.setProperty("--rotate-y", offset.rotation.y + "deg");
    el.style.setProperty("--shadow-offset-x", offset.shadow.x + "rem");
    el.style.setProperty("--shadow-offset-y", offset.shadow.y + "rem");
}

function snapElementToGrid(
    panel: Panel,
    source: Panel = panel,
    shouldAnimate = true,
): void {
    potentialX = get.normalisedCssPropertyValue(source, "--x");
    potentialY = get.normalisedCssPropertyValue(source, "--y");
    potentialWidth = math.clamp(
        get.normalisedCssPropertyValue(source, "--width"),
        panel.getType().getMinWidth() * Dashboard.getFractionalWidth(),
        window.innerWidth - source.offsetLeft,
    );
    potentialHeight = math.clamp(
        get.normalisedCssPropertyValue(source, "--height"),
        panel.getType().getMinHeight() * Dashboard.getFractionalHeight(),
        window.innerHeight - source.offsetTop,
    );

    const potentialArea: Area = new Area(
        {
            x: potentialX,
            y: potentialY,
            isAbsolute: true,
        },
        {
            width: potentialWidth,
            height: potentialHeight,
            isAbsolute: true,
        },
    );

    const potentialRatio = math.getAspectRatio({
        width: potentialArea.getWidth(),
        height: potentialArea.getHeight(),
    });

    if (
        !utils.collidesWithAnyPanel(potentialArea)
        && (current.panel.getType().getAspectRatios().length == 0
            || current.panel
                .getType()
                .getAspectRatios()
                .some((ratio) => {
                    return (
                        ratio.width == potentialRatio.width
                        && ratio.height == potentialRatio.height
                    );
                }))
    ) {
        if (shouldAnimate) panel.classList.add("snapping");
        panel.setArea(potentialArea);
    }
}

function snapElementToTarget(
    el: Panel,
    target: Panel,
    shouldAnimate = true,
): void {
    if (shouldAnimate) el.classList.add("snapping");

    el.setArea(target.getArea());

    utils.removeClassAfterTransition(el, "snapping");
}

export {
    movePanelWithinScreen,
    resizePanel,
    rotateElementStyle,
    rotatePanel,
    snapElementToGrid,
    snapElementToTarget,
};
