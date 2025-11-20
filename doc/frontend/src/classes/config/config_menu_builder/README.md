[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / frontend/src/classes/config/config_menu_builder

# frontend/src/classes/config/config_menu_builder

This file contains all the logic and functions for procedurally generating a
config menu from a given Config object.

## Remarks

This file contains simple code, yet is one of my proudest parts of this
entire project, as it has provided immaculate scalability, allowing me to
simply define a config schema in a few lines and have a perfectly functional
config menu generated for any new panel type I wish to implement.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## See

- [All Config Entry types and objects](../config_entry/README.md)
- [The Config object type](../config/type-aliases/Config.md)

## Functions

| Function                                                            | Description                                                                                         |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [buildBooleanEntrySelector](functions/buildBooleanEntrySelector.md) | The builder function for a Boolean Config Entry selector, called from the base redirector function. |
| [buildListEntrySelector](functions/buildListEntrySelector.md)       | The builder function for a List Config Entry selector, called from the base redirector function.    |
| [buildNumberEntrySelector](functions/buildNumberEntrySelector.md)   | The builder function for a Number Config Entry selector, called from the base redirector function.  |
| [buildStringEntrySelector](functions/buildStringEntrySelector.md)   | The builder function for a String Config Entry selector, called from the base redirector function.  |
| [builtEntrySelector](functions/builtEntrySelector.md)               | Redirects all calls for built config entry selectors to the properly-typed builder function.        |
| [configMenu](functions/configMenu.md)                               | The entry point for the Config Menu building process.                                               |
