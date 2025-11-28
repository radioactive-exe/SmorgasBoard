[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/config/config_menu_builder](../README.md) / buildListEntrySelector

# Function: buildListEntrySelector()

```ts
function buildListEntrySelector(entry): HTMLElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:378](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/config/config_menu_builder.ts#L378)

The builder function for a List Config Entry selector, called from the base
redirector function.

## Parameters

| Parameter               | Type                                                                       | Description                                                       |
| ----------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `entry`                 | \{ `label`: `string`; `possibleOptions`: `object`[]; `value`: `string`; \} | The ConfigEntry itself, in this case one of a List/Dropdown type. |
| `entry.label`           | `string`                                                                   | -                                                                 |
| `entry.possibleOptions` | `object`[]                                                                 | -                                                                 |
| `entry.value`           | `string`                                                                   | -                                                                 |

## Returns

`HTMLElement`

The built selector for the inputted entry.

## Example

```ts
const potentialOptions: ListSelectionOption[] = [
  {
    optionLabel: "Full format, with Weekday",
    optionValue: "full",
  },
  {
    optionLabel: "Long format, with Month",
    optionValue: "long",
  },
  {
    optionLabel: "Short format - DD/MM/YYYY",
    optionValue: "short",
  },
];
const builtInput = buildListEntrySelector({
  label: "Date Format",
  value: "short",
  possibleOptions: potentialOptions,
});
configMenuLine.appendChild(builtInput);
```

Builds the appropriate List selector for the `dateFormat` Config option.

## See

- [The base Builder redirector function](builtEntrySelector.md)
- [Boolean Entry selector builder function](buildBooleanEntrySelector.md)
- [Number Entry selector builder function](buildNumberEntrySelector.md)
- [String Entry selector builder function](buildStringEntrySelector.md)
