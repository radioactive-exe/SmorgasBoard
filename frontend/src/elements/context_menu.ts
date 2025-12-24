/**
 * This file contains all logic, functions, and variables regarding the context
 * menu.
 *
 * @remarks
 * This includes the showing, keeping, and hiding of the context menu, as well
 * as handling the logic and positioning for its submenus depending on the
 * position of the context menu's appearance.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { contextNavButton, current } from "../app.js";
import { Panel } from "../classes/panel/panel.js";
import * as get from "../functions/accessors.js";
import * as math from "../functions/math.js";
import * as utils from "../functions/util.js";

let contextMenuOffset: number;

/** ? The context menu and its sub-menus. */

/** The context menu container. */
const contextMenu = document.querySelector(".context-menu") as HTMLElement;
/** The actual visual menu that is rendered with all the sections and entries. */
const innerMenu: HTMLElement | null =
    contextMenu.firstElementChild as HTMLElement | null;
/**
 * The theme selection menu housed inside the theme context menu entry.
 *
 * @see {@link hoverEntries} , the hover entries with submenus, the set this is a part of
 */
const themeMenu: HTMLElement = document.querySelector(
    "#theme-menu",
) as HTMLElement;
/**
 * The Panel spawning menu housed inside the panel context menu entry.
 *
 * @see {@link hoverEntries} , the hover entries with submenus, the set this is a part of
 */
const panelMenu: HTMLElement = document.querySelector(
    "#panel-menu",
) as HTMLElement;
/**
 * The matrix/dimensions selection grid menu housed inside the dimensions
 * context menu entry.
 *
 * @see {@link hoverEntries} , the hover entries with submenus, the set this is a part of
 */
const dimensionsMenu: HTMLElement = document.querySelector(
    "#dimensions-menu",
) as HTMLElement;

// ~ The buttons and inputs of the context menu.

/** The button to toggle the dashboard's edit mode. */
const editModeButton = document.querySelector(
    "#edit-mode-button",
) as HTMLElement;
/**
 * The section of the context menu that houses the delete button and a menu
 * spacer.
 *
 * @remarks
 * This element is hidden/visible depending on the context when the context menu
 * is shown.
 *
 * @see {@link deletePanelButton} , the button to delete the targeted panel
 */
const deletePanelSection = document.querySelector(
    "#remove-panel-section",
) as HTMLElement;
/**
 * The button to delete the panel focused on if the deletion section is visible.
 *
 * @see {@link deletePanelSection} , the section housing the delete button and a spacer
 */
const deletePanelButton = document.querySelector(
    "#remove-panel-button",
) as HTMLElement;

/**
 * The hover entries in the context menu.
 *
 * @remarks
 * This includes all the entries with a submenu that opens on hover, like the
 * dimensions menu, panel spawning menu, and theme menu.
 *
 * @see The submenus for each hover entry:
 * @see {@link dimensionsMenu} , the dashboard dimensions selection submenu
 * @see {@link themeMenu} , the theme selection submenu
 * @see {@link panelMenu} , the panel spawning submenu
 */
const hoverEntries = contextMenu.querySelectorAll(
    ".hover-item",
) as NodeListOf<HTMLElement>;

// ~ All context menu-related functions.

/**
 * The timeout to automatically hide the context menu after a set amount of
 * time.
 *
 * @see {@link spawnContextMenu | spawnContextMenu()}
 * @see {@link keepContextMenu | keepContextMenu()}
 * @see {@link removeContextMenu | removeContextMenu()}
 */
let contextMenuHideTimeout: NodeJS.Timeout;

