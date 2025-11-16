[Smorgasboard](../wiki/Home) / [frontend/src/functions/manip](../wiki/frontend.src.functions.manip) / snapElementToTarget

# Function: snapElementToTarget()

```ts
function snapElementToTarget(el, target, shouldAnimate): void;
```

Defined in: [frontend/src/functions/manip.ts:396](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L396)

Snaps one element to another by use of their areas.

## Parameters

| Parameter       | Type                                                            | Default value | Description                                                                                                               |
| --------------- | --------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `el`            | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | `undefined`   | The main element to snap to the target element.                                                                           |
| `target`        | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | `preview`     | The destination element to snap the element to.                                                                           |
| `shouldAnimate` | `boolean`                                                       | `true`        | Whether or not the snap should be animated. Default is `true`, and it may be set to false in specific contexts if needed. |

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

- [snapElementToGrid()](../wiki/frontend.src.functions.manip.Function.snapElementToGrid)
- [preview](../wiki/frontend.src.app.Variable.preview)
