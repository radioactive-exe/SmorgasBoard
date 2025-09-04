import zod from "zod";

import type { Entry } from "./config_entry.js";

interface ConfigChangeEventDetail {
    setting: string;
    value: string | boolean | number;
}

const _configSchema: zod.ZodObject = zod
    .object({})
    .catchall(zod.custom<Entry>());

type Config = zod.infer<typeof _configSchema>;

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
