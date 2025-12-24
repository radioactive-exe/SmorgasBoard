[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/classes/area](../README.md) / Offset

# Interface: Offset

Defined in: [frontend/src/classes/area.ts:80](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L80)

A Rotation Offset object.

## Remarks

It stores two main things. Firstly, the actual rotation in degrees, and
secondly, the offset to any shadow if needed. This is declared to make
functions and eliminating code repetition easier.

## Properties

| Property                         | Type     | Description                                                                                                                                                                            | Defined in                                                                                                                                                          |
| -------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="rotation"></a> `rotation` | `object` | The rotation in degrees of the object. **Remarks** This stores the rotation along 2 axes, the X-axis and the Y-axis.                                                                   | [frontend/src/classes/area.ts:87](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L87)   |
| `rotation.x`                     | `number` | -                                                                                                                                                                                      | [frontend/src/classes/area.ts:88](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L88)   |
| `rotation.y`                     | `number` | -                                                                                                                                                                                      | [frontend/src/classes/area.ts:89](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L89)   |
| <a id="shadow"></a> `shadow`     | `object` | The shadow offset. **Remarks** This is only needed when there is any 3-dimensional preservation to the rotation, and either the children of the item or the item itself cast a shadow. | [frontend/src/classes/area.ts:99](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L99)   |
| `shadow.x`                       | `number` | -                                                                                                                                                                                      | [frontend/src/classes/area.ts:100](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L100) |
| `shadow.y`                       | `number` | -                                                                                                                                                                                      | [frontend/src/classes/area.ts:101](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L101) |
