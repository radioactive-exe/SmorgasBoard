[Smorgasboard](../wiki/Home) / [frontend/src/types/weather_api.types](../wiki/frontend.src.types.weather_api.types) / LocationCurrent

# Interface: LocationCurrent

Defined in: [frontend/src/types/weather_api.types.ts:229](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L229)

The complete current response from the API.

## Remarks

This is the complete response from a Current API request, including both the
location and all its information (in the form of a [Location](../wiki/frontend.src.types.weather_api.types.Interface.Location) object),
and the current weather information for said location (in the form of a
[Current](../wiki/frontend.src.types.weather_api.types.Interface.Current) object).

## Extended by

- [`LocationForecast`](../wiki/frontend.src.types.weather_api.types.Interface.LocationForecast)

## Properties

| Property                         | Type                                                                          | Defined in                                                                                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="current"></a> `current`   | [`Current`](../wiki/frontend.src.types.weather_api.types.Interface.Current)   | [frontend/src/types/weather_api.types.ts:231](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L231) |
| <a id="location"></a> `location` | [`Location`](../wiki/frontend.src.types.weather_api.types.Interface.Location) | [frontend/src/types/weather_api.types.ts:230](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L230) |
