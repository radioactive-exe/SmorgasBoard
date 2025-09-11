/**
 * @file
 * The file containing the {@link Dashboard} Class.
 * @author Radioactive.exe
 * {@link https://github.com/radioactive-exe | GitHub Profile}
 * {@link https://github.com/radioactive-exe/SmorgasBoard | The GitHub Repository}
 */

/** File Header Delimiter. */

import { current, spawnablePanelTypes, user } from "../app.js";
import { AlertLevel, spawnAlert } from "../elements/alert.js";
import { deletePanelSection } from "../elements/context_menu.js";
import * as get from "../functions/accessors.js";
import * as utils from "../functions/util.js";
import { getFromSmorgasBase, patchIntoSmorgasBase } from "../querying.js";

import type { Size } from "./area.js";
import { Area } from "./area.js";
import { getDefaultConfig } from "./config/config.js";
import type { PanelInstance } from "./panel/panel.js";
import { Panel } from "./panel/panel.js";
import { PanelType } from "./panel/panel_type.js";
import { Theme } from "./theme.js";

/**
 * The Dashboard class.
 * @remarks
 * This class houses the main object for the application/website. This dashboard will be the only element initially in the DOM. It handles adding and removing panels, setting the theme, and editing the layout of its contents.
 * @see
 * {@link HTMLElement}
 */
class Dashboard extends HTMLElement {
    /**
     * The Panels stored in the dashboard/application.
     * @remarks
     * All the panels in the application are stored and utilised through this array.
     * @see
     * {@link Panel}
     */
    private panels: Panel[];
    /**
     * The current Theme chosen for the Dashboard.
     */
    private currentTheme: Theme;
    /**
     * The pool of Free ID numbers in the Dashboard.
     * @remarks
     * Once panels are deleted, their ID number is thrown into this Set to be later reused by the new panels.
     */
    private freeIds: Set<number> = new Set<number>();
    /**
     * The dimensions in Units of the Dashboard.
     * @remarks
     * This holds the number of Rows and Columns that the Dashboard is divided into, as an object of type {@link Size}
     * TODO: Implement the proper dimensions behaviour, and the ability to change the number of rows and columns when editing the Dashboard.
     */
    private dimensions: Size;

    /**
     * Creates a new Dashboard.
     * @remarks
     * Once created, the dashboard is filled with cells to indicate the different slots and dimensions of the Dashboard.
     */
    public constructor() {
        super();
        this.panels = [];

        this.attachShadow({ mode: "open" });
        this.populateCells();
    }

    /**
     * Fills the Dashboard with cells.
     * @remarks
     * The Dashboard gets divided into a visual grid with cells for all the rows and columns.
     */
    private populateCells(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = "";
        const cells = document.createElement("div");
        cells.part = "cell-container";
        for (let i = 0; i < Dashboard.getRows() * Dashboard.getCols(); i++) {
            const cell: HTMLDivElement = document.createElement("div");
            cell.classList.add("cell");
            cell.part = "cell";
            cells.append(cell);
        }
        this.shadowRoot.append(cells, document.createElement("slot"));
    }

    /**
     * Returns the set of Panels.
     * @returns The stored array of Panels in the application/dashboard.
     */
    public getPanels(): Panel[] {
        return this.panels;
    }

    /**
     * Get the number of rows in the Dashboard.
     * @returns The number of rows the dashboard is divided into.
     */
    public static getRows(): number {
        return get.cssPropertyValue(document.body, "--num-of-rows");
    }

    /**
     * Get the number of columns in the Dashboard.
     * @returns The number of columns the dashboard is divided into.
     */
    public static getCols(): number {
        return get.cssPropertyValue(document.body, "--num-of-cols");
    }

    /**
     * Gets the width of one column/unit.
     * @returns The width of the window divided by the number of columns to get the width of each column in the Dashboard.
     */
    public static getFractionalWidth(): number {
        return window.innerWidth / this.getCols();
    }

