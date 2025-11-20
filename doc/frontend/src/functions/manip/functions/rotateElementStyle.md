[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/manip](../README.md) / rotateElementStyle

# Function: rotateElementStyle()

```ts
function rotateElementStyle(el, offset): void;
```

Defined in: [frontend/src/functions/manip.ts:272](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/functions/manip.ts#L272)

Applies the inputted rotation and offset to the style of the element.

## Parameters

| Parameter | Type                                                   | Description                                                                        |
| --------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `el`      | `HTMLElement`                                          | The element to apply the rotational and offset values to.                          |
| `offset`  | [`Offset`](../../../classes/area/interfaces/Offset.md) | The offset to apply to the element, including both a rotational and shadow offset. |

## Returns

`void`

## Example

```ts
rotateElementStyle(panel, {
  rotation: { x: 20, y: -10 },
  shadow: { x: -2, y: 1 },
});
```

The above rotates the element 20 degrees in the positive rotation direction
of the X axis and 10 degrees in the negative rotation direction of the Y
axis, and offsets the shadow 2rem to the left and 1rem down.

## See

- [rotatePanel()](rotatePanel.md)
- [The Offset interface](../../../classes/area/interfaces/Offset.md)
- [movePanelHoverHandler()](../variables/hoverHandler.md#move)
