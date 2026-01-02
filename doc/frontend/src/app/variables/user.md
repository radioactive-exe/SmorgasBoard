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

Defined in: [frontend/src/app.ts:73](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/app.ts#L73)

The current logged in user. This holds all relevant fields if a user is
logged in, or is null if the dashboard is being used anonymously.
