[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/math](../README.md) / getAspectRatio

# Function: getAspectRatio()

```ts
function getAspectRatio(dimensions): Size;
```

Defined in: [frontend/src/functions/math.ts:119](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/functions/math.ts#L119)

Gets the simplified aspect ratio of a given size.

## Parameters

| Parameter    | Type                                               | Description           |
| ------------ | -------------------------------------------------- | --------------------- |
| `dimensions` | [`Size`](../../../classes/area/interfaces/Size.md) | The size to simplify. |

## Returns

[`Size`](../../../classes/area/interfaces/Size.md)

The aspect ratio of the inputted dimensions.

## Remarks

This converts the inputted dimensions into a simplified aspect ratio.

## Example

```ts
console.log(getAspectRatio({ width: 2, height: 4 }));
// => Outputs a size of {width: 1, height: 2}
```

## See

[gcd()](gcd.md)
