/**
 * This is the main module for the Smorgasboard app.
 *
 * @remarks
 * All miscellaneous and uncategorised handlers, event listeners, and
 * connections between different classes are housed here.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import type {
    AuthChangeEvent,
    RealtimeChannel,
    Session,
    Subscription,
    SupabaseClient,
} from "@supabase/supabase-js";

import { createClient } from "@supabase/supabase-js";

import { form, goToPasswordResetScreen } from "./auth.js";
import type { Size } from "./classes/area.js";
import { Area } from "./classes/area.js";
import { Dashboard } from "./classes/dashboard.js";
import { Panel } from "./classes/panel/panel.js";
import { PanelType } from "./classes/panel/panel_type.js";
import { Theme } from "./classes/theme.js";
import { AlertLevel, spawnAlert } from "./elements/alert.js";

import {
    deletePanelButton,
    editModeButton,
    fitContextMenuOnScreen,
    hoverEntries,
    innerMenu,
    panelMenu,
    spawnContextMenu,
    themeMenu,
} from "./elements/context_menu.js";

import { snapElementToTarget } from "./functions/manip.js";
import * as utils from "./functions/util.js";
import type { DashboardDataFetch } from "./querying.js";

// ~ Supabase Client, and Authentication/Database related variables

const supabaseUrl: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey: string | undefined = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables not properly configured!");
}

/**
 * The Supabase client, defined here for use throughout the entirety of
 * Smorgasboard.
 *
 * @see {@link SupabaseClient}
 */
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

/**
 * The current logged in user. This holds all relevant fields if a user is
 * logged in, or is null if the dashboard is being used anonymously.
 */
let user: {
    id: string;
    email: string;
    username: string;
    access_token: string;
} | null = null;

/**
 * Whether or not the login was the first register or a returning user. This is
 * utilised in the `auth` file when registering and logging in.
 */
let firstTime = false;
/**
 * Updates the value of `firstTime`. This is called during login and/or
 * registration.
 *
 * @param val - The value to assign to `firstTime`.
 *
 * @example
 *
 * ```ts
 * setFirstTime(true);
 * ```
 *
 * The above sets the variable to `true`, indicating for the program that this
 * sign in event was a first registration for a new user.
 *
 * @see {@link firstTime}
 */
function setFirstTime(val: boolean): void {
    firstTime = val;
}

/**
 * Whether or not the change whose update was received from the Supabase
 * realtime listener was one triggered by an action on this client instance.
 *
 * @see {@link _supabaseAuthChangeHandler}
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link RealtimeChannel}
 */
let wasLocalChange = false;

/**
 * Updates the value of `localChange`. This is utilised by both the Supabase
 * realtime dashboard update listener and the patching functions in the
 * `querying` module to indicate/check if a change that triggered the update was
 * one caused by this client.
 *
 * @param val - The value to set to `localChange`.
 *
 * @example
 *
 * ```ts
 * setLocalChange(true);
 * ```
 *
 * The above sets the variable to `true`, indicating that the update that is
 * about to be received by the realtime listener was one caused by this client.
 *
 * @see {@link wasLocalChange}
 * @see {@link _supabaseAuthChangeHandler}
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link RealtimeChannel}
 */
function setLocalChange(val: boolean): void {
    wasLocalChange = val;
}

// ~ Dashboard-related constants, panels, and other variables

/** The animated loader for the application. */
const loader: HTMLElement = document.querySelector(".loader") as HTMLElement;

/** La pièce de Résistance! The dashboard element itself! */
const dashboard: Dashboard = document.querySelector(
    "smorgas-board",
) as Dashboard;

/**
 * The Preview panel, used whenever a panel is being moved around or resized,
 * previewing where it could possibly snap to the grid to.
 */
const preview: Panel = new Panel(Area.INIT, PanelType.PREVIEW, -1);

/**
 * Different properties relating to the current element being focused
 * on/manipulated in the Dashboard.
 */
