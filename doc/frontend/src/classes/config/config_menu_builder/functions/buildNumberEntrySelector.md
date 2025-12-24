[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/config/config_menu_builder](../README.md) / buildNumberEntrySelector

# Function: buildNumberEntrySelector()

```ts
function buildNumberEntrySelector(entry): HTMLElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:259](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/config/config_menu_builder.ts#L259)

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

- [The base Builder redirector function](builtEntrySelector.md)
- [Boolean Entry selector builder function](buildBooleanEntrySelector.md)
- [String Entry selector builder function](buildStringEntrySelector.md)
- [List Entry selector builder function](buildListEntrySelector.md)
