[Smorgasboard](../wiki/Home) / [frontend/src/functions/util](../wiki/frontend.src.functions.util) / getOptionLabelFromList

# Function: getOptionLabelFromList()

```ts
function getOptionLabelFromList(possibleOptions, targetValue): string | null;
```

Defined in: [frontend/src/functions/util.ts:246](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/util.ts#L246)

Gets the corresponding label for the option with the inputted value.

## Parameters

| Parameter         | Type       | Description                                                                 |
| ----------------- | ---------- | --------------------------------------------------------------------------- |
| `possibleOptions` | `object`[] | The list of options we will check for the label.                            |
| `targetValue`     | `string`   | The value whose label we are attempting to fetch from the possible options. |

## Returns

`string` \| `null`

The label, if found. If it is not found, the
function returns `null`.

## Example

```ts
const options = [
  {
    optionLabel: "Option 1",
    optionValue: "one",
  },
  {
    optionLabel: "Option 2",
    optionValue: "two",
  },
];

console.log(getOptionLabelFromList(options, "one")); // => Outputs "Option 1"
console.log(getOptionLabelFromList(options, "three")); // => Outputs `null`
```
