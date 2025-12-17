[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_behaviour/photo_panel](../README.md) / execute

# Function: execute()

```ts
function execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/photo_panel.ts:39](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_behaviour/photo_panel.ts#L39)

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Photo PanelType.

## Parameters

| Parameter | Type                                       | Description                                                        |
| --------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../../../panel/classes/Panel.md) | The panel whose behaviour is being executed through this function. |

## Returns

`void`

## Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we handle
drag and drop events, as well as a file input, and then upload and save the
file to be used later/in any session before being removed.

## See

- The function that [processes all inputted files](../../../panel_type_properties/panel_type_behaviour/functions/processFile.md) to be uploaded
- [Supabase](https://supabase.com/docs)
- [Supabase#Storage](https://supabase.com/docs/guides/storage)
