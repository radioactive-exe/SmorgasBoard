[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / frontend/src/elements/context_menu

# frontend/src/elements/context_menu

This file contains all logic, functions, and variables regarding the context
menu.

## Remarks

This includes the showing, keeping, and hiding of the context menu, as well
as handling the logic and positioning for its submenus depending on the
position of the context menu's appearance.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Variables

| Variable                                              | Description                                                                                |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [contextMenu](variables/contextMenu.md)               | The context menu container.                                                                |
| [deletePanelButton](variables/deletePanelButton.md)   | The button to delete the panel focused on if the deletion section is visible.              |
| [deletePanelSection](variables/deletePanelSection.md) | The section of the context menu that houses the delete button and a menu spacer.           |
| [dimensionsMenu](variables/dimensionsMenu.md)         | The matrix/dimensions selection grid menu housed inside the dimensions context menu entry. |
| [editModeButton](variables/editModeButton.md)         | The button to toggle the dashboard's edit mode.                                            |
| [hoverEntries](variables/hoverEntries.md)             | The hover entries in the context menu.                                                     |
| [innerMenu](variables/innerMenu.md)                   | The actual visual menu that is rendered with all the sections and entries.                 |
| [panelMenu](variables/panelMenu.md)                   | The Panel spawning menu housed inside the panel context menu entry.                        |
| [themeMenu](variables/themeMenu.md)                   | The theme selection menu housed inside the theme context menu entry.                       |

## Functions

| Function                                                        | Description                                                                                                                                                   |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [contextMenuClickHandler](functions/contextMenuClickHandler.md) | Handles the right click/context menu click event, spawning the context menu based on the click location and showing/hiding the deletion section as necessary. |
| [contextMenuNavHandler](functions/contextMenuNavHandler.md)     | Handles spawning the context menu by clicking the navigation entry for it.                                                                                    |
| [fitContextMenuOnScreen](functions/fitContextMenuOnScreen.md)   | Ensures that the context menu stays on screen after a structure change.                                                                                       |
| [keepContextMenu](functions/keepContextMenu.md)                 | Keeps the context menu on screen.                                                                                                                             |
| [removeContextMenu](functions/removeContextMenu.md)             | Safely dismiss the context menu and make it invisible again, after a delay.                                                                                   |
| [spawnContextMenu](functions/spawnContextMenu.md)               | Makes the context menu visible.                                                                                                                               |
