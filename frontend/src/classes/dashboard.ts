/**
 * The file containing the {@link Dashboard} Class.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import {
    current,
    finishLoading,
    loader,
    refreshDimensions,
    spawnablePanelTypes,
    user,
} from "../app.js";

import { AlertLevel, spawnAlert } from "../elements/alert.js";
import { deletePanelSection } from "../elements/context_menu.js";
import * as get from "../functions/accessors.js";
import * as utils from "../functions/util.js";
import { getFromSmorgasBase, patchIntoSmorgasBase } from "../querying.js";

import type { Size } from "./area.js";
import { Area } from "./area.js";
import type { PanelInstance } from "./panel/panel.js";
import { Panel } from "./panel/panel.js";
import { PanelType } from "./panel/panel_type.js";
import { PanelTypeId } from "./panel/panel_type_properties/panel_type_id.js";
import { Theme } from "./theme.js";

/**
 * The Dashboard class.
 *
 * @remarks
 * This class houses the main object for the application/website. This dashboard
 * will be the only element initially in the DOM when it comes to the dashboard
 * itself (and not modals/overlays, etc.). It handles adding and removing
 * panels, setting the theme, and editing the layout of its contents.
 */
class Dashboard extends HTMLElement {
    /**
     * The Panels stored in the dashboard/application.
     *
     * @see {@link Panel}
     */
    private panels: Panel[];
    /**
     * The stored PanelInstances for the panels in the Dashboard.
     *
     * @remarks
     * This is stored to facilitate saving locally and to the cloud, as well as
     * checking received updates from the Supabase database for any differences
     * with the local data before reloading, avoiding unnecessary reloads if an
     * update was received in conflicting timing with resetting whether a change
     * was local or not.
     */
    private panelInstances: PanelInstance[];
    /** The current Theme applied to the Dashboard. */
    private currentTheme: Theme;
    /**
     * The pool of Free ID numbers in the Dashboard. Once panels are deleted,
     * their ID number is thrown into this Set to be later reused by the new
     * panels.
     */
    private freeIds: Set<number> = new Set<number>();
    /**
     * The dimensions in Units of the Dashboard. This holds the number of Rows
     * and Columns (cells) that the Dashboard is divided into. Any reference
     * including "cell" or "fractional" is referring to these dimensions.
     */
    private dimensions: Size;
    /**
     * The cells in the background of the dashboard, used as indicators for its
     * dimensions, edit mode, and previewing dimension changes.
     *
     * @see {@link populateCells | populateCells()}
     */
    private cells: HTMLElement[];
    /**
     * The timeout/delay to trigger an autosave after a dashboard change or
     * update is made.
     */
    private saveTimeout: NodeJS.Timeout;

    /**
     * Creates a new Dashboard. Once created, the dashboard is filled with cells
     * to indicate the different slots and dimensions of the Dashboard. A shadow
     * DOM is attached to the Dashboard to house all the cells.
     */
    public constructor() {
        super();
        this.panels = [];

        this.attachShadow({ mode: "open" });
        this.populateCells();
    }

    /**
     * Fills the Dashboard with cells. The Dashboard gets divided into a visual
     * grid with cells for all the rows and columns, which are used to indicate
     * edit mode as well as to preview different dashboard dimensions when
     * changing size.
     *
     * @see {@link cells}
     */
    private populateCells(): void {
        if (!this.shadowRoot) return;
        // ? Clears the cells array and the shadow DOM (which holds all the cells)
        this.cells = [];
        this.shadowRoot.innerHTML = "";

        // ? Create the cell container element
        const cells = document.createElement("div");
        cells.part = "cell-container";

        // ? Iterate through the number of rows and columns. I.e. the total number of cells
        for (let i = 0; i < Dashboard.getRows(); i++) {
            for (let j = 0; j < Dashboard.getCols(); j++) {
                // ? Create the cell element
                const cell: HTMLDivElement = document.createElement("div");
                cell.classList.add("cell");
                cell.part = "cell";

                // ? Store the row and column of the dashboard this cell represents
                // ? (think like the cells in an Excel sheet. A2 would be the first column,
                // ? and the second row. Same logic applies here)
                cell.dataset.row = i.toString();
                cell.dataset.column = j.toString();

                // ? Append the cell to the cell container and to the variable stored in the
                // ? Dashboard
                cells.append(cell);
                this.cells.push(cell);
            }
        }
        // ? Append the cell container to the shadow DOM, as well as a slot for the dashboard contents.
        this.shadowRoot.append(cells, document.createElement("slot"));
    }

