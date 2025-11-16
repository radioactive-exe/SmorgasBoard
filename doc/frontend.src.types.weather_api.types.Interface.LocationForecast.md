[Smorgasboard](../wiki/Home) / [frontend/src/types/weather_api.types](../wiki/frontend.src.types.weather_api.types) / LocationForecast

# Interface: LocationForecast

Defined in: [frontend/src/types/weather_api.types.ts:245](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L245)

The complete Forecast response from the API.

## Remarks

This is the complete response from a Forecast API request, including both the
location and all its information (in the form of a [Location](../wiki/frontend.src.types.weather_api.types.Interface.Location) object),
and the current weather information for said location (in the form of a
[Current](../wiki/frontend.src.types.weather_api.types.Interface.Current) object), similar to a [LocationCurrent](../wiki/frontend.src.types.weather_api.types.Interface.LocationCurrent) response.
However, this response also includes an object with the forecast information,
both for the day and the hours in the days requested.

## Extends

- [`LocationCurrent`](../wiki/frontend.src.types.weather_api.types.Interface.LocationCurrent)

## Properties

| Property                         | Type                                                                          | Inherited from                                                                                                                                                                            | Defined in                                                                                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="current"></a> `current`   | [`Current`](../wiki/frontend.src.types.weather_api.types.Interface.Current)   | [`LocationCurrent`](../wiki/frontend.src.types.weather_api.types.Interface.LocationCurrent).[`current`](../wiki/frontend.src.types.weather_api.types.Interface.LocationCurrent#current)   | [frontend/src/types/weather_api.types.ts:231](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L231) |
| <a id="forecast"></a> `forecast` | [`Forecast`](../wiki/frontend.src.types.weather_api.types.Interface.Forecast) | -                                                                                                                                                                                         | [frontend/src/types/weather_api.types.ts:246](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L246) |
| <a id="location"></a> `location` | [`Location`](../wiki/frontend.src.types.weather_api.types.Interface.Location) | [`LocationCurrent`](../wiki/frontend.src.types.weather_api.types.Interface.LocationCurrent).[`location`](../wiki/frontend.src.types.weather_api.types.Interface.LocationCurrent#location) | [frontend/src/types/weather_api.types.ts:230](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L230) |
