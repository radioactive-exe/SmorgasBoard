[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/classes/area](../README.md) / AreaInstance

# Interface: AreaInstance

Defined in: [frontend/src/classes/area.ts:113](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L113)

The simple object format of an [Area](../classes/Area.md).

## Remarks

This is used when we are instantiating an [Area](../classes/Area.md) from an Object, or when
we need an Object-format version of an Area to `JSON.stringify()` for
storage

- Either local or in the database. This instance, similar to the Area's parsed
  coordinates and sizes, uses fractional units.

## Properties

### pos

> **pos**: [`Coordinate`](Coordinate.md)

Defined in: [frontend/src/classes/area.ts:114](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L114)

***

### size

> **size**: [`Size`](Size.md)

Defined in: [frontend/src/classes/area.ts:115](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/area.ts#L115)
