[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/math](../README.md) / getAspectRatio

# Function: getAspectRatio()

```ts
function getAspectRatio(dimensions): Size;
```

Defined in: [frontend/src/functions/math.ts:119](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/functions/math.ts#L119)

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
