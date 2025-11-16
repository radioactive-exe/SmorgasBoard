[Smorgasboard](../wiki/Home) / [frontend/src/functions/manip](../wiki/frontend.src.functions.manip) / PanelResizeInitData

# Interface: PanelResizeInitData

Defined in: [frontend/src/functions/manip.ts:48](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L48)

The initial data for a panel resize event, including the initial event
coordinates and the initial panel size.

## See

- [resizePanel()](../wiki/frontend.src.functions.manip.Function.resizePanel) , where this is used
- [The similar interface for the Movement event](../wiki/frontend.src.functions.manip.Interface.PanelMovementInitData)

## Properties

| Property                               | Type                                                                   | Description                                                                          | Defined in                                                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="eventcoords"></a> `eventCoords` | [`Coordinate`](../wiki/frontend.src.classes.area.Interface.Coordinate) | The initial coordinates of the first click/tap that triggered the drag resize event. | [frontend/src/functions/manip.ts:53](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L53) |
| <a id="panelsize"></a> `panelSize`     | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)             | The initial size of the panel being resized.                                         | [frontend/src/functions/manip.ts:55](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L55) |
