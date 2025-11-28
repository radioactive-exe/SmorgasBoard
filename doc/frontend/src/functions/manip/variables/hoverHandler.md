[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/manip](../README.md) / hoverHandler

# Variable: hoverHandler

```ts
const hoverHandler: object;
```

Defined in: [frontend/src/functions/manip.ts:421](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/functions/manip.ts#L421)

Bundles the 3 hover handlers, the [enter](#enter)
handler, the [move](#move) handler, and the
[exit](#exit) handler.

## Type Declaration

### enter()

```ts
enter: (e) => void = enterPanelHoverHandler;
```

Function that handles the first enter of the mouse/pointer.

#### Parameters

| Parameter | Type         | Description                                       |
| --------- | ------------ | ------------------------------------------------- |
| `e`       | `MouseEvent` | The mouse enter event that triggers this handler. |

#### Returns

`void`

#### Remarks

It smoothly snaps the rotation, and after the transition duration, adds a
class that turns rotations instantaneous again.

#### Example

```ts
panel.addEventListener("mouseenter", enterPanelHoverHandler);
```

#### See

- hoverHandler , the object that bundles this with the other hover handlers
- [movePanelHoverHandler()](#move)
- [exitPanelHoverHandler()](#exit)

### exit()

```ts
exit: (e) => void = exitPanelHoverHandler;
```

Function that handles the exit of the mouse/pointer from hovering on the
Panel.

#### Parameters

| Parameter | Type         | Description          |
| --------- | ------------ | -------------------- |
| `e`       | `MouseEvent` | The MouseExit event. |

#### Returns

`void`

#### Remarks

This function resets the rotation of the panel and removes the transition
classes from it.

#### Example

```ts
panel.addEventListener("mouseleave", exitPanelHoverHandler);
```

#### See

- hoverHandler , the object that bundles this with the other hover handlers
- [enterPanelHoverHandler()](#enter)
- [movePanelHoverHandler()](#move)

### move()

```ts
move: (e) => void = movePanelHoverHandler;
```

Function that handles the movement of the mouse inside the panel.

#### Parameters

| Parameter | Type         | Description                                      |
| --------- | ------------ | ------------------------------------------------ |
| `e`       | `MouseEvent` | The Mouse Move event that controls the rotation. |

#### Returns

`void`

#### Remarks

This calls the function to rotate the panel based on the event.

#### Example

```ts
panel.addEventListener("mousemove", movePanelHoverHandler);
```

#### See

- hoverHandler , the object that bundles this with the other hover handlers
- [enterPanelHoverHandler()](#enter)
- [exitPanelHoverHandler()](#exit)

## See

- [addHoverListeners() in the Panel class](../../../classes/panel/panel/classes/Panel.md#addhoverlisteners)
- [enterPanelHoverHandler()](#enter)
- [movePanelHoverHandler()](#move)
- [exitPanelHoverHandler()](#exit)
