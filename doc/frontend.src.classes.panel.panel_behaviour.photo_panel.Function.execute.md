[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel_behaviour/photo_panel](../wiki/frontend.src.classes.panel.panel_behaviour.photo_panel) / execute

# Function: execute()

```ts
function execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/photo_panel.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_behaviour/photo_panel.ts#L37)

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Photo Panel Type.

## Parameters

| Parameter | Type                                                            | Description                                                        |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | The panel whose behaviour is being executed through this function. |

## Returns

`void`

## Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we handle
drag and drop events, as well as a file input, and then upload and save the
file to be used later/in any session before being removed.

## See

The function that [processes all inputted files](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_behaviour.Function.processFile) to be uploaded