    /**
     * Gets the set of Panels currently in the dashboard.
     *
     * @returns The stored array of Panels in the dashboard.
     */
    public getPanels(): Panel[] {
        return this.panels;
    }

    /**
     * Gets the stored PanelInstance data for all Panels from the last save.
     *
     * @returns An array of PanelInstances, used when updating/saving to cloud,
     *   as well as comparing incoming payloads for changes.
     *
     * @see {@link PanelInstance}
     * @see {@link Panel.getInstance | Panel.getInstance()}
     * @see {@link getImmediatePanelInstances | getImmediatePanelInstances()}
     */
    public getPanelInstances(): PanelInstance[] {
        return this.panelInstances;
    }

    /**
     * Gets the immediate/current PanelInstance data for all Panels.
     *
     * @remarks
     * This is used to get the dashboard panels at the exact moment of calling,
     * and not the stored data from the last save (which is when
     * {@link panelInstances} is updated). This is thus called even if during a
     * save timeout after an edit, used for comparing incoming payloads for
     * changes if those changes occur: <br/> (1) after an edit on the current
     * client instance, <br/> (2) after the save on the other client instance,
     * and <br/> (3) before the save on the current client instance.
     *
     * @returns An array of PanelInstances, from the immediate content.
     *
     * @see {@link PanelInstance}
     * @see {@link Panel.getInstance | Panel.getInstance()}
     * @see {@link getPanelInstances | getPanelInstances()}
     */
    public getImmediatePanelInstances(): PanelInstance[] {
        return this.panels.map((i) => i.getInstance());
    }

    /**
     * Gets the Set of free IDs stored in the dashboard.
     *
     * @returns The set/pool of free IDs as a numerical Set.
     *
     * @see {@link freeIds}
     */
    public getFreeIds(): Set<number> {
        return this.freeIds;
    }

    /**
     * Gets the background cells for the Dashboard.
     *
     * @returns The stored array of cells.
     */
    public getCells(): HTMLElement[] {
        return this.cells;
    }

    /**
     * Gets the dimensions of the Dashboard.
     *
     * @returns The size of the dashboard (width and height) as an object of
     *   type Size.
     *
     * @see {@link setDimensions | setDimensions()}
     */
    public getDimensions(): Size {
        return this.dimensions;
    }

    /**
     * Get the number of rows in the Dashboard.
     *
     * @remarks
     * This is static and extracts the number from the style directly (and not
     * {@link dimensions}) to avoid cyclic dependency resolving at runtime pre-
     * and post-construction.
     *
     * @returns The number of rows the dashboard is divided into.
     *
     * @see {@link getFractionalHeight | getFractionalHeight()}
     */
    public static getRows(): number {
        return get.cssPropertyValue(document.body, "--num-of-rows");
    }

    /**
     * Get the number of columns in the Dashboard.
     *
     * @remarks
     * This is static and extracts the number from the style directly (and not
     * {@link dimensions}) to avoid cyclic dependency resolving at runtime pre-
     * and post-construction.
     *
     * @returns The number of columns the dashboard is divided into.
     *
     * @see {@link getFractionalWidth | getFractionalWidth()}
     */
    public static getCols(): number {
        return get.cssPropertyValue(document.body, "--num-of-cols");
    }

