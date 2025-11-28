[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_behaviour/clock_panel](../README.md) / execute

# Function: execute()

```ts
function execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/clock_panel.ts:41](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/classes/panel/panel_behaviour/clock_panel.ts#L41)

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Clock PanelType.

## Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel whose behaviour is being executed through this function. |

## Returns

`void`

## Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we update
the time and date text upon first loading, after which we update the clock
and date every 100ms. This is simpler and cheaper than using RAF
(RequestAnimationFrame), and provides enough accuracy to be passable, with a
maximum of 100ms of delay.

## See

[updateTimeAndDate()](../../../panel_type_properties/panel_type_behaviour/functions/updateTimeAndDate.md)
