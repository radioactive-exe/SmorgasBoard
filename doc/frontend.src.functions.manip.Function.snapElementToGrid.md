[Smorgasboard](../wiki/Home) / [frontend/src/functions/manip](../wiki/frontend.src.functions.manip) / snapElementToGrid

# Function: snapElementToGrid()

```ts
function snapElementToGrid(snappingTarget, source, shouldAnimate): void;
```

Defined in: [frontend/src/functions/manip.ts:305](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L305)

Snaps the moving element to the dashboard grid, based on its own position and
size, or those of another source.

## Parameters

| Parameter        | Type                                                            | Default value    | Description                                                                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `snappingTarget` | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | `undefined`      | The element/panel to snap to the grid based on the source's position and size.                                                                                                                                  |
| `source`         | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | `snappingTarget` | The element whose position and size are used as references to snap to the nearest grid position and size. If this is not passed to the function, the first parameter is used as both the target and the source. |
| `shouldAnimate`  | `boolean`                                                       | `true`           | Whether or not the snap to the grid will be smooth/animated. Default is `true`.                                                                                                                                 |

## Returns

`void`

## Example

```ts
snapElementToGrid(preview, current.panel);
```

This is code used in Smorgasboard. The preview snaps to the grid, snapping to
a size and position closest to that of `current.panel`, which is being moved
around the dashboard.

## See

- [snapElementToGrid()](../wiki/frontend.src.functions.manip.Function.snapElementToTarget)
- [movePanelWithinScreen()](../wiki/frontend.src.functions.manip.Function.movePanelWithinScreen)
