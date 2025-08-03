import * as zod from "zod";

/**
 * @description: Different Panel Data Types, the keys of the entries being the type of data content, and the values being their respective ID.
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
 * @description: Different Panel Types/Kinds (Notepad, Default (empty), Preview, etc.), the keys of the entries being the type of panel, and the values being their respective ID.
 *
 * @enum {number}
 */
enum PanelTypeId {
    PREVIEW = -1,
    DEFAULT = 0,
    NOTEPAD = 1,
    PHOTO = 2,
    CLOCK = 3,
}

/**
 * @description: Different Panel Types/Kinds (Notepad, Default (empty), Preview, etc.), the keys of the entries being the type of panel, and the values being their user-friendly names for menus, etc..
 *
 * @enum {number}
 */
enum PanelTypeName {
    PREVIEW = "Preview Panel. You shouldn't be seeing this.",
    DEFAULT = "Default Panel. Or this.",
    NOTEPAD = "Notepad Panel",
    PHOTO = "Photo Panel",
    CLOCK = "Date and Time (Clock) Panel",
}

/**
 * @description: An @enum of different important constants relating to Panel Content, such as the default content for an empty panel.
 *
 * @enum {url}
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
 * @description: An @enum of different important constants relating to Panel Content, such as the default content for an empty panel.
 *
 * @a
 */
class PanelTypeConfig {
    // public readonly NOTEPAD: zod.ZodObject = "https://smorgas-board-backend.vercel.app/definitions/panels/notepad";
    // public readonly PHOTO: zod.ZodObject = "https://smorgas-board-backend.vercel.app/definitions/panels/photo";
    public static readonly CLOCK: PanelTypeConfig = new PanelTypeConfig(zod.strictObject({
        use24HrTime: zod.boolean().default(true),
        showSeconds: zod.boolean().default(false),
        showDate: zod.boolean().default(true),
        dateFormat: zod.literal(["full", "long", "medium", "short"]).default("long"),
    }));

    private constructor(private config: zod.ZodObject) {}

    public getConfig(): zod.ZodObject {
        return this.config;
    }
}

/**
 * @description: PanelType Class, this is class that unifies all information about a panel's type, including the name, data type, and other useful information and methods.
 *
 * @class PanelType
 */
class PanelType {
    
    /**
     * @description: These are all the Defined Panel Types in the project/application. New Types cannot be created during runtime unless needed.
     *
     * @this @alias (PanelDataTypes)
     * @static
     * @memberof PanelType
     */

    static readonly PREVIEW = new PanelType(
        PanelTypeId.PREVIEW,
        PanelTypeName.PREVIEW,
        PanelTypeData.NONE,
        PanelTypeTemplate.PREVIEW
    );
    static readonly DEFAULT = new PanelType(
        PanelTypeId.DEFAULT,
        PanelTypeName.DEFAULT,
        PanelTypeData.NONE,
        PanelTypeTemplate.DEFAULT
    );
    static readonly NOTEPAD = new PanelType(
        PanelTypeId.NOTEPAD,
        PanelTypeName.NOTEPAD,
        PanelTypeData.LOCAL,
        PanelTypeTemplate.NOTEPAD
    );
    static readonly PHOTO = new PanelType(
        PanelTypeId.PHOTO,
        PanelTypeName.PHOTO,
        PanelTypeData.LOCAL,
        PanelTypeTemplate.PHOTO
    );
    static readonly CLOCK = new PanelType(
        PanelTypeId.CLOCK,
        PanelTypeName.CLOCK,
        PanelTypeData.NONE,
        PanelTypeTemplate.CLOCK,
        PanelTypeConfig.CLOCK
    );

    /**
     * @description: Creates an instance of PanelType.
     *
     * NOTE: Similarly to themes, these should not be created at runtime and will instead be set types with set data types and names, unless otherwise is required. All the necessary types are declared at @alias (PanelDataTypes)
     *
     * @constructor
     * @param {number} typeId
     * @param {PanelTypeData} typeData
     * @param {PanelTypeId} typeName
     * @param {PanelTypeTemplate} typeTemplate
     * @memberof PanelType
     */
    private constructor(
        private readonly typeId: PanelTypeId,
        private readonly typeName: PanelTypeName,
        private readonly typeData: PanelTypeData,
        private readonly typeTemplate: PanelTypeTemplate,
        private readonly typeConfig?: PanelTypeConfig
    ) {}

    /**
     * @description: Returns the type name of the Panel type when used in @type {string} contexts
     *
     * @return {string}
     * @memberof PanelType
     */
    public toString(): string {
        return PanelTypeId[this.typeId];
    }

    /**
     * @description: Returns the ID number for this type of panel
     *
     * @return {number}
     * @memberof PanelType
     */
    public getId(): number {
        return this.typeId;
    }

    /**
     * @description: Returns the name of the template for this PanelType
     *
     * @return {string}
     * @memberof PanelType
     */
    public getTemplate(): string {
        return this.typeTemplate;
    }

    public getConfigSchema(): zod.ZodObject | undefined {
        return this.typeConfig?.getConfig();
    }

    /**
     * @description: Returns the panel from @alias (PanelDataTypes) that has @param {id} as a @member {typeId}
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
            case 1:
                return PanelType.NOTEPAD;
            case 2:
                return PanelType.PHOTO;
            case 3:
                return PanelType.CLOCK;
        }

        return PanelType.PREVIEW;
    }
}

export { PanelTypeTemplate, PanelType };
