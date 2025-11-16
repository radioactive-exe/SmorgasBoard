[Smorgasboard](../wiki/Home) / [frontend/src/functions/manip](../wiki/frontend.src.functions.manip) / PanelMovementInitData

# Interface: PanelMovementInitData

Defined in: [frontend/src/functions/manip.ts:31](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L31)

The initial data for a panel movement/drag event, including the initial event
coordinates and the initial panel position.

## See

- [movePanelWithinScreen()](../wiki/frontend.src.functions.manip.Function.movePanelWithinScreen) , where this is used
- [The similar Interface for the Resize event](../wiki/frontend.src.functions.manip.Interface.PanelResizeInitData)

## Properties

| Property                               | Type                                                                   | Description                                                                            | Defined in                                                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="eventcoords"></a> `eventCoords` | [`Coordinate`](../wiki/frontend.src.classes.area.Interface.Coordinate) | The initial coordinates of the first click/tap that triggered the drag movement event. | [frontend/src/functions/manip.ts:36](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L36) |
| <a id="panelpos"></a> `panelPos`       | [`Coordinate`](../wiki/frontend.src.classes.area.Interface.Coordinate) | The initial position of the panel being moved.                                         | [frontend/src/functions/manip.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L38) |
