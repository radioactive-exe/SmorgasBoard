import * as get from "../functions/accessors.js";
import * as utils from "../functions/util.js";

import { Area, Size } from "./area.js";
import { PanelType } from "./panel_type.js";
import { Panel, PanelInstance } from "./panel.js";
import { deletePanelSection } from "../elements/context_menu.js";
import { AlertLevel, spawnAlert } from "../elements/alert.js";
import { getDefaultConfig } from "./config/config.js";
import { Theme } from "./theme.js";
import { current } from "../app.js";

class Dashboard extends HTMLElement {
    private panels: Panel[];
    private currentTheme: Theme;
    private freeIds: Set<number> = new Set<number>();
    private dimensions: Size;

    public constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const cells = document.createElement("div");
        cells.part = "cell-container";
        for (let i = 0; i < Dashboard.getRows() * Dashboard.getCols(); i++) {
            const cell: HTMLDivElement = document.createElement("div");
            cell.classList.add("cell");
            cell.part = "cell";
            cells.append(cell);
        }
        shadow.append(cells, document.createElement("slot"));

        const storedTheme = localStorage.getItem("last-theme");
        if (storedTheme) {
            Object.entries(Theme).forEach((theme) => {
                if (theme[0] == storedTheme) this.setCurrentTheme(theme[1]);
            });
        }
    }

    public getPanels(): Panel[] {
        return this.panels;
    }

    public getFreeIds(): Set<number> {
        return this.freeIds;
    }

    public static getRows(): number {
        return get.cssPropertyValue(document.body, "--num-of-rows");
    }

    public static getCols(): number {
        return get.cssPropertyValue(document.body, "--num-of-cols");
    }

    public static getFractionalWidth(): number {
        return window.innerWidth / this.getCols();
    }

    public static getFractionalHeight(): number {
        return window.innerHeight / this.getRows();
    }

    public isEditing(): boolean {
        return this.classList.contains("in-edit-mode");
    }

    public toggleEditMode(): void {
        this.classList.toggle("in-edit-mode");
        if (this.isEditing()) {
            const activePanel = document.querySelector(
                "panel-element.hovering",
            );
            if (activePanel) activePanel.dispatchEvent(new Event("mouseleave"));
        } else {
            current.panel.classList.remove("configuring");
        }
    }

    public spawnPanelOfType(panelType: PanelType, updateStored = true): void {
        let finalArea: Area = Area.INIT;
        let slotFound = false;
        let panelToSpawn: Panel;
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

        if (slotFound) {
            let id: number;

            if (this.freeIds.size > 0) {
                id = this.freeIds.values().next().value as number;
            } else id = this.panels.length;
            this.freeIds.delete(id);

            panelToSpawn = new Panel(
                finalArea,
                panelType,
                id,
                getDefaultConfig(panelType.getConfigSchema()),
            );

            this.spawnPanel(panelToSpawn, updateStored);
        } else {
            spawnAlert(
                `No space for a ${panelType.getName()} found. Either move panels around, or delete some!`,
                AlertLevel.WARNING,
            );
        }
    }

    private spawnPanel(panel: Panel, updateStored = true): void {
        panel.addEventListener("updatepanel", () => {
            this.updateStoredPanels();
        });
        current.panel = panel;
        this.append(panel);
        this.panels.push(panel);
        if (updateStored) this.updateStoredPanels();
    }

    public deletePanel(panel: Panel): void {
        this.panels.splice(this.panels.indexOf(panel), 1);
        this.freeIds.add(panel.getId());
        this.removeChild(panel);
        deletePanelSection.classList.remove("visible");
        this.updateStoredPanels();
    }

    public organiseElements(): void {
        this.panels?.forEach((i) => {
            i.setArea(i.getArea());
        });
    }

    public loadStoredPanels(): void {
        this.panels = [];

        const loadedIds: number[] = JSON.parse(
            localStorage.getItem("free-panel-ids") ?? "[]",
        );

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
        } else {
            const loadedString = localStorage.getItem("local-panel-storage");

            if (loadedString == null || loadedString == "[]") {
                spawnAlert(
                    "No stored panels! Initiating base board with a random Panel. To Add more, Right Click and hover on 'Add Panel', and have fun!",
                    AlertLevel.INFO,
                );

                const possiblePanelTypes: PanelType[] = Object.entries(
                    PanelType,
                )
                    .slice(2)
                    .map((type) => {
                        return type[1];
                    });

                this.spawnPanelOfType(
                    possiblePanelTypes[
                        Math.floor(Math.random() * possiblePanelTypes.length)
                    ],
                );
            } else {
                const loadedPanels: PanelInstance[] = JSON.parse(loadedString);

                loadedPanels.map((i: PanelInstance) => {
                    this.spawnPanel(
                        new Panel(
                            new Area(i.area.pos, i.area.size),
                            PanelType.getTypeFromId(i.panel_type_id),
                            i.panel_id,
                            i.config,
                            i.content,
                        ),
                        false,
                    );
                });
            }
        }
    }

    public updateStoredPanels(): void {
        const panelStorage: PanelInstance[] = this.panels.map(
            (i): PanelInstance => {
                return {
                    panel_id: parseInt(i.dataset.panelId ?? "0"),
                    panel_type_id: i.getType().getId(),
                    area: i.getArea().toJson(),
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

    public getCurrentTheme(): Theme {
        return this.currentTheme;
    }

    public setCurrentTheme(theme: Theme): void {
        this.currentTheme = theme;
        const themeFileLink: HTMLElement | null =
            document.querySelector("#app-theme");
        if (themeFileLink == null) return;
        themeFileLink.setAttribute("href", theme.getUrl());
    }
}

window.customElements.define("smorgas-board", Dashboard);

export { Dashboard, Theme };
