[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / spawnablePanelTypes

# Variable: spawnablePanelTypes

```ts
const spawnablePanelTypes: [string, PanelType][];
```

Defined in: [frontend/src/app.ts:609](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/app.ts#L609)

An array of all possible PanelTypes that are spawnable by the general user.

## Remarks

This is generated from the PanelType class by iterating through its members,
so is up to date at the next refresh once the new PanelType static member is
initialised for any new PanelType. We start at the second index to skip the
`PREVIEW` and `DEFAULT` (empty) PanelTypes.
