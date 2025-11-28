[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/types/weather_api.types](../README.md) / Forecast

# Interface: Forecast

Defined in: [frontend/src/types/weather_api.types.ts:219](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/types/weather_api.types.ts#L219)

The complete forecast response from the API.

## Remarks

Th [forecastday](#forecastday) will have each forecasted day (of type
[ForecastDay](ForecastDay.md)) as one entry in the array, depending on how many days we
request from the Forecast API. In the current (free) plan for my API key, we
can request up to 3 forecast days.

## Properties

| Property                               | Type                              | Defined in                                                                                                                                                                                |
| -------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="forecastday"></a> `forecastday` | [`ForecastDay`](ForecastDay.md)[] | [frontend/src/types/weather_api.types.ts:220](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/types/weather_api.types.ts#L220) |
