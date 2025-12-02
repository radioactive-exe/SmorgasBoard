[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [backend/src/types/weather_api.types](../README.md) / Forecast

# Interface: Forecast

Defined in: [backend/src/types/weather_api.types.ts:218](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/backend/src/types/weather_api.types.ts#L218)

The complete forecast response from the API.

## Remarks

Th [forecastday](#forecastday) will have each forecasted day (of type
[ForecastDay](ForecastDay.md)) as one entry in the array, depending on how many days we
request from the Forecast API. In the current (free) plan for my API key, we
can request up to 3 forecast days.

## Properties

| Property                               | Type                              | Defined in                                                                                                                                                                              |
| -------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="forecastday"></a> `forecastday` | [`ForecastDay`](ForecastDay.md)[] | [backend/src/types/weather_api.types.ts:219](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/backend/src/types/weather_api.types.ts#L219) |
