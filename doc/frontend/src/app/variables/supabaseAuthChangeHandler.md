[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / \_supabaseAuthChangeHandler

# Variable: \_supabaseAuthChangeHandler

```ts
const _supabaseAuthChangeHandler: object;
```

Defined in: [frontend/src/app.ts:790](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/app.ts#L790)

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