    /**
     * Gets the height of one row/unit.
     * @returns The height of the window divided by the number of rows to get the height of each row in the Dashboard.
     */
    public static getFractionalHeight(): number {
        return window.innerHeight / this.getRows();
    }

    /**
     * Whether we are currently in Edit Mode.
     * @returns A boolean representing whether or not we are currently editing the Dashboard panels.
     */
    public isEditing(): boolean {
        return this.classList.contains("in-edit-mode");
    }

    /**
     * Toggles Edit mode for the Dashboard.
     * @returns The current editing status after the toggle.
     */
    public toggleEditMode(): boolean {
        this.classList.toggle("in-edit-mode");
        if (this.isEditing()) {
            const activePanel = document.querySelector(
                "panel-element.hovering",
            );
            if (activePanel) activePanel.dispatchEvent(new Event("mouseleave"));
            return true;
        } else {
            current.panel.classList.remove("configuring");
            return false;
        }
    }

    /**
     * Spawns a Panel of an inputted Type.
     * @remarks
     * This deals with checking potential areas to find an available slot, assigning an ID to the panel, as well as obtaining the default Config for the PanelType.
     * This method then calls the {@link spawnPanel} method with all the resulting information, or triggers an alert if the spawning circumstances were unsuccessful (in other words, if no space was found).
     * @param panelType - The PanelType of the new Panel to spawn.
     * @example
     * ```ts
     * mainDashboard.spawnPanelOfType(PanelType.CLOCK);
     * ```
     * The above attempts to spawn a new Clock panel.
     */
    public spawnPanelOfType(panelType: PanelType): void {
        let finalArea: Area = Area.INIT;
        let slotFound = false;
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
                const potentialArea = new Area(
                    { x, y },
                    panelType.getMinSize(),
                );
                if (!utils.collidesWithAnyPanel(potentialArea)) {
                    finalArea = potentialArea;
                    slotFound = true;
                    break;
                }
            }
            if (slotFound) break;
        }

        if (!slotFound) {
            spawnAlert(
                `No space for a ${panelType.getName()} found. Either move panels around, or delete some!`,
                AlertLevel.WARNING,
            );
            return;
        }
        let id: number;

        if (this.freeIds.size > 0) {
            id = this.freeIds.values().next().value as number;
        } else id = this.panels.length;
        this.freeIds.delete(id);

        const panelToSpawn = new Panel(
            finalArea,
            panelType,
            id,
            getDefaultConfig(panelType.getConfigSchema()),
        );

        this.spawnPanel(panelToSpawn);
    }

    private spawnPanel(panel: Panel, updateStored = true): void {
        panel.addEventListener("updatepanel", () => {
            this.updateStoredPanels();
        });
        this.append(panel);
        this.panels.push(panel);
        if (updateStored) this.updateStoredPanels();
    }

    public deletePanel(panel: Panel): void {
        this.panels.splice(this.panels.indexOf(panel), 1);
        this.freeIds.add(panel.getId());
        this.removeChild(panel);
        if (this.panels.length == 0) this.freeIds.clear();
        deletePanelSection.classList.remove("visible");
        this.updateStoredPanels();
    }

    public organiseElements(): void {
        this.panels?.forEach((i) => {
            i.setArea(i.getArea());
        });
    }

    public load(): Promise<void> {
        return this.loadStoredTheme().then(() => this.loadStoredPanels());
    }

    private loadStoredPanels(): Promise<void> {
        return new Promise(async (resolve) => {
            let loadedIds: number[];
            try {
                loadedIds = JSON.parse(
                    localStorage.getItem("free-panel-ids") as string,
                );
            } catch {
                loadedIds = [];
            }

            this.freeIds = new Set<number>(loadedIds);

            const queriedPanels: Panel[] = [
                ...document.querySelectorAll<Panel>("panel-element"),
            ];

            if (queriedPanels.length != 0) {
                spawnAlert(
                    "Panels in body found. Failed to load panels from storage",
                    AlertLevel.ERROR,
                );
                queriedPanels.forEach((i) => {
                    i.updateArea();
                });
                this.panels = queriedPanels;
                resolve();
                return;
            }

            let loadedPanelInstances: PanelInstance[];
            try {
                loadedPanelInstances = JSON.parse(
                    localStorage.getItem("local-panel-storage") as string,
                );
                if (user)
                    loadedPanelInstances = (
                        await getFromSmorgasBase("panels")
                    )[0].panels as PanelInstance[];
            } catch {
                loadedPanelInstances = [];
            }

            if (loadedPanelInstances.length == 0) {
                spawnAlert(
                    "No stored panels! Initiating base board with a random Panel. To Add more, Right Click and hover on 'Add Panel', and have fun!",
                    AlertLevel.INFO,
                );
                this.freeIds.clear();

                this.spawnPanelOfType(
                    spawnablePanelTypes[
                        Math.floor(Math.random() * spawnablePanelTypes.length)
                    ][1],
                );
                resolve();
                return;
            }
            let numOfPanels = 0;

            loadedPanelInstances.map((i: PanelInstance) => {
                const panelToSpawn: Panel = new Panel(
                    new Area(i.area.pos, i.area.size),
                    PanelType.getTypeFromId(i.panel_type_id),
                    i.panel_id,
                    i.config,
                    i.content,
                );

                this.spawnPanel(panelToSpawn, false);

                panelToSpawn.addEventListener("finished-loading", () => {
                    numOfPanels++;
                    if (numOfPanels == loadedPanelInstances.length) {
                        resolve();
                    }
                });
            });
        });
    }

    public save(): void {
        this.updateStoredPanels();
    }

    private updateStoredPanels(): void {
        const panelStorage: PanelInstance[] = this.panels.map(
            (i): PanelInstance => {
                return {
                    panel_id: parseInt(i.dataset.panelId ?? "0"),
                    panel_type_id: i.getType().getId(),
                    area: {
                        pos: i.getPosition(),
                        size: i.getSize(),
                    },
                    content: JSON.stringify(i.getContent()),
                    config: i.getConfig(),
                };
            },
        );

        localStorage.setItem(
            "local-panel-storage",
            JSON.stringify(panelStorage),
        );
        localStorage.setItem(
            "free-panel-ids",
            JSON.stringify([...this.freeIds]),
        );
    }

    private saveStoredPanelsToCloud(): void {
        console.log("a");
        return;
    }

    public loadStoredTheme(): Promise<void> {
        return new Promise(async (resolve) => {
            const storedTheme: string | null =
                localStorage.getItem("last-theme");
            let storedThemeId: number;

            try {
                storedThemeId = parseInt(storedTheme as string);
                if (user)
                    storedThemeId = (await getFromSmorgasBase("theme"))?.[0]
                        .theme as number;
            } catch {
                storedThemeId = 0;
            }

            this.setCurrentTheme(Object.entries(Theme)[storedThemeId][1]);
            resolve();
        });
    }

    public getCurrentTheme(): Theme {
        return this.currentTheme;
    }

    public setCurrentTheme(theme: Theme): void {
        this.currentTheme = theme;
        let themeFileLink: HTMLElement | null =
            document.querySelector("#app-theme");
        if (themeFileLink == null) {
            themeFileLink = document.createElement("link");
            document.head.appendChild(themeFileLink);
        }
        localStorage.setItem("last-theme", theme.getId().toString());
        try {
            if (user) patchIntoSmorgasBase("theme", theme.getId());
        } catch {
            console.log("Failed to store");
        }
        themeFileLink.setAttribute("href", theme.getUrl());
    }
}

window.customElements.define("smorgas-board", Dashboard);

export { Dashboard };
