[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/manip](../README.md) / snapElementToTarget

# Function: snapElementToTarget()

```ts
function snapElementToTarget(el, target, shouldAnimate): void;
```

Defined in: [frontend/src/functions/manip.ts:400](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/functions/manip.ts#L400)

Snaps one element to another by use of their areas.

## Parameters

| Parameter       | Type                                                     | Default value | Description                                                                                                               |
| --------------- | -------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `el`            | [`Panel`](../../../classes/panel/panel/classes/Panel.md) | `undefined`   | The main element to snap to the target element.                                                                           |
| `target`        | [`Panel`](../../../classes/panel/panel/classes/Panel.md) | `preview`     | The destination element to snap the element to.                                                                           |
| `shouldAnimate` | `boolean`                                                | `true`        | Whether or not the snap should be animated. Default is `true`, and it may be set to false in specific contexts if needed. |

## Returns

`void`

## Example

```ts
snapElementToTarget(panel, preview);
```

The above is an example used in Smorgasboard itself, actually. This snaps the
panel to the preview (which snaps to the grid and available spaces in the
app), smoothly animating the snap of the panel to its destination (as the
default for `shouldAnimate` is not overridden in this call).

## See

- [snapElementToGrid()](snapElementToGrid.md)
- [preview](../../../app/variables/preview.md)
