[Smorgasboard](../wiki/Home) / [frontend/src/functions/manip](../wiki/frontend.src.functions.manip) / resizePanel

# Function: resizePanel()

```ts
function resizePanel(panel, e, initData): void;
```

Defined in: [frontend/src/functions/manip.ts:139](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L139)

Resizes the handle (while keeping it completely within the bounds of the
screen and larger than its minimum size) through dragging the resize handle.

## Parameters

| Parameter  | Type                                                                                        | Description                                |
| ---------- | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `panel`    | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel)                             | The panel to resize.                       |
| `e`        | `PointerEvent`                                                                              | The pointer/drag event used for resizing.  |
| `initData` | [`PanelResizeInitData`](../wiki/frontend.src.functions.manip.Interface.PanelResizeInitData) | The initial position and size data needed. |

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

- [The Interface for the InitData of a resize event](../wiki/frontend.src.functions.manip.Interface.PanelResizeInitData)
- [movePanelWithinScreen()](../wiki/frontend.src.functions.manip.Function.movePanelWithinScreen)
