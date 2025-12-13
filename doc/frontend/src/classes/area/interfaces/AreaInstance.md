[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/classes/area](../README.md) / AreaInstance

# Interface: AreaInstance

Defined in: [frontend/src/classes/area.ts:114](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/area.ts#L114)

The simple object format of an [Area](../classes/Area.md).

## Remarks

This is used when we are instantiating an [Area](../classes/Area.md) from an Object, or when
we need an Object-format version of an Area to `JSON.stringify()` for
storage, either locally or in the database. This instance, similar to the
Area's parsed coordinates and sizes, uses fractional units.

## Properties

| Property                 | Type                            | Defined in                                                                                                                                                          |
| ------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="pos"></a> `pos`   | [`Coordinates`](Coordinates.md) | [frontend/src/classes/area.ts:115](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/area.ts#L115) |
| <a id="size"></a> `size` | [`Size`](Size.md)               | [frontend/src/classes/area.ts:116](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/area.ts#L116) |
