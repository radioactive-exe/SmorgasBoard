[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/classes/area](../README.md) / Coordinates

# Interface: Coordinates

Defined in: [frontend/src/classes/area.ts:25](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L25)

A Coordinate object.

## Remarks

This object stores the X (horizontal) and Y (vertical) positions of the item
they belong to.

## See

[Size](Size.md)

## Properties

| Property                              | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Defined in                                                                                                                                                        |
| ------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="isabsolute"></a> `isAbsolute?` | `boolean` | Whether these Coordinates are in absolute units (literal pixels) or fractional units (i.e. "cells" in the dashboard grid system). **Remarks** Whether or not these Coordinates are in absolute units (literal pixels) or fractional units (i.e. Coordinates on the dashboard grid system). This member is passed when we are passing Coordinates in functions and constructors. Having this optional member allows us to be able to instantiate and pass Areas and Coordinates in both fractional and absolute units without having to (a) do a lot of calculations in the caller, or (b) take in an extra parameter in the functions. | [frontend/src/classes/area.ts:41](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L41) |
| <a id="x"></a> `x`                    | `number`  | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | [frontend/src/classes/area.ts:26](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L26) |
| <a id="y"></a> `y`                    | `number`  | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | [frontend/src/classes/area.ts:27](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L27) |
