[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/classes/area](../README.md) / Size

# Interface: Size

Defined in: [frontend/src/classes/area.ts:50](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L50)

A Size object.

## Remarks

This stores the width and height (horizontal and vertical dimensions) of the
item they belong to. 

## Properties

### height

> **height**: `number`

Defined in: [frontend/src/classes/area.ts:52](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L52)

***

### isAbsolute?

> `optional` **isAbsolute**: `boolean`

Defined in: [frontend/src/classes/area.ts:66](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L66)

Whether this Size is in absolute units (literal pixels) or fractional
units (i.e. "cells" in the dashboard grid system).

#### Remarks

A value of true means that it is in absolute units, while a value of
false (or simply not passing this optional member) implies that the size
is fractional. This member is passed when we are passing a Size to
functions and constructors, giving us the ability to instantiate and pass
Sizes in both fractional and absolute units without having to (a) do a
lot of calculations in the function call scope, or (b) take in an extra
parameter in the functions.

***

### width

> **width**: `number`

Defined in: [frontend/src/classes/area.ts:51](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L51)
