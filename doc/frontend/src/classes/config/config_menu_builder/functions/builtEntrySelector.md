[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/config/config_menu_builder](../README.md) / builtEntrySelector

# Function: builtEntrySelector()

```ts
function builtEntrySelector(entry): HTMLElement;
```

Defined in: [frontend/src/classes/config/config_menu_builder.ts:137](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/classes/config/config_menu_builder.ts#L137)

Redirects all calls for built config entry selectors to the properly-typed
builder function.

## Parameters

| Parameter | Type                                                                               | Description                                                                                                                                                          |
| --------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entry`   | \[`string`, \{ `label`: `string`; `value`: `string` \| `number` \| `boolean`; \}\] | The config entry container, consisting of the config property that this selector will target, and the entry itself, which holds the label and value(s) of the entry. |

## Returns

`HTMLElement`

The built/compiled selector for the inputted config entry.

## Remarks

The config entry is parsed using the defined Zod schemas, upon which we
redirect the call to the proper builder function with the entry explicitly
cast as that config entry type.

## Example

```ts
const builtInput = builtEntrySelector([
  "use24Hr",
  {
    label: "Use 24 Hour Time",
    value: true,
  },
]);
configMenuLine.appendChild(builtInput);
```

The above builds a config selector (in this case a BooleanEntry selector) and
appends it to the config menu line.

## See

- [ConfigEntry](../../config_entry/type-aliases/Entry.md)
- [Boolean Entry selector builder function](buildBooleanEntrySelector.md)
- [Number Entry selector builder function](buildNumberEntrySelector.md)
- [String Entry selector builder function](buildStringEntrySelector.md)
- [List Entry selector builder function](buildListEntrySelector.md)
