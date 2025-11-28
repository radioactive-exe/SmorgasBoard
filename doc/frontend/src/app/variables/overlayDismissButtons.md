[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / overlayDismissButtons

# Variable: overlayDismissButtons

```ts
const overlayDismissButtons: NodeListOf<HTMLButtonElement> | null;
```

Defined in: [frontend/src/app.ts:465](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/app.ts#L465)

A node list of all the dismiss buttons on all overlays.

## Remarks

Currently, the only implemented overlay is the Size Warning overlay, but this
implementation allows all dismiss buttons to work on any newly added
overlay.