const current = {
    /**
     * The flag for the type of manipulation occurring (if any). This is set to
     * either `being-resized` or `being-dragged` throughout the program.
     */
    flag: "" as string,
    /**
     * The current targeted panel. This is the panel being manipulated, or the
     * panel being spawned, or even the panel targeted when the context menu was
     * spawned, etc. The use depends on the context.
     */
    panel: preview,
    /**
     * The original area as soon as the current Panel was being manipulated
     * (dragged or resized).
     *
     * @remarks
     * This is stored to check the difference between the target area upon
     * releasing the mouse/cursor, so that updates are not sent to the dashboard
     * if the panel never moved, blocking potential spam by users simply
     * clicking repeatedly on the drag or resize handle.
     */
    originalArea: Area.INIT as Area,
};

/**
 * The layer containing all popups, modals, overlays, (non-context) menus, and
 * other overlaying forms or alerts.
 */
const modalLayer: HTMLElement =
    document.querySelector("#modal-layer") ?? document.createElement("div");

/**
 * A node list of all the nav buttons/entries in the nav menu.
 *
 * @see {@link mainNavButton} - The main button that expands/folds the nav menu.
 * @see {@link personalNavButton} - The button that pops up the authentication menu and options.
 * @see {@link contextNavButton} - The button that spawns the context menu on touchscreen/pointer devices.
 */
const navButtons: NodeListOf<HTMLElement> =
    document.querySelectorAll(".nav-entry .button");

/** The main button that expands/folds the nav menu. */
const mainNavButton: HTMLElement | null =
    document.querySelector(".main-nav .button");

/** The button that spawns the context menu on touchscreen/pointer devices. */
const contextNavButton: HTMLElement | null = document.querySelector(
    ".context-nav .button",
);

// ? Handle the toggling of all the nav buttons.
navButtons.forEach((navButton) => {
    navButton?.addEventListener("click", () => {
        // ? The context nav is not toggle-able
        if (navButton != contextNavButton) navButton.classList.toggle("active");

        // ? Go through all the nav buttons
        navButtons.forEach((otherButton) => {
            if (
                // ? If the button at the current iteration is not the one that triggered this listener
                otherButton != navButton
                // ? And it is NOT the case that the triggering button is not the main nav button
                // ? and the other is. (in other words, this makes sure the main nav is not toggled
                // ? off when any other nav button is clicked)
                && !(navButton != mainNavButton && otherButton == mainNavButton)
            ) {
                // ? Then deactivate it. This ensures only one nav entry is active at a given point
                otherButton.classList.remove("active");
            }
        });
    });
});

/** The button that pops up the authentication menu and options. */
const personalNavButton: HTMLElement | null = document.querySelector(
    ".personal-nav .button",
);

// ~ The child authentication menus under the Personal Nav button

/**
 * The Authentication options that should be visible when no user is logged in
 * (i.e The Sign In and Register buttons).
 *
 * @see {@link loggedInAuthMenu}
 */
const anonAuthMenu: HTMLElement | null = document.querySelector(
    ".personal-nav .anon-options",
);
/**
 * The Authentication options that should be visible when a user is logged in
 * (i.e. The Sign Out button and the simple greeting sentence).
 *
 * @see {@link anonAuthMenu}
 */
const loggedInAuthMenu: HTMLElement | null = document.querySelector(
    ".personal-nav .logged-in-options",
);

// ~ The dashboard dimensions handlers, overlays, etc.

/**
 * The Dashboard Dimensions selector in the Dimensions submenu of the context
 * menu.
 */
const matrix: HTMLElement | null = document.querySelector(".matrix");

/** The arrow pointing down off the screen. */
const offscreenDownArrow: HTMLElement | null =
    document.querySelector("#off-screen-down");
/** The arrow pointing right off the screen. */
const offscreenRightArrow: HTMLElement | null =
    document.querySelector("#off-screen-right");

/**
 * The last maximum dimensions that the dashboard could comfortably take on the
 * display.
 *
 * @remarks
 * This is stored to check whether the dashboard dimensions matrix needs to be
 * regenerated when the window is resized.
 */
let lastMax: Size;

/**
 * Called when the screen/window is resized in order to, if needed, regenerate
 * the dimensions matrix with the new maximum width and height.
 *
 * @remarks
 * This keeps the dashboard dimensions matrix updated with all screen resizes.
 */
