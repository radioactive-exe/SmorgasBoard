[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / spawnablePanelTypes

# Variable: spawnablePanelTypes

```ts
const spawnablePanelTypes: [string, PanelType][];
```

Defined in: [frontend/src/app.ts:635](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/app.ts#L635)

An array of all possible PanelTypes that are spawnable by the general user.

## Remarks

This is generated from the PanelType class by iterating through its members,
so is up to date at the next refresh once the new PanelType static member is
initialised for any new PanelType. We start at the second index to skip the
`PREVIEW` and `DEFAULT` (empty) PanelTypes.
