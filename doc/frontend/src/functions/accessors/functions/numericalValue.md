[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/accessors](../README.md) / numericalValue

# Function: numericalValue()

```ts
function numericalValue(string): number;
```

Defined in: [frontend/src/functions/accessors.ts:34](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/functions/accessors.ts#L34)

Extracts the numerical value/content of a string using Regex.

## Parameters

| Parameter | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| `string`  | `string` | The input string to extract the numbers from. |

## Returns

`number`

The extracted and parsed number.

## Example

```ts
console.log(numericalValue("123.45sec/km")); // => Outputs 123.45
```

## See

- Functions that utilise this one:
- [cssPropertyValue()](cssPropertyValue.md)
- [normalisedValue()](normalisedValue.md)
