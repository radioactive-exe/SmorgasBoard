[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/config/config_menu_builder](../README.md) / buildStringEntrySelector

# Function: buildStringEntrySelector()

```ts
function buildStringEntrySelector(entry): HTMLElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:310](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/config/config_menu_builder.ts#L310)

The builder function for a String Config Entry selector, called from the base
redirector function.

## Parameters

| Parameter           | Type                                                                 | Description                                                     |
| ------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------- |
| `entry`             | \{ `label`: `string`; `placeholder`: `string`; `value`: `string`; \} | The ConfigEntry itself, in this case one of a String/Text type. |
| `entry.label`       | `string`                                                             | -                                                               |
| `entry.placeholder` | `string`                                                             | -                                                               |
| `entry.value`       | `string`                                                             | -                                                               |

## Returns

`HTMLElement`

The built selector for the inputted entry.

## Example

```ts
const builtInput = buildStringEntrySelector({
  label: "Custom List Title",
  value: "Groceries",
  placeholder: "To-Do List",
});
configMenuLine.appendChild(builtInput);
```

Builds the appropriate String selector for the `listTitle` Config option.

## See

- [The base Builder redirector function](builtEntrySelector.md)
- [Boolean Entry selector builder function](buildBooleanEntrySelector.md)
- [Number Entry selector builder function](buildNumberEntrySelector.md)
- [List Entry selector builder function](buildListEntrySelector.md)
