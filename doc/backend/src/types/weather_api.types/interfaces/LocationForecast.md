[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [backend/src/types/weather_api.types](../README.md) / LocationForecast

# Interface: LocationForecast

Defined in: [backend/src/types/weather_api.types.ts:247](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/backend/src/types/weather_api.types.ts#L247)

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

| Property                         | Type                      | Inherited from                                                                    | Defined in                                                                                                                                                                              |
| -------------------------------- | ------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="current"></a> `current`   | [`Current`](Current.md)   | [`LocationCurrent`](LocationCurrent.md).[`current`](LocationCurrent.md#current)   | [backend/src/types/weather_api.types.ts:233](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/backend/src/types/weather_api.types.ts#L233) |
| <a id="forecast"></a> `forecast` | [`Forecast`](Forecast.md) | -                                                                                 | [backend/src/types/weather_api.types.ts:248](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/backend/src/types/weather_api.types.ts#L248) |
| <a id="location"></a> `location` | [`Location`](Location.md) | [`LocationCurrent`](LocationCurrent.md).[`location`](LocationCurrent.md#location) | [backend/src/types/weather_api.types.ts:232](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/backend/src/types/weather_api.types.ts#L232) |
