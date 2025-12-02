[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / overlayDismissButtons

# Variable: overlayDismissButtons

```ts
const overlayDismissButtons: NodeListOf<HTMLButtonElement> | null;
```

Defined in: [frontend/src/app.ts:466](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/app.ts#L466)

A node list of all the dismiss buttons on all overlays.

## Remarks

Currently, the only implemented overlay is the Size Warning overlay, but this
implementation allows all dismiss buttons to work on any newly added
overlay.
