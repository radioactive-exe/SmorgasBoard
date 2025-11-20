[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_behaviour/weather_panel](../README.md) / execute

# Function: execute()

```ts
function execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/weather_panel.ts:81](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_behaviour/weather_panel.ts#L81)

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Weather PanelType.

## Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel whose behaviour is being executed through this function. |

## Returns

`void`

## Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we establish
the main elements to be reused throughout the panel, handle config changes
regarding temperature and time format settings, and take care of the location
search functionality (and its relevant inputs), routing into other functions
that handle different aspects of focusing and saving locations and weather
information.