    /**
     * Gets the width of one column/unit in pixels.
     *
     * @remarks
     * This is static to avoid cyclic dependency resolving at runtime pre- and
     * post-construction.
     *
     * @returns The width of the window divided by the number of columns to get
     *   the width of each column in the Dashboard.
     *
     * @see {@link getCols | getCols()}
     */
    public static getFractionalWidth(): number {
        return window.innerWidth / this.getCols();
    }

    /**
     * Gets the height of one row/unit.
     *
     * @remarks
     * This is static to avoid cyclic dependency resolving at runtime pre- and
     * post-construction.
     *
     * @returns The height of the window divided by the number of rows to get
     *   the height of each row in the Dashboard.
     *
     * @see {@link getRows | getRows()}
     */
    public static getFractionalHeight(): number {
        return window.innerHeight / this.getRows();
    }

    /**
     * Gets the maximum potential dimensions that the dashboard can have at the
     * current size.
     *
     * @remarks
     * This assumes every sell must be more than 100 pixels wide and tall in
     * order for the content to display comfortably.
     *
     * This is not a hard limit, but instead a stylistic comfort zone. It is
     * static as it is derived from the window itself and not the actual
     * dashboard content.
     *
     * @returns The largest possible comfortable size.
     *
     * @see {@link getDimensions | getDimensions()}
     */
    public static getMaxDimensions(): Size {
        return {
            width: Math.floor(window.innerWidth / 100),
            height: Math.floor(window.innerHeight / 100),
        };
    }

    /**
     * Updates/sets the Dashboard dimensions.
     *
     * @param size         - The new (potential) size to set the dashboard to.
     * @param truncate     - Whether or not to force the dashboard to that size
     *   and delete any panels that would not have fit. Default is `false`, as
     *   the user would usually simply be warned. This is set to true when using
     *   the Shrink button on the Size Warning overlay.
     * @param updateStored - Whether or not to save the change. Defaults to
     *   `true`, as most changes will be new. This is set to false when we are
     *   loading from saved data.
     *
     * @example
     *
     * ```ts
     * dashboard.setDimensions({width: 6, height: 4}, true);
     * ```
     *
     * The above forcibly sets the dashboard size to 6x4 cells, trimming off all
     * panels that would not fit and triggering a save.
     *
     * @see {@link getDimensions | getDimensions()}
     */
    public setDimensions(
        size: Size,
        truncate = false,
        updateStored = true,
    ): void {
        // ? If the size change is not forced, and the panels would not fit
        if (!truncate && !utils.wouldFit(size, this.panels)) {
            // ? Spawn a relevant informative alert and exit this method
            spawnAlert(
                "You have panels that would not fit in this size. Please delete or move them away from the bottom and right sides, or delete them, to be able to set the Dashboard to these dimensions.",
            );
            return;

            // ? Otherwise, if this is a forced size change
        } else if (truncate) {
            // ? Iterate through all the panels, and delete those that would partially
            // ? or completely lie outside the screen at this size
            this.panels.forEach((panel: Panel) => {
                if (
                    panel.getArea().getX() > size.width
                    || panel.getArea().getX() + panel.getArea().getWidth()
                        > size.width
                    || panel.getArea().getY() > size.height
                    || panel.getArea().getY() + panel.getArea().getHeight()
                        > size.height
                )
                    this.deletePanel(panel);
            });
        }

        // ? Once here (either fitting all the panels or by forcing a change), update the size
        // ? and all relevant style properties
        this.dimensions = size;
        document.body.style.setProperty("--num-of-cols", size.width.toString());
        document.body.style.setProperty(
            "--num-of-rows",
            size.height.toString(),
        );

        // ? Updates the cells and snaps all elements into place
        this.populateCells();
        this.organiseElements();

        // ? Save if needed
        if (updateStored) this.triggerDelayedSave();
    }

