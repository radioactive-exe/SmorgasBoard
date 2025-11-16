[Smorgasboard](../wiki/Home) / [frontend/src/classes/area](../wiki/frontend.src.classes.area) / Offset

# Interface: Offset

Defined in: [frontend/src/classes/area.ts:76](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L76)

A Rotation Offset object.

## Remarks

It stores two main things. Firstly, the actual rotation in degrees, and
secondly, the offset to any shadow if needed. This is declared to make
functions and eliminating code repetition easier.

## Properties

| Property                         | Type     | Description                                                                                                                                                                            | Defined in                                                                                                                                                        |
| -------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="rotation"></a> `rotation` | `object` | The rotation in degrees of the object. **Remarks** This stores the rotation along 2 axes, the X-axis and the Y-axis.                                                                   | [frontend/src/classes/area.ts:83](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L83) |
| `rotation.x`                     | `number` | -                                                                                                                                                                                      | [frontend/src/classes/area.ts:84](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L84) |
| `rotation.y`                     | `number` | -                                                                                                                                                                                      | [frontend/src/classes/area.ts:85](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L85) |
| <a id="shadow"></a> `shadow`     | `object` | The shadow offset. **Remarks** This is only needed when there is any 3-dimensional preservation to the rotation, and either the children of the item or the item itself cast a shadow. | [frontend/src/classes/area.ts:95](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L95) |
| `shadow.x`                       | `number` | -                                                                                                                                                                                      | [frontend/src/classes/area.ts:96](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L96) |
| `shadow.y`                       | `number` | -                                                                                                                                                                                      | [frontend/src/classes/area.ts:97](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L97) |
