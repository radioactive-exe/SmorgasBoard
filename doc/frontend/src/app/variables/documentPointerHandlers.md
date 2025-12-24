[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / documentPointerHandlers

# Variable: documentPointerHandlers

```ts
const documentPointerHandlers: object;
```

Defined in: [frontend/src/app.ts:496](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/app.ts#L496)

The handlers that are reassigned and utilised when manipulating Panels,
either through resizing or dragging around.

## Type Declaration

### drag()

```ts
drag: (_e) => void;
```

#### Parameters

| Parameter | Type           |
| --------- | -------------- |
| `_e`      | `PointerEvent` |

#### Returns

`void`

### release()

```ts
release: () => void = releaseHandler;
```

The (common) release handler when releasing the pointer/mouse when
resizing/dragging the panel.

#### Returns

`void`

#### See

- documentPointerHandlers
- [documentPointerHandlers.release](#release)

## Remarks

`drag` is the mousemove/drag handler added to the document when the pointer
is first put down when manipulating Panels. `release` is the pointer release
handler added to the document to snap everything in place and remove all
listeners.
