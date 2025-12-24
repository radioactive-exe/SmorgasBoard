[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/auth](../README.md) / login

# Function: login()

```ts
function login(email, password): Promise<void>;
```

Defined in: [frontend/src/auth.ts:271](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/auth.ts#L271)

Attempts to log the user in using Supabase Auth API with the inputted
credentials.

## Parameters

| Parameter  | Type     | Description                                                              |
| ---------- | -------- | ------------------------------------------------------------------------ |
| `email`    | `string` | The email of the user attempting to sign in.                             |
| `password` | `string` | Self explanatory, the attempted password for the account (if it exists). |

## Returns

`Promise`\<`void`\>

## Remarks

Similarly to the [register](register.md) method, this function calls the Supabase
Auth API directly and handles any errors that arise.

## Example

This would successfully sign in the registered user:

```ts
login("real_email@someplace.com", "ILoveMyDog123#");
```

## See

- [Supabase](https://supabase.com/docs)
- [AuthApiError](https://supabase.com/docs/guides/auth/debugging/error-codes)
- [Supabase#Auth](https://supabase.com/docs/guides/auth)
