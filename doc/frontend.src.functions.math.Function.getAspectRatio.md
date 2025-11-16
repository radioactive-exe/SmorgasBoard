[Smorgasboard](../wiki/Home) / [frontend/src/functions/math](../wiki/frontend.src.functions.math) / getAspectRatio

# Function: getAspectRatio()

```ts
function getAspectRatio(dimensions): Size;
```

Defined in: [frontend/src/functions/math.ts:119](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/math.ts#L119)

Gets the simplified aspect ratio of a given size.

## Parameters

| Parameter    | Type                                                       | Description           |
| ------------ | ---------------------------------------------------------- | --------------------- |
| `dimensions` | [`Size`](../wiki/frontend.src.classes.area.Interface.Size) | The size to simplify. |

## Returns

[`Size`](../wiki/frontend.src.classes.area.Interface.Size)

The aspect ratio of the inputted dimensions.

## Remarks

This converts the inputted dimensions into a simplified aspect ratio.

## Example

```ts
console.log(getAspectRatio({ width: 2, height: 4 }));
// => Outputs a size of {width: 1, height: 2}
```

## See

[gcd()](../wiki/frontend.src.functions.math.Function.gcd)
