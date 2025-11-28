[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/manip](../README.md) / PanelMovementInitData

# Interface: PanelMovementInitData

Defined in: [frontend/src/functions/manip.ts:31](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/functions/manip.ts#L31)

The initial data for a panel movement/drag event, including the initial event
coordinates and the initial panel position.

## See

- [movePanelWithinScreen()](../functions/movePanelWithinScreen.md) , where this is used
- [The similar Interface for the Resize event](PanelResizeInitData.md)

## Properties

| Property                               | Type                                                             | Description                                                                            | Defined in                                                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="eventcoords"></a> `eventCoords` | [`Coordinates`](../../../classes/area/interfaces/Coordinates.md) | The initial coordinates of the first click/tap that triggered the drag movement event. | [frontend/src/functions/manip.ts:36](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/functions/manip.ts#L36) |
| <a id="panelpos"></a> `panelPos`       | [`Coordinates`](../../../classes/area/interfaces/Coordinates.md) | The initial position of the panel being moved.                                         | [frontend/src/functions/manip.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/functions/manip.ts#L38) |
