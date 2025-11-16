[Smorgasboard](../wiki/Home) / [frontend/src/auth](../wiki/frontend.src.auth) / login

# Function: login()

```ts
function login(email, password): Promise<void>;
```

Defined in: [frontend/src/auth.ts:229](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/auth.ts#L229)

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

Similarly to the [register](../wiki/frontend.src.auth.Function.register) method, this function calls the Supabase
Auth API directly and handles any errors that arise.

## Example

This would successfully sign in the registered user:

```ts
login("real_email@someplace.com", "ILoveMyDog123#");
```
