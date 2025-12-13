[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/querying](../README.md) / DashboardSaveData

# Interface: DashboardSaveData

Defined in: [frontend/src/querying.ts:46](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/querying.ts#L46)

An interface for the structure of pushed save payloads.

## Remarks

This interface holds the structure of all pushes to the Supabase database,
describing the types in the POST request payloads.

## See

- [Supabase](https://supabase.com/docs)
- [Supabase#Database](https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries)

## Properties

| Property                             | Type                                                                       | Defined in                                                                                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="dimensions"></a> `dimensions` | [`Size`](../../classes/area/interfaces/Size.md)                            | [frontend/src/querying.ts:49](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/querying.ts#L49) |
| <a id="free_ids"></a> `free_ids`     | `number`[]                                                                 | [frontend/src/querying.ts:48](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/querying.ts#L48) |
| <a id="panels"></a> `panels`         | [`PanelInstance`](../../classes/panel/panel/interfaces/PanelInstance.md)[] | [frontend/src/querying.ts:47](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/querying.ts#L47) |
| <a id="theme"></a> `theme`           | `number`                                                                   | [frontend/src/querying.ts:50](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/querying.ts#L50) |
