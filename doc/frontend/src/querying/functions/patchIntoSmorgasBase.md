[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [frontend/src/querying](../README.md) / patchIntoSmorgasBase

# Function: patchIntoSmorgasBase()

> **patchIntoSmorgasBase**(`target`, `value`): `Promise`\<`DashboardDataFetch`[]\>

Defined in: [frontend/src/querying.ts:132](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/querying.ts#L132)

Pushes updates to the database.

## Parameters

### target

The item(s) we are updating.

`"username"` | `"dashboard"`

### value

The updated value(s) we want to assign to the target(s).

`string` | `DashboardSaveData`

## Returns

`Promise`\<`DashboardDataFetch`[]\>

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
