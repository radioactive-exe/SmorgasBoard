import {
    addPanelHandleListeners,
    movePanelHoverHandler,
    exitPanelHoverHandler,
    enterPanelHoverHandler,
    removePanelHoverListeners,
} from "../app.js";
import {
    AreaInstance,
    Coordinate,
    PanelInstance,
    PanelTypeData,
    PanelTypeName,
    PanelTypeTemplate,
    Size,
    Theme,
} from "./types.js";
import { snapElementToGrid } from "../manip.js";
import * as get from "../accessors.js";

/**
 * DESC: This is the Area class. This class holds all information for a Panel or other object, with relevant and helpful methods and members.
 *
 * @class Area
 */
class Area {
    /**
     * DESC: This is a contingency static member used when a Panel needs to be initialised from scratch and either (a) does not have an Area or (b) has one that will be changed right after.
     *
     * @static
     * @memberof Area
     */
    static readonly INIT = new Area({ x: 0, y: 0 }, { width: 1, height: 1 });

    /**
     * DESC: Position of this Area.
     *
     * @private
     * @type {Coordinate}
     * @memberof Area
     */
    private pos: Coordinate;
    /**
     * DESC: Size of this Area.
     *
     * @private
     * @type {Size}
     * @memberof Area
     */
    private size: Size;

    /**
     * DESC: Creates an instance of Area.
     * NOTE: If @param {arg0} is a Coordinate, then we are creating an Area with an input of both a Coordinate and a Size.
     * POINT: If @param {arg0} is of @type {Area}, then @param {arg1} is disregarded, and a new area is instantiated/created as a copy of the other. A console warning is sent out to inform of this. This is an unused instantiation method so far, and will be removed if it remains unused, sticking to Coord-Size instantiation.
     * NOTE: @param {arg1} is set as optional so that we do not have to input a dummy @param {arg1} if instantiating with another Area
     *
     * @constructor
     * @param {(Coordinate | Area)} arg0
     * @param {Size} [arg1]
     * @memberof Area
     */
    public constructor(arg0: Coordinate | Area, arg1?: Size) {
        // INFO: If the passed @param {arg0} is a full Area
        if (arg0 instanceof Area) {
            // INFO: If we passed an extra Size despite passing a full Area, it is announced and discarded.
            if (arg1 != null) {
                console.warn(
                    "Second parameter is unused. First argument (arg0) was a complete Area. To create a new Area with the coordinates of the first parameter and the size in the second parameter, use arg0.getPos()."
                );
            }

            this.pos = arg0.pos;
            this.size = arg0.size;

            // INFO: If the passed @param {arg0} is only a Coordinate
        } else if (!(arg0 instanceof Area)) {
            // INFO: The absolute/fractional nature is dealt with in setCoordinates()
            this.setCoordinates(arg0);

            // INFO: If the user passed only a Coordinate and no second parameter, a default size is created, and it is announced
            if (arg1 == null) {
                this.size = { width: 1, height: 1 };

                console.warn(
                    "No size passed. Area will be initialised with a width and height of 1 fraction."
                );
            } else {
                // INFO: The absolute/fractional nature is dealt with in setSize()
                this.setSize(arg1);
            }
        }
    }

    /**
     * DESC: Returns the X (horizontal) coordinate of the Area
     *
     * @return  {number}
     * @memberof Area
     */
    public getX(): number {
        return this.pos.x;
    }

    /**
     * DESC: Returns the X (horizontal) coordinate of the Area in pixels
     *
     * @return  {number}
     * @memberof Area
     */
    public getAbsoluteX(): number {
        return this.pos.x * get.fractionalWidth();
    }

    /**
     * DESC: Returns the Y (Vertical) coordinate of the Area
     *
     * @return  {number}
     * @memberof Area
     */
    public getY(): number {
        return this.pos.y;
    }

    /**
     * DESC: Returns the Y (Vertical) coordinate of the Area in pixels
     *
     * @return  {number}
     * @memberof Area
     */
    public getAbsoluteY(): number {
        return this.pos.y * get.fractionalHeight();
    }

    /**
     * DESC: Returns the complete position of this Area, as an object of @type {Coordinate}, expressed in absolute pixel quantities.
     *
     * @return  {Coordinate}
     * @memberof Area
     */
    public getCoordinates(): Coordinate {
        return { x: this.pos.x, y: this.pos.y };
    }

    /**
     * DESC: Sets the Area's position from an input.
     *
     * @param {Coordinate} coords
     * @memberof Area
     */
    public setCoordinates(coords: Coordinate): void {
        if (coords.isAbsolute) {
            this.pos = {
                x: Math.round(coords.x / get.fractionalWidth()),
                y: Math.round(coords.y / get.fractionalHeight()),
            };
        } else {
            this.pos = coords;
        }
    }

