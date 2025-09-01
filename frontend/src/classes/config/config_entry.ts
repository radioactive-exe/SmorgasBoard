/* eslint-disable import/order */
import zod from "zod";

const EntryObject = zod.object({
    label: zod.string().readonly(),
    value: zod.custom<boolean | string | number>(),
});

const BooleanObject = EntryObject.extend({
    value: zod.boolean(),
});

const StringObject = EntryObject.extend({
    value: zod.string(),
    placeholder: zod.string().readonly(),
});

const NumberObject = EntryObject.extend({
    value: zod.number(),
    range: zod.object({
        min: zod.number().readonly(),
        max: zod.number().readonly(),
        step: zod.number().optional().readonly(),
    }),
});

const ListSelectionOptionObject = zod.object({
    optionLabel: zod.string(),
    optionValue: zod.string(),
});

const ListSelectionObject = EntryObject.extend({
    value: zod.string(),
    possibleOptions: zod.array(ListSelectionOptionObject),
});

type ListSelectionOption = zod.infer<typeof ListSelectionOptionObject>;
type ListSelection = zod.infer<typeof ListSelectionObject>;
type Entry = zod.infer<typeof EntryObject>;
type Boolean = zod.infer<typeof BooleanObject>;
type String = zod.infer<typeof StringObject>;
type Number = zod.infer<typeof NumberObject>;

export {
    // ? Objects
    EntryObject,
    BooleanObject,
    StringObject,
    NumberObject,
    ListSelectionOptionObject,
    ListSelectionObject,
    // ? Types
    ListSelectionOption,
    Boolean,
    Number,
    String,
    ListSelection,
    Entry,
};