function updateDimensionsMatrix(): void {
    // * The current maximum dimensions possible in the screen size at the moment of calling.
    const max = Dashboard.getMaxDimensions();

    // ? If the maximum dimensions did not change (and we have the last max dimensions),
    // ? then there is nothing to do.
    if (lastMax && lastMax.width == max.width && lastMax.height == max.height)
        return;
    else {
        // ? Otherwise, update the grid rows and columns used for the matrix
        document.body.style.setProperty("--matrix-width", max.width.toString());
        document.body.style.setProperty(
            "--matrix-height",
            max.height.toString(),
        );

        // ? Update the maximum dimensions stored
        lastMax = max;

        // ? And regenerate the matrix
        matrix?.replaceChildren();

        // ? For each possible row/column cell, we iterate and add a cell
        for (let i = 0; i < max.height; i++) {
            for (let j = 0; j < max.width; j++) {
                // ? The cell is created and the class and other attributes are populated
                const matrixCell = document.createElement("div");
                matrixCell.classList.add("matrix-cell");
                matrixCell.dataset.row = i.toString();
                matrixCell.dataset.column = j.toString();
                matrixCell.title = `${i + 1}x${j + 1}`;

                // ? Add the handler to handle hovering into any cell in the matrix
                matrixCell.addEventListener("mouseenter", () => {
                    // ? Go through all cells in the matrix
                    [
                        ...((matrix?.childNodes as NodeListOf<HTMLElement>)
                            ?? []),
                    ].forEach((cell: HTMLElement) => {
                        // ? For those that are above and to the left of the current hovered cell
                        if (
                            parseInt(cell.dataset.row as string)
                                <= parseInt(matrixCell.dataset.row as string)
                            && parseInt(cell.dataset.column as string)
                                <= parseInt(matrixCell.dataset.column as string)
                        ) {
                            // ? Update the style to highlight them
                            cell.classList.add("active");
                        } else {
                            // ? Otherwise, deactivate the cell
                            cell.classList.remove("active");
                        }
                    });

                    // ? Go through the cells in the dashboard and highlight the matching
                    // ? cells to the ones being highlighted in the matrix, in order to
                    // ? preview the dashboard if the user were to click on that cell and
                    // ? change to those dimensions.
                    dashboard.getCells().forEach((c: HTMLElement) => {
                        if (
                            parseInt(c.dataset.row as string)
                                <= parseInt(matrixCell.dataset.row as string)
                            && parseInt(c.dataset.column as string)
                                <= parseInt(matrixCell.dataset.column as string)
                        )
                            c.part.add("previewing");
                        else c.part.remove("previewing");
                    });

                    // ? If the user is previewing a size that is wider in columns
                    // ?than the current dimensions
                    if (
                        parseInt(matrixCell.dataset.row as string)
                        >= Dashboard.getRows()
                    ) {
                        // ? Then show the corresponding offscreen arrow
                        offscreenDownArrow?.classList.add("visible");
                        // ? Otherwise, hide it
                    } else offscreenDownArrow?.classList.remove("visible");

                    // ? If the user is previewing a size that is taller in rows
                    // ?than the current dimensions
                    if (
                        parseInt(matrixCell.dataset.column as string)
                        >= Dashboard.getCols()
                    ) {
                        // ? Then show the corresponding offscreen arrow
                        offscreenRightArrow?.classList.add("visible");
                        // ? Otherwise, hide it
                    } else offscreenRightArrow?.classList.remove("visible");
                });

                // ? Handle clicking on the hovered cell, updating the dashboard dimensions,
                // ? and hiding the offscreen arrows. The dashboard cells will also no longer
                // ? be highlighted as they are regenerated upon changing dimensions.
                matrixCell.addEventListener("click", () => {
                    dashboard.setDimensions({ width: j + 1, height: i + 1 });
                    offscreenDownArrow?.classList.remove("visible");
                    offscreenRightArrow?.classList.remove("visible");
                });

                // ? Lastly, add the matrix cell with all its listeners to the matrix
                matrix?.appendChild(matrixCell);
            }
        }
    }
}

/**
 * This function is called every time the window is resized, showing or hiding
 * the size warning overlay as needed, and updating the dimensions matrix.
 *
 * @see {@link sizeWarningOverlay}
 * @see {@link updateDimensionsMatrix | updateDimensionsMatrix()}
 */
