[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / overlayDismissButtons

# Variable: overlayDismissButtons

```ts
const overlayDismissButtons: NodeListOf<HTMLButtonElement> | null;
```

Defined in: [frontend/src/app.ts:466](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/app.ts#L466)

A node list of all the dismiss buttons on all overlays.

## Remarks

Currently, the only implemented overlay is the Size Warning overlay, but this
implementation allows all dismiss buttons to work on any newly added
overlay.
