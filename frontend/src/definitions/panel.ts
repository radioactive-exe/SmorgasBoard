/* eslint-disable no-async-promise-executor */
import * as get from "../accessors.js";

import { Coordinate, Size, AreaInstance, Area } from "./area.js";

import { addPanelHandleListeners, movePanelHoverHandler, exitPanelHoverHandler, enterPanelHoverHandler } from "../app.js";

/**
 * DESC: A type that defines the structure of a @type {Panel} in its stored format, either in localStorage or the cloud.
 *
 * @this PanelInstance */
interface PanelInstance {
    panel_id: number;
    panel_type_id: number;
    area: AreaInstance;
    content: string;
}

/**
 * DESC: Different Panel Data Types, the keys of the entries being the type of data content, and the values being their respective ID.
 *
 * @enum {number}
 */
enum PanelTypeData {
    NONE = -1,
    LOCAL = 0,
    GLOBAL = 1,
    EXTERNAL = 2,
}

/**
 * DESC: Different Panel Types/Kinds (Notepad, Default (empty), Preview, etc.), the keys of the entries being the type of panel, and the values being their respective ID.
 *
 * @enum {number}
 */
enum PanelTypeName {
    PREVIEW = -1,
    DEFAULT = 0,
    NOTEPAD = 1,
    PHOTO = 2,
}

/**
 * DESC: An @enum of different important constants relating to Panel Content, such as the default content for an empty panel.
 *
 * @enum {number}
 */
enum PanelTypeTemplate {
    PREVIEW = "https://smorgas-board-backend.vercel.app/definitions/panels/preview",
    DEFAULT = "https://smorgas-board-backend.vercel.app/definitions/panels/default",
    NOTEPAD = "https://smorgas-board-backend.vercel.app/definitions/panels/notepad",
    PHOTO = "https://smorgas-board-backend.vercel.app/definitions/panels/photo",
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

class PanelTemplate extends HTMLTemplateElement {
    public constructor() {
        super();
        this.init();
    }
    content: DocumentFragment;
    shadowRootClonable: boolean;
    shadowRootDelegatesFocus: boolean;
    shadowRootMode: string;
    shadowRootSerializable: boolean;

    private async init(): Promise<void> {
        return new Promise(async (resolve) => {
            const response = await fetch(
                "https://smorgas-board-backend.vercel.app/definitions/panels/base"
            ).then((res) => res.json());
            const responseBody = await new DOMParser().parseFromString(
                response.panel_template,
                "text/html"
            );
            const template =
            responseBody.querySelector<HTMLTemplateElement>("template");
            const shadow = this.attachShadow({ mode: "open" });
            if (template)
                shadow.prepend(template.content.cloneNode(true));
            console.log(this);
            resolve();
        });
    }
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
        this.dataset.panelId = dashboardId.toString();
        this.dataset.panelType = type.toString();

        if (body) this.setContent(body);
    }

    public getId(): number {
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
        return new Promise(async (resolve) => {
            const response = await fetch(this.type.getTemplate()).then((res) =>
                res.json()
            );
            const responseBody = await new DOMParser().parseFromString(
                response.panel_template,
                "text/html"
            );
            const template: PanelTemplate =
            responseBody.querySelector("panel-template") as PanelTemplate ?? document.createElement("panel-template") as PanelTemplate;
            const shadow = this.attachShadow({ mode: "open" });
            if (this.type != PanelType.PREVIEW && template)
                shadow.prepend(template.content.cloneNode(true));
            resolve();
        });
    }

    private async init(): Promise<void> {
        this.initTemplate().then(() =>
            this.addHoverListeners().then(() => addPanelHandleListeners(this))
        );
    }

    public addHoverListeners(): Promise<void> {
        return new Promise((resolve) => {
            this.addEventListener("mousemove", movePanelHoverHandler);
            this.addEventListener("mouseleave", exitPanelHoverHandler);
            this.addEventListener("mouseenter", enterPanelHoverHandler);
            resolve();
        });
    }

    public getContent(): object {
        switch (this.type) {
            case PanelType.NOTEPAD:
                return {
                    body:
                        this.shadowRoot?.querySelector("textarea")?.value ?? "",
                };
                break;
        }
        return {};
    }

    public setContent(contentString: string): void {
        const content = JSON.parse(contentString);
        let focus;
        try {
            if (this.shadowRoot == null) return;
            switch (this.type) {
                case PanelType.NOTEPAD:
                    focus =
                        this.shadowRoot?.querySelector<HTMLTextAreaElement>(
                            "textarea"
                        );
                    if (focus) focus.value = content.body;
                    break;
                case PanelType.PHOTO:
                    focus =
                        this.shadowRoot?.querySelector<HTMLTextAreaElement>(
                            "textarea"
                        );
                    if (focus) focus.value = content.body;
                    break;
            }
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                this.setContent(contentString);
            }, 50);
        }
    }

    public static defaultPanel(): Panel {
        return new Panel(Area.INIT, PanelType.DEFAULT, 0);
    }
}

window.customElements.define("panel-element", Panel);
window.customElements.define("panel-template", PanelTemplate, {extends: "template"});

export {
    PanelType,
    PanelTypeData,
    PanelTypeName,
    PanelTypeTemplate,
    PanelInstance,
    Panel
}