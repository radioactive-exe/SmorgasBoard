/**
 * This file contains the definitions for all the Panel Config schemas and
 * objects.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import zod from "zod";

import { isValidOption } from "../../../functions/util.js";
import type * as ConfigEntry from "../../config/config_entry.js";

/**
 * The class that contains all defined Configuration schemas for Smorgasboard
 * panel types.
 *
 * @remarks
 * The PanelTypeConfig's are all in this class as static members, each named as
 * the PanelType they belong to.
 *
 * @see {@link zod.ZodObject}
 * @see {@link ConfigEntry}
 */
class PanelTypeConfig {
    /** This member is assigned to any PanelType that does not have a config. */
    public static readonly NONE: undefined = undefined;

    public static readonly CLOCK: PanelTypeConfig = new PanelTypeConfig(
        zod.strictObject({
            use24HrTime: zod.custom<ConfigEntry.Boolean>().default({
                label: "Use 24-hour Time",
                value: true,
            }),
            showSeconds: zod.custom<ConfigEntry.Boolean>().default({
                label: "Show Seconds",
                value: false,
            }),
            showDate: zod.custom<ConfigEntry.Boolean>().default({
                label: "Show Date above Time",
                value: true,
            }),
            dateFormat: zod
                .custom<ConfigEntry.ListSelection>((entry) => {
                    const options: ConfigEntry.ListSelectionOption[] = [
                        {
                            optionLabel: "Full, including weekday",
                            optionValue: "full",
                        },
                        {
                            optionLabel: "Long - Month spelled out",
                            optionValue: "long",
                        },
                        {
                            optionLabel: "Short - DD/MM/YYYY",
                            optionValue: "short",
                        },
                    ];
                    return isValidOption(
                        options,
                        (entry as ConfigEntry.ListSelection).value,
                    );
                })
                .default({
                    label: "Date Format (if shown)",
                    value: "full",
                    possibleOptions: [
                        {
                            optionLabel: "Full, including weekday",
                            optionValue: "full",
                        },
                        {
                            optionLabel: "Long - Month spelled out",
                            optionValue: "long",
                        },
                        {
                            optionLabel: "Short - DD/MM/YYYY",
                            optionValue: "short",
                        },
                    ],
                }),
        }),
    );
    public static readonly PHOTO: PanelTypeConfig = new PanelTypeConfig(
        zod.strictObject({
            fillFrame: zod.custom<ConfigEntry.Boolean>().default({
                label: "Fill Panel Frame with Image",
                value: false,
            }),
        }),
    );
    public static readonly TODO: PanelTypeConfig = new PanelTypeConfig(
        zod.strictObject({
            listTitle: zod.custom<ConfigEntry.String>().default({
                label: "List Title",
                value: "To-Do List",
                placeholder: "Title",
            }),
        }),
    );
    public static readonly WEATHER: PanelTypeConfig = new PanelTypeConfig(
        zod.strictObject({
            use24HrTime: zod.custom<ConfigEntry.Boolean>().default({
                label: "Use 24-hour Time",
                value: true,
            }),
            useCelsius: zod.custom<ConfigEntry.Boolean>().default({
                label: "Show Temperatures in Celsius",
                value: true,
            }),
        }),
    );

    /**
     * Creates an instance of PanelTypeConfig.
     *
     * @remarks
     * The constructor is private so that no new PanelType configs are declared
     * at runtime, they are all already established.
     *
     * @param config - The Zod schema defining the shape of the Config object
     *   for that panel type.
     *
     * @example
     *
     * See the static members of this class for examples.
     */
    private constructor(private config: zod.ZodObject) {}

    /**
     * Gets the stored schema as a Zod Object directly.
     *
     * @returns The Zod Object/Schema for the PanelType Config.
     */
    public getConfig(): zod.ZodObject {
        return this.config;
    }
}

export { PanelTypeConfig };
