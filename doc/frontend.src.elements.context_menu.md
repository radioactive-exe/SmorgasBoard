[Smorgasboard](../wiki/Home) / frontend/src/elements/context_menu

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

| Variable                                                                                     | Description                                                                                |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [contextMenu](../wiki/frontend.src.elements.context_menu.Variable.contextMenu)               | The context menu container.                                                                |
| [deletePanelButton](../wiki/frontend.src.elements.context_menu.Variable.deletePanelButton)   | The button to delete the panel focused on if the deletion section is visible.              |
| [deletePanelSection](../wiki/frontend.src.elements.context_menu.Variable.deletePanelSection) | The section of the context menu that houses the delete button and a menu spacer.           |
| [dimensionsMenu](../wiki/frontend.src.elements.context_menu.Variable.dimensionsMenu)         | The matrix/dimensions selection grid menu housed inside the dimensions context menu entry. |
| [editModeButton](../wiki/frontend.src.elements.context_menu.Variable.editModeButton)         | The button to toggle the dashboard's edit mode.                                            |
| [hoverEntries](../wiki/frontend.src.elements.context_menu.Variable.hoverEntries)             | The hover entries in the context menu.                                                     |
| [innerMenu](../wiki/frontend.src.elements.context_menu.Variable.innerMenu)                   | The actual visual menu that is rendered with all the sections and entries.                 |
| [panelMenu](../wiki/frontend.src.elements.context_menu.Variable.panelMenu)                   | The Panel spawning menu housed inside the panel context menu entry.                        |
| [themeMenu](../wiki/frontend.src.elements.context_menu.Variable.themeMenu)                   | The theme selection menu housed inside the theme context menu entry.                       |

## Functions

| Function                                                                                             | Description                                                                 |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [fitContextMenuOnScreen](../wiki/frontend.src.elements.context_menu.Function.fitContextMenuOnScreen) | Ensures that the context menu stays on screen after a structure change.     |
| [keepContextMenu](../wiki/frontend.src.elements.context_menu.Function.keepContextMenu)               | Keeps the context menu on screen.                                           |
| [removeContextMenu](../wiki/frontend.src.elements.context_menu.Function.removeContextMenu)           | Safely dismiss the context menu and make it invisible again, after a delay. |
| [spawnContextMenu](../wiki/frontend.src.elements.context_menu.Function.spawnContextMenu)             | Makes the context menu visible.                                             |
