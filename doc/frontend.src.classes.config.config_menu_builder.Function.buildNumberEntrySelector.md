[Smorgasboard](../wiki/Home) / [frontend/src/classes/config/config_menu_builder](../wiki/frontend.src.classes.config.config_menu_builder) / buildNumberEntrySelector

# Function: buildNumberEntrySelector()

```ts
function buildNumberEntrySelector(entry): HTMLElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:253](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/config/config_menu_builder.ts#L253)

The builder function for a Number Config Entry selector, called from the base
redirector function.

## Parameters

| Parameter           | Type                                                                                                             | Description                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `entry`             | \{ `label`: `string`; `range`: \{ `max`: `number`; `min`: `number`; `step?`: `number`; \}; `value`: `number`; \} | The ConfigEntry itself, in this case one of a Number/Range type. |
| `entry.label`       | `string`                                                                                                         | -                                                                |
| `entry.range`       | \{ `max`: `number`; `min`: `number`; `step?`: `number`; \}                                                       | -                                                                |
| `entry.range.max`   | `number`                                                                                                         | -                                                                |
| `entry.range.min`   | `number`                                                                                                         | -                                                                |
| `entry.range.step?` | `number`                                                                                                         | -                                                                |
| `entry.value`       | `number`                                                                                                         | -                                                                |

## Returns

`HTMLElement`

The built selector for the inputted entry.

## Example

```ts
const builtInput = buildNumberEntrySelector({
  label: "Number of decimal places",
  value: 2,
  range: {
    min: 0,
    max: 4,
    step: 1,
  },
});
configMenuLine.appendChild(builtInput);
```

Builds the appropriate Number selector for the `decimalPlaces` Config option.

## See

- [The base Builder redirector function](../wiki/frontend.src.classes.config.config_menu_builder.Function.builtEntrySelector)
- [Boolean Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildBooleanEntrySelector)
- [String Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildStringEntrySelector)
- [List Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildListEntrySelector)
