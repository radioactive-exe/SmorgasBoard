[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/querying](../README.md) / DashboardDataFetch

# Interface: DashboardDataFetch

Defined in: [frontend/src/querying.ts:28](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/querying.ts#L28)

An interface for the structure of the dashboard data.

## Remarks

This interface holds the structure and types for columns in the
`dashboard_data` table in the Supabase Database, and is used for safely
typing fetched data.

## See

- [Supabase](https://supabase.com/docs)
- [Supabase#Database](https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries)

## Properties

| Property                              | Type                                                                       | Defined in                                                                                                                                                |
| ------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="dimensions"></a> `dimensions?` | [`Size`](../../classes/area/interfaces/Size.md)                            | [frontend/src/querying.ts:33](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/querying.ts#L33) |
| <a id="free_ids"></a> `free_ids?`     | `number`[]                                                                 | [frontend/src/querying.ts:32](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/querying.ts#L32) |
| <a id="panels"></a> `panels?`         | [`PanelInstance`](../../classes/panel/panel/interfaces/PanelInstance.md)[] | [frontend/src/querying.ts:29](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/querying.ts#L29) |
| <a id="theme"></a> `theme?`           | `number`                                                                   | [frontend/src/querying.ts:30](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/querying.ts#L30) |
| <a id="username"></a> `username?`     | `string`                                                                   | [frontend/src/querying.ts:31](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/querying.ts#L31) |
