[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / current

# Variable: current

```ts
const current: object;
```

Defined in: [frontend/src/app.ts:160](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/app.ts#L160)

Different properties relating to the current element being focused
on/manipulated in the Dashboard.

## Type Declaration

### flag

```ts
flag: string;
```

The flag for the type of manipulation occurring (if any). This is set to
either `being-resized` or `being-dragged` throughout the program.

### originalArea

```ts
originalArea: Area;
```

The original area as soon as the current Panel was being manipulated
(dragged or resized).

#### Remarks

This is stored to check the difference between the target area upon
releasing the mouse/cursor, so that updates are not sent to the dashboard
if the panel never moved, blocking potential spam by users simply
clicking repeatedly on the drag or resize handle.

### panel

```ts
panel: Panel = preview;
```

The current targeted panel. This is the panel being manipulated, or the
panel being spawned, or even the panel targeted when the context menu was
spawned, etc. The use depends on the context.
