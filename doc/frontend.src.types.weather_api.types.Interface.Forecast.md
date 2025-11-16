[Smorgasboard](../wiki/Home) / [frontend/src/types/weather_api.types](../wiki/frontend.src.types.weather_api.types) / Forecast

# Interface: Forecast

Defined in: [frontend/src/types/weather_api.types.ts:216](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L216)

The complete forecast response from the API.

## Remarks

Th [forecastday](../wiki/#forecastday) will have each forecasted day (of type
[ForecastDay](../wiki/frontend.src.types.weather_api.types.Interface.ForecastDay)) as one entry in the array, depending on how many days we
request from the Forecast API. In the current (free) plan for my API key, we
can request up to 3 forecast days.

## Properties

| Property                               | Type                                                                                  | Defined in                                                                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="forecastday"></a> `forecastday` | [`ForecastDay`](../wiki/frontend.src.types.weather_api.types.Interface.ForecastDay)[] | [frontend/src/types/weather_api.types.ts:217](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L217) |
