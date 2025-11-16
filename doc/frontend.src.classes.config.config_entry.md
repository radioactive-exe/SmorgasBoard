[Smorgasboard](../wiki/Home) / frontend/src/classes/config/config_entry

# frontend/src/classes/config/config_entry

This file contains all the definitions for config entries, both in the form
of [Zod](https://zod.dev/) schemas, as well as the inferred types for use as types
directly.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Type Aliases

| Type Alias                                                                                            | Description                                                                                 |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [Boolean](../wiki/frontend.src.classes.config.config_entry.TypeAlias.Boolean)                         | The inferred type of the Boolean Config Entry schema for use as a type directly.            |
| [Entry](../wiki/frontend.src.classes.config.config_entry.TypeAlias.Entry)                             | The inferred type of the Base Config Entry schema for use as a type directly.               |
| [ListSelection](../wiki/frontend.src.classes.config.config_entry.TypeAlias.ListSelection)             | The inferred type of the List Selection Config Entry schema for use as a type directly.     |
| [ListSelectionOption](../wiki/frontend.src.classes.config.config_entry.TypeAlias.ListSelectionOption) | The inferred type of an individual List Selection Option schema for use as a type directly. |
| [Number](../wiki/frontend.src.classes.config.config_entry.TypeAlias.Number)                           | The inferred type of the Number Config Entry schema for use as a type directly.             |
| [String](../wiki/frontend.src.classes.config.config_entry.TypeAlias.String)                           | The inferred type of the String Config Entry schema for use as a type directly.             |

## Variables

| Variable                                                                                                         | Description                                                                                    |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [BooleanObject](../wiki/frontend.src.classes.config.config_entry.Variable.BooleanObject)                         | The Zod Schema for a boolean config entry.                                                     |
| [EntryObject](../wiki/frontend.src.classes.config.config_entry.Variable.EntryObject)                             | The Zod Schema for an umbrella config entry.                                                   |
| [ListSelectionObject](../wiki/frontend.src.classes.config.config_entry.Variable.ListSelectionObject)             | The Zod Schema for a list selection/dropdown config entry.                                     |
| [ListSelectionOptionObject](../wiki/frontend.src.classes.config.config_entry.Variable.ListSelectionOptionObject) | The Zod Schema for a single option from the possible options of a List Selection Config Entry. |
| [NumberObject](../wiki/frontend.src.classes.config.config_entry.Variable.NumberObject)                           | The Zod Schema for a numerical/range config entry.                                             |
| [StringObject](../wiki/frontend.src.classes.config.config_entry.Variable.StringObject)                           | The Zod Schema for a string/text config entry.                                                 |
