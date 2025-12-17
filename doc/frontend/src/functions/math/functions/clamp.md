[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/math](../README.md) / clamp

# Function: clamp()

```ts
function clamp(num, min, max): number;
```

Defined in: [frontend/src/functions/math.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/functions/math.ts#L37)

Clamps an input number between two bounds.

## Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `num`     | `number` | The input number to clamp.     |
| `min`     | `number` | The lower bound to clamp with. |
| `max`     | `number` | The upper bound to clamp with. |

## Returns

`number`

The clamped result, either the number itself if it is between
bounds, or one of the bounds if the number exceeds them in either
direction.

## Example

```ts
console.log(clamp(12, 10, 15)); // => Outputs 12
console.log(clamp(12, 15, 20)); // => Outputs 15
console.log(clamp(12, 5, 10)); // => Outputs 10
```
