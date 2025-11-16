[Smorgasboard](../wiki/Home) / [frontend/src/classes/config/config_menu_builder](../wiki/frontend.src.classes.config.config_menu_builder) / configMenu

# Function: configMenu()

```ts
function configMenu(config): HTMLUListElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:73](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/config/config_menu_builder.ts#L73)

The entry point for the Config Menu building process.

## Parameters

| Parameter | Type                                                                    | Description                                        |
| --------- | ----------------------------------------------------------------------- | -------------------------------------------------- |
| `config`  | [`Config`](../wiki/frontend.src.classes.config.config.TypeAlias.Config) | The Config object to generate a menu based off of. |

## Returns

`HTMLUListElement`

The built and compiled UList element containing an LI element
for each config entry, complete with a label and the relevant selector, all
of which have the needed listeners and behaviour.

## Remarks

This function receives the Config object and calls and compiles the built
menu entries for each constituent config item into one UList element. It
calls the selector building function
([builtEntrySelector()](../wiki/frontend.src.classes.config.config_menu_builder.Function.builtEntrySelector)) and also appends the
option label.

## Example

```ts
panel.appendChild(
  configMenu({
    use24Hr: {
      label: "Use 24 Hour time",
      value: true,
    },
    decimalPlaces: {
      label: "Number of decimal places",
      value: 2,
      range: {
        min: 0,
        max: 4,
        step: 1,
      },
    },
  }),
);
```
