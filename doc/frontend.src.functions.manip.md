[Smorgasboard](../wiki/Home) / frontend/src/functions/manip

# frontend/src/functions/manip

This file contains all element manipulation functions.

## Remarks

This includes moving elements, rotating them, and resizing them.

## Author

Radioactive.exe
[GitHub Profile](https://github.com/radioactive-exe)

## Interfaces

| Interface                                                                                     | Description                                                                                                               |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [PanelMovementInitData](../wiki/frontend.src.functions.manip.Interface.PanelMovementInitData) | The initial data for a panel movement/drag event, including the initial event coordinates and the initial panel position. |
| [PanelResizeInitData](../wiki/frontend.src.functions.manip.Interface.PanelResizeInitData)     | The initial data for a panel resize event, including the initial event coordinates and the initial panel size.            |

## Variables

| Variable                                                                   | Description                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hoverHandler](../wiki/frontend.src.functions.manip.Variable.hoverHandler) | Bundles the 3 hover handlers, the [enter](../wiki/frontend.src.functions.manip.Variable.hoverHandler#enter) handler, the [move](../wiki/frontend.src.functions.manip.Variable.hoverHandler#move) handler, and the [exit](../wiki/frontend.src.functions.manip.Variable.hoverHandler#exit) handler. |

## Functions

| Function                                                                                     | Description                                                                                                                                           |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [movePanelWithinScreen](../wiki/frontend.src.functions.manip.Function.movePanelWithinScreen) | Moves the panel around (while keeping it completely within the bounds of the screen) through dragging the movement/drag handle.                       |
| [resizePanel](../wiki/frontend.src.functions.manip.Function.resizePanel)                     | Resizes the handle (while keeping it completely within the bounds of the screen and larger than its minimum size) through dragging the resize handle. |
| [rotateElementStyle](../wiki/frontend.src.functions.manip.Function.rotateElementStyle)       | Applies the inputted rotation and offset to the style of the element.                                                                                 |
| [rotatePanel](../wiki/frontend.src.functions.manip.Function.rotatePanel)                     | Rotates the panel targeted by the input event in the 3-dimensional X and Y axes controlled by the hover/move event.                                   |
| [snapElementToGrid](../wiki/frontend.src.functions.manip.Function.snapElementToGrid)         | Snaps the moving element to the dashboard grid, based on its own position and size, or those of another source.                                       |
| [snapElementToTarget](../wiki/frontend.src.functions.manip.Function.snapElementToTarget)     | Snaps one element to another by use of their areas.                                                                                                   |
