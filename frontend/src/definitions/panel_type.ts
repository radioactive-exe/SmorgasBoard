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
    CLOCK = 3,
}

/**
 * DESC: An @enum of different important constants relating to Panel Content, such as the default content for an empty panel.
 *
 * @enum {number}
 */
enum PanelTypeTemplate {
    BASE = "https://smorgas-board-backend.vercel.app/definitions/panels/base",
    PREVIEW = "https://smorgas-board-backend.vercel.app/definitions/panels/preview",
    DEFAULT = "https://smorgas-board-backend.vercel.app/definitions/panels/default",
    NOTEPAD = "https://smorgas-board-backend.vercel.app/definitions/panels/notepad",
    PHOTO = "https://smorgas-board-backend.vercel.app/definitions/panels/photo",
    CLOCK = "https://smorgas-board-backend.vercel.app/definitions/panels/clock",
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
    static readonly CLOCK = new PanelType(
        3,
        PanelTypeData.NONE,
        PanelTypeName.CLOCK,
        PanelTypeTemplate.CLOCK
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

export { PanelTypeTemplate, PanelType };
