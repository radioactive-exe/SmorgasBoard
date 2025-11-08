[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/weather\_api.types](../README.md) / Forecast

# Interface: Forecast

Defined in: [frontend/src/types/weather\_api.types.ts:216](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L216)

The complete forecast response from the API.

## Remarks

Th [forecastday](#forecastday) will have each forecasted day (of type
[ForecastDay](ForecastDay.md)) as one entry in the array, depending on how many days we
request from the Forecast API. In the current (free) plan for my API key, we
can request up to 3 forecast days.

## Properties

### forecastday

> **forecastday**: [`ForecastDay`](ForecastDay.md)[]

Defined in: [frontend/src/types/weather\_api.types.ts:217](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L217)
