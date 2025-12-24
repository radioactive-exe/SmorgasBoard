[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / overlayDismissButtons

# Variable: overlayDismissButtons

```ts
const overlayDismissButtons: NodeListOf<HTMLButtonElement> | null;
```

Defined in: [frontend/src/app.ts:474](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/app.ts#L474)

A node list of all the dismiss buttons on all overlays.

## Remarks

Currently, the only implemented overlay is the Size Warning overlay, but this
implementation allows all dismiss buttons to work on any newly added
overlay.
