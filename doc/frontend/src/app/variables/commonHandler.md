[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / commonHandler

# Variable: commonHandler

```ts
const commonHandler: object;
```

Defined in: [frontend/src/app.ts:508](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/app.ts#L508)

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
