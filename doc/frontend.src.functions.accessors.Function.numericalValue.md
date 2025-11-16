[Smorgasboard](../wiki/Home) / [frontend/src/functions/accessors](../wiki/frontend.src.functions.accessors) / numericalValue

# Function: numericalValue()

```ts
function numericalValue(string): number;
```

Defined in: [frontend/src/functions/accessors.ts:34](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/accessors.ts#L34)

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
- [cssPropertyValue()](../wiki/frontend.src.functions.accessors.Function.cssPropertyValue)
- [normalisedValue()](../wiki/frontend.src.functions.accessors.Function.normalisedValue)
