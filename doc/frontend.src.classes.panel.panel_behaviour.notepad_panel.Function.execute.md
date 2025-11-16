[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel_behaviour/notepad_panel](../wiki/frontend.src.classes.panel.panel_behaviour.notepad_panel) / execute

# Function: execute()

```ts
function execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/notepad_panel.ts:29](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_behaviour/notepad_panel.ts#L29)

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Notepad Panel Type.

## Parameters

| Parameter | Type                                                            | Description                                                        |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | The panel whose behaviour is being executed through this function. |

## Returns

`void`

## Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we wait for
5 seconds after the last user input, and then trigger a save. That's about it
for the Notepad panel. Not much to discuss here.
