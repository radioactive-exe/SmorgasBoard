[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/classes/area](../README.md) / Size

# Interface: Size

Defined in: [frontend/src/classes/area.ts:53](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L53)

A Size object.

## Remarks

This stores the width and height (horizontal and vertical dimensions) of the
item they belong to.

## See

[Coordinates](Coordinates.md)

## Properties

| Property                              | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Defined in                                                                                                                                                        |
| ------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="height"></a> `height`          | `number`  | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | [frontend/src/classes/area.ts:55](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L55) |
| <a id="isabsolute"></a> `isAbsolute?` | `boolean` | Whether this Size is in absolute units (literal pixels) or fractional units (i.e. "cells" in the dashboard grid system). **Remarks** A value of true means that it is in absolute units, while a value of false (or simply not passing this optional member) implies that the size is fractional. This member is passed when we are passing a Size to functions and constructors, giving us the ability to instantiate and pass Sizes in both fractional and absolute units without having to (a) do a lot of calculations in the function call scope, or (b) take in an extra parameter in the functions. | [frontend/src/classes/area.ts:69](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L69) |
| <a id="width"></a> `width`            | `number`  | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | [frontend/src/classes/area.ts:54](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/area.ts#L54) |
