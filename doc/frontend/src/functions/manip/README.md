[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / frontend/src/functions/manip

# frontend/src/functions/manip

This file contains all element manipulation functions.

## Remarks

This includes moving elements, rotating them, and resizing them.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Interfaces

| Interface                                                    | Description                                                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| [PanelMovementInitData](interfaces/PanelMovementInitData.md) | The initial data for a panel movement/drag event, including the initial event coordinates and the initial panel position. |
| [PanelResizeInitData](interfaces/PanelResizeInitData.md)     | The initial data for a panel resize event, including the initial event coordinates and the initial panel size.            |

## Variables

| Variable                                  | Description                                                                                                                                                                                     |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hoverHandler](variables/hoverHandler.md) | Bundles the 3 hover handlers, the [enter](variables/hoverHandler.md#enter) handler, the [move](variables/hoverHandler.md#move) handler, and the [exit](variables/hoverHandler.md#exit) handler. |

## Functions

| Function                                                    | Description                                                                                                                                           |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [movePanelWithinScreen](functions/movePanelWithinScreen.md) | Moves the panel around (while keeping it completely within the bounds of the screen) through dragging the movement/drag handle.                       |
| [resizePanel](functions/resizePanel.md)                     | Resizes the handle (while keeping it completely within the bounds of the screen and larger than its minimum size) through dragging the resize handle. |
| [rotateElementStyle](functions/rotateElementStyle.md)       | Applies the inputted rotation and offset to the style of the element.                                                                                 |
| [rotatePanel](functions/rotatePanel.md)                     | Rotates the panel targeted by the input event in the 3-dimensional X and Y axes controlled by the hover/move event.                                   |
| [snapElementToGrid](functions/snapElementToGrid.md)         | Snaps the moving element to the dashboard grid, based on its own position and size, or those of another source.                                       |
| [snapElementToTarget](functions/snapElementToTarget.md)     | Snaps one element to another by use of their areas.                                                                                                   |