function refreshDimensions(): void {
    // ? If the new size of the screen would make the cells in the dashboard
    // ? have a height or width of less than 100 pixels, then show the size warning,
    // ? Otherwise, hide it.
    if (
        Dashboard.getFractionalWidth() < 100
        || Dashboard.getFractionalHeight() < 100
    ) {
        sizeWarningOverlay?.classList.add("visible");
    } else sizeWarningOverlay?.classList.remove("visible");

    // ? If for whatever reason the modal layer did not exist on querying,
    // ? then add the ID to the fallback DIV created and append it to the document
    if (!document.body.contains(modalLayer)) {
        modalLayer.id = "modal-layer";
        document.body.appendChild(modalLayer);
    }

    // ? Update the dimensions matrix
    updateDimensionsMatrix();
}

/**
 * The Warning Overlay for when the width/height of cells on the dashboard is
 * less than 100 pixels because of the screen size.
 *
 * @see {@link shrinkButton}
 * @see {@link overlayDismissButtons}
 */
const sizeWarningOverlay: HTMLElement | null = document.querySelector(
    "#size-warning-overlay",
);

/**
 * The "Shrink and Truncate" button on the {@link sizeWarningOverlay}, which
 * forces the dashboard dimensions down to the maximum possible size and trims
 * off all the panels that would not fit.
 *
 * @see {@link sizeWarningOverlay}
 */
const shrinkButton: HTMLButtonElement | null =
    document.querySelector("#shrink-button");

// ? Handle clicking the shrink button, forcing the dashboard dimensions to the
// ? largest possible given the screen size, trimming off the excess panels,
// ? and hiding the overlay.
shrinkButton?.addEventListener("click", () => {
    dashboard.setDimensions(Dashboard.getMaxDimensions(), true);
    sizeWarningOverlay?.classList.remove("visible");
});

/**
 * A node list of all the dismiss buttons on all overlays.
 *
 * @remarks
 * Currently, the only implemented overlay is the Size Warning overlay, but this
 * implementation allows all dismiss buttons to work on any newly added
 * overlay.
 */
const overlayDismissButtons: NodeListOf<HTMLButtonElement> | null =
    document.querySelectorAll("button.dismiss-button");

// ? Handle dismissing the warning/info overlays by clicking the button
overlayDismissButtons?.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest(".warning-overlay")?.classList.remove("visible");
    });
});

// ~ The handlers for the document and panels

/**
 * The handlers that are reassigned and utilised when manipulating Panels,
 * either through resizing or dragging around.
 *
 * @remarks
 * `drag` is the mousemove/drag handler added to the document when the pointer
 * is first put down when manipulating Panels. `release` is the pointer release
 * handler added to the document to snap everything in place and remove all
 * listeners.
 */
const documentPointerHandlers = {
    // eslint-disable-next-line jsdoc/require-jsdoc
    drag: (_e: PointerEvent): void => {
        return;
    },
    release: releaseHandler,
};

/**
 * Common handlers to be used by panels when being manipulated, common between
 * both resizing and dragging around.
 */
const commonHandler = {
    // eslint-disable-next-line jsdoc/require-example
    /**
     * The common handler for the initial pointerdown event when manipulating
     * panels.
     *
     * @remarks
     * This handler updates the `current` object with the relevant fields,
     * initialises the preview and handlers, and updates flags.
     *
     * @param panel - The panel that triggered the call to this common handler.
     */
    pointerdown: function (panel: Panel): void {
        // ? If the preview was in its deletion timeout, clear it so it is visible and stays again
        clearTimeout(utils.previewDeletionTimeout);

        // ? Update the current panel and areas
        current.panel = panel;
        current.originalArea = new Area(panel.getPosition(), panel.getSize());

        // ? Add the necessary classes - the manipulation type flag, and the general flag
        panel.classList.add(current.flag, "being-manipulated");

        // ? Initialise the preview location/area and the document handlers
        panel.initPreview();
        setDocumentHandlers();

        // ? Clear the selection in the page so that dragging does not move selections around,
        // ? as this breaks behaviour completely.
        window.getSelection()?.empty();
    },

    // eslint-disable-next-line jsdoc/require-example
    /**
     * The common drag/mousemove handler when dragging and resizing panels.
     *
     * @param panel - The panel that triggered the call to this common handler.
     * @param e     - The drag/mousemove/pointermove event that triggered this
     *   call.
     */
    drag: function (panel: Panel, e: PointerEvent): void {
        // ? Prevents the default dragging behaviour, including dragging
        // ? images or draggable elements, dragging the page around, etc.
        e.preventDefault();

        // ? Updates the preview with the panel being manipulated.
        panel.updatePreview();
    },
};

