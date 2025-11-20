[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / setLocalChange

# Function: setLocalChange()

```ts
function setLocalChange(val): void;
```

Defined in: [frontend/src/app.ts:134](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/app.ts#L134)

Updates the value of `localChange`. This is utilised by both the Supabase
realtime dashboard update listener and the patching functions in the
`querying` module to indicate/check if a change that triggered the update was
one caused by this client.

## Parameters

| Parameter | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| `val`     | `boolean` | The value to set to `localChange`. |

## Returns

`void`

## Example

```ts
setLocalChange(true);
```

The above sets the variable to `true`, indicating that the update that is
about to be received by the realtime listener was one caused by this client.

## See

- [wasLocalChange](../variables/wasLocalChange.md)
- [\_supabaseAuthChangeHandler](../variables/supabaseAuthChangeHandler.md)
- [Supabase](https://supabase.com/docs)
- [RealtimeChannel](https://supabase.com/docs/guides/realtime)
