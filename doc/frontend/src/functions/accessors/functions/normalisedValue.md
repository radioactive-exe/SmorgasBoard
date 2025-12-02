[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/accessors](../README.md) / normalisedValue

# Function: normalisedValue()

```ts
function normalisedValue(input): number;
```

Defined in: [frontend/src/functions/accessors.ts:123](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/functions/accessors.ts#L123)

Extracts and returns the normalised value of a string.

## Parameters

| Parameter | Type     | Description                                               |
| --------- | -------- | --------------------------------------------------------- |
| `input`   | `string` | The string to parse, extract, and normalise the value of. |

## Returns

`number`

The normalised number in pixels/milliseconds/etc from the
input string.

## Remarks

This normalises length/size units into pixels, and timing units into
milliseconds.

## Example

```ts
console.log(normalisedValue("0.2s")); // => Outputs 200 as a number
```

## See

[normalisedCssPropertyValue()](normalisedCssPropertyValue.md) , the function that uses this one to parse and normalise the numerical value of a CSS property.
