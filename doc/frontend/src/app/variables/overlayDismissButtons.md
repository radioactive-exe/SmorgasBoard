[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / overlayDismissButtons

# Variable: overlayDismissButtons

```ts
const overlayDismissButtons: NodeListOf<HTMLButtonElement> | null;
```

Defined in: [frontend/src/app.ts:466](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/app.ts#L466)

A node list of all the dismiss buttons on all overlays.

## Remarks

Currently, the only implemented overlay is the Size Warning overlay, but this
implementation allows all dismiss buttons to work on any newly added
overlay.