    /**
     * DESC: Gets the fractional width of the Area.
     *
     * @return  {number}
     * @memberof Area
     */
    public getWidth(): number {
        return this.size.width;
    }

    /**
     * DESC: Gets the absolute width of the Area in pixels.
     *
     * @return  {number}
     * @memberof Area
     */
    public getAbsoluteWidth(): number {
        return this.size.width * get.fractionalWidth();
    }

    /**
     * DESC: Gets the fractional height of the Area.
     *
     * @return  {number}
     * @memberof Area
     */
    public getHeight(): number {
        return this.size.height;
    }

    /**
     * DESC: Gets the absolute height of the Area in pixels.
     *
     * @return  {number}
     * @memberof Area
     */
    public getAbsoluteHeight(): number {
        return this.size.height * get.fractionalHeight();
    }

    /**
     * DESC: Returns the fractional Size of this Area, as an object of @type {Size}.
     *
     * @return  {Size}
     * @memberof Area
     */
    public getSize(): Size {
        return this.size;
    }

    /**
     * DESC: Sets the Area's current Size from an input.
     *
     * @param {Size} size
     * @memberof Area
     */
    public setSize(size: Size): void {
        if (size.isAbsolute) {
            this.size = {
                width: Math.round(size.width / get.fractionalWidth()),
                height: Math.round(size.height / get.fractionalHeight()),
            };
        } else {
            this.size = size;
        }
    }

    /**
     * DESC: Returns a formatted container of this Area's @member {pos} and @member {size}, useful when storing them.
     *
     * @return  {AreaInstance}
     * @memberof Area
     */
    public toJson(): AreaInstance {
        return {
            pos: this.pos,
            size: this.size,
        };
    }

    /**
     * DESC: Returns an Area Object from an input JSON formatted AreaInstance, such as when loading from storage.
     *
     * @return  {Area}
     * @memberof Area
     */
    public static fromJson(json: AreaInstance): Area {
        return new Area(json.pos, json.size);
    }
}

/**
 * DESC: PanelType Class, this is class that unifies all information about a panel's type, including the name, data type, and other useful information and methods.
 *
 * @class PanelType
 */
class PanelType {
    /**
     * DESC: These are all the Defined Panel Types in the project/application. New Types cannot be created during runtime unless needed.
     *
     * @this @alias (PanelDataTypes)
     * @static
     * @memberof PanelType
     */

    static readonly PREVIEW = new PanelType(
        -1,
        PanelTypeData.NONE,
        PanelTypeName.PREVIEW,
        PanelTypeTemplate.PREVIEW
    );
    static readonly DEFAULT = new PanelType(
        0,
        PanelTypeData.NONE,
        PanelTypeName.DEFAULT,
        PanelTypeTemplate.DEFAULT
    );
    static readonly NOTEPAD = new PanelType(
        1,
        PanelTypeData.LOCAL,
        PanelTypeName.NOTEPAD,
        PanelTypeTemplate.NOTEPAD
    );
    static readonly PHOTO = new PanelType(
        2,
        PanelTypeData.LOCAL,
        PanelTypeName.PHOTO,
        PanelTypeTemplate.PHOTO
    );

    /**
     * DESC: Creates an instance of PanelType.
     *
     * NOTE: Similarly to themes, these should not be created at runtime and will instead be set types with set data types and names, unless otherwise is required. All the necessary types are declared at @alias (PanelDataTypes)
     *
     * @constructor
     * @param {number} typeId
     * @param {PanelTypeData} typeData
     * @param {PanelTypeName} typeName
     * @param {PanelTypeTemplate} typeTemplate
     * @memberof PanelType
     */
    private constructor(
        private readonly typeId: number,
        private readonly typeData: PanelTypeData,
        private readonly typeName: PanelTypeName,
        private readonly typeTemplate: PanelTypeTemplate
    ) {}

    /**
     * DESC: Returns the type name of the Panel type when used in @type {string} contexts
     *
     * @return {string}
     * @memberof PanelType
     */
    public toString(): string {
        return PanelTypeName[this.typeId];
    }

    /**
     * DESC: Returns the ID number for this type of panel
     *
     * @return {number}
     * @memberof PanelType
     */
    public getId(): number {
        return this.typeId;
    }

    /**
     * DESC: Returns the name of the template for this PanelType
     *
     * @return {string}
     * @memberof PanelType
     */
    public getTemplate(): string {
        return this.typeTemplate;
    }

    /**
     * DESC: Returns the panel from @alias (PanelDataTypes) that has @param {id} as a @member {typeId}
     *
     * @static
     * @param {number} id
     * @return {PanelType}
     * @memberof PanelType
     */
    public static getTypeFromId(id: number): PanelType {
        switch (id) {
            case 0:
                return PanelType.DEFAULT;
                break;
            case 1:
                return PanelType.NOTEPAD;
                break;
            case 2:
                return PanelType.PHOTO;
                break;
        }

        return PanelType.PREVIEW;
    }
}