/**
 * The (common) release handler when releasing the pointer/mouse when
 * resizing/dragging the panel.
 *
 * @see {@link documentPointerHandlers}
 * @see {@link documentPointerHandlers.release}
 */
function releaseHandler(): void {
    // * Whether the area the panel is snapping to on pointer release is different
    // * from the one before it was manipulated (i.e. if it did not move on the dashboard)
    const areaChanged =
        current.originalArea.getX() != preview.getArea().getX()
        || current.originalArea.getY() != preview.getArea().getY()
        || current.originalArea.getWidth() != preview.getArea().getWidth()
        || current.originalArea.getHeight() != preview.getArea().getHeight();

    // ? Snap the panel to the preview
    snapElementToTarget(current.panel, preview);

    // ? Hide the preview and reset its stored called ID (the ID of the panel that triggered it)
    preview.classList.remove("visible");
    preview.dataset.callerId = "-1";
    utils.deleteAfterTransition(preview);

    // ? Remove the manipulation classes
    current.panel.classList.remove(current.flag, "being-manipulated");

    // ? If the area is different than the starting one, save.
    // ? This is checked so if a user clicks and releases a handle without
    // ? moving/resizing the panel, it doesn't trigger a meaningless save.
    if (areaChanged) dashboard.triggerDelayedSave();

    // ? Remove the document listeners
    document.removeEventListener("pointerup", documentPointerHandlers.release);
    document.removeEventListener("pointermove", documentPointerHandlers.drag);
}

/**
 * Add the document pointermove and pointerup handlers needed when manipulating
 * panels.
 */
function setDocumentHandlers(): void {
    document.addEventListener("pointermove", documentPointerHandlers.drag);
    document.addEventListener("pointerup", documentPointerHandlers.release);
}

/** Close/hide the loader as loading the dashboard has finished. */
function finishLoading(): void {
    loader.classList.add("despawning");
}

// ~ Initialising context menu and its listeners and submenus

/**
 * An array of all possible PanelTypes that are spawnable by the general user.
 *
 * @remarks
 * This is generated from the PanelType class by iterating through its members,
 * so is up to date at the next refresh once the new PanelType static member is
 * initialised for any new PanelType. We start at the second index to skip the
 * `PREVIEW` and `DEFAULT` (empty) PanelTypes.
 */
const spawnablePanelTypes: [string, PanelType][] =
    Object.entries(PanelType).slice(2);

// ? Add all defined Themes to the Theme selection submenu
Object.entries(Theme).forEach((theme: [string, Theme]) => {
    // ? Create the Theme entry
    const menuEntry: HTMLElement = document.createElement("li");
    menuEntry.classList.add("item");
    menuEntry.id = `${theme[0].toLowerCase()}-entry`;
    menuEntry.innerHTML = `<span class="item-text">${theme[1]}</span>`;

    // ? Handle clicking on the Theme to set the current dashboard Theme
    menuEntry.addEventListener("click", () => {
        dashboard.setCurrentTheme(theme[1]);
    });

    // ? Add the new Theme entry to the submenu
    themeMenu.appendChild(menuEntry);
});

// ? Add all spawnable Panel Types to the panel spawning submenu
spawnablePanelTypes.forEach((panelType: [string, PanelType]) => {
    // ? Create the Panel entry
    const menuEntry: HTMLElement = document.createElement("li");
    menuEntry.classList.add("item");
    menuEntry.id = `${panelType[0].toLowerCase()}-entry`;
    menuEntry.innerHTML = `<span class="item-text">${panelType[1].getName()}</span>`;

    // ? Handle clicking on the Panel name to spawn a new one of that PanelType
    menuEntry.addEventListener("click", () => {
        dashboard.spawnPanelOfType(panelType[1]);
    });

    // ? Add the new Panel entry to the submenu
    panelMenu.appendChild(menuEntry);
});

// ? Handles toggling edit mode.
editModeButton?.addEventListener("click", (_e: MouseEvent) => {
    // ? If something is wrong/missing
    if (!innerMenu) return;

    // ? Toggle edit mode, and iff we are now in edit mode,
    // ? then the context menu grew in size, so we need to ensure
    // ? that it is still on screen
    if (dashboard.toggleEditMode()) {
        fitContextMenuOnScreen();
    }
});

