[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [backend/api/types/weather_api.types](../README.md) / LocationCurrent

# Interface: LocationCurrent

Defined in: backend/api/types/weather_api.types.ts:231

The complete current response from the API.

## Remarks

This is the complete response from a Current API request, including both the
location and all its information (in the form of a [Location](Location.md) object),
and the current weather information for said location (in the form of a
[Current](Current.md) object).

## Extended by

- [`LocationForecast`](LocationForecast.md)

## Properties

| Property                         | Type                      | Defined in                                 |
| -------------------------------- | ------------------------- | ------------------------------------------ |
| <a id="current"></a> `current`   | [`Current`](Current.md)   | backend/api/types/weather_api.types.ts:233 |
| <a id="location"></a> `location` | [`Location`](Location.md) | backend/api/types/weather_api.types.ts:232 |
