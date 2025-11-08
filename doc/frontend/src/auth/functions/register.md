[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [frontend/src/auth](../README.md) / register

# Function: register()

> **register**(`username`, `email`, `password`): `Promise`\<`void`\>

Defined in: [frontend/src/auth.ts:107](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/auth.ts#L107)

This method signs up the user with the inputted fields.

## Parameters

### username

`string`

The username the user wants to choose.

### email

`string`

The email the user will be using to sign up and log in.
  They will receive a welcome email if it is a valid address.

### password

`string`

Self-explanatory, this will be the user's desired password.
  This is subject ot length, capitalisation, and special character
  requirements.

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
register("pro_coder_33", "real_email@someplace.com", "ILoveMyDog123#");
```