// ? Handle the delete button deleting the targeted panel (if present)
deletePanelButton?.addEventListener("click", () => {
    dashboard.deletePanel(current.panel);
});

// ? Handle expanding the hover entries with pointer devices too.
// ? When using only `:hover` selectors, expanding the submenu
// ? and clicking on an option would exit the submenu, or behaviour is unpredictable.
// ? This way, an explicit class is added to the submenu, allowing you to
// ? manually expand and fold the submenu. Otherwise, if you click elsewhere
// ? the `mouseleave` event is fired off, the class is also removed.
hoverEntries.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        item.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
        item.classList.remove("active");
    });

    item.addEventListener("touchend", (e) => {
        if (e.target == item) item.classList.toggle("active");
    });
});

// ? Handles spawning the context menu
dashboard.addEventListener("contextmenu", spawnContextMenu);

// ? Spawn the context menu when the Context nav entry is clicked/tapped (when visible)
contextNavButton?.addEventListener("click", spawnContextMenu);

// ? Reset all the highlighted cells in the matrix when the mouse leaves
matrix?.addEventListener("mouseleave", () => {
    // ? Iterate over the matrix cells and deactivate them
    [...(matrix?.children ?? [])].forEach((cell) => {
        cell.classList.remove("active");
    });

    // ? Iterate over the dashboard cells and un-preview those as well
    dashboard.getCells().forEach((cell) => {
        cell.part.remove("previewing");
    });

    // ? Hide the offscreen arrows as we no longer need to preview
    offscreenDownArrow?.classList.remove("visible");
    offscreenRightArrow?.classList.remove("visible");
});

// ~ General window/document listener initialisation

// ? Handle resizing the window
window.addEventListener("resize", () => {
    // ? Snap all the panels into place, ensuring they stay aligned
    dashboard.organiseElements();

    // ? If there is a panel being configured, ensure it stays in the centre
    if (current.panel.classList.contains("configuring"))
        current.panel.moveToCentre();

    // ? Update the dimensions matrix and the overlay, if needed
    refreshDimensions();
});

// ? Handle closing the personal nav when clicking anywhere else
window.addEventListener("pointerdown", (e) => {
    // ? If the click/pointerdown event was not on the personal nav button or any other
    // ? part of the personal nav entry, then close the personal nav menu
    if (
        !personalNavButton?.parentElement?.contains(
            e.target as HTMLElement | null,
        )
    )
        personalNavButton?.classList.remove("active");
});

// ~ Supabase Realtime and Auth Event handling

/**
 * The realtime channel listener for changes on the Dashboard Table in the
 * Supabase database.
 *
 * @see {@link _supabaseAuthChangeHandler}
 * @see {@link RealtimeChannel}
 */
let _smorgasbaseChangesListener: RealtimeChannel;

/**
 * Handles Supabase Auth state changes, including logins, logouts, session
 * starts, and even token refreshes, using the native
 * `SupabaseAuthClient.onAuthStateChange` method.
 *
 * @see {@link _smorgasbaseChangesListener}
 * @see {@link AuthChangeEvent}
 * @see {@link Subscription}
 * @see {@link RealtimeChannel}
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/auth | Supabase#Auth}
 * @see {@link https://supabase.com/docs/guides/functions | Supabase#EdgeFunctions}
 */
