[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_type_properties/panel_type_behaviour](../README.md) / updateTimeAndDate

# Function: updateTimeAndDate()

```ts
function updateTimeAndDate(panel, dateText, timeText): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/clock_panel.ts:194](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/panel/panel_behaviour/clock_panel.ts#L194)

Begins the time/date updating loop, and calls itself.

## Parameters

| Parameter  | Type                                       | Description                                        |
| ---------- | ------------------------------------------ | -------------------------------------------------- |
| `panel`    | [`Panel`](../../../panel/classes/Panel.md) | The Panel with the elements and the Config needed. |
| `dateText` | `HTMLSpanElement` \| `null`                | The container for the Date text in the Panel.      |
| `timeText` | `HTMLSpanElement` \| `null`                | The container for the Time text in the Panel.      |

## Returns

`void`
