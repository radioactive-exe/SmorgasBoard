[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / \_supabaseAuthChangeHandler

# Variable: \_supabaseAuthChangeHandler

```ts
const _supabaseAuthChangeHandler: object;
```

Defined in: [frontend/src/app.ts:767](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/app.ts#L767)

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
