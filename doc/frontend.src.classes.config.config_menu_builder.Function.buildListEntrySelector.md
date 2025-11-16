[Smorgasboard](../wiki/Home) / [frontend/src/classes/config/config_menu_builder](../wiki/frontend.src.classes.config.config_menu_builder) / buildListEntrySelector

# Function: buildListEntrySelector()

```ts
function buildListEntrySelector(entry): HTMLElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:378](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/config/config_menu_builder.ts#L378)

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

- [The base Builder redirector function](../wiki/frontend.src.classes.config.config_menu_builder.Function.builtEntrySelector)
- [Boolean Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildBooleanEntrySelector)
- [Number Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildNumberEntrySelector)
- [String Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildStringEntrySelector)