/**
 * Makes the context menu visible.
 *
 * @remarks
 * This function spawns/shows the context menu at a specific location determined
 * by the respective handler for the context menu click (right click) or the nav
 * entry button click.
 *
 * @param posX - The X (horizontal) position to (attempt) to spawn the context
 *   menu at. Defaults to 0.
 * @param posY - The Y (vertical) position to (attempt) to spawn the context
 *   menu at. Defaults to 0.
 *
 * @example
 *
 * ```ts
 * spawnContextMenu(200, 350);
 * ```
 *
 * The above spawns the context menu with its top left corner positioned 200
 * pixels from the left edge and 350 pixels from the top edge.
 *
 * @see {@link contextMenuClickHandler | contextMenuClickHandler()}
 * @see {@link contextMenuNavHandler | contextMenuNavHandler()}
 * @see {@link keepContextMenu | keepContextMenu()}
 * @see {@link removeContextMenu | removeContextMenu()}
 */
function spawnContextMenu(posX = 0, posY = 0): void {
    if (
        contextMenu == null
        || themeMenu == null
        || panelMenu == null
        || innerMenu == null
    )
        return;
    try {
        // ? If we are trying to spawn the context menu too far down on the screen
        // ? that the submenus would not fit/would go out of the screen on the bottom
        if (posY > window.innerHeight - contextMenu.offsetHeight - 100) {
            // * So we show the submenus above their hover entries.
            themeMenu.style.top = "";
            themeMenu.style.left = "0";
            themeMenu.style.right = "";
            themeMenu.style.bottom = "100%";
            themeMenu.style.transformOrigin = "left";
            panelMenu.style.top = "";
            panelMenu.style.left = "0";
            panelMenu.style.right = "";
            panelMenu.style.bottom = "100%";
            panelMenu.style.transformOrigin = "left";
            dimensionsMenu.style.top = "";
            dimensionsMenu.style.left = "0";
            dimensionsMenu.style.right = "";
            dimensionsMenu.style.bottom = "100%";
            dimensionsMenu.style.transformOrigin = "left";

            // ? If we are trying to spawn the context menu in a situation where (a) the window is too thin
            // ? to fit the main menu and the submenu next to each other at all or (b) the position cannot fit
            // ? both menus next to each other
            // * (the submenus have the same width as the main menu)
        } else if (
            window.innerWidth < 2 * contextMenu.offsetWidth
            || (posX > window.innerWidth - 2 * contextMenu.offsetWidth
                && posX < contextMenu.offsetWidth)
        ) {
            // * So we show the submenus under their hover entries.
            themeMenu.style.top = "100%";
            themeMenu.style.left = "0";
            themeMenu.style.right = "";
            themeMenu.style.bottom = "";
            themeMenu.style.transformOrigin = "left";
            panelMenu.style.top = "100%";
            panelMenu.style.left = "0";
            panelMenu.style.right = "";
            panelMenu.style.bottom = "";
            panelMenu.style.transformOrigin = "left";
            dimensionsMenu.style.top = "100%";
            dimensionsMenu.style.left = "0";
            dimensionsMenu.style.right = "";
            dimensionsMenu.style.bottom = "";
            dimensionsMenu.style.transformOrigin = "left";

            // ? If we are trying to spawn the context menu so far right that the submenus
            // ? cannot fit/would go off the screen on the right, but there is enough space
            // ? on the left (due to the fact that it failed the previous check)
        } else if (posX > window.innerWidth - 2 * contextMenu.offsetWidth) {
            // * So we show the submenus to the left of their hover entries.
            themeMenu.style.top = "";
            themeMenu.style.left = "";
            themeMenu.style.right = "100%";
            themeMenu.style.bottom = "";
            themeMenu.style.transformOrigin = "right";
            panelMenu.style.top = "";
            panelMenu.style.left = "";
            panelMenu.style.right = "100%";
            panelMenu.style.bottom = "";
            panelMenu.style.transformOrigin = "right";
            dimensionsMenu.style.top = "";
            dimensionsMenu.style.left = "";
            dimensionsMenu.style.right = "100%";
            dimensionsMenu.style.bottom = "";
            dimensionsMenu.style.transformOrigin = "right";

            // ? If there is enough space on the right for the submenus to sit comfortably
        } else {
            // * So we show the submenus on the right regularly
            themeMenu.style.top = "";
            themeMenu.style.left = "100%";
            themeMenu.style.right = "";
            themeMenu.style.bottom = "";
            themeMenu.style.transformOrigin = "left";
            panelMenu.style.top = "";
            panelMenu.style.left = "100%";
            panelMenu.style.right = "";
            panelMenu.style.bottom = "";
            panelMenu.style.transformOrigin = "left";
            dimensionsMenu.style.top = "";
            dimensionsMenu.style.left = "100%";
            dimensionsMenu.style.right = "";
            dimensionsMenu.style.bottom = "";
            dimensionsMenu.style.transformOrigin = "left";
        }

        // ? Removes the `lerping` class placed when we are ensuring the context menu stays
        // ? on screen during changes, such as when we toggle edit mode, or right click on a panel.
        contextMenu.classList.remove("lerping");

        // ? If we spawn the context menu somewhere else within the hide timeout amount of time.
        keepContextMenu();

        // * The clamped coordinates to set the context menu's position to.

        const x: number = math.clamp(
            posX,
            0,
            window.innerWidth - contextMenu.offsetWidth - 10,
        );
        const y: number = math.clamp(
            posY,
            0,
            window.innerHeight - innerMenu.offsetHeight - 10,
        );

        // ? We update the style of the context menu to move to the appropriate position,
        contextMenu.style.setProperty("--x", x + "px");
        contextMenu.style.setProperty("--y", y + "px");
        // ? and then we make it visible.
        contextMenu.classList.add("visible");

        // ? Ensuring the context menu stays on screen when we leave/come back with the pointer
        // ? or we click/drag/tap anywhere on it
        contextMenu.addEventListener("mouseenter", keepContextMenu);
        contextMenu.addEventListener("pointermove", keepContextMenu);
        contextMenu.addEventListener("click", keepContextMenu);

        // ? Dismissing the menu either by regular timeout or by manual loss of focus
        /** @see {@link contextMenuLoseFocusHandler | contextMenuLoseFocusHandler()} , the function that handles automatic loss of focus/hiding of the context menu */
        contextMenu.addEventListener("mouseleave", removeContextMenu);
        document.addEventListener("click", contextMenuLoseFocusHandler);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Keeps the context menu on screen.
 *
 * @see {@link spawnContextMenu | spawnContextMenu()}
 * @see {@link removeContextMenu | removeContextMenu()}
 */
function keepContextMenu(): void {
    clearTimeout(contextMenuHideTimeout);
}

/**
 * Safely dismiss the context menu and make it invisible again, after a delay.
 *
 * @see {@link spawnContextMenu | spawnContextMenu()}
 * @see {@link keepContextMenu | keepContextMenu()}
 */
function removeContextMenu(): void {
    if (!contextMenu) return;

    // ? After one second, the context menu becomes hidden again, and all event listeners are removed.
    contextMenuHideTimeout = setTimeout(() => {
        contextMenu.classList.remove("visible");

        contextMenu.removeEventListener("mouseenter", keepContextMenu);
        contextMenu.removeEventListener("pointermove", keepContextMenu);
        contextMenu.removeEventListener("click", keepContextMenu);
        contextMenu.removeEventListener("mouseleave", removeContextMenu);
        document.removeEventListener("click", contextMenuLoseFocusHandler);
    }, 1000);
}

/**
 * Ensures that the context menu stays on screen after a structure change.
 *
 * @remarks
 * Once edit mode is toggled, which shows most entries in the context menu, or
 * once the context menu is spawned from a click over a panel (and thus the
 * deletion section is now visible), the context menu smoothly moves to remain
 * fully inside the bounds of the screen
 *
 * @see {@link spawnContextMenu | spawnContextMenu()}
 */
function fitContextMenuOnScreen(): void {
    // * The base offset which accounts for all the added entries when edit mode is enabled.
    contextMenuOffset = 180;
    // ? If the deletion section is visible, we also add to the offset
    if (deletePanelSection.classList.contains("visible")) {
        contextMenuOffset += 36;
    }
    // ? Whichever is higher on the screen between the current spawning location
    // ? and the full offset from the bottom will be where we are moving/animating to.
    const destination = Math.min(
        window.innerHeight - contextMenuOffset,
        get.normalisedCssPropertyValue(contextMenu, "--y"),
    );

    // ? Set the CSS variables in the context menu's style to move it up
    contextMenu.style.setProperty("--y", destination + "px");
    contextMenu.style.setProperty("--y-vector", destination + "px");

    // ? Handle the animation, ensuring that after the move is complete, the class is removed.
    contextMenu.classList.add("lerping");
    utils.removeClassAfterTransition(contextMenu, "lerping");
}

// eslint-disable-next-line jsdoc/require-example
/**
 * Handles a manual click outside the context menu to close it.
 *
 * @remarks
 * On desktop, this has little to no effect, but on touch screens without hover
 * capabilities, this hides the context menu when the user clicks outside it.
 *
 * @param e - The PointerEvent that occurred on the document, which will be
 *   checked to have happened outside the context menu completely.
 */
function contextMenuLoseFocusHandler(e: PointerEvent): void {
    const target: HTMLElement = e.target as HTMLElement;
    if (
        target != innerMenu
        && target.closest(".context-menu") == null
        && target != contextNavButton
    )
        removeContextMenu();
}

// eslint-disable-next-line jsdoc/require-example
/**
 * Handles the right click/context menu click event, spawning the context menu
 * based on the click location and showing/hiding the deletion section as
 * necessary.
 *
 * @param e - The pointer event based on the location/target of which the
 *   context menu will be shown.
 *
 * @see {@link spawnContextMenu | spawnContextMenu()}
 * @see {@link contextMenuNavHandler | contextMenuNavHandler()}
 */
function contextMenuClickHandler(e: PointerEvent): void {
    e.preventDefault();
    if (
        // ? If the click/right click that spawned the context menu was on top of a panel or one of its children.
        e.target instanceof Panel
        || (e.target instanceof HTMLElement
            && (e.target as HTMLElement).closest("panel-element") != null)
    ) {
        // ? We target the panel in question (either itself or the closest parent panel
        // ? of the child element we had clicked on top of)
        if (e.target instanceof Panel) current.panel = e.target;
        else current.panel = e.target.closest("panel-element") as Panel;

        // ? We make the deletion section of the context menu visible
        deletePanelSection?.classList.add("visible");

        // ? If the context menu was near the bottom and the deletion section was shown,
        // ? adjust the position of the context menu to keep it on-screen
        fitContextMenuOnScreen();

        // ? Otherwise, we don't need the deletion section.
    } else deletePanelSection?.classList.remove("visible");

    spawnContextMenu(e.pageX, e.pageY);
}

/**
 * Handles spawning the context menu by clicking the navigation entry for it.
 *
 * @remarks
 * It spawns the context menu at the X and Y coordinates of the context nav
 * entry, and the X is taken care of by being clamped by the spawning function.
 * This handler always using these coordinates ensures that the context menu
 * spawned through the nav entry always spawns consistently in the same exact
 * place no matter where on the context nav the user presses.
 *
 * @see {@link spawnContextMenu | spawnContextMenu()}
 * @see {@link contextMenuClickHandler | contextMenuClickHandler()}
 */
function contextMenuNavHandler(): void {
    // ? Hide the deletion section, as it is unneeded when spawned like this
    deletePanelSection?.classList.remove("visible");

    const box = contextNavButton?.getBoundingClientRect();

    spawnContextMenu(box?.x, box?.y);
}

export {
    contextMenu,
    contextMenuClickHandler,
    contextMenuNavHandler,
    deletePanelButton,
    deletePanelSection,
    editModeButton,
    fitContextMenuOnScreen,
    hoverEntries,
    innerMenu,
    keepContextMenu,
    panelMenu,
    removeContextMenu,
    themeMenu,
};
