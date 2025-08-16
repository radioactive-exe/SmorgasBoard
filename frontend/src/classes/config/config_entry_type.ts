import * as zod from "zod";
import * as ConfigEntryObject from "./config_entry_object.js";

type ListSelectionOption = zod.infer<
    typeof ConfigEntryObject.ListSelectionOption
>;
type ListSelection = zod.infer<typeof ConfigEntryObject.ListSelection>;
type Entry = zod.infer<typeof ConfigEntryObject.Base>;
type Boolean = zod.infer<typeof ConfigEntryObject.Boolean>;
type String = zod.infer<typeof ConfigEntryObject.String>;
type Number = zod.infer<typeof ConfigEntryObject.Number>;

export { ListSelectionOption, Boolean, Number, String, ListSelection, Entry };
