[Smorgasboard](../wiki/Home) / [frontend/src/classes/config/config_menu_builder](../wiki/frontend.src.classes.config.config_menu_builder) / buildStringEntrySelector

# Function: buildStringEntrySelector()

```ts
function buildStringEntrySelector(entry): HTMLElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:310](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/config/config_menu_builder.ts#L310)

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

- [The base Builder redirector function](../wiki/frontend.src.classes.config.config_menu_builder.Function.builtEntrySelector)
- [Boolean Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildBooleanEntrySelector)
- [Number Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildNumberEntrySelector)
- [List Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildListEntrySelector)
