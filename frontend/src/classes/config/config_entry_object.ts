import zod from "zod";

type ConfigValue = zod.ZodString | zod.ZodBoolean | zod.ZodNumber;

const Base = zod.object({
    label: zod.string().readonly(),
    value: zod.custom<ConfigValue>(),
});

const Boolean = Base.extend({
    value: zod.boolean(),
});

const String = Base.extend({
    value: zod.string(),
});

const Number = Base.extend({
    value: zod.number(),
    range: { min: zod.number().readonly(), max: zod.number().readonly() },
});

const ListSelectionOption = zod.object({
    optionLabel: zod.string(),
    optionValue: zod.string(),
});

const ListSelection = Base.extend({
    value: zod.string(),
    possibleOptions: zod.array(ListSelectionOption),
});

export { Base, Boolean, Number, String, ListSelectionOption, ListSelection };
