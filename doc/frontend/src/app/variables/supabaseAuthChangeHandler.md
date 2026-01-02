[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / \_supabaseAuthChangeHandler

# Variable: \_supabaseAuthChangeHandler

```ts
const _supabaseAuthChangeHandler: object;
```

Defined in: [frontend/src/app.ts:792](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/app.ts#L792)

Handles Supabase Auth state changes, including logins, logouts, session
starts, and even token refreshes, using the native
`SupabaseAuthClient.onAuthStateChange` method.

## Type Declaration

### data

```ts
data: object;
```

#### data.subscription

```ts
subscription: Subscription;
```

## See

- [\_smorgasbaseChangesListener](smorgasbaseChangesListener.md)
- [AuthChangeEvent](https://supabase.com/docs/reference/javascript/auth-onauthstatechange)
- [Subscription](https://supabase.com/docs/reference/javascript/subscribe)
- [RealtimeChannel](https://supabase.com/docs/guides/realtime)
- [Supabase](https://supabase.com/docs)
- [Supabase#Auth](https://supabase.com/docs/guides/auth)
- [Supabase#EdgeFunctions](https://supabase.com/docs/guides/functions)
