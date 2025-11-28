[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / spawnablePanelTypes

# Variable: spawnablePanelTypes

```ts
const spawnablePanelTypes: [string, PanelType][];
```

Defined in: [frontend/src/app.ts:611](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/app.ts#L611)

An array of all possible PanelTypes that are spawnable by the general user.

## Remarks

This is generated from the PanelType class by iterating through its members,
so is up to date at the next refresh once the new PanelType static member is
initialised for any new PanelType. We start at the second index to skip the
`PREVIEW` and `DEFAULT` (empty) PanelTypes.
