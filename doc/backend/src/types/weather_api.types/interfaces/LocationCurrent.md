[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [backend/src/types/weather_api.types](../README.md) / LocationCurrent

# Interface: LocationCurrent

Defined in: [backend/src/types/weather_api.types.ts:231](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/backend/src/types/weather_api.types.ts#L231)

The complete current response from the API.

## Remarks

This is the complete response from a Current API request, including both the
location and all its information (in the form of a [Location](Location.md) object),
and the current weather information for said location (in the form of a
[Current](Current.md) object).

## Extended by

- [`LocationForecast`](LocationForecast.md)

## Properties

| Property                         | Type                      | Defined in                                                                                                                                                                              |
| -------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="current"></a> `current`   | [`Current`](Current.md)   | [backend/src/types/weather_api.types.ts:233](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/backend/src/types/weather_api.types.ts#L233) |
| <a id="location"></a> `location` | [`Location`](Location.md) | [backend/src/types/weather_api.types.ts:232](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/backend/src/types/weather_api.types.ts#L232) |
