/**
 * This file contains the definitions for all PanelTypes implemented and
 * utilised in Smorgasboard.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import type * as zod from "zod";

import type { Size } from "../area.js";

import type { Panel } from "./panel.js";
import { PanelTypeBehaviour } from "./panel_type_properties/panel_type_behaviour.js";
import { PanelTypeConfig } from "./panel_type_properties/panel_type_config.js";
import { PanelTypeData } from "./panel_type_properties/panel_type_data.js";
import { PanelTypeId } from "./panel_type_properties/panel_type_id.js";
import { PanelTypeName } from "./panel_type_properties/panel_type_name.js";
import { PanelTypeTemplate } from "./panel_type_properties/panel_type_template.js";

/**
 * The class of a particular Type of Panel utilised in Smorgasboard. The
 * PanelType for each Panel holds information about the numerical ID of the
 * type, the data type, the source of any external data, the config schemas, and
 * more information tied to the specific type of Panel.
 */
class PanelType {
    /*
     * These are all the Defined PanelTypes in the project/application. New
     * Types cannot be created during runtime unless needed.
     */

    static readonly PREVIEW = new PanelType(
        PanelTypeId.PREVIEW,
        PanelTypeName.PREVIEW,
        PanelTypeData.NONE,
        PanelTypeTemplate.PREVIEW,
        PanelTypeConfig.NONE,
        PanelTypeBehaviour.NONE,
    );
    static readonly DEFAULT = new PanelType(
        PanelTypeId.DEFAULT,
        PanelTypeName.DEFAULT,
        PanelTypeData.NONE,
        PanelTypeTemplate.DEFAULT,
        PanelTypeConfig.NONE,
        PanelTypeBehaviour.NONE,
    );
    static readonly NOTEPAD = new PanelType(
        PanelTypeId.NOTEPAD,
        PanelTypeName.NOTEPAD,
        PanelTypeData.LOCAL,
        PanelTypeTemplate.NOTEPAD,
        PanelTypeConfig.NONE,
        PanelTypeBehaviour.NOTEPAD,
        { width: 2, height: 2 },
    );
    static readonly PHOTO = new PanelType(
        PanelTypeId.PHOTO,
        PanelTypeName.PHOTO,
        PanelTypeData.LOCAL,
        PanelTypeTemplate.PHOTO,
        PanelTypeConfig.PHOTO,
        PanelTypeBehaviour.PHOTO,
        { width: 2, height: 2 },
    );
    static readonly CLOCK = new PanelType(
        PanelTypeId.CLOCK,
        PanelTypeName.CLOCK,
        PanelTypeData.NONE,
        PanelTypeTemplate.CLOCK,
        PanelTypeConfig.CLOCK,
        PanelTypeBehaviour.CLOCK,
        { width: 2, height: 1 },
        [
            { width: 2, height: 1 },
            { width: 3, height: 1 },
            { width: 4, height: 1 },
            { width: 5, height: 1 },
            { width: 3, height: 2 },
            { width: 5, height: 2 },
        ],
    );
    static readonly TODO = new PanelType(
        PanelTypeId.TODO,
        PanelTypeName.TODO,
        PanelTypeData.LOCAL,
        PanelTypeTemplate.TODO,
        PanelTypeConfig.TODO,
        PanelTypeBehaviour.TODO,
        { width: 3, height: 2 },
    );
    static readonly WEATHER = new PanelType(
        PanelTypeId.WEATHER,
        PanelTypeName.WEATHER,
        PanelTypeData.EXTERNAL,
        PanelTypeTemplate.WEATHER,
        PanelTypeConfig.WEATHER,
        PanelTypeBehaviour.WEATHER,
        { width: 3, height: 2 },
        [],
        "api/weather",
    );

    /**
     * Creates an instance of PanelType.
     *
     * @remarks
     * Similarly to themes, these should not be created at runtime and will
     * instead be set types with set data types and names, unless otherwise is
     * required. All the necessary types are declared as static instances and
     * members of this class.
     *
     * @param typeId           - The numerical ID for this PanelType.
     * @param typeName         - The user-friendly UI-facing name for the Panel
     *   Type.
     * @param typeData         - The type of data this PanelType uses/stores
     *   (none, local, global, or external).
     * @param typeTemplate     - The panel's template source from the backend.
     *   This is stored in an enum, {@link PanelTypeTemplate}, whose values are
     *   strings.
     * @param typeConfig       - The panel type's config schema. As an object of
     *   type {@link PanelTypeConfig}, which is either a Config object, or
     *   undefined if there is no config for this panel type.
     * @param typeBehaviour    - The panel type's behaviour function, if this
     *   Panel has any post-initialisation behaviour, such as a clock, etc.
     * @param typeMinSize      - The minimum size for this type of panel. If no
     *   custom minimum size is declared, the default value `{1, 1}` is used.
     * @param typeAspectRatios - Any aspect ratios that this panel type has to
     *   have. If it can have any aspect ratio, this array is empty, which is
     *   the default.
     * @param typeDataSource   - If the panel's data type is external, the
     *   source/api route from the backend is stored here.
     *
     * @example
     *
     * ```ts
     * static readonly NOTEPAD = new PanelType(
     *         PanelTypeId.NOTEPAD,
     *         PanelTypeName.NOTEPAD,
     *         PanelTypeData.LOCAL,
     *         PanelTypeTemplate.NOTEPAD,
     *         PanelTypeConfig.NONE,
     *         PanelTypeBehaviour.NOTEPAD,
     *         { width: 2, height: 2 },
     *         [{ width: 1, height: 1 }],
     *     );
     * ```
     *
     * The above is an example of the declaration of the Notepad panel type
     * ({@link NOTEPAD}). It has a minimum size of 2x2 and is only allowed to
     * have an aspect ratio of 1:1, i.e. equal width and height in terms of
     * dashboard cells.
     */
    private constructor(
        private readonly typeId: PanelTypeId,
        private readonly typeName: PanelTypeName,
        private readonly typeData: PanelTypeData,
        private readonly typeTemplate: PanelTypeTemplate,
        private readonly typeConfig: PanelTypeConfig | undefined,
        private readonly typeBehaviour: ((panel: Panel) => void) | null,
        private readonly typeMinSize: Size = { width: 1, height: 1 },
        private readonly typeAspectRatios: Size[] = [],
        private readonly typeDataSource?: string,
    ) {}

