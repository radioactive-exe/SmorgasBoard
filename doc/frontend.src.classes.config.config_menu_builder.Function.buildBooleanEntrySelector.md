[Smorgasboard](../wiki/Home) / [frontend/src/classes/config/config_menu_builder](../wiki/frontend.src.classes.config.config_menu_builder) / buildBooleanEntrySelector

# Function: buildBooleanEntrySelector()

```ts
function buildBooleanEntrySelector(entry): HTMLElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:194](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/config/config_menu_builder.ts#L194)

The builder function for a Boolean Config Entry selector, called from the
base redirector function.

## Parameters

| Parameter     | Type                                         | Description                                                        |
| ------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| `entry`       | \{ `label`: `string`; `value`: `boolean`; \} | The ConfigEntry itself, in this case one of a Boolean/Toggle type. |
| `entry.label` | `string`                                     | -                                                                  |
| `entry.value` | `boolean`                                    | -                                                                  |

## Returns

`HTMLElement`

The built selector for the inputted entry.

## Example

```ts
const builtInput = buildBooleanEntrySelector({
  label: "Use 24 Hour Time",
  value: true,
});
configMenuLine.appendChild(builtInput);
```

Builds the appropriate Boolean selector for the `use24Hr` Config option.

## See

- [The base Builder redirector function](../wiki/frontend.src.classes.config.config_menu_builder.Function.builtEntrySelector)
- [Number Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildNumberEntrySelector)
- [String Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildStringEntrySelector)
- [List Entry selector builder function](../wiki/frontend.src.classes.config.config_menu_builder.Function.buildListEntrySelector)
