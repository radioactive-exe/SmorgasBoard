[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/types/weather_api.types](../README.md) / LocationForecast

# Interface: LocationForecast

Defined in: [frontend/src/types/weather_api.types.ts:248](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/types/weather_api.types.ts#L248)

The complete Forecast response from the API.

## Remarks

This is the complete response from a Forecast API request, including both the
location and all its information (in the form of a [Location](Location.md) object),
and the current weather information for said location (in the form of a
[Current](Current.md) object), similar to a [LocationCurrent](LocationCurrent.md) response.
However, this response also includes an object with the forecast information,
both for the day and the hours in the days requested.

## Extends

- [`LocationCurrent`](LocationCurrent.md)

## Properties

| Property                         | Type                      | Inherited from                                                                    | Defined in                                                                                                                                                                                |
| -------------------------------- | ------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="current"></a> `current`   | [`Current`](Current.md)   | [`LocationCurrent`](LocationCurrent.md).[`current`](LocationCurrent.md#current)   | [frontend/src/types/weather_api.types.ts:234](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/types/weather_api.types.ts#L234) |
| <a id="forecast"></a> `forecast` | [`Forecast`](Forecast.md) | -                                                                                 | [frontend/src/types/weather_api.types.ts:249](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/types/weather_api.types.ts#L249) |
| <a id="location"></a> `location` | [`Location`](Location.md) | [`LocationCurrent`](LocationCurrent.md).[`location`](LocationCurrent.md#location) | [frontend/src/types/weather_api.types.ts:233](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/types/weather_api.types.ts#L233) |