const _supabaseAuthChangeHandler: { data: { subscription: Subscription } } =
    supabase.auth.onAuthStateChange(
        (e: AuthChangeEvent, session: Session | null) => {
            // ? If the state change was a sign in event, either for the first time or a returning login
            if (e == "SIGNED_IN" && session && session.user) {
                // ? Store the user data from the resulting session in the event (if all went well)

                const potentialUser = {
                    id: session.user.id,
                    email: session.user.email as string,
                    username:
                        session.user.identities?.at(0)?.identity_data?.[
                            "username"
                        ],
                    access_token: session.access_token,
                };

                // ? Since a SIGNED_IN event is fired off on tab focus every time,
                // ? check if there is a change in the user before reloading.
                // ? If there is no stored user, then this was the user signing in,
                // ? and if there was a user and the ID, email, or access token are different,
                // ? then there is a change in user. If the stored and potential users are the same,
                // ? the SIGNED_IN event was simply a tab refresh, so do not reload
                // ? or repopulate Username fields
                if (
                    !user
                    || (user
                        && (potentialUser.id != user.id
                            || potentialUser.email != user.email
                            || potentialUser.username != user.username
                            || potentialUser.access_token != user.access_token))
                ) {
                    // ? Update the stored User
                    user = potentialUser;

                    // ? Iterate through all the spans/containers that are labelled to contain the
                    // ? user's username and update them to show the user's name. So far, this is
                    // ? only in the auth menu, but as the program scales, this will update the username
                    // ? in any fields labelled as necessary.
                    (
                        document.querySelectorAll(
                            ".username",
                        ) as NodeListOf<HTMLElement>
                    )?.forEach((u: HTMLElement) => {
                        if (u)
                            u.textContent =
                                user?.username ?? "Placeholder_Username";
                    });

                    // ? Switch the visible auth menu in the personal nav, and then close that nav
                    anonAuthMenu?.style.setProperty("display", "none");
                    loggedInAuthMenu?.style.setProperty("display", "inherit");
                    personalNavButton?.classList.remove("active");

                    // ? Hide the form, we have successfully signed in
                    form?.classList.remove("visible");

                    // ? Assign the value to the changes listener, subscribing to the Realtime Channel,
                    // ? which receives updates when changes are made to the specific user's row in the dashboard.
                    // ? This is because of the RLS we enforced and thus the policies for users to only listen
                    // ? to changes to their own database row (i.e. only changes to their dashboard data)
                    _smorgasbaseChangesListener = supabase
                        .channel(`changes_user_${user.id}`, {
                            config: { private: true },
                        })
                        .on("broadcast", { event: "UPDATE" }, (update) => {
                            const updateContent: DashboardDataFetch =
                                update.payload.record;
                            // ? If the change was triggered by another client instance than this one
                            if (
                                !wasLocalChange
                                // ? And one of the below are different in the payload than the current content:
                                // ? (1) The Theme
                                && (updateContent.theme
                                    // ? (2) The Dimensions
                                    != dashboard.getCurrentTheme().getId()
                                    || updateContent.dimensions?.height
                                        != dashboard.getDimensions().height
                                    || updateContent.dimensions?.width
                                        != dashboard.getDimensions().width
                                    // ? (3) The Free IDs
                                    // ?  -  A string comparison will suffice as it is a sorted
                                    // ?     set of numbers only. If the payload ID array isn't sorted and
                                    // ?     free of duplicates (as the set that saved it), then the
                                    // ?     received update is malformed)
                                    || updateContent.free_ids?.toString()
                                        != [
                                            ...dashboard.getFreeIds(),
                                        ].toString()
                                    // ? (4) The Panels (specifically, the PanelInstances)
                                    || !utils.areEqualArrays(
                                        updateContent.panels,
                                        dashboard.getImmediatePanelInstances(),
                                    ))
                            ) {
                                // ? Then reload to show the changes here
                                dashboard.load();
                            } else {
                                // ? Otherwise, this was a local change from this client/instance,
                                // ? or it was a received update with an identical payload to the
                                // ? current data, so simply reset the flag variable
                                wasLocalChange = false;
                            }
                        })
                        .subscribe();

                    // ? If, after signing in, the user's last signin time and their email confirmation
                    // ? time are the same (approximately), then this login was the confirmation link click
                    if (
                        session.user.last_sign_in_at
                        && session.user.email_confirmed_at
                    ) {
                        // * The date formed from the last sign in time string and the email confirmation time string
                        const lastSignInTime = new Date(
                            session.user.last_sign_in_at,
                        );
                        const verificationTime = new Date(
                            session.user.email_confirmed_at,
                        );

                        // ? And thus, if there is less than half a second in between the two times,
                        // ? it was the first signin
                        if (
                            Math.abs(
                                lastSignInTime.getTime()
                                    - verificationTime.getTime(),
                            ) <= 500
                        )
                            firstTime = true;

                        // ? Clear the URL hash
                        history.pushState(
                            "",
                            document.title,
                            window.location.pathname,
                        );
                    }

                    // ? If this is a returning user logging in, simply load the data stored in the database
                    if (!firstTime) {
                        dashboard.load();
                        // ? Otherwise, if this is a first time signin after confirming,
                        // ? save all the local data to the cloud, and trigger a welcome alert
                    } else {
                        dashboard.save();
                        spawnAlert(
                            `Awesome! Your email is all verified! Enjoy your stay, ${user.username}`,
                            AlertLevel.INFO,
                        );

                        // ? And then send the welcome email!
                        supabase.functions.invoke("hello-world", {
                            body: {
                                email: user.email,
                                username: user.username,
                            },
                        });
                    }
                }

                // ? If the change was a Sign out event.
            } else if (e == "SIGNED_OUT") {
                // * The username, for the good-bye alert
                const username = user?.username;

                // ? If the currently stored user exists.
                // ! This is checked as an invalid OTP/password reset link
                // ! triggers a SIGNED_OUT event, so check that the user before this
                // ! event was fired existed. If they didn't, then this fire off
                // ! was the result of something like the OTP/link expiration,
                // ! and not an act of a signed in user signing out manually
                // ! (as, again, there was no stored user).
                if (user != null) {
                    // ? Clear the stored user
                    user = null;

                    // ? Update which menus are shown in the auth/personal nav
                    anonAuthMenu?.style.setProperty("display", "inherit");
                    loggedInAuthMenu?.style.setProperty("display", "none");
                    personalNavButton?.classList.remove("active");

                    // ? Clear the dashboard and restore any local data,
                    // ? But show the loader first for a bit and announce the user's departure
                    dashboard.clear();
                    loader.classList.remove("despawning");
                    spawnAlert(
                        `Bye-bye, ${username ?? "Placeholder_Username"}! Hope to see you back again soon.`,
                        AlertLevel.INFO,
                    );
                    setTimeout(() => {
                        dashboard.load();
                    }, 1000);
                }

                // ? If the change was the start of a session, either logged in or anonymous
            } else if (e == "INITIAL_SESSION") {
                // ? Only load if the session is anonymous.
                // ? If it is not, then the `SIGNED_IN` event was fired off before this,
                // ? and the loading for the authenticated user was handled there.
                if (!user) dashboard.load();

                // ? Check for the presence of a hash in the URL.
                // ? This implies the URL was accessed from a special link
                // ? (given the current implementation), such as the
                // ? password reset link. If the latter is the case, the error will be present
                if (window.location.hash) {
                    // ? Extract the Hash content, parse as a map of parameters and values, then get the
                    // ? error description and codes
                    const hashContent: string =
                        window.location.hash.substring(1);
                    const hashParameters = new URLSearchParams(hashContent);
                    const errorDesc: string | null =
                        hashParameters.get("error_description");
                    const errorCode: string | null =
                        hashParameters.get("error_code");

                    // ? If present, send an alert with the error description (such as an expired OTP)
                    // ? and the error code (if present), or a message stating no error code exists.
                    if (errorDesc) {
                        spawnAlert(
                            `
                            ${
                                errorDesc.length > 0
                                    ? errorDesc
                                    : "There's something wrong with the URL you used. Please submit an issue on the GitHub repository with the error code and how you got here"
                            }. Error code: ${
                                errorCode != null
                                    ? (errorCode as string)
                                    : "<No Error code>"
                            }
                            `,
                            AlertLevel.ERROR,
                        );

                        // ? Then, remove the Hash from the URL
                        history.pushState(
                            "",
                            document.title,
                            window.location.pathname,
                        );
                    }
                }
            }
            // ? If the change was a Token refresh, update the stored access token
            else if (e == "TOKEN_REFRESHED" && user && session && session.user)
                user.access_token = session.access_token;
            // ? If the page was opened by following a password reset button/link in the password reset email,
            // ? then open the password reset screen
            else if (e == "PASSWORD_RECOVERY") {
                goToPasswordResetScreen();
            }

            console.log("!!", e);
        },
    );

// ? Debug/development utility so I can toggle edit mode very quickly
document.addEventListener("keydown", async (e) => {
    switch (e.key) {
        case "ArrowRight":
            dashboard.toggleEditMode();
            break;
        case "ArrowLeft":
    }
});

export {
    commonHandler,
    contextNavButton,
    current,
    dashboard,
    documentPointerHandlers,
    finishLoading,
    loader,
    modalLayer,
    preview,
    refreshDimensions,
    setDocumentHandlers,
    setFirstTime,
    setLocalChange,
    spawnablePanelTypes,
    supabase,
    user,
};
