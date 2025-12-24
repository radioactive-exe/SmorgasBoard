[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/manip](../README.md) / PanelResizeInitData

# Interface: PanelResizeInitData

Defined in: [frontend/src/functions/manip.ts:48](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/functions/manip.ts#L48)

The initial data for a panel resize event, including the initial event
coordinates and the initial panel size.

## See

- [resizePanel()](../functions/resizePanel.md) , where this is used
- [The similar interface for the Movement event](PanelMovementInitData.md)

## Properties

| Property                               | Type                                                             | Description                                                                          | Defined in                                                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="eventcoords"></a> `eventCoords` | [`Coordinates`](../../../classes/area/interfaces/Coordinates.md) | The initial coordinates of the first click/tap that triggered the drag resize event. | [frontend/src/functions/manip.ts:53](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/functions/manip.ts#L53) |
| <a id="panelsize"></a> `panelSize`     | [`Size`](../../../classes/area/interfaces/Size.md)               | The initial size of the panel being resized.                                         | [frontend/src/functions/manip.ts:55](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/functions/manip.ts#L55) |
