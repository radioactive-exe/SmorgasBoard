[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/classes/area](../README.md) / AreaInstance

# Interface: AreaInstance

Defined in: [frontend/src/classes/area.ts:114](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L114)

The simple object format of an [Area](../classes/Area.md).

## Remarks

This is used when we are instantiating an [Area](../classes/Area.md) from an Object, or when
we need an Object-format version of an Area to `JSON.stringify()` for
storage, either locally or in the database. This instance, similar to the
Area's parsed coordinates and sizes, uses fractional units.

## Properties

| Property                 | Type                            | Defined in                                                                                                                                                          |
| ------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="pos"></a> `pos`   | [`Coordinates`](Coordinates.md) | [frontend/src/classes/area.ts:115](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L115) |
| <a id="size"></a> `size` | [`Size`](Size.md)               | [frontend/src/classes/area.ts:116](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L116) |
