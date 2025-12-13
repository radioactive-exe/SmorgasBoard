[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/manip](../README.md) / snapElementToGrid

# Function: snapElementToGrid()

```ts
function snapElementToGrid(snappingTarget, source, shouldAnimate): void;
```

Defined in: [frontend/src/functions/manip.ts:305](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/functions/manip.ts#L305)

Snaps the moving element to the dashboard grid, based on its own position and
size, or those of another source.

## Parameters

| Parameter        | Type                                                     | Default value    | Description                                                                                                                                                                                                     |
| ---------------- | -------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `snappingTarget` | [`Panel`](../../../classes/panel/panel/classes/Panel.md) | `undefined`      | The element/panel to snap to the grid based on the source's position and size.                                                                                                                                  |
| `source`         | [`Panel`](../../../classes/panel/panel/classes/Panel.md) | `snappingTarget` | The element whose position and size are used as references to snap to the nearest grid position and size. If this is not passed to the function, the first parameter is used as both the target and the source. |
| `shouldAnimate`  | `boolean`                                                | `true`           | Whether or not the snap to the grid will be smooth/animated. Default is `true`.                                                                                                                                 |

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

- [snapElementToGrid()](snapElementToTarget.md)
- [movePanelWithinScreen()](movePanelWithinScreen.md)
