[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/auth](../README.md) / statusMessage

# Variable: statusMessage

```ts
statusMessage: object;
```

Defined in: [frontend/src/auth.ts:77](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/auth.ts#L77)

This variable will hold the status message as either an error or a success
message.

## Type Declaration

### error?

```ts
optional error: string;
```

### requirements?

```ts
optional requirements: string[];
```

### success?

```ts
optional success: string;
```

## Remarks

The presence of an error or success field will be used to check the result of
the login/signup. If it's a password error, the requirements field will also
be populated.
