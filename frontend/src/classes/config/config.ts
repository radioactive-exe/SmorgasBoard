/**
 * The file containing the definition of a {@link Config} object, as well as a
 * method for obtaining an instance of the default of a particular Config
 * Schema, also defined here. The Config change custom event fields are also
 * defined here.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import zod from "zod";

import type { Entry } from "./config_entry.js";

/**
 * The interface holding the shape of a custom event detail for the ConfigChange
 * custom event.
 *
 * @remarks
 * This interface is the payload when a custom event is fired off by
 * changing/selecting a config option, triggering a save and applying the
 * changed config setting.
 */
interface ConfigChangeEventDetail {
    /**
     * The config setting that was changed, obtained from the dataset attributes
     * of the selector that fired it.
     */
    setting: string;
    /**
     * The new value of the changed setting, obtained from the value of the
     * selector upon firing.
     */
    value: string | boolean | number;
}

/**
 * A {@link zod | Zod} schema holding the general shape of a Config schema.
 *
 * @remarks
 * This uses a catchall as the Config object can have any number of config
 * entries.
 *
 * @see {@link zod | Zod}
 * @see {@link Entry | The Config Entry}
 */
const _configSchema: zod.ZodObject = zod
    .object({})
    .catchall(zod.custom<Entry>());

/** The inferred type of the Zod Config schema to be used as a type directly. */
type Config = zod.infer<typeof _configSchema>;

/**
 * Gets a copy of the default config of a particular schema.
 *
 * @remarks
 * If the config schema passed is undefined, then the function returns an
 * undefined response as well. It will return an object populated by the default
 * values of the schema.
 *
 * @param   configSchema - The schema to get a default copy/instance of.
 *
 * @returns              The default Config object for the schema, or undefined
 *   if the schema is undefined.
 *
 * @example
 *
 * ```ts
 * this.config = getDefaultConfig(clockConfigSchema);
 * ```
 *
 * The above obtains an object with the default values and options set in the
 * `clockConfigSchema` Zod schema.
 *
 * @see {@link zod | Zod}
 * @see {@link _configSchema| The Config Schema}
 */
function getDefaultConfig(
    configSchema: zod.ZodObject | undefined,
): Config | undefined {
    if (configSchema == undefined) return undefined;
    return structuredClone(
        Object.fromEntries(
            Object.entries(configSchema.shape).map(([option, value]) => {
                if (value instanceof zod.ZodDefault)
                    return [option, value.def.defaultValue];
                return [option, undefined];
            }),
        ),
    );
}

export { Config, ConfigChangeEventDetail, getDefaultConfig };
