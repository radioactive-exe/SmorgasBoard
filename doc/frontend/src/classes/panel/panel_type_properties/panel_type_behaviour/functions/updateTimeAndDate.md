[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_type_properties/panel_type_behaviour](../README.md) / updateTimeAndDate

# Function: updateTimeAndDate()

```ts
function updateTimeAndDate(panel, dateText, timeText): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/clock_panel.ts:194](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_behaviour/clock_panel.ts#L194)

Begins the time/date updating loop, and calls itself.

## Parameters

| Parameter  | Type                                       | Description                                        |
| ---------- | ------------------------------------------ | -------------------------------------------------- |
| `panel`    | [`Panel`](../../../panel/classes/Panel.md) | The Panel with the elements and the Config needed. |
| `dateText` | `HTMLSpanElement` \| `null`                | The container for the Date text in the Panel.      |
| `timeText` | `HTMLSpanElement` \| `null`                | The container for the Time text in the Panel.      |

## Returns

`void`
