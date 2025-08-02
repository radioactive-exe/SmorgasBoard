import * as get from "../accessors.js";

import { Area } from "./area.js";
import { PanelType } from "./panel_type.js";
import { Panel, PanelInstance } from "./panel.js";

import { snapElementToGrid } from "../manip.js";

/**
 * @description: A class to facilitate the storage and usage of Themes in the application, with useful fields and methods
 *
 * @class Theme
 */
class Theme {
    /**
     * @description: These are all the Defined Themes in the project/application. They can be accessed during runtime to switch themes and have any necessary info.
     *
     *
     * @static
     * @memberof Theme
     */

    static readonly DEFAULT = new Theme(
        0,
        "default",
        "/frontend/public/themes/default.css"
    );
    static readonly YELLOW = new Theme(
        1,
        "yellow",
        "/frontend/public/themes/yellow.css"
    );

    // TODO Implement Mode preference themes like Light and Dark Mode

    /**
     * @description: Creates an instance of a Theme.
     *
     * NOTE: Constructor is private so we cannot create any other themes during runtime.
     *
     * @constructor
     * @param {number} id
     * @param {string} name
     * @param {string} url
     * @memberof Theme
     */
    private constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly url: string // private readonly mode:
    ) {}

    /**
     * @description: Returns the name of the theme if it is in a @type {string} context
     *
     * @return {string}
     * @memberof Theme
     */
    public toString(): string {
        return this.name;
    }

    /**
     * @description: Returns ths URL/Location of the theme, used when setting themes.
     *
     * @return {string}
     * @memberof Theme
     */
    public getUrl(): string {
        return this.url;
    }
}

class Dashboard extends HTMLElement {
    private panels: Panel[];
    private currentTheme: Theme;
    private freeIds: Set<number> = new Set<number>();

    public constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const cells = document.createElement("div");
        cells.part = "cell-container";
        for (let i = 0; i < get.dashboardRows() * get.dashboardCols(); i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.part = "cell";
            cells.append(cell);
        }
        shadow.append(cells);
        shadow.append(document.createElement("slot"));
        this.loadStoredPanels();
    }

    public getPanels(): Panel[] {
        return this.panels;
    }

    public getFreeIds(): Set<number> {
        return this.freeIds;
    }

    public isEditing(): boolean {
        return this.classList.contains("in-edit-mode");
    }

    public toggleEditMode(): void {
        this.classList.toggle("in-edit-mode");
        if (this.isEditing()) {
            const activePanel = document.querySelector(
                "panel-element.hovering"
            );
            if (activePanel) activePanel.dispatchEvent(new Event("mouseleave"));
        }
    }

    public spawnPanelOfType(panelType: PanelType, updateStored = true): void {
        let id: number;
        if (this.freeIds.size > 0) {
            id = this.freeIds.values().next().value ?? 0;
            this.freeIds.delete(id);
        } else id = this.panels.length;
        this.spawnPanel(new Panel(Area.INIT, panelType, id), updateStored);
    }

    public spawnPanel(panel: Panel, updateStored = true): void {
        this.append(panel);
        this.panels.push(panel);
        if (updateStored) this.updateStoredPanels();
    }

    public deletePanel(panel: Panel): void {
        this.panels.splice(this.panels.indexOf(panel), 1);
        this.freeIds.add(panel.getId());
        this.removeChild(panel);
        this.updateStoredPanels();
    }

    public organiseElements(): void {
        this.panels?.forEach((i) => {
            snapElementToGrid(i, i, false);
        });
    }

    public loadStoredPanels(): void {

        this.panels = [];

        const loadedIds: number[] = JSON.parse(
            localStorage.getItem("free-panel-ids") ?? "[]"
        );

        loadedIds.forEach((i) => {
            this.freeIds.add(i);
        });

        const queriedPanels: Panel[] = [
            ...document.querySelectorAll<Panel>("panel-element"),
        ];

        if (queriedPanels.length != 0) {
            console.warn(
                "Panels in body found. Failed to load panels from storage"
            );
            queriedPanels.forEach((i) => {
                i.updateArea();
            });
            this.panels = queriedPanels;
        } else {
            const loadedString = localStorage.getItem("local-panel-storage");

            if (loadedString == null || loadedString == "[]") {
                console.warn("No stored panels! Initiating base board.");

                this.spawnPanelOfType(PanelType.DEFAULT);
            } else {
                const loadedPanels: PanelInstance[] = JSON.parse(loadedString);

                loadedPanels.map((i: PanelInstance) => {
                    this.spawnPanel(
                        new Panel(
                            new Area(i.area.pos, i.area.size),
                            PanelType.getTypeFromId(i.panel_type_id),
                            i.panel_id,
                            i.content
                        ),
                        false
                    );
                });
            }
        }
    }

    public updateStoredPanels(): void {
        const panelStorage: PanelInstance[] = this.panels.map(
            (i): PanelInstance => {
                return {
                    panel_id: parseInt(
                        i.dataset.panelId ? i.dataset.panelId : "0"
                    ),
                    panel_type_id: i.getType().getId(),
                    area: i.getArea().toJson(),
                    content: JSON.stringify(i.getContent()),
                };
            }
        );

        localStorage.setItem(
            "local-panel-storage",
            JSON.stringify(panelStorage)
        );
        localStorage.setItem(
            "free-panel-ids",
            JSON.stringify([...this.freeIds])
        );
    }

    public getCurrentTheme(): Theme {
        return this.currentTheme;
    }

    public setCurrentTheme(theme: Theme): void {
        this.currentTheme = theme;
        const themeFileLink: HTMLElement | null =
            document.querySelector<HTMLElement>("#app-theme");
        if (themeFileLink == null) return;
        themeFileLink.setAttribute("href", theme.getUrl());
    }
}

window.customElements.define("smorgas-board", Dashboard);

export { Dashboard, Theme };
