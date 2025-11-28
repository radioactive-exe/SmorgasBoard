[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/manip](../README.md) / movePanelWithinScreen

# Function: movePanelWithinScreen()

```ts
function movePanelWithinScreen(panel, e, initData): void;
```

Defined in: [frontend/src/functions/manip.ts:87](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/functions/manip.ts#L87)

Moves the panel around (while keeping it completely within the bounds of the
screen) through dragging the movement/drag handle.

## Parameters

| Parameter  | Type                                                              | Description                               |
| ---------- | ----------------------------------------------------------------- | ----------------------------------------- |
| `panel`    | [`Panel`](../../../classes/panel/panel/classes/Panel.md)          | The panel to move.                        |
| `e`        | `PointerEvent`                                                    | The pointer/drag event used for movement. |
| `initData` | [`PanelMovementInitData`](../interfaces/PanelMovementInitData.md) | The initial movement data needed.         |

## Returns

`void`

## Example

```ts
movePanelWithinScreen(panel, e, {
  eventCoords: { x: 15, y: 12 },
  panelPos: { x: 0, y: 0 },
});
```

The above moves the panel originally positioned at (0, 0), using a drag event
whose initial pointer-down position was at (15, 12) (pixels), i.e. slightly
into the body of the panel in the top left corner, around the middle of the
drag handle.

## See

- [The Interface for the InitData of a drag/movement event](../interfaces/PanelMovementInitData.md)
- [resizePanel()](resizePanel.md)
