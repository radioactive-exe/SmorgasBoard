import * as get from "./accessors.js";
import * as utils from "./util.js";

import { Area, Coordinate, Offset, Size } from "./definitions/area.js";
import { Panel } from "./definitions/panel.js";

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
    e: MouseEvent,
    initData: { eventCoords: Coordinate; panelPos: Coordinate }
): void {
    panel.setPosition(
        utils.clamp(
            initData.panelPos.x + (e.clientX - initData.eventCoords.x),
            0,
            window.innerWidth - panel.offsetWidth
        ),
        utils.clamp(
            initData.panelPos.y + (e.pageY - initData.eventCoords.y),
            0,
            window.innerHeight - panel.offsetHeight
        )
    );
}

function resizePanel(
    panel: Panel,
    e: MouseEvent,
    initData: { eventCoords: Coordinate; panelSize: Size }
): void {
    panel.setSize(
        utils.clamp(
            initData.panelSize.width + e.clientX - initData.eventCoords.x,
            get.normalisedCssPropertyValue(panel, "--min-width"),
            window.innerWidth - panel.offsetLeft
        ),
        utils.clamp(
            initData.panelSize.height + e.pageY - initData.eventCoords.y,
            get.normalisedCssPropertyValue(panel, "--min-height"),
            window.innerHeight - panel.offsetTop
        )
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

    const offsetX = ((eventCoords.x - centreX) / (right - left)) * 60;
    const offsetY = ((eventCoords.y - centreY) / (bottom - top)) * 40;

    const shadowOffsetX = ((eventCoords.x - centreX) / (right - left)) * -8;
    const shadowOffsetY = ((eventCoords.y - centreY) / (top - bottom)) * -6;

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
    shouldAnimate = true
): void {
    const aspectRatio: number = get.elementAspectRatio(source);

    potentialX = get.normalisedCssPropertyValue(source, "--x");
    potentialY = get.normalisedCssPropertyValue(source, "--y");
    potentialWidth = utils.clamp(
        get.normalisedCssPropertyValue(source, "--width"),
        get.normalisedCssPropertyValue(source, "--min-width"),
        window.innerWidth - source.offsetLeft
    );
    potentialHeight = utils.clamp(
        get.normalisedCssPropertyValue(source, "--height"),
        get.normalisedCssPropertyValue(source, "--min-height"),
        window.innerHeight - source.offsetTop
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
        }
    );

    const potentialRatio = utils.roundToNearest(
        potentialArea.getWidth() /
            potentialArea.getHeight(),
        0.001
    );

    if (
        !utils.collidesWithAnyPanel(panel, potentialArea) &&
        ((aspectRatio != 0 && potentialRatio == aspectRatio) ||
            aspectRatio == 0)
    ) {
        if (shouldAnimate) panel.classList.add("snapping");
        panel.setArea(potentialArea);
    }

}

function snapElementToTarget(
    el: Panel,
    target: Panel,
    shouldAnimate = true
): void {
    if (shouldAnimate) el.classList.add("snapping");

    el.setArea(target.getArea());
    
    utils.removeClassAfterTransition(target, "snapping");
    utils.removeClassAfterTransition(el, "snapping");
}

export {
    movePanelWithinScreen,
    resizePanel,
    rotatePanel,
    rotateElementStyle,
    snapElementToGrid,
    snapElementToTarget,
};