abstract class AbstractPanel {

}

/**
 * DESC: A custom HTMLElement, implements many methods for custom use with the program to make work more efficient
 *
 * @class Panel
 * @extends {HTMLElement}
 */
class Panel extends HTMLElement {
    /**
     * DESC: Creates an instance of a Panel.
     *
     * POINT: @param body is optional, but the data member is not, so it is instantiated either way
     *
     * NOTE: The if()s to check @param {body} are nested to assure the compiler that @param {body} is not null by then.
     *
     * @constructor
     * @param {Area} area
     * @param {PanelType} type
     * @param {number} dashboardId
     * @param {string} [body]
     * @memberof Panel
     */
    public constructor(
        private area: Area,
        private type: PanelType,
        private dashboardId: number,
        body?: string
        // private readonly potentialAspectRatios: number[] | null
    ) {
        super();

        this.setArea(area);
        this.setType(type);
        this.init();
        this.dashboardId = dashboardId;
        this.dataset.panelId = dashboardId + "";
        this.dataset.panelType = type.toString();

        if (body) this.setContent(body);
    }

    public getId() {
        return this.dashboardId;
    }

    /**
     * DESC: Gets the Area of the current Panel, as an object of @type {Area}
     *
     * @return  {Area}
     * @memberof Panel
     */
    public getArea(): Area {
        return this.area;
    }

    /**
     * DESC: Sets the Panel's Area with a complete @type {Area} input
     *
     * @param {Area} other
     * @memberof Panel
     */
    public setArea(other: Area): void {
        this.area = new Area(other.getCoordinates(), other.getSize());

        this.style.setProperty("--x", other.getAbsoluteX() + "px");
        this.style.setProperty("--y", other.getAbsoluteY() + "px");

        this.style.setProperty("--width", other.getAbsoluteWidth() + "px");
        this.style.setProperty("--height", other.getAbsoluteHeight() + "px");
    }

    /**
     * DESC: Updates the current Panel's Area with the values in the style, in case there is ever a disconnect between the two. This should never be the case, but it is a contingency. This is for queried Panels, in case they exist. Usually, they won't, but just in case.
     *
     * @memberof Panel
     */
    public updateArea(): void {
        this.setArea(
            new Area(
                {
                    x: get.normalisedCssPropertyValue(this, "--x"),
                    y: get.normalisedCssPropertyValue(this, "--y"),
                    isAbsolute: true,
                },
                {
                    width: get.normalisedCssPropertyValue(this, "--width"),
                    height: get.normalisedCssPropertyValue(this, "--height"),
                    isAbsolute: true,
                }
            )
        );
    }

    /**
     * DESC: Gets the Panel's (Area's) position, as an object of @type {Coordinate}
     *
     * @return  {Coordinate}
     * @memberof Panel
     */
    public getPosition(): Coordinate {
        return this.area.getCoordinates();
    }

    /**
     * DESC: Sets the Panel's position from an input set of numbers.
     *
     * @param {number} x - The x (horizontal) coordinate
     * @param {number} y - The y (vertical) coordinate
     * @memberof Panel
     */
    public setPosition(x: number, y: number): void {
        this.area.setCoordinates({
            x,
            y,
            isAbsolute: true,
        });

        this.style.setProperty("--x", x + "px");
        this.style.setProperty("--y", y + "px");
    }

    /**
     * DESC: Gets the size of the Panel ('s Area) as an object of @type {Size}
     *
     * @return {Size}
     * @memberof Panel
     */
    public getSize(): Size {
        return this.area.getSize();
    }

    /**
     * DESC: Sets the Panel's size from an input set of numbers.
     *
     * @param {number} width
     * @param {number} height
     * @memberof Panel
     */
    public setSize(width: number, height: number): void {
        this.area.setSize({
            width,
            height,
            isAbsolute: true,
        });

        this.style.setProperty("--width", width + "px");
        this.style.setProperty("--height", height + "px");
    }

    /**
     * DESC: Returns the Panel's type, as an object of @type {PanelType}
     *
     * @return {PanelType}
     * @memberof Panel
     */
    public getType(): PanelType {
        return this.type;
    }

    /**
     *  DESC: Sets the Panel Type from a received input of @type {PanelType}
     *
     * @param {PanelType} type
     * @memberof Panel
     */
    public setType(type: PanelType): void {
        this.type = type;
    }

