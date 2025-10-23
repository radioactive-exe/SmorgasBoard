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
 * @description PanelType Class, this is class that unifies all information about a panel's type, including the name, data type, and other useful information and methods.
 * @class PanelType
 */
class PanelType {
    /**
     * @description These are all the Defined Panel Types in the project/application. New Types cannot be created during runtime unless needed.
     * @alias (PanelTypes)
     * @static
     * @memberof PanelType
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
        [{ width: 1, height: 1 }],
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
    );

    /**
     * @description Creates an instance of PanelType.
     * NOTE: Similarly to themes, these should not be created at runtime and will instead be set types with set data types and names, unless otherwise is required. All the necessary types are declared at @alias (PanelTypes)
     * @param typeId
     * @param typeName
     * @param typeData
     * @param typeTemplate - The panel's template source from the backend. This is stored in an enum, {@link PanelTypeTemplate}, whose values are strings.
     * @param typeConfig - The panel type's config schema. Either an object of {@link PanelTypeConfig}, which has an object of {@link Config}, or undefined if there is no config for this panel type.
     * @param typeBehaviour - The panel type's behaviour function, if this Panel has any post-initialisation behaviour, such as a clock, etc.
     * @param typeMinSize - The minimum size for this type of panel. If no custom minimum size is declared, the default value {1, 1} is used
     * @param typeAspectRatios - Any aspect ratios that this panel type has to have. If it can have any aspect ratio, this array is empty.
     * @param typeDataSource - If the panel's data type is external, the source/api is stored here
     * @example
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
     * @description Returns the Panel Type's internal name when used in @type {string} contexts
     *
     * @returns{string}
     * @memberof PanelType
     */
    public toString(): string {
        return PanelTypeId[this.typeId];
    }

    /**
     * @description Returns the ID number for this type of panel
     *
     * @returns{number}
     * @memberof PanelType
     */
    public getId(): number {
        return this.typeId;
    }

    public getName(): string {
        return this.typeName;
    }

    /**
     * @description Returns the name of the template for this PanelType
     *
     * @returns{string}
     * @memberof PanelType
     */
    public getTemplate(): string {
        return this.typeTemplate;
    }

    public getConfigSchema(): zod.ZodObject | undefined {
        return this.typeConfig?.getConfig();
    }

    public getMinSize(): Size {
        return this.typeMinSize ?? { width: 1, height: 1 };
    }

    public getMinWidth(): number {
        return this.typeMinSize?.width ?? 1;
    }

    public getMinHeight(): number {
        return this.typeMinSize?.height ?? 1;
    }

    public getAspectRatios(): Size[] {
        return this.typeAspectRatios;
    }

    public execute(panel: Panel): void {
        if (this.typeBehaviour) this.typeBehaviour(panel);
    }
}

export { PanelType, PanelTypeConfig, PanelTypeTemplate };
