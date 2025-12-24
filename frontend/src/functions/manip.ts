/**
 * This file contains all element manipulation functions.
 *
 * @remarks
 * This includes moving elements, rotating them, and resizing them.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { current, dashboard, preview } from "../app.js";
import type { Coordinates, Offset, Size } from "../classes/area.js";
import { Area } from "../classes/area.js";
import { Dashboard } from "../classes/dashboard.js";
import type { Panel } from "../classes/panel/panel.js";

import * as get from "./accessors.js";
import * as math from "./math.js";
import * as utils from "./util.js";
/**
 * The initial data for a panel movement/drag event, including the initial event
 * coordinates and the initial panel position.
 *
 * @see {@link movePanelWithinScreen | movePanelWithinScreen()} , where this is used
 * @see {@link PanelResizeInitData | The similar Interface for the Resize event}
 */
interface PanelMovementInitData {
    /**
     * The initial coordinates of the first click/tap that triggered the drag
     * movement event.
     */
    eventCoords: Coordinates;
    /** The initial position of the panel being moved. */
    panelPos: Coordinates;
}

/**
 * The initial data for a panel resize event, including the initial event
 * coordinates and the initial panel size.
 *
 * @see {@link resizePanel | resizePanel()} , where this is used
 * @see {@link PanelMovementInitData | The similar interface for the Movement event}
 */
interface PanelResizeInitData {
    /**
     * The initial coordinates of the first click/tap that triggered the drag
     * resize event.
     */
    eventCoords: Coordinates;
    /** The initial size of the panel being resized. */
    panelSize: Size;
}

/**
 * Moves the panel around (while keeping it completely within the bounds of the
 * screen) through dragging the movement/drag handle.
 *
 * @param panel    - The panel to move.
 * @param e        - The pointer/drag event used for movement.
 * @param initData - The initial movement data needed.
 *
 * @example
 *
 * ```ts
 * movePanelWithinScreen(
 *      panel,
 *      e,
 *      {
 *          eventCoords: {x: 15, y: 12},
 *          panelPos: {x: 0, y: 0}
 *      }
 * )
 * ```
 *
 * The above moves the panel originally positioned at (0, 0), using a drag event
 * whose initial pointer-down position was at (15, 12) (pixels), i.e. slightly
 * into the body of the panel in the top left corner, around the middle of the
 * drag handle.
 *
 * @see {@link PanelMovementInitData | The Interface for the InitData of a drag/movement event}
 * @see {@link resizePanel | resizePanel()}
 */
