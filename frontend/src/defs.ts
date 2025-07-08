import * as utils from "./util.js";
import * as get from "./accessors.js";
import { stringify } from "querystring";
import { movePanelWithinScreen } from "./manip.js";

/**
 * DESC: A Coordinate object, stores the x and y positions of the item they belong to.
 *
 * @this Coordinate */
type Coordinate = {
    x: number;
    y: number;
};

/**
 * DESC: A Size object, stores the width and height of the item they belong to.
 *
 * @this Size */
type Size = {
    width: number;
    height: number;
};

/**
 * DESC: A type that defines the structure of a @type {Area} in its stored format, either in localStorage or the cloud.
 *
 * @this AreaInstance */
type AreaInstance = {
    pos: Coordinate;
    size: Size;
};

/**
 * DESC: A type that defines the structure of a @type {Panel} in its stored format, either in localStorage or the cloud.
 *
 * @this AreaInstance */
type PanelInstance = {
    panel_id: number;
    panel_type_id: number;
    area: AreaInstance;
    content: string;
};

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
    PHOTO = 2
}

/**
 * DESC: An @enum of different important constants relating to Panel Content, such as the default content for an empty panel.
 *
 * @enum {number}
 */
enum PanelContent {
    DEFAULT = `<div class="panel-body"><div class="handle drag-handle">
                    <object data="assets/arrows-alt.svg" type="image/svg+xml"></object>
                </div>
                <div class="handle resize-handle">
                    <object data="assets/arrow-up-right-and-arrow-down-left-from-center.svg" type="image/svg+xml"></object>
                </div>
            </div>`,
}

/**
 * DESC: This is the Area class. This class holds all information for a Panel or other object, with relevant and helpful methods and members.
 *
 * @class Area
 */
