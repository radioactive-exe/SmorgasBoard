[Smorgasboard](../wiki/Home) / [frontend/src/querying](../wiki/frontend.src.querying) / DashboardDataFetch

# Interface: DashboardDataFetch

Defined in: [frontend/src/querying.ts:25](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L25)

An interface for the structure of the dashboard data.

## Remarks

This interface holds the structure and types for columns in the
`dashboard_data` table in the Supabase Database, and is used for safely
typing fetched data.

## Properties

| Property                              | Type                                                                                  | Defined in                                                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="dimensions"></a> `dimensions?` | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)                            | [frontend/src/querying.ts:30](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L30) |
| <a id="free_ids"></a> `free_ids?`     | `number`[]                                                                            | [frontend/src/querying.ts:29](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L29) |
| <a id="panels"></a> `panels?`         | [`PanelInstance`](../wiki/frontend.src.classes.panel.panel.Interface.PanelInstance)[] | [frontend/src/querying.ts:26](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L26) |
| <a id="theme"></a> `theme?`           | `number`                                                                              | [frontend/src/querying.ts:27](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L27) |
| <a id="username"></a> `username?`     | `string`                                                                              | [frontend/src/querying.ts:28](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L28) |
