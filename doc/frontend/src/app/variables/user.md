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

Defined in: [frontend/src/app.ts:70](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/app.ts#L70)

The current logged in user. This holds all relevant fields if a user is
logged in, or is null if the dashboard is being used anonymously.
