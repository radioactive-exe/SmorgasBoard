[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/querying](../README.md) / getFromSmorgasBase

# Function: getFromSmorgasBase()

```ts
function getFromSmorgasBase(...targets): Promise<DashboardDataFetch[]>;
```

Defined in: [frontend/src/querying.ts:88](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/querying.ts#L88)

Fetches specific items from the database for the logged in User.

## Parameters

| Parameter    | Type                                                                          | Description                                                            |
| ------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ...`targets` | (`"username"` \| `"theme"` \| `"free_ids"` \| `"panels"` \| `"dimensions"`)[] | The target(s) as column names that we want to fetch from the database. |

## Returns

`Promise`\<[`DashboardDataFetch`](../interfaces/DashboardDataFetch.md)[]\>

The fetched columns/data from the dashboard database.

## Remarks

This function sends the parameters and call to the backend, where a call to
Supabase is carried out on the database table to fetch the relevant columns
for a particular row. RLS is enabled, so users can only fetch records for
their particular UUID.

## Example

```ts
const data = await getFromSmorgasBase("theme", "dimensions");
```

`data`, for example, would have the following form:

```ts
{
     theme: 0,
     dimensions: {
         width: 2,
         height: 3
     }
}
```

## See

- [Supabase](https://supabase.com/docs)
- [Supabase#Database](https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries)
