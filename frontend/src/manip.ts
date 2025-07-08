import * as type from "./defs.js";
import * as utils from "./util.js";
import * as get from "./accessors.js";
import { releaseHandler, dragHandler, panels } from "./app.js";

var x: number,
    y: number,
    width: number,
    height: number,
    top: number,
    right: number,
    left: number,
    bottom: number,
    potentialX: number,
    potentialY: number,
    potentialWidth: number,
    potentialHeight: number,
    panel : type.Panel;

function movePanelWithinScreen(
    panel: type.Panel,
    e,
    initData: { eventCoords: type.Coordinate, panelPos: type.Coordinate }
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
    panel: type.Panel,
    e,
    initData: { eventCoords: type.Coordinate, panelSize: type.Size }
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

function rotatePanel(e : MouseEvent) : void {
    panel = <type.Panel>e.currentTarget;
    if (!panel.classList.contains("hovering")) {
        panel.dispatchEvent(new Event("mouseenter"));
    }

    const eventCoords: type.Coordinate = { x: e.clientX, y: e.clientY };

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

    let centreX = (left + right) / 2;
    let centreY = (top + bottom) / 2;

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

function rotateElementStyle(el : HTMLElement, offset : type.Offset) {
    el.style.setProperty("--rotate-x", offset.rotation.x + "deg");
    el.style.setProperty("--rotate-y", offset.rotation.y + "deg");
    el.style.setProperty("--shadow-offset-x", offset.shadow.x + "rem");
    el.style.setProperty("--shadow-offset-y", offset.shadow.y + "rem");
}

function snapElementToGrid(
    panel: type.Panel,
    source: type.Panel = panel,
    shouldAnimate = true
) {


    const aspectRatio: number = get.elementAspectRatio(source);

    x = panel.offsetLeft;
    y = panel.offsetTop;
    width = panel.offsetWidth;
    height = panel.offsetHeight;

    var originalArea: type.Area = new type.Area(
        {
            x: utils.roundToNearest(
                x,
                window.innerWidth /
                    get.cssPropertyValue(document.body, "--num-of-cols")
            ),
            y: utils.roundToNearest(
                y,
                window.innerHeight /
                    get.cssPropertyValue(document.body, "--num-of-rows")
            ),
        },
        {
            width: utils.roundToNearest(
                width,
                window.innerWidth /
                    get.cssPropertyValue(document.body, "--num-of-cols")
            ),
            height: utils.roundToNearest(
                height,
                window.innerHeight /
                    get.cssPropertyValue(document.body, "--num-of-rows")
            ),
        }
    );

    potentialX = utils.roundToNearest(
        get.normalisedCssPropertyValue(source, "--x"),
        window.innerWidth / get.cssPropertyValue(document.body, "--num-of-cols")
    );
    potentialY = utils.roundToNearest(
        get.normalisedCssPropertyValue(source, "--y"),
        window.innerHeight /
            get.cssPropertyValue(document.body, "--num-of-rows")
    );
    potentialWidth = utils.clamp(
        utils.roundToNearest(
            get.normalisedCssPropertyValue(source, "--width"),
            window.innerWidth /
                get.cssPropertyValue(document.body, "--num-of-cols")
        ),
        get.normalisedCssPropertyValue(source, "--min-width"),
        window.innerWidth - source.offsetLeft
    );
    potentialHeight = utils.clamp(
        utils.roundToNearest(
            get.normalisedCssPropertyValue(source, "--height"),
            window.innerHeight /
                get.cssPropertyValue(document.body, "--num-of-rows")
        ),
        get.normalisedCssPropertyValue(source, "--min-height"),
        window.innerHeight - source.offsetTop
    );

    var potentialArea: type.Area = new type.Area(
        { x: potentialX, y: potentialY },
        { width: potentialWidth, height: potentialHeight }
    );

    var potentialRatio = parseFloat(
        (
            ((potentialWidth * get.dashboardCols()) /
            window.innerWidth) /
            ((potentialHeight * get.dashboardRows()) / window.innerHeight)
        ).toFixed(3)
    );

    if (
        !utils.collidesWithAnyPanel(panel, potentialArea) &&
        ((aspectRatio != 0 && potentialRatio == aspectRatio) ||
            aspectRatio == 0) &&
        potentialArea != originalArea
    ) {
        if (shouldAnimate) panel.classList.add("snapping");
        panel.setArea(potentialArea);
        // panel.setArea(originalArea);
    }

    utils.removeClassAfterTransition(panel, "snapping");
}

function snapElementToTarget(el : type.Panel, target : type.Panel, shouldAnimate : boolean = true) {
    if (shouldAnimate) el.classList.add("snapping");

    el.setArea(target.getArea());

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
