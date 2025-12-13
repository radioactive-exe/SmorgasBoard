[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/auth](../README.md) / register

# Function: register()

```ts
function register(
  username,
  email,
  password,
  passwordConfirmation,
): Promise<void>;
```

Defined in: [frontend/src/auth.ts:131](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/auth.ts#L131)

This method signs up the user with the inputted fields.

## Parameters

| Parameter              | Type     | Description                                                                                                                                  |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `username`             | `string` | The username the user wants to choose.                                                                                                       |
| `email`                | `string` | The email the user will be using to sign up and log in. They will receive a welcome email if it is a valid address.                          |
| `password`             | `string` | Self-explanatory, this will be the user's desired password. This is subject ot length, capitalisation, and special character requirements.   |
| `passwordConfirmation` | `string` | The password confirmation value (i.e. The value of the "Confirm Password" input). This is validated to be the same as [password](#register). |

## Returns

`Promise`\<`void`\>

## Remarks

The Supabase Auth API is called directly, and any errors are handled with
appropriate alerts informing the user.

## Example

This would register a new user, given that the email format and password
requirements are met. Additionally, this will succeed if there is no other
"pro_coder_33":

```ts
register(
  "pro_coder_33",
  "real_email@someplace.com",
  "ILoveMyDog123#",
  "ILoveMyDog123#",
);
```

## See

- [AuthApiError](https://supabase.com/docs/guides/auth/debugging/error-codes)
- [AuthWeakPasswordError](https://supabase.com/docs/guides/auth/debugging/error-codes#:~:text=the%20expected%20format.-,weak_password,-User%20is%20signing)
- [Supabase#Auth](https://supabase.com/docs/guides/auth)
