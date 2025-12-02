[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / commonHandler

# Variable: commonHandler

```ts
const commonHandler: object;
```

Defined in: [frontend/src/app.ts:500](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/app.ts#L500)

Common handlers to be used by panels when being manipulated, common between
both resizing and dragging around.

## Type Declaration

### drag()

```ts
drag: (panel, e) => void;
```

The common drag/mousemove handler when dragging and resizing panels.

#### Parameters

| Parameter | Type                                                  | Description                                                    |
| --------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| `panel`   | [`Panel`](../../classes/panel/panel/classes/Panel.md) | The panel that triggered the call to this common handler.      |
| `e`       | `PointerEvent`                                        | The drag/mousemove/pointermove event that triggered this call. |

#### Returns

`void`

### pointerdown()

```ts
pointerdown: (panel) => void;
```

The common handler for the initial pointerdown event when manipulating
panels.

#### Parameters

| Parameter | Type                                                  | Description                                               |
| --------- | ----------------------------------------------------- | --------------------------------------------------------- |
| `panel`   | [`Panel`](../../classes/panel/panel/classes/Panel.md) | The panel that triggered the call to this common handler. |

#### Returns

`void`

#### Remarks

This handler updates the `current` object with the relevant fields,
initialises the preview and handlers, and updates flags.
