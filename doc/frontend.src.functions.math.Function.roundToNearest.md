[Smorgasboard](../wiki/Home) / [frontend/src/functions/math](../wiki/frontend.src.functions.math) / roundToNearest

# Function: roundToNearest()

```ts
function roundToNearest(num, stepSize): number;
```

Defined in: [frontend/src/functions/math.ts:73](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/math.ts#L73)

Snaps an input number to the closest multiple of the inputted step number.

## Parameters

| Parameter  | Type     | Description                                                            |
| ---------- | -------- | ---------------------------------------------------------------------- |
| `num`      | `number` | The input number we want to snap/round up/down.                        |
| `stepSize` | `number` | The step size, which is the number whose multiples we are rounding to. |

## Returns

`number`

The rounded number to the inputted step size.

## Remarks

This behaviour is akin to regular numerical rounding on a larger scale. This
function was utilised in the snapping on the grid before the Area's absolute
handling was implemented. However, it will remain as it could be reused
somewhere else.

## Examples

```ts
console.log(roundToNearest(131, 20)); // => Outputs 140
```

The above rounds to the nearest 20.

```ts
console.log(roundToNearest(1.7, 1)); // => Outputs 2
```

Rounding to the nearest 1 behaves identically to regular mathematical
rounding.
