import * as type from "./defs.js";
import * as utils from "./util.js";
import * as get from "./accessors.js";
import { releaseHandler, dragHandler, panels } from "./app.js";

var x : number,
    y : number,
    width : number,
    height : number,
    potentialX : number,
    potentialY : number,
    potentialWidth : number,
    potentialHeight : number;

function movePanelWithinScreen(panel : type.Panel, e, initData): void {
    panel.setPosition(
        utils.clamp(
            initData.panelPos.x + (e.pageX - initData.eventCoords.x),
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

function resizePanel(panel: type.Panel, e, initData): void {
    panel.setSize(
        utils.clamp(
            initData.panelSize.width + e.pageX - initData.eventCoords.x,
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

function rotateElement(e, elem) {
    // if (elem.children.item(1).classList.contains("moving")) {return;}

    if (!elem.classList.contains("hovering")) {
        elem.dispatchEvent(new Event("mouseenter"));
    }

    const x = e.clientX;
    const y = e.clientY;

    var left, top, right, bottom;

    if (elem.classList.contains("focused")) {
        left = -0.5 * window.innerWidth;
        right = window.innerWidth * 1.5;
        top = -0.5 * window.innerHeight;
        bottom = window.innerHeight * 1.5;
    } else {
        const box = elem.getBoundingClientRect();
        left = box.left;
        right = box.right;
        top = box.top;
        bottom = box.bottom;
    }

    let centreX = (left + right) / 2;
    let centreY = (top + bottom) / 2;
    const offsetX = ((x - centreX) / (right - left)) * 60;
    const offsetY = ((y - centreY) / (bottom - top)) * 40;
    const shadowOffsetX = ((x - centreX) / (right - left)) * -8;
    const shadowOffsetY = ((y - centreY) / (top - bottom)) * -6;
    elem.style.setProperty("--rotate-x", offsetY + "deg");
    elem.style.setProperty("--rotate-y", offsetX + "deg");
    elem.style.setProperty("--shadow-offset-x", shadowOffsetX + "rem");
    elem.style.setProperty("--shadow-offset-y", shadowOffsetY + "rem");
}

function snapElementToGrid(panel, source = panel, shouldAnimate = true) {
    if (shouldAnimate) panel.classList.add("snapping");

    const aspectRatio = get.elementAspectRatio(source);

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

    potentialX = utils.clamp(
        utils.roundToNearest(
            get.normalisedCssPropertyValue(source, "--x"),
            window.innerWidth /
                get.cssPropertyValue(document.body, "--num-of-cols")
        ),
        0,
        window.innerWidth
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
            (potentialWidth * get.dashboardCols()) /
            window.innerWidth /
            ((potentialHeight * get.dashboardRows()) / window.innerHeight)
        ).toFixed(3)
    );

    if (
        utils.collidesWithAnyPanel(panel, potentialArea, panels) ||
        (aspectRatio != 0 && potentialRatio != aspectRatio)
    ) {
        panel.setArea(originalArea);
    } else panel.setArea(potentialArea);


    setTimeout(() => {
        panel.classList.remove("snapping");
    }, get.normalisedCssPropertyValue(panel, "transition-duration"));
}

function snapElementToTarget(el: type.Panel, target) {
    el.classList.add("snapping");


    el.setArea(target.getArea());

    setTimeout(() => {
        el.classList.remove("snapping");
    }, get.normalisedCssPropertyValue(el, "transition-duration"));
}

export {
    movePanelWithinScreen,
    resizePanel,
    rotateElement,
    snapElementToGrid,
    snapElementToTarget,
};