    /**
     * Whether we are currently in Edit Mode.
     *
     * @returns A boolean representing whether or not we are currently editing
     *   the Dashboard panels.
     *
     * @see {@link toggleEditMode | toggleEditMode()}
     */
    public isEditing(): boolean {
        return this.classList.contains("in-edit-mode");
    }

    /**
     * Toggles Edit mode for the Dashboard.
     *
     * @returns The current editing status after the toggle.
     *
     * @see {@link isEditing | isEditing()}
     */
    public toggleEditMode(): boolean {
        this.classList.toggle("in-edit-mode");

        // ? If the dashboard is now in edit mode
        if (this.isEditing()) {
            // ? Reset all rotations for any panels being hovered
            const activePanel = document.querySelector(
                "panel-element.hovering",
            );
            if (activePanel) activePanel.dispatchEvent(new Event("mouseleave"));
            return true;
        } else {
            // ? Otherwise, close any configuration menus when exiting edit mode
            current.panel.classList.remove("configuring");
            return false;
        }
    }

    /**
     * Spawns a Panel of an inputted Type.
     *
     * @remarks
     * This deals with checking potential areas to find an available slot,
     * assigning an ID to the panel, as well as obtaining the default Config for
     * the PanelType. This method then calls the
     * {@link spawnPanel | spawnPanel()} method with all the resulting
     * information, or triggers an alert if the spawning circumstances were
     * unsuccessful (in other words, if no space was found).
     *
     * @param panelType - The PanelType of the new Panel to spawn.
     *
     * @example
     *
     * ```ts
     * mainDashboard.spawnPanelOfType(PanelType.CLOCK);
     * ```
     *
     * The above attempts to spawn a new Clock panel.
     *
     * @see {@link spawnPanel | spawnPanel()}
     * @see {@link PanelType.typeMinSize}
     * @see {@link Area}
     * @see {@link spawnablePanelTypes}
     */
    public spawnPanelOfType(panelType: PanelType): void {
        // * The starting variables to hold the found area as well as a flag indicator
        let finalArea: Area = Area.INIT;
        let slotFound = false;

        // ? Iterate through every cell and location that would fit the panel type
        // ? anywhere on the dashboard.
        for (
            let y = 0;
            y <= Dashboard.getRows() - panelType.getMinHeight();
            y++
        ) {
            for (
                let x = 0;
                x <= Dashboard.getCols() - panelType.getMinWidth();
                x++
            ) {
                // * The potential Area at the current position and with the PanelType's
                // * minimum Size.
                const potentialArea = new Area(
                    { x, y },
                    panelType.getMinSize(),
                );

                // ? If the potential area does not collide with any panels, a slot was found,
                // ? and the appropriate variables are updated.
                if (!utils.collidesWithAnyPanel(potentialArea)) {
                    finalArea = potentialArea;
                    slotFound = true;
                    break;
                }
            }

            // ? If a slot was found, close the whole loop and stop checking
            if (slotFound) break;
        }

        // ? If no slot was found and the loop was exited without updating the flag to true,
        // ? spawn the appropriate Alert and exit the method
        if (!slotFound) {
            spawnAlert(
                `No space for a ${panelType.getName()} found. Either move panels around, or delete some!`,
            );
            return;
        }

        // ? If there are any free IDs, pop one from there, or otherwise set the
        // ? ID to be the current number of panels (i.e. if there are panels 0, 1,
        // ? and 2 - 3 total - the next ID will be 3)
        let id: number;
        if (this.freeIds.size > 0) {
            id = this.freeIds.values().next().value as number;
        } else id = this.panels.length;

        // ? Remove the decided ID (if present) from the free ID pool.
        this.freeIds.delete(id);

        // ? Spawn the panel at the obtained area, the obtained ID. The default Config will be
        // ? populated upon initialising the panel
        this.spawnPanel(new Panel(finalArea, panelType, id));
    }

