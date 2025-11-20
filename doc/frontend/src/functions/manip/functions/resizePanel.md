[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/manip](../README.md) / resizePanel

# Function: resizePanel()

```ts
function resizePanel(panel, e, initData): void;
```

Defined in: [frontend/src/functions/manip.ts:139](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/functions/manip.ts#L139)

Resizes the handle (while keeping it completely within the bounds of the
screen and larger than its minimum size) through dragging the resize handle.

## Parameters

| Parameter  | Type                                                          | Description                                |
| ---------- | ------------------------------------------------------------- | ------------------------------------------ |
| `panel`    | [`Panel`](../../../classes/panel/panel/classes/Panel.md)      | The panel to resize.                       |
| `e`        | `PointerEvent`                                                | The pointer/drag event used for resizing.  |
| `initData` | [`PanelResizeInitData`](../interfaces/PanelResizeInitData.md) | The initial position and size data needed. |

## Returns

`void`

## Example

```ts
resizePanel(panel, e, {
  eventCoords: { x: 195, y: 92 },
  panelSize: { width: 200, y: 100 },
});
```

The above resizes the panel originally with a size of 200x100 pixels using a
drag event whose initial pointer-down position was at (195, 92) (pixels),
i.e. slightly into the body of the panel in the bottom right corner, assuming
it was positioned at (0, 0), on the resize handle.

## See

- [The Interface for the InitData of a resize event](../interfaces/PanelResizeInitData.md)
- [movePanelWithinScreen()](movePanelWithinScreen.md)
