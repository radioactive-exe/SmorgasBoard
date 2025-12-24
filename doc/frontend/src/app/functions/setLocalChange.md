[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / setLocalChange

# Function: setLocalChange()

```ts
function setLocalChange(val): void;
```

Defined in: [frontend/src/app.ts:138](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/app.ts#L138)

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
