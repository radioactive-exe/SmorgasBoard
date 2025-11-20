[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / user

# Variable: user

```ts
user:
  | {
  access_token: string;
  email: string;
  id: string;
  username: string;
}
  | null = null;
```

Defined in: [frontend/src/app.ts:69](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/app.ts#L69)

The current logged in user. This holds all relevant fields if a user is
logged in, or is null if the dashboard is being used anonymously.
