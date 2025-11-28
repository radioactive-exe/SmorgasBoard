[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / \_supabaseAuthChangeHandler

# Variable: \_supabaseAuthChangeHandler

```ts
const _supabaseAuthChangeHandler: object;
```

Defined in: [frontend/src/app.ts:760](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/app.ts#L760)

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
