[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/util](../README.md) / isValidOption

# Function: isValidOption()

```ts
function isValidOption(possibleOptions, potentialValue): boolean;
```

Defined in: [frontend/src/functions/util.ts:214](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/functions/util.ts#L214)

Checks whether a particular config value is valid/part of the possible
options.

## Parameters

| Parameter         | Type       | Description                                                                     |
| ----------------- | ---------- | ------------------------------------------------------------------------------- |
| `possibleOptions` | `object`[] | The options that are allowed/possible in the given context.                     |
| `potentialValue`  | `string`   | The potential value we are checking to see if it's one of the possible options. |

## Returns

`boolean`

Whether or not this potential value is part of the
possible options, and thus a valid one in the given context.

## Remarks

The possible options are stored in an array of [ListSelectionOption](../../../classes/config/config_entry/type-aliases/ListSelectionOption.md)
objects, and the potential value is checked against the `optionValue`
property of all these options.

## Example

```ts
const options = [
  { optionLabel: "Option 1", optionValue: "one" },
  { optionLabel: "Option 2", optionValue: "two" },
];
console.log(isValidOption(options, "one")); // => Outputs true
console.log(isValidOption(options, "three")); // => Outputs false
```