function movePanelWithinScreen(
    panel: Panel,
    e: PointerEvent,
    initData: PanelMovementInitData,
): void {
    // ? For both X and Y coordinates, we:
    // ? (1) Get the change in the X and Y coordinates from the initial data to the current dragging pointer location.
    // ? (2) Add the original offset X/Y of the panel, so that we get the final position (i.e. initial + any change)
    // ? (3) Clamp the values so that the panel remains completely within the bounds of the screen.
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

/**
 * Resizes the handle (while keeping it completely within the bounds of the
 * screen and larger than its minimum size) through dragging the resize handle.
 *
 * @param panel    - The panel to resize.
 * @param e        - The pointer/drag event used for resizing.
 * @param initData - The initial position and size data needed.
 *
 * @example
 *
 * ```ts
 * resizePanel(
 *      panel,
 *      e,
 *      {
 *          eventCoords: {x: 195, y: 92},
 *          panelSize: {width: 200, y: 100}
 *      }
 * )
 * ```
 *
 * The above resizes the panel originally with a size of 200x100 pixels using a
 * drag event whose initial pointer-down position was at (195, 92) (pixels),
 * i.e. slightly into the body of the panel in the bottom right corner, assuming
 * it was positioned at (0, 0), on the resize handle.
 *
 * @see {@link PanelResizeInitData | The Interface for the InitData of a resize event}
 * @see {@link movePanelWithinScreen | movePanelWithinScreen()}
 */
function resizePanel(
    panel: Panel,
    e: PointerEvent,
    initData: PanelResizeInitData,
): void {
    // ? For both the width and the height, we:
    // ? (1) Get the change in the X and Y coordinates from the initial data to the current dragging pointer location respectively.
    // ? (2) Add the original width/height of the panel, so that we get the final size
    // ?    (i.e. initial + the change to the new location)
    // ? (3) Clamp the values so that the panel remains completely within the bounds of the screen as well as
    // ?    larger than its minimum size on both dimensional axes, which we get by multiplying its minimum size/dimensions
    // ?    in cells from the panel type by the fractional width/height of the dashboard at the current dimensions
    // ?    and screen size.
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

/**
 * Rotates the panel targeted by the input event in the 3-dimensional X and Y
 * axes controlled by the hover/move event.
 *
 * @param e - The Mouse (hover) event that controls the rotation.
 *
 * @example
 *
 * ```ts
 * panel.addEventListener("mousemove", rotatePanel);
 * ```
 *
 * As the mouse moves around within the panel, the movement will control the 3D
 * rotation of the panel, appearing to rotate to face the cursor at all times.
 *
 * @see {@link rotateElementStyle | rotateElementStyle()}
 */
function rotatePanel(e: MouseEvent): void {
    let top: number, bottom: number, left: number, right: number;
    current.panel = e.currentTarget as Panel;
    if (!current.panel.classList.contains("hovering")) {
        current.panel.dispatchEvent(new Event("mouseenter"));
    }

    const eventCoords: Coordinates = { x: e.clientX, y: e.clientY };

    // ? If the panel is currently focused and centred on screen/enlarged, similar to
    // ? when it is being configured, but still in a state where rotation is wanted,
    // ? then the rotation is taken with respect to the current mouse position in
    // ? the window as a whole, and not just the panel. This makes the rotation more subtle.
    if (current.panel.classList.contains("focused")) {
        left = -0.5 * window.innerWidth;
        right = window.innerWidth * 1.5;
        top = -0.5 * window.innerHeight;
        bottom = window.innerHeight * 1.5;
    } else {
        // ? Otherwise, behaviour is the normal one.
        const box = current.panel.getBoundingClientRect();
        left = box.left;
        right = box.right;
        top = box.top;
        bottom = box.bottom;
    }

    // * The centre of the panel.
    const centreX = (left + right) / 2;
    const centreY = (top + bottom) / 2;

    // ? (1) The offset of the current hover position is taken from the centre of the relevant axis
    // ? (2) The offset is divided by the width/height of the panel as a whole (relevant to the axis)
    // ?    to obtain what percentage of the panel's width/height the offset is.
    // ? (3) This is multiplied by the configurable rotation, which in this case is 30deg for the X
    // ?    axis and 20deg for the Y axis. The maximum rotation possible is 50% of the inputted angle,
    // ?    once the mouse is hovering at the edge of the panel.
    // * The angle shows the full range of motion, as for example for the X axis rotation, the panel
    // * will be able to rotate from -15deg to 15deg, providing a full range of motion of 30deg.
    const offsetX = ((eventCoords.x - centreX) / (right - left)) * 30;
    const offsetY = ((eventCoords.y - centreY) / (bottom - top)) * -20;

    // ? The same steps are taken as the rotational offset, simply multiplied by distant offsets for the shadow
    // ? (4 rem horizontally and 3 rem vertically)
    // ? The offset is negative as the shadow should be offset in the direction opposite to the rotation.
    // ? i.e. rotating to the right should put the shadows on the left.
    const shadowOffsetX = ((eventCoords.x - centreX) / (right - left)) * -3;
    const shadowOffsetY =
        ((eventCoords.y - centreY) / (top - bottom)) * 2 + 0.5;

    rotateElementStyle(current.panel, {
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

/**
 * Applies the inputted rotation and offset to the style of the element.
 *
 * @param el     - The element to apply the rotational and offset values to.
 * @param offset - The offset to apply to the element, including both a
 *   rotational and shadow offset.
 *
 * @example
 *
 * ```ts
 * rotateElementStyle(
 *      panel,
 *      {
 *          rotation: {x: 20, y: -10},
 *          shadow: {x: -2, y: 1}
 *      }
 * );
 * ```
 *
 * The above rotates the element 20 degrees in the positive rotation direction
 * of the X axis and 10 degrees in the negative rotation direction of the Y
 * axis, and offsets the shadow 2rem to the left and 1rem down.
 *
 * @see {@link rotatePanel | rotatePanel()}
 * @see {@link Offset | The Offset interface}
 * @see {@link movePanelHoverHandler | movePanelHoverHandler()}
 */
function rotateElementStyle(el: HTMLElement, offset: Offset): void {
    el.style.setProperty("--rotate-x", offset.rotation.x + "deg");
    el.style.setProperty("--rotate-y", offset.rotation.y + "deg");
    el.style.setProperty("--shadow-offset-x", offset.shadow.x + "rem");
    el.style.setProperty("--shadow-offset-y", offset.shadow.y + "rem");
}

/**
 * Snaps the moving element to the dashboard grid, based on its own position and
 * size, or those of another source.
 *
 * @param snappingTarget - The element/panel to snap to the grid based on the
 *   source's position and size.
 * @param source         - The element whose position and size are used as
 *   references to snap to the nearest grid position and size. If this is not
 *   passed to the function, the first parameter is used as both the target and
 *   the source.
 * @param shouldAnimate  - Whether or not the snap to the grid will be
 *   smooth/animated. Default is `true`.
 *
 * @example
 *
 * ```ts
 * snapElementToGrid(preview, current.panel);
 * ```
 *
 * This is code used in Smorgasboard. The preview snaps to the grid, snapping to
 * a size and position closest to that of `current.panel`, which is being moved
 * around the dashboard.
 *
 * @see {@link snapElementToTarget | snapElementToGrid()}
 * @see {@link movePanelWithinScreen | movePanelWithinScreen()}
 */
function snapElementToGrid(
    snappingTarget: Panel,
    source: Panel = snappingTarget,
    shouldAnimate = true,
): void {
    // ? Gets the potential snapping position and size of the target panel,
    // ? ensuring the size cannot be smaller than the minimum size of the panel,
    // ? and not extend beyond the bounds of the screen.
    const potentialX = get.normalisedCssPropertyValue(source, "--x");
    const potentialY = get.normalisedCssPropertyValue(source, "--y");
    const potentialWidth = math.clamp(
        get.normalisedCssPropertyValue(source, "--width"),
        snappingTarget.getType().getMinWidth() * Dashboard.getFractionalWidth(),
        window.innerWidth - potentialX,
    );
    const potentialHeight = math.clamp(
        get.normalisedCssPropertyValue(source, "--height"),
        snappingTarget.getType().getMinHeight()
            * Dashboard.getFractionalHeight(),
        window.innerHeight - potentialY,
    );

    // ? A new Area is created from the potential variables, and `isAbsolute` handles snapping the values
    // ? to the grid through the Area's construction. This automatically creates a grid-obedient potential
    // ? target destination.
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

    // ? We get the aspect ratio of the potential Area created.
    const potentialRatio = math.getAspectRatio({
        width: potentialArea.getWidth(),
        height: potentialArea.getHeight(),
    });

    if (
        // ? If the potential area does not collide with any panel
        !utils.collidesWithAnyPanel(potentialArea)
        // ? And if either:
        // ? (1) The panel type does not have any particular aspect ratios
        && (current.panel.getType().getAspectRatios().length == 0
            // ? (2) The panel type *does* have particular aspect ratios
            || current.panel
                .getType()
                .getAspectRatios()
                // ? and the potential aspect ratio is one of them
                .some((ratio) => {
                    return (
                        ratio.width == potentialRatio.width
                        && ratio.height == potentialRatio.height
                    );
                }))
    ) {
        // ? Then we can snap the element (most often the preview) to this new potential area.
        // ? And animate, if needed.
        if (shouldAnimate && snappingTarget !== preview) {
            snappingTarget.classList.add("snapping");
            utils.removeClassAfterTransition(snappingTarget, "snapping");
        }
        snappingTarget.setArea(potentialArea);
    }
}

/**
 * Snaps one element to another by use of their areas.
 *
 * @param el            - The main element to snap to the target element.
 * @param target        - The destination element to snap the element to.
 * @param shouldAnimate - Whether or not the snap should be animated. Default is
 *   `true`, and it may be set to false in specific contexts if needed.
 *
 * @example
 *
 * ```ts
 * snapElementToTarget(panel, preview);
 * ```
 *
 * The above is an example used in Smorgasboard itself, actually. This snaps the
 * panel to the preview (which snaps to the grid and available spaces in the
 * app), smoothly animating the snap of the panel to its destination (as the
 * default for `shouldAnimate` is not overridden in this call).
 *
 * @see {@link snapElementToGrid | snapElementToGrid()}
 * @see {@link preview}
 */
function snapElementToTarget(
    el: Panel,
    target: Panel = preview,
    shouldAnimate = true,
): void {
    if (shouldAnimate && el !== preview) {
        el.classList.add("snapping");
        utils.removeClassAfterTransition(el, "snapping");
    }
    el.setArea(target.getArea());
}

/**
 * Bundles the 3 hover handlers, the {@link enterPanelHoverHandler | enter}
 * handler, the {@link movePanelHoverHandler | move} handler, and the
 * {@link exitPanelHoverHandler | exit} handler.
 *
 * @see {@link Panel.addHoverListeners | addHoverListeners() in the Panel class}
 * @see {@link enterPanelHoverHandler | enterPanelHoverHandler()}
 * @see {@link movePanelHoverHandler | movePanelHoverHandler()}
 * @see {@link exitPanelHoverHandler | exitPanelHoverHandler()}
 */
const hoverHandler = {
    enter: enterPanelHoverHandler,
    move: movePanelHoverHandler,
    exit: exitPanelHoverHandler,
};

/**
 * Function that handles the first enter of the mouse/pointer.
 *
 * @remarks
 * It smoothly snaps the rotation, and after the transition duration, adds a
 * class that turns rotations instantaneous again.
 *
 * @param e - The mouse enter event that triggers this handler.
 *
 * @example
 *
 * ```ts
 * panel.addEventListener("mouseenter", enterPanelHoverHandler);
 * ```
 *
 * @see {@link hoverHandler} , the object that bundles this with the other hover handlers
 * @see {@link movePanelHoverHandler | movePanelHoverHandler()}
 * @see {@link exitPanelHoverHandler | exitPanelHoverHandler()}
 */
function enterPanelHoverHandler(e: MouseEvent): void {
    if (dashboard.isEditing()) return;
    const target: Panel = e.currentTarget as Panel;
    const panel: Panel = target?.shadowRoot?.querySelector(
        ".panel-body",
    ) as Panel;

    if (!panel?.classList.contains("moving")) {
        target.classList.add("hovering");
        setTimeout(
            () => {
                if (target.classList.contains("hovering")) {
                    if (panel) panel.part.add("in-motion");
                }
            },
            get.normalisedCssPropertyValue(panel, "transition-duration"),
        );
    }
}

/**
 * Function that handles the movement of the mouse inside the panel.
 *
 * @remarks
 * This calls the function to rotate the panel based on the event.
 *
 * @param e - The Mouse Move event that controls the rotation.
 *
 * @example
 *
 * ```ts
 * panel.addEventListener("mousemove", movePanelHoverHandler);
 * ```
 *
 * @see {@link hoverHandler} , the object that bundles this with the other hover handlers
 * @see {@link enterPanelHoverHandler | enterPanelHoverHandler()}
 * @see {@link exitPanelHoverHandler | exitPanelHoverHandler()}
 */
function movePanelHoverHandler(e: MouseEvent): void {
    if (dashboard.isEditing()) return;
    e.stopPropagation();
    if (
        !(e.currentTarget as Panel)?.shadowRoot
            ?.querySelector(".panel-body")
            ?.classList.contains("moving")
    ) {
        rotatePanel(e);
    }
}

/**
 * Function that handles the exit of the mouse/pointer from hovering on the
 * Panel.
 *
 * @remarks
 * This function resets the rotation of the panel and removes the transition
 * classes from it.
 *
 * @param e - The MouseExit event.
 *
 * @example
 *
 * ```ts
 * panel.addEventListener("mouseleave", exitPanelHoverHandler);
 * ```
 *
 * @see {@link hoverHandler} , the object that bundles this with the other hover handlers
 * @see {@link enterPanelHoverHandler | enterPanelHoverHandler()}
 * @see {@link movePanelHoverHandler | movePanelHoverHandler()}
 */
function exitPanelHoverHandler(e: MouseEvent): void {
    rotateElementStyle(e.target as HTMLElement, {
        rotation: { x: 0, y: 0 },
        shadow: { x: 0, y: 0 },
    });

    if (dashboard.isEditing()) return;
    const panel = (e.currentTarget as Panel)?.shadowRoot?.querySelector(
        ".panel-body",
    );
    panel?.part.remove("in-motion");
    (e.currentTarget as Panel)?.classList.remove("hovering");
}

export {
    hoverHandler,
    movePanelWithinScreen,
    resizePanel,
    rotateElementStyle,
    rotatePanel,
    snapElementToGrid,
    snapElementToTarget,
};