    /**
     * DESC: Initiates the panel's body based on its template
     *
     * @memberof Panel
     */
    private async initTemplate(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            var response = await fetch(this.type.getTemplate()).then((res) =>
                res.json()
            );
            var responseBody = await new DOMParser().parseFromString(
                response.panel_template,
                "text/html"
            );
            const template =
                responseBody.querySelector<HTMLTemplateElement>("template");
            var shadow = this.attachShadow({ mode: "open" });
            if (this.type != PanelType.PREVIEW && template)
                shadow.prepend(template.content.cloneNode(true));
            resolve();
        });
    }

    private async init() {
        this.initTemplate().then(() =>
            this.addHoverListeners().then(() => addPanelHandleListeners(this))
        );
    }

    public addHoverListeners(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.addEventListener("mousemove", movePanelHoverHandler);
            this.addEventListener("mouseleave", exitPanelHoverHandler);
            this.addEventListener("mouseenter", enterPanelHoverHandler);
            resolve();
        });
    }

    public getContent(): Object {
        switch (this.type) {
            case PanelType.NOTEPAD:
                return {
                    body: this.shadowRoot?.querySelector("textarea")?.value,
                };
                break;
        }
        return {};
    }

    public setContent(contentString: string): void {
        const content = JSON.parse(contentString);
        try {
            switch (this.type) {
                case PanelType.NOTEPAD:
                    this.shadowRoot!.querySelector<HTMLTextAreaElement>(
                        "textarea"
                    )!.value = content.body;
                    break;
                case PanelType.PHOTO:
                    this.shadowRoot!.querySelector<HTMLTextAreaElement>(
                        "textarea"
                    )!.value = content.body;
                    break;
            }
        } catch (error) {
            setTimeout(() => {
                this.setContent(contentString);
            }, 50);
        }
    }

    public static defaultPanel(): Panel {
        return new Panel(Area.INIT, PanelType.DEFAULT, 0);
    }
}

class Dashboard extends HTMLElement {
    private panels: Panel[];
    private currentTheme: Theme;
    private freeIds: Set<number> = new Set<number>;

    public constructor() {
        super();

        let shadow = this.attachShadow({ mode: "open" });

        let cells = document.createElement("div");
        cells.part = "cell-container";
        for (var i = 0; i < get.dashboardRows() * get.dashboardCols(); i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.part = "cell";
            cells.append(cell);
        }
        this.shadowRoot?.append(cells);
        this.shadowRoot?.append(document.createElement("slot"));
        this.panels = [];
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
            var activePanel = document.querySelector("panel-element.hovering");
            if (activePanel) activePanel.dispatchEvent(new Event("mouseleave"));
        }
    }

    public spawnPanelOfType(panelType: PanelType) {
        var id;
        if (this.freeIds.size > 0) {
            id = this.freeIds.values().next().value;
            this.freeIds.delete(id)
        } else id = this.panels.length;
        this.spawnPanel(new Panel(Area.INIT, panelType, id));
    }

    public spawnPanel(panel: Panel) {
        this.append(panel);
        this.panels.push(panel);
        this.updateStoredPanels();
    }

    public deletePanel(panel: Panel) {
        this.panels.splice(this.panels.indexOf(panel), 1);
        this.freeIds.add(panel.getId());
        this.removeChild(panel);
        this.updateStoredPanels();
    }

    public organiseElements() {
        this.panels?.forEach((i) => {
            snapElementToGrid(i, i, false);
        });
    }

    public loadStoredPanels(): void {

        var loadedIds: number[] = Array.prototype.concat(
            JSON.parse(localStorage.getItem("free-panel-ids") ?? "[]")
        );

        loadedIds.forEach((i) => {
            this.freeIds.add(i);
        });
        
        let queriedPanels: Panel[] = [
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
            let loadedString = localStorage.getItem("local-panel-storage");

            if (loadedString == null || loadedString == "[]") {
                console.warn("No stored panels! Initiating base board.");

                this.spawnPanelOfType(PanelType.DEFAULT);
            } else {
                let loadedPanels: PanelInstance[] = JSON.parse(loadedString);

                loadedPanels.map(
                    (i: PanelInstance) => {
                        this.spawnPanel(new Panel(
                            new Area(i.area.pos, i.area.size),
                            PanelType.getTypeFromId(i.panel_type_id),
                            i.panel_id,
                            i.content
                        ));
                    }
                );
            }
        }
    }

    public updateStoredPanels() {
        var panelStorage: PanelInstance[] = this.panels.map(
            (i): PanelInstance => {
                // console.log(i.getContent());
                return {
                    panel_id: parseInt(i.dataset.panelId ? i.dataset.panelId : "0"),
                    panel_type_id: i.getType().getId(),
                    area: i.getArea().toJson(),
                    content: JSON.stringify(i.getContent()),
                };
            }
        );
    
        localStorage.setItem("local-panel-storage", JSON.stringify(panelStorage));
        localStorage.setItem("free-panel-ids", JSON.stringify([...this.freeIds]));
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

window.customElements.define("panel-element", Panel);
window.customElements.define("smorgas-board", Dashboard);

export { Area, Panel, PanelType, Dashboard };
