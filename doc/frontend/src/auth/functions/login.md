[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [frontend/src/auth](../README.md) / login

# Function: login()

> **login**(`email`, `password`): `Promise`\<`void`\>

Defined in: [frontend/src/auth.ts:229](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/auth.ts#L229)

Attempts to log the user in using Supabase Auth API with the inputted
credentials.

## Parameters

### email

`string`

The email of the user attempting to sign in.

### password

`string`

Self explanatory, the attempted password for the account
  (if it exists).

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
