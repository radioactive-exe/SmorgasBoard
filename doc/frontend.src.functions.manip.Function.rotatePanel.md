[Smorgasboard](../wiki/Home) / [frontend/src/functions/manip](../wiki/frontend.src.functions.manip) / rotatePanel

# Function: rotatePanel()

```ts
function rotatePanel(e): void;
```

Defined in: [frontend/src/functions/manip.ts:184](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/manip.ts#L184)

Rotates the panel targeted by the input event in the 3-dimensional X and Y
axes controlled by the hover/move event.

## Parameters

| Parameter | Type         | Description                                         |
| --------- | ------------ | --------------------------------------------------- |
| `e`       | `MouseEvent` | The Mouse (hover) event that controls the rotation. |

## Returns

`void`

## Example

```ts
panel.addEventListener("mousemove", rotatePanel);
```

As the mouse moves around within the panel, the movement will control the 3D
rotation of the panel, appearing to rotate to face the cursor at all times.

## See

[rotateElementStyle()](../wiki/frontend.src.functions.manip.Function.rotateElementStyle)