class Area {
    /**
     * DESC: This is a contingency static member used when a Panel needs to be initialised, and the Area either (a) does not matter or (b) will be changed right after.
     *
     * @static
     * @memberof Area
     */
    static readonly INIT = new Area(
        { x: 0, y: 0 },
        { width: 100, height: 100 }
    );

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
     * NOTE: If @param arg0 is a Coordinate, then we are creating an Area with an input of both a Coordinate and a Size.
     * POINT: If @param arg0 is of @type {Area}, then @param arg1 is disregarded, and a new area is instantiated/created as a copy of the other. A console warning is sent out to inform of this. This is an unused instantiation method so far, and will be removed if it remains unused, sticking to Coord-Size instantiation.
     * NOTE: @param arg1 is set as optional so that we do not have to input a dummy @param arg1 if instantiating with another Area
     *
     * @constructor
     * @param {(Coordinate | Area)} arg0
     * @param {Size} [arg1]
     * @memberof Area
     */
    public constructor(arg0: Coordinate | Area, arg1?: Size) {
        if (arg0 instanceof Area) {
            if (arg1 != null) {
                console.warn(
                    "Second parameter is unused. First argument (arg0) was a complete Area. To create a new Area with the coordinates of the first parameter and the size in the second parameter, use arg0.getPos()."
                );
            }
            this.pos = arg0.pos;
            this.size = arg0.size;
        } else if (!(arg0 instanceof Area) && arg1 == null) {
            console.warn(
                "No size passed. Area will be initialised with a width and height of 0."
            );
            this.pos = arg0;
            this.size = { width: 0, height: 0 };
        } else {
            this.pos = arg0;
            this.size = <Size>arg1;
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
     * DESC: Returns the Y (Vertical) coordinate of the Area
     *
     * @return  {number}
     * @memberof Area
     */
    public getY(): number {
        return this.pos.y;
    }

    /**
     * DESC: Returns the complete position of this Area, as an object of @type {Coordinate}.
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
        this.pos.x = coords.x;
        this.pos.y = coords.y;
    }

    /**
     * DESC: Gets the width of the Area.
     *
     * @return  {number}
     * @memberof Area
     */
    public getWidth(): number {
        return this.size.width;
    }

    /**
     * DESC: Gets the height of the Area.
     *
     * @return  {number}
     * @memberof Area
     */
    public getHeight(): number {
        return this.size.height;
    }

    /**
     * DESC: Returns the full Size of this Area, as an object of @type {Size}.
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
        this.size.width = size.width;
        this.size.height = size.height;
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
}

/**
 * DESC: A class to facilitate the storage and usage of Themes in the application, with useful fields and methods
 *
 * @class Theme
 */
class Theme {
    /**
     * DESC: These are all the Defined Themes in the project/application. They can be accessed during runtime to switch themes and have any necessary info.
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
     * DESC: Creates an instance of a Theme.
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
        private readonly url: string
    ) // private readonly mode :
    {}

    /**
     * DESC: Returns the name of the theme if it is in a @type {string} context
     *
     * @return {string}
     * @memberof Theme
     */
    public toString(): string {
        return this.name;
    }

    /**
     * DESC: Returns ths URL/Location of the theme, used when setting themes.
     *
     * @return {string}
     * @memberof Theme
     */
    public getUrl(): string {
        return this.url;
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
        PanelTypeName.PREVIEW
    );
    static readonly DEFAULT = new PanelType(
        0,
        PanelTypeData.NONE,
        PanelTypeName.DEFAULT
    );
    static readonly NOTEPAD = new PanelType(
        1,
        PanelTypeData.LOCAL,
        PanelTypeName.NOTEPAD
    );
    static readonly PHOTO = new PanelType(
        2,
        PanelTypeData.LOCAL,
        PanelTypeName.PHOTO
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
     * @memberof PanelType
     */
    private constructor(
        private readonly typeId: number,
        private readonly typeData: PanelTypeData,
        private readonly typeName: PanelTypeName
    ) // private readonly content : PanelContent
    {}

    /**
     * DESC: Returns the type name of the Panel type when used in @type {string} contexts
     *
     * @return {string}
     * @memberof PanelType
     */
    public toString(): string {
        return this.typeName[this.typeId];
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

/**
 * DESC: A custom HTMLElement, implements many methods for custom use with the program to make work more efficient
 *
 * @class Panel
 * @extends {HTMLElement}
 */
class Panel extends HTMLElement {
    /**
     * DESC: The content of the Panel, stored as a string of HTML
     *
     * @private
     * @type {string}
     * @memberof Panel
     */
    private body: string;

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
        // private readonly potentialAspectRatios : number[] | null
    ) {
        super();

        // ? If @param {body} is not received
        if (body == null) {
            // ? If the element contains no HTML, set the default content
            if (this.innerHTML == null) this.body = this.innerHTML;
            else this.body = PanelContent.DEFAULT;
        } else this.body = body;

        this.setArea(area);
        this.setType(type);

        this.dashboardId = dashboardId;
        this.dataset.panelId = dashboardId.toString();
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

        this.style.setProperty("--x", other.getX() + "px");
        this.style.setProperty("--y", other.getY() + "px");

        this.style.setProperty("--width", other.getWidth() + "px");
        this.style.setProperty("--height", other.getHeight() + "px");
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
                },
                {
                    width: get.normalisedCssPropertyValue(this, "--width"),
                    height: get.normalisedCssPropertyValue(this, "--height"),
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
        this.area.setCoordinates({ x: x, y: y });

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
        this.area.setSize({ width: width, height: height });

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
     * DESC: Gets the content of this panel, stored in @member {body}
     *
     * @return {*}  {string}
     * @memberof Panel
     */
    public getContent(): string {
        return this.body;
    }

    /**
     * DESC: Sets the panel's HTML content to that of @member {body}, keeping the HTML and Objects synced
     *
     * NOTE: If through development this is seen as unimportant or avoidable, it will be removed.
     *
     * @memberof Panel
     */
    public updateContent(): void {
        this.innerHTML = this.body;
    }
}

window.customElements.define("panel-element", Panel);

export {
    Coordinate,
    Area,
    AreaInstance,
    Theme,
    Panel,
    PanelInstance,
    PanelType,
    PanelTypeData,
    PanelTypeName,
    PanelContent,
};
