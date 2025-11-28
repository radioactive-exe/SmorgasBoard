[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / commonHandler

# Variable: commonHandler

```ts
const commonHandler: object;
```

Defined in: [frontend/src/app.ts:499](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/app.ts#L499)

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
