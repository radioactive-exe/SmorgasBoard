[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel_behaviour/weather_panel](../wiki/frontend.src.classes.panel.panel_behaviour.weather_panel) / execute

# Function: execute()

```ts
function execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/weather_panel.ts:81](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_behaviour/weather_panel.ts#L81)

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Weather Panel Type.

## Parameters

| Parameter | Type                                                            | Description                                                        |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | The panel whose behaviour is being executed through this function. |

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
