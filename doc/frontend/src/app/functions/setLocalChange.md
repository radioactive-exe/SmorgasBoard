[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / setLocalChange

# Function: setLocalChange()

```ts
function setLocalChange(val): void;
```

Defined in: [frontend/src/app.ts:135](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/app.ts#L135)

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
