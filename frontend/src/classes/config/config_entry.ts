/**
 * This file contains all the definitions for config entries, both in the form
 * of {@link zod | Zod} schemas, as well as the inferred types for use as types
 * directly.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import zod from "zod";

// ~ THE SCHEMAS

/**
 * The Zod Schema for an umbrella config entry.
 *
 * @see {@link Entry | The Entry type}
 * @see {@link zod.ZodObject | Zod Schemas}
 */
const EntryObject = zod.object({
    label: zod.string().readonly(),
    value: zod.custom<boolean | string | number>(),
});

/**
 * The Zod Schema for a boolean config entry.
 *
 * @see {@link EntryObject | The Entry Zod schema}
 * @see {@link Entry | The Entry type}
 * @see {@link Boolean | The Boolean Entry type}
 */
const BooleanObject = EntryObject.extend({
    value: zod.boolean(),
});

/**
 * The Zod Schema for a string/text config entry.
 *
 * @see {@link EntryObject | The Entry Zod schema}
 * @see {@link Entry | The Entry type}
 * @see {@link String | The String Entry type}
 */
const StringObject = EntryObject.extend({
    value: zod.string(),
    placeholder: zod.string().readonly(),
});

/**
 * The Zod Schema for a numerical/range config entry.
 *
 * @see {@link EntryObject | The Entry Zod schema}
 * @see {@link Entry | The Entry type}
 * @see {@link Number | The Number Entry type}
 */
const NumberObject = EntryObject.extend({
    value: zod.number(),
    range: zod.object({
        min: zod.number().readonly(),
        max: zod.number().readonly(),
        step: zod.number().optional().readonly(),
    }),
});

/**
 * The Zod Schema for a single option from the possible options of a List
 * Selection Config Entry.
 *
 * @see {@link ListSelectionObject | The List Selection Entry schema}
 * @see {@link ListSelectionOption | The List Selection Option type}
 */
const ListSelectionOptionObject = zod.object({
    optionLabel: zod.string(),
    optionValue: zod.string(),
});

/**
 * The Zod Schema for a list selection/dropdown config entry.
 *
 * @see {@link EntryObject | The Base Entry schema}
 * @see {@link Entry | The Entry type}
 * @see {@link ListSelection | The List Selection Entry type}
 * @see {@link ListSelectionOption | The List Selection Option type}
 */
const ListSelectionObject = EntryObject.extend({
    value: zod.string(),
    possibleOptions: zod.array(ListSelectionOptionObject),
});

// ~ THE INFERRED TYPES

/**
 * The inferred type of the Base Config Entry schema for use as a type directly.
 *
 * @see {@link zod.infer | Zod type inferring}
 * @see {@link Boolean | The Boolean Entry type}
 * @see {@link String | The String Entry type}
 * @see {@link Number | The Number Entry type}
 * @see {@link EntryObject | The Base Entry schema}
 */
type Entry = zod.infer<typeof EntryObject>;
/**
 * The inferred type of the Boolean Config Entry schema for use as a type
 * directly.
 *
 * @see {@link Entry | The Base Entry type}
 * @see {@link zod.infer | Zod type inferring}
 * @see {@link BooleanObject | The Boolean Entry schema}
 */
type Boolean = zod.infer<typeof BooleanObject>;
/**
 * The inferred type of the String Config Entry schema for use as a type
 * directly.
 *
 * @see {@link Entry | The Base Entry type}
 * @see {@link zod.infer | Zod type inferring}
 * @see {@link StringObject | The String Entry schema}
 */
type String = zod.infer<typeof StringObject>;
/**
 * The inferred type of the Number Config Entry schema for use as a type
 * directly.
 *
 * @see {@link Entry | The Base Entry type}
 * @see {@link zod.infer | Zod type inferring}
 * @see {@link NumberObject | The Number Entry schema}
 */
type Number = zod.infer<typeof NumberObject>;
/**
 * The inferred type of an individual List Selection Option schema for use as a
 * type directly.
 *
 * @see {@link Entry | The Base Entry type}
 * @see {@link zod.infer | Zod type inferring}
 * @see {@link ListSelectionOptionObject | The List Selection Option schema}
 */
type ListSelectionOption = zod.infer<typeof ListSelectionOptionObject>;
/**
 * The inferred type of the List Selection Config Entry schema for use as a type
 * directly.
 *
 * @see {@link zod | Zod}
 * @see {@link ListSelectionObject | The List Selection Entry schema}
 * @see {@link ListSelectionOption | The List Selection Option type}
 */
type ListSelection = zod.infer<typeof ListSelectionObject>;

export {
    Boolean,
    BooleanObject,
    Entry,
    EntryObject,
    ListSelection,
    ListSelectionObject,
    ListSelectionOption,
    ListSelectionOptionObject,
    Number,
    NumberObject,
    String,
    StringObject,
};
