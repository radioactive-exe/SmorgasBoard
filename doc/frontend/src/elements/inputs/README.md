[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / frontend/src/elements/inputs

# frontend/src/elements/inputs

This file contains the functions and logic pertaining to all custom selectors
and inputs.

## Remarks

It includes all listeners, style updates, and custom implementation
behaviour, and it handles all config changes by firing up relevant events.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Variables

| Variable                                                            | Description                                                                          |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [previouslyFocusedSelector](variables/previouslyFocusedSelector.md) | The last focused selector, most often relevant when dealing with dropdown selectors. |

## Functions

| Function                                                  | Description                                                                                                    |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [initDropdownSelector](functions/initDropdownSelector.md) | Adds all relevant listeners and instantiates all necessary variables for the custom dropdown selectors.        |
| [initRangeSelector](functions/initRangeSelector.md)       | Adds all relevant listeners and instantiates all necessary variables for the custom range/numerical selectors. |
| [initStringSelector](functions/initStringSelector.md)     | Adds all relevant listeners and instantiates all necessary variables for the custom text/string selectors.     |
| [initToggleSelector](functions/initToggleSelector.md)     | Adds all relevant listeners and instantiates all necessary variables for the custom checkbox/toggle selectors. |
