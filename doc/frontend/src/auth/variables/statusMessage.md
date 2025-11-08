[**Documentation**](../../../../README.md)

***

[Documentation](../../../../README.md) / [frontend/src/auth](../README.md) / statusMessage

# Variable: statusMessage

> **statusMessage**: `object`

Defined in: [frontend/src/auth.ts:77](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/auth.ts#L77)

This variable will hold the status message as either an error or a success
message.

## Type Declaration

### error?

> `optional` **error**: `string`

### requirements?

> `optional` **requirements**: `string`[]

### success?

> `optional` **success**: `string`

## Remarks

The presence of an error or success field will be used to check the result of
the login/signup. If it's a password error, the requirements field will also
be populated.
