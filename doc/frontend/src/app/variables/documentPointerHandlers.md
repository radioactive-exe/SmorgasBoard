[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / documentPointerHandlers

# Variable: documentPointerHandlers

```ts
const documentPointerHandlers: object;
```

Defined in: [frontend/src/app.ts:487](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/app.ts#L487)

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