    /**
     * Spawns an inputted Panel.
     *
     * @param panel        - The Panel to spawn and add to the dashboard.
     * @param updateStored - Whether or not to trigger a save upon spawning.
     *   Defaults to `true` as all spawns will be new panels, as opposed to when
     *   loading Panels from saved data.
     *
     * @example
     *
     * ```ts
     * const panel = new Panel(
     *     area,
     *     PanelType.CLOCK,
     *     4,
     *     getDefaultConfig(PanelType.CLOCK.getConfigSchema()),
     * );
     * spawnPanel(panel);
     * ```
     *
     * The above spawns a new Clock panel, at the inputted Area, with a
     * dashboard ID of 4 and the default config for its PanelType.
     *
     * @see {@link spawnPanelOfType | spawnPanelOfType()}
     * @see {@link spawnablePanelTypes}
     */
    private spawnPanel(panel: Panel, updateStored = true): void {
        // ? Add the listener to trigger a save when the Panel fires off an event
        panel.addEventListener("updatepanel", () => this.triggerDelayedSave());
        // ? Add the Panel to the dashboard body and the stored array
        this.append(panel);
        this.panels.push(panel);

        // ? If needed, trigger a delayed save
        if (updateStored) this.triggerDelayedSave();
    }

    /**
     * Deleted a panel from the Dashboard.
     *
     * @param panel - The panel to delete.
     *
     * @example
     *
     * ```ts
     * deletePanel(e.target);
     * ```
     *
     * The above deletes the panel targeted by an event, such as when the
     * context menu is spawned by a click on top of a particular panel. In that
     * case, the panel can be deleted directly.
     *
     * @see {@link deletePanelSection}
     */
    public deletePanel(panel: Panel): void {
        // ? Check if the panel is a child
        if (!this.contains(panel)) return;

        // ? Remove the Panel from the stored array and the body
        this.panels.splice(this.panels.indexOf(panel), 1);
        this.removeChild(panel);

        // ? Add the Panel's ID to the pool of free IDs
        this.freeIds.add(panel.getId());

        // ? But, if all panels were deleted, simply clear all the free IDs
        if (this.panels.length == 0) this.freeIds.clear();

        // ? Hide the delete panel section in the context menu
        deletePanelSection.classList.remove("visible");

        this.triggerDelayedSave();
    }

    /**
     * Snaps all elements into the grid properly, such as when resizing the
     * window.
     *
     * @see {@link Panel.getArea | Panel.getArea()}
     * @see {@link Panel.setArea | Panel.setArea()}
     */
    public organiseElements(): void {
        // ? Set each Panel's Area to be its direct area, as this updates the styles immediately
        // ? and snaps the panels to place
        this.panels?.forEach((i) => i.setArea(i.getArea()));
    }

