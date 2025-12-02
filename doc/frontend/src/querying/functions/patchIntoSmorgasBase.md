[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/querying](../README.md) / patchIntoSmorgasBase

# Function: patchIntoSmorgasBase()

```ts
function patchIntoSmorgasBase(target, value): Promise<DashboardDataFetch[]>;
```

Defined in: [frontend/src/querying.ts:144](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/querying.ts#L144)

Pushes updates to the database.

## Parameters

| Parameter | Type                                                                  | Description                                              |
| --------- | --------------------------------------------------------------------- | -------------------------------------------------------- |
| `target`  | `"username"` \| `"dashboard"`                                         | The item(s) we are updating.                             |
| `value`   | `string` \| [`DashboardSaveData`](../interfaces/DashboardSaveData.md) | The updated value(s) we want to assign to the target(s). |

## Returns

`Promise`\<[`DashboardDataFetch`](../interfaces/DashboardDataFetch.md)[]\>

The new updated record from the database.

## Remarks

This method sends a POST request to the backend with the desired payload to
update in the dashboard data row for the current user. In other words, this
method handles saving any changes that the user makes. The "dashboard" target
sends an update for the dashboard layout and theme as a whole - this includes
the theme, the free IDs, the panels and their data/areas, and the dimensions
of the dashboard.

## Example

```ts
dashboard.setCurrentTheme(Theme.DEFAULT);
dashboard.spawnPanelOfType(PanelType.WEATHER);
dashboard.spawnPanelOfType(PanelType.TODO);
```

After a configured delay, the dashboard instance then calls this method to
patch the new theme and panels:

```ts
const updatedRecord = await patchIntoSmorgasBase("dashboard");
```

## See

- [Supabase](https://supabase.com/docs)
- [Supabase#Database](https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries)
