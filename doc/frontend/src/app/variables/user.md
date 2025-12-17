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

Defined in: [frontend/src/app.ts:71](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/app.ts#L71)

The current logged in user. This holds all relevant fields if a user is
logged in, or is null if the dashboard is being used anonymously.
