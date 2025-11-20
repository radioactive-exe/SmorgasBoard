[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / frontend/src/classes/panel/panel_type_properties/panel_type_behaviour

# frontend/src/classes/panel/panel_type_properties/panel_type_behaviour

This file contains the definitions for the PanelType Behaviour, linking each
executing function with the relevant PanelType.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Variables

| Variable                                              | Description                                                                                                                                                                          |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [PanelTypeBehaviour](variables/PanelTypeBehaviour.md) | The Property object for PanelType Behaviour. Each PanelType is given its executing function from the `panel_behaviour` sibling folder to the current `panel_type_properties` folder. |

## Functions

| Function                                                  | Description                                                                                                                                               |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [processFile](functions/processFile.md)                   | Handles a provided/inputted file, either accepting it and uploading it, or rejecting it and informing the user of the reason.                             |
| [updateTimeAndDate](functions/updateTimeAndDate.md)       | Begins the time/date updating loop, and calls itself.                                                                                                     |
| [validateThenAddEntry](functions/validateThenAddEntry.md) | Validates the function call and then calls the `addTask()` function to execute the actual adding of the task once validated with the appropriate content. |
