[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_behaviour/notepad_panel](../README.md) / execute

# Function: execute()

```ts
function execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/notepad_panel.ts:29](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_behaviour/notepad_panel.ts#L29)

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Notepad PanelType.

## Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel whose behaviour is being executed through this function. |

## Returns

`void`

## Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we wait for
5 seconds after the last user input, and then trigger a save. That's about it
for the Notepad panel. Not much to discuss here.
