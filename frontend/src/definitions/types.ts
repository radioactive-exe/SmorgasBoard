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
        private readonly url: string // private readonly mode:
    ) {}

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
 * DESC: A Coordinate object, stores the x and y positions of the item they belong to.
 *
 *  @property {isAbsolute} - This member is passed when we are passing these types in functions and constructors. Having this optional member allows us to be able to instantiate and pass Areas and Coordinates in both fractional and absolute units without having to (a) do a lot of calculations in the function call scope, or (b) take in an extra parameter in the functions.
 * @this Coordinate */
interface Coordinate {
    x: number;
    y: number;
    isAbsolute?: boolean;
}

/**
 * DESC: A Size object, stores the width and height of the item they belong to.
 *
 * @property {isAbsolute} - This member is passed when we are passing these types in functions and constructors. Having this optional member allows us to be able to instantiate and pass Areas and Sizes in both fractional and absolute units without having to (a) do a lot of calculations in the function call scope, or (b) take in an extra parameter in the functions.
 * @this Size */
interface Size {
    width: number;
    height: number;
    isAbsolute?: boolean;
}

/**
 * DESC: A RotationOffset object, stores the offset in degrees and offset to any shadow if needed. This is declared to make functions and eliminating code repetition easier.
 *
 * @this Size */
interface Offset {
    rotation: {
        x: number;
        y: number;
    };
    shadow: {
        x: number;
        y: number;
    };
}

/**
 * DESC: A type that defines the structure of a @type {Area} in its stored format, either in localStorage or the cloud. It is stored in fractional units to later be instantiated appropriately
 *
 * @this AreaInstance */
interface AreaInstance {
    pos: Coordinate;
    size: Size;
};

/**
 * DESC: A type that defines the structure of a @type {Panel} in its stored format, either in localStorage or the cloud.
 *
 * @this PanelInstance */
interface PanelInstance {
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

export {
    Offset,
    Coordinate,
    Size,
    AreaInstance,
    Theme,
    PanelInstance,
    PanelTypeData,
    PanelTypeName,
    PanelTypeTemplate
};