    /**
     * Triggers a delayed save after 2 seconds of being called. Repeated calls
     * will clear and reset the Timeout, ensuring the save is triggered 2
     * seconds after the last call.
     *
     * @see {@link save | save()}
     */
    public triggerDelayedSave(): void {
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            this.save();
        }, 2000);
    }

    /**
     * Saves all the dashboard data/information to the database.
     *
     * @see {@link save | save()}
     * @see {@link PanelInstance}
     * @see {@link Panel.getContent | Panel.getContent()}
     * @see {@link Panel.setContent | Panel.setContent()}
     */
    private saveToCloud(): void {
        try {
            // ? Populate the payload and send
            patchIntoSmorgasBase("dashboard", {
                free_ids: [...this.freeIds],
                panels: this.panelInstances,
                dimensions: this.dimensions,
                theme: this.currentTheme.getId(),
            });
        } catch {
            console.error("Invalid panels sent. Check storage");
        }
    }

    /**
     * Saves all data, either to local storage if not logged in, or to the
     * database if logged in.
     *
     * @see {@link saveToCloud | saveToCloud()}
     * @see {@link load | load()}
     */
    public save(): void {
        // * Map through all stored panels and store their PanelInstances
        this.panelInstances = this.panels.map(
            (i): PanelInstance => i.getInstance(),
        );

        // ? If authenticated, save directly to the cloud
        if (user) this.saveToCloud();
        // ? Otherwise, save all information to local storage
        else {
            localStorage.setItem("panels", JSON.stringify(this.panelInstances));
            localStorage.setItem("free-ids", JSON.stringify([...this.freeIds]));
            localStorage.setItem("dimensions", JSON.stringify(this.dimensions));
            localStorage.setItem(
                "last-theme",
                this.currentTheme.getId().toString(),
            );
        }
    }

    /**
     * Loads all data into the dashboard, sequentially loading each item.
     *
     * @returns A promise that resolves when all data has been loaded in.
     *
     * @see {@link loadStoredDimensions | loadStoredDimensions()}
     * @see {@link loadStoredTheme | loadStoredTheme()}
     * @see {@link loadStoredPanels | loadStoredPanels()}
     * @see {@link save | save()}
     */
    public load(): Promise<void> {
        // ? Show the loader
        loader.classList.remove("despawning");

        // ? Load the theme, panels, and dimensions, lastly hiding the loader again
        return this.loadStoredTheme()
            .then(() => this.loadStoredPanels())
            .then(() => this.loadStoredDimensions())
            .then(() => refreshDimensions())
            .then(() => finishLoading());
    }

    /**
     * Load the stored Dashboard dimensions, either from local storage or the
     * database.
     *
     * @returns A promise that resolves once loading is finalised and the
     *   dimensions are updated.
     *
     * @see {@link load | load()}
     * @see {@link loadStoredTheme | loadStoredTheme()}
     * @see {@link loadStoredPanels | loadStoredPanels()}
     * @see {@link setDimensions | setDimensions()}
     */
    public loadStoredDimensions(): Promise<void> {
        return new Promise(async (resolve) => {
            // * The variable to store the loaded dimensions
            let loadedDimensions: Size;

            // ? Try and fetch the loaded Dimensions from the database (if authenticated),
            // ? or from local storage (if anonymous), the maximum size if anything fails
            try {
                if (user) {
                    loadedDimensions = (
                        await getFromSmorgasBase("dimensions")
                    )[0].dimensions as Size;
                } else {
                    loadedDimensions = JSON.parse(
                        localStorage.getItem("dimensions") as string,
                    );
                }

                // ? If there is any parsing issue, forces the assertion of a correct format.
                // ? If incorrect, an error is thrown and the max size is taken.
                // ! I don't know why this needs to be done on signup, but I have put more than
                // ! 3 months (now 5 at the time of writing this) into this project and
                // ! I need to submit it to continue my courses.
                // ! Simply checking that the loaded dimensions don't exist
                // ! after the try-catch block does not cover all mishaps and still allows
                // ! unexpected data to go through, for whatever reason.
                loadedDimensions = {
                    width: loadedDimensions.width,
                    height: loadedDimensions.height,
                };
            } catch {
                loadedDimensions = Dashboard.getMaxDimensions();
            }

            // ? Set the loaded dimensions and resolve the promise
            this.setDimensions(loadedDimensions, false, false);
            resolve();
        });
    }

    /**
     * Load the stored Panels, either from local storage or the database.
     *
     * @returns A promise that resolves once loading is finalised and the panels
     *   are loaded and spawned.
     *
     * @see {@link PanelInstance}
     * @see {@link load | load()}
     * @see {@link loadStoredTheme | loadStoredTheme()}
     * @see {@link loadStoredDimensions | loadStoredDimensions()}
     */
    private loadStoredPanels(): Promise<void> {
        return new Promise(async (resolve) => {
            // ? If the dashboard is in edit mode, exit,
            // ? then clear all the loaded panels to reload
            if (this.isEditing()) this.toggleEditMode();
            this.clearPanelData();

            // * Variables to store the loaded free IDs and Panels
            let loadedIds: number[];
            let loadedPanelInstances: PanelInstance[];

            // ? Attempt to query any Panels already present in the body of the document
            const queriedPanels: Panel[] = [
                ...document.querySelectorAll<Panel>("panel-element"),
            ];

            // ? Try and fetch the loaded IDs from the database (if authenticated),
            // ? or from local storage (if anonymous), storing an empty array if anything fails
            try {
                if (user) {
                    loadedIds = (await getFromSmorgasBase("free_ids"))[0]
                        .free_ids as number[];
                } else {
                    loadedIds = JSON.parse(
                        localStorage.getItem("free-ids") as string,
                    );
                }
            } catch {
                loadedIds = [];
            }

            // ? Assign the found IDs to the Dashboard's free IDs
            this.freeIds = new Set<number>(loadedIds);

            // ? If there are already panels hard-coded and present in the body
            // ? (which should never be the case), spawn a relevant Alert and
            // ? store the queried Panels in the array of panels,
            // ? as well as updating the stored instances and their
            // ? stored Area from their style properties
            if (queriedPanels.length != 0) {
                spawnAlert(
                    "Panels in body found. Failed to load panels from storage",
                    AlertLevel.ERROR,
                );
                queriedPanels.forEach((i) => {
                    i.updateArea();
                });
                this.panels = queriedPanels;
                this.panelInstances = queriedPanels.map(
                    (i): PanelInstance => i.getInstance(),
                );
                resolve();
                return;
            }

            // ? If there are no queried panels, fetch the Panels stored in local storage
            // ? or the database, and assign an empty array if anything fails
            try {
                if (user) {
                    loadedPanelInstances = (
                        await getFromSmorgasBase("panels")
                    )[0].panels as PanelInstance[];
                } else {
                    loadedPanelInstances = JSON.parse(
                        localStorage.getItem("panels") as string,
                    );
                }
            } catch {
                loadedPanelInstances = [];
            }

            // ? If there were no panels that were loaded, or there was no source
            // ? for it to load from (i.e. no localStorage entry), then the Dashboard stored has no panels.
            if (!loadedPanelInstances || loadedPanelInstances.length == 0) {
                // ? Spawn an alert informing the user that the stored data is empty
                spawnAlert(
                    "No stored panels! Initiating base board with a random Panel. To Add more, Right Click and hover on 'Add Panel', and have fun!",
                    AlertLevel.INFO,
                );

                // ? Clear the free IDs
                this.freeIds.clear();

                // ? Spawn one Panel from the spawnable PanelTypes, then resolve the promise and exit the function.
                this.spawnPanelOfType(
                    spawnablePanelTypes[
                        Math.floor(Math.random() * spawnablePanelTypes.length)
                    ][1],
                );
                resolve();
                return;
            }

            // * Stores the number of Panels that have finished loading,
            // * used to check when loading is finished
            let numOfPanels = 0;

            // ? If the function reaches this point, that means there were stored panels
            // ? that were successfully loaded. So, iterate over all the PanelInstances,
            // ? and update the stored ones
            this.panelInstances = loadedPanelInstances;
            loadedPanelInstances.map((i: PanelInstance) => {
                // ? Create the Panel to spawn from each Instance
                const panelToSpawn: Panel = new Panel(
                    new Area(i.area.pos, i.area.size),
                    PanelType[
                        PanelTypeId[i.panel_type_id] as keyof typeof PanelType
                    ] as PanelType,
                    i.panel_id,
                    i.config,
                    i.content,
                );

                // ? Increment the number of loaded panels when each Panel finished loading
                panelToSpawn.addEventListener("finished-loading", () => {
                    numOfPanels++;
                    // ? Once all the loaded PanelInstances have been created and loaded,
                    // ? then the loading is finished and the promise can resolve
                    if (numOfPanels == loadedPanelInstances.length) resolve();
                });

                // ? Lastly, spawn the Panel with all the assigned event listeners and data
                this.spawnPanel(panelToSpawn, false);
            });
        });
    }

    /**
     * Loads the stored theme, either from local storage or the database.
     *
     * @returns A promise that resolves when the Theme is loaded and applied.
     *
     * @see {@link Theme}
     * @see {@link load | load()}
     * @see {@link loadStoredPanels | loadStoredPanels()}
     * @see {@link loadStoredDimensions | loadStoredDimensions()}
     */
    public loadStoredTheme(): Promise<void> {
        return new Promise(async (resolve) => {
            // * The variable that will hold the loaded Theme
            let storedThemeId: number;

            // ? Try and fetch the loaded Theme from the database (if authenticated),
            // ? or from local storage (if anonymous), storing the Default Theme's ID if anything fails
            try {
                if (user) {
                    storedThemeId = (await getFromSmorgasBase("theme"))?.[0]
                        .theme as number;
                } else {
                    storedThemeId = parseInt(
                        localStorage.getItem("last-theme") as string,
                    );
                }
                if (!storedThemeId) storedThemeId = 0;
            } catch {
                storedThemeId = 0;
            }

            // ? Applies the Theme using the ID, and resolves the promise
            this.setCurrentTheme(
                Object.entries(Theme)[storedThemeId][1],
                false,
            );
            resolve();
        });
    }

    /**
     * Gets the current Theme set on the Dashboard.
     *
     * @returns The currently applied Theme.
     *
     * @see {@link Theme}
     * @see {@link setCurrentTheme | setCurrentTheme()}
     */
    public getCurrentTheme(): Theme {
        return this.currentTheme;
    }

    /**
     * Sets and applies an inputted Theme to the Dashboard.
     *
     * @param theme        - The theme to apply.
     * @param updateStored - Whether or not to trigger a save upon setting the
     *   Theme. This defaults to `true` as most calls will be to change the
     *   theme during runtime. It is set to false when applying a Theme after
     *   loading.
     *
     * @example
     *
     * ```ts
     * setCurrentTheme(Theme.PALENIGHT);
     * ```
     *
     * The above sets the Dashboard's theme to the `Palenight` theme (my
     * personal favourite) and triggers a save.
     *
     * @see {@link Theme}
     * @see {@link getCurrentTheme | getCurrentTheme()}
     */
    public setCurrentTheme(theme: Theme, updateStored = true): void {
        // ? Store the new theme
        this.currentTheme = theme;

        // ? Validate that the Theme link file in the HTML head is present,
        // ? and replace if needed/missing
        let themeFileLink: HTMLElement | null =
            document.querySelector("#app-theme");
        if (themeFileLink == null) {
            themeFileLink = document.createElement("link");
            document.head.appendChild(themeFileLink);
        }

        // ? Update the CSS file that the Theme link uses
        themeFileLink.setAttribute("href", theme.getUrl());

        // ? If needed, save
        if (updateStored) this.triggerDelayedSave();
    }

    /**
     * Resets the Dashboard completely, removing all locally stored data and
     * resetting the Theme to default, clearing out all Panels and stored IDs.
     *
     * @see {@link clearPanelData | clearLoadedPanels()}
     */
    public clear(): void {
        // ? Revert the Theme to Default
        this.setCurrentTheme(Theme.DEFAULT);

        // ? Clear all panels and free IDs
        this.clearPanelData();

        // ? Remove all locally stored data
        localStorage.removeItem("dimensions");
        localStorage.removeItem("panels");
        localStorage.removeItem("free-ids");
    }

    /**
     * Clears all Panel data for the Dashboard, removing all free IDs and stored
     * Panels, as well as all Panels in the body, without replacing any
     * locally/remotely saved data.
     *
     * @see {@link clear | clear()}
     */
    public clearPanelData(): void {
        // ? Clears the Panels and free IDs
        this.panels = [];
        this.panelInstances = [];
        this.freeIds.clear();

        // ? Removes all Panels in the body of the Dashboard
        this.replaceChildren();
    }
}

// ? Define the Dashboard as a custom HTML element
window.customElements.define("smorgas-board", Dashboard);

export { Dashboard };
