[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel_type_properties/panel_type_behaviour](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_behaviour) / processFile

# Function: processFile()

```ts
function processFile(file, panel, img): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/photo_panel.ts:122](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_behaviour/photo_panel.ts#L122)

Handles a provided/inputted file, either accepting it and uploading it, or
rejecting it and informing the user of the reason.

## Parameters

| Parameter | Type                                                            | Description                                                        |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| `file`    | `File`                                                          | The inputted file to process.                                      |
| `panel`   | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | The panel that holds the Config and that triggered this behaviour. |
| `img`     | `HTMLImageElement`                                              | The image element that holds the actual image itself, if uploaded. |

## Returns

`void`

## Example

```ts
See the handling of drag and drops as well as inputted files in the execute
function (below).
```

## See

The Photo Panel [execute()](../wiki/frontend.src.classes.panel.panel_behaviour.photo_panel.Function.execute) function
