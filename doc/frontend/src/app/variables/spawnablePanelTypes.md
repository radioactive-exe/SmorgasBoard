[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / spawnablePanelTypes

# Variable: spawnablePanelTypes

```ts
const spawnablePanelTypes: [string, PanelType][];
```

Defined in: [frontend/src/app.ts:637](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/app.ts#L637)

An array of all possible PanelTypes that are spawnable by the general user.

## Remarks

This is generated from the PanelType class by iterating through its members,
so is up to date at the next refresh once the new PanelType static member is
initialised for any new PanelType. We start at the second index to skip the
`PREVIEW` and `DEFAULT` (empty) PanelTypes.
