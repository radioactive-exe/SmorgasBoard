[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [frontend/src/querying](../README.md) / getFromSmorgasBase

# Function: getFromSmorgasBase()

> **getFromSmorgasBase**(...`targets`): `Promise`\<`DashboardDataFetch`[]\>

Defined in: [frontend/src/querying.ts:79](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/querying.ts#L79)

Fetches specific items from the database for the logged in User.

## Parameters

### targets

...(`"username"` \| `"theme"` \| `"free_ids"` \| `"panels"` \| `"dimensions"`)[]

The target(s) as column names that we want to fetch from
  the database.

## Returns

`Promise`\<`DashboardDataFetch`[]\>

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