    /**
     * Gets the PanelType's internal name when used in printed/string contexts.
     *
     * @remarks
     * This is not the user-facing name, but the internal name used in storing
     * and property objects/enums.
     *
     * @returns The technical stored name for this PanelType.
     *
     * @see {@link PanelTypeId}
     */
    public toString(): string {
        return PanelTypeId[this.typeId];
    }

    /**
     * Gets the numerical ID number for this PanelType.
     *
     * @returns The ID for the PanelType.
     *
     * @see {@link PanelTypeId}
     */
    public getId(): number {
        return this.typeId;
    }

    /**
     * Gets the user-facing name for the PanelType.
     *
     * @remarks
     * This is used in menus, etc.
     *
     * @returns The UI-friendly name.
     *
     * @see {@link PanelTypeName}
     */
    public getName(): string {
        return this.typeName;
    }

    /**
     * Gets the backend URL/route for the template for the PanelType.
     *
     * @returns The route to the template from the backend.
     *
     * @see {@link PanelTypeTemplate}
     */
    public getTemplate(): string {
        return this.typeTemplate;
    }

    /**
     * Gets the Config Schema (if present) for the PanelType.
     *
     * @returns The Config Schema as a Zod schema (if present), or undefined if
     *   the PanelType does not have a dedicated Config.
     *
     * @see {@link PanelTypeConfig}
     * @see {@link zod}
     * @see {@link zod.ZodObject}
     */
    public getConfigSchema(): zod.ZodObject | undefined {
        return this.typeConfig?.getConfig();
    }

    /**
     * Gets the minimum dimensions/size for the PanelType.
     *
     * @returns The minimum size as an object of type Size, or the default 1x1
     *   minimum size was not specified during construction.
     *
     * @see {@link Size}
     * @see {@link getMinWidth | getMinWidth()}
     * @see {@link getMinHeight | getMinHeight()}
     */
    public getMinSize(): Size {
        return this.typeMinSize;
    }

    /**
     * Gets the minimum width for the PanelType.
     *
     * @returns The minimum width of the PanelType in dashboard cell units.
     *   Returns 1 if the default Size of 1x1 was filled in upon constructing
     *   the PanelType.
     *
     * @see {@link getMinSize | getMinSize()}
     * @see {@link getMinHeight | getMinHeight()}
     */
    public getMinWidth(): number {
        return this.typeMinSize.width;
    }

    /**
     * Gets the minimum height for the PanelType.
     *
     * @returns The minimum height of the PanelType in dashboard cell units.
     *   Returns 1 if the default Size of 1x1 was filled in upon constructing
     *   the PanelType.
     *
     * @see {@link getMinSize | getMinSize()}
     * @see {@link getMinWidth | getMinWidth()}
     */
    public getMinHeight(): number {
        return this.typeMinSize.height;
    }

    /**
     * Gets the array of allowed Aspect Ratios for the PanelType.
     *
     * @returns The aspect ratios as an array of Size objects. This will be
     *   empty if there are no specific aspect ratios the PanelType needs to
     *   have.
     */
    public getAspectRatios(): Size[] {
        return this.typeAspectRatios;
    }

    /**
     * Gets the route/URL, if available, of the source of data that the
     * PanelType utilises, most often from the backend directly, unless stated
     * otherwise.
     *
     * @returns The source of the PanelType's data, or undefined if it stores
     *   local data or none at all.
     *
     * @see {@link PanelTypeData}
     */
    public getDataSource(): string | undefined {
        return this.typeDataSource;
    }

    // eslint-disable-next-line jsdoc/require-example
    /**
     * Begins the behaviour of the PanelType, executing the function, if the
     * PanelType has post-initialisation behaviour.
     *
     * @param panel - The Panel object to execute the behaviour.
     */
    public execute(panel: Panel): void {
        if (this.typeBehaviour) this.typeBehaviour(panel);
    }
}

export { PanelType, PanelTypeConfig, PanelTypeTemplate };
