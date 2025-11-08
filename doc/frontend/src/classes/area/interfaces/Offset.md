[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/classes/area](../README.md) / Offset

# Interface: Offset

Defined in: [frontend/src/classes/area.ts:77](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L77)

A Rotation Offset object.

## Remarks

It stores two main things. Firstly, the actual rotation in degrees, and
secondly, the offset to any shadow if needed. This is declared to make
functions and eliminating code repetition easier.

## Properties

### rotation

> **rotation**: `object`

Defined in: [frontend/src/classes/area.ts:84](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L84)

The rotation in degrees of the object.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### Remarks

This stores the rotation along 2 axes, the X-axis and the Y-axis.

***

### shadow

> **shadow**: `object`

Defined in: [frontend/src/classes/area.ts:96](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L96)

The shadow offset.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### Remarks

This is only needed when there is any 3-dimensional preservation to the
rotation, and either the children of the item or the item itself cast a
shadow.
