/* eslint-disable @typescript-eslint/no-unused-vars */
import * as zod from "zod";

// type ConfigOption = string;
// type ConfigValue = string | boolean | number;

// interface ConfigEntry {
//     option: ConfigOption;
//     value: ConfigValue;
// }

// interface BooleanConfigEntry extends ConfigEntry {
//     value: boolean;
// }
// interface NumberConfigEntry extends ConfigEntry {
//     value: number;
// }
// interface StringConfigEntry extends ConfigEntry {
//     value: string;
// }

// class Config {
//     public static readonly CLOCK = new Config(
//         { option: "use24HrTime", value: false } as BooleanConfigEntry,
//         { option: "use24HrTime", value: false } as BooleanConfigEntry,
//         { option: "use24HrTime", value: false } as BooleanConfigEntry,
//         { option: "use24HrTime", value: false } as BooleanConfigEntry,
//     );
//     private options: Set<ConfigEntry>;

//     private constructor(...entries: ConfigEntry[]) {
//         this.options = new Set<ConfigEntry>(entries);
//     }
// }

const configValueSchema = zod.custom<{arg: string | boolean | number}>();

type ConfigValue = zod.infer<typeof configValueSchema>;

const ConfigSchema: zod.ZodObject = zod.object({
}).catchall(zod.custom<{arg: ConfigValue}>());


type Config = zod.infer<typeof ConfigSchema>;


function getDefaultConfig(configSchema: zod.ZodObject): Config {
    return Object.fromEntries(
        Object.entries(configSchema.shape).map(([option, value]) => {
            if (value instanceof zod.ZodDefault)
                return [option, value.def.defaultValue];
            return [option, undefined];
        })
    );
}

export { Config, getDefaultConfig };
