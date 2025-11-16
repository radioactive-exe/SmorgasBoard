[Smorgasboard](../wiki/Home) / [frontend/src/classes/area](../wiki/frontend.src.classes.area) / AreaInstance

# Interface: AreaInstance

Defined in: [frontend/src/classes/area.ts:112](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L112)

The simple object format of an [Area](../wiki/frontend.src.classes.area.Class.Area).

## Remarks

This is used when we are instantiating an [Area](../wiki/frontend.src.classes.area.Class.Area) from an Object, or when
we need an Object-format version of an Area to `JSON.stringify()` for
storage

- Either local or in the database. This instance, similar to the Area's parsed
  coordinates and sizes, uses fractional units.

## Properties

| Property                 | Type                                                                   | Defined in                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="pos"></a> `pos`   | [`Coordinate`](../wiki/frontend.src.classes.area.Interface.Coordinate) | [frontend/src/classes/area.ts:113](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L113) |
| <a id="size"></a> `size` | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)             | [frontend/src/classes/area.ts:114](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L114) |
