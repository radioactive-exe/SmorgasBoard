/* eslint-disable @typescript-eslint/no-unused-vars */
import * as zod from "zod";

// type ConfigOption = string;

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

// const configValueSchema = zod.custom<{arg: string | boolean | number}>();

// type ConfigValue = zod.infer<typeof configValueSchema>;
// interface ConfigEntry {
//     label: string;
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

// interface EnumConfigEntry extends ConfigEntry {
//     value: Enumerator;
// }

type ConfigValue = zod.ZodString | zod.ZodBoolean | zod.ZodNumber;

const ConfigEntryObject = zod.object({
    label: zod.string().readonly(),
    value: zod.custom<ConfigValue>(),
});

const BooleanConfigEntryObject = ConfigEntryObject.extend({
    value: zod.boolean(),
});

const StringConfigEntryObject = ConfigEntryObject.extend({
    value: zod.string(),
});

const NumberConfigEntryObject = ConfigEntryObject.extend({
    value: zod.number(),
    range: {min: zod.number().readonly(), max: zod.number().readonly()},
});

type ConfigEntry = zod.infer<typeof ConfigEntryObject>;
type BooleanConfigEntry = zod.infer<typeof BooleanConfigEntryObject>;
type StringConfigEntry = zod.infer<typeof StringConfigEntryObject>;
type NumberConfigEntry = zod.infer<typeof NumberConfigEntryObject>;

const ConfigSchema: zod.ZodObject = zod
    .object({})
    .catchall(zod.custom<{ arg: ConfigEntry }>());

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

export {
    BooleanConfigEntry,
    NumberConfigEntry,
    StringConfigEntry,
    ConfigSchema,
    Config,
    getDefaultConfig,
};
