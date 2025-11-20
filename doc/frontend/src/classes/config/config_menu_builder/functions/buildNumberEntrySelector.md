[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/config/config_menu_builder](../README.md) / buildNumberEntrySelector

# Function: buildNumberEntrySelector()

```ts
function buildNumberEntrySelector(entry): HTMLElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:253](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/config/config_menu_builder.ts#L253)

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
