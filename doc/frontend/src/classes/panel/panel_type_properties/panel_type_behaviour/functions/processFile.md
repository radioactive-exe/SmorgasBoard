[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_type_properties/panel_type_behaviour](../README.md) / processFile

# Function: processFile()

```ts
function processFile(file, panel, img): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/photo_panel.ts:126](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_behaviour/photo_panel.ts#L126)

Handles a provided/inputted file, either accepting it and uploading it, or
rejecting it and informing the user of the reason.

## Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `file`    | `File`                                     | The inputted file to process.                                      |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel that holds the Config and that triggered this behaviour. |
| `img`     | `HTMLImageElement`                         | The image element that holds the actual image itself, if uploaded. |

## Returns

`void`

## Example

```ts
See the handling of drag and drops as well as inputted files in the execute
function (below).
```

## See

- The Photo Panel [execute()](../../../panel_behaviour/photo_panel/functions/execute.md) function
- [Supabase](https://supabase.com/docs)
- [Supabase#Storage](https://supabase.com/docs/guides/storage)
