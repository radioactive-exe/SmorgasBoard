import zod from "zod";

import { Entry } from "./config_entry.js";

interface ConfigChangeEventDetail {
    setting: string;
    value: string | boolean | number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ConfigSchema: zod.ZodObject = zod
    .object({})
    .catchall(zod.custom<Entry>());

type Config = zod.infer<typeof ConfigSchema>;

function getDefaultConfig(
    configSchema: zod.ZodObject | undefined,
): Config | undefined {
    if (configSchema == undefined) return undefined;
    return structuredClone(Object.fromEntries(
        Object.entries(configSchema.shape).map(([option, value]) => {
            if (value instanceof zod.ZodDefault)
                return [option, value.def.defaultValue];
            return [option, undefined];
        }),
    ));
}

export { Config, ConfigChangeEventDetail, getDefaultConfig };
