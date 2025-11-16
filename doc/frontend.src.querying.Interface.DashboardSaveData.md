[Smorgasboard](../wiki/Home) / [frontend/src/querying](../wiki/frontend.src.querying) / DashboardSaveData

# Interface: DashboardSaveData

Defined in: [frontend/src/querying.ts:40](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L40)

An interface for the structure of pushed save payloads.

## Remarks

This interface holds the structure of all pushes to the Supabase database,
describing the types in the POST request payloads.

## Properties

| Property                             | Type                                                                                  | Defined in                                                                                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="dimensions"></a> `dimensions` | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)                            | [frontend/src/querying.ts:43](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L43) |
| <a id="free_ids"></a> `free_ids`     | `number`[]                                                                            | [frontend/src/querying.ts:42](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L42) |
| <a id="panels"></a> `panels`         | [`PanelInstance`](../wiki/frontend.src.classes.panel.panel.Interface.PanelInstance)[] | [frontend/src/querying.ts:41](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L41) |
| <a id="theme"></a> `theme`           | `number`                                                                              | [frontend/src/querying.ts:44](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/querying.ts#L44) |
