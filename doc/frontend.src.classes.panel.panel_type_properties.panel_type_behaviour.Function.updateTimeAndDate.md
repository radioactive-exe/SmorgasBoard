[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel_type_properties/panel_type_behaviour](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_behaviour) / updateTimeAndDate

# Function: updateTimeAndDate()

```ts
function updateTimeAndDate(panel, dateText, timeText): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/clock_panel.ts:194](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_behaviour/clock_panel.ts#L194)

Begins the time/date updating loop, and calls itself.

## Parameters

| Parameter  | Type                                                            | Description                                        |
| ---------- | --------------------------------------------------------------- | -------------------------------------------------- |
| `panel`    | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | The Panel with the elements and the Config needed. |
| `dateText` | `HTMLSpanElement` \| `null`                                     | The container for the Date text in the Panel.      |
| `timeText` | `HTMLSpanElement` \| `null`                                     | The container for the Time text in the Panel.      |

## Returns

`void`
