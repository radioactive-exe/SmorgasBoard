[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/classes/area](../README.md) / Coordinate

# Interface: Coordinate

Defined in: [frontend/src/classes/area.ts:24](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L24)

A Coordinate object.

## Remarks

This object stores the X (horizontal) and Y (vertical) positions of the item
they belong to.

## Properties

### isAbsolute?

> `optional` **isAbsolute**: `boolean`

Defined in: [frontend/src/classes/area.ts:40](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L40)

Whether these Coordinates are in absolute units (literal pixels) or
fractional units (i.e. "cells" in the dashboard grid system).

#### Remarks

Whether or not these Coordinates are in absolute units (literal pixels)
or fractional units (i.e. Coordinates on the dashboard grid system). This
member is passed when we are passing Coordinates in functions and
constructors. Having this optional member allows us to be able to
instantiate and pass Areas and Coordinates in both fractional and
absolute units without having to (a) do a lot of calculations in the
caller, or (b) take in an extra parameter in the functions.

***

### x

> **x**: `number`

Defined in: [frontend/src/classes/area.ts:25](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L25)

***

### y

> **y**: `number`

Defined in: [frontend/src/classes/area.ts:26](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L26)
