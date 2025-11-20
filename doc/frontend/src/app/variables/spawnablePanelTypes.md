[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / spawnablePanelTypes

# Variable: spawnablePanelTypes

```ts
const spawnablePanelTypes: [string, PanelType][];
```

Defined in: [frontend/src/app.ts:608](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/app.ts#L608)

An array of all possible PanelTypes that are spawnable by the general user.

## Remarks

This is generated from the PanelType class by iterating through its members,
so is up to date at the next refresh once the new PanelType static member is
initialised for any new PanelType. We start at the second index to skip the
`PREVIEW` and `DEFAULT` (empty) PanelTypes.
