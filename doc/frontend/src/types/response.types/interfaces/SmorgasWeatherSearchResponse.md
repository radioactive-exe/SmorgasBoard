[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/types/response.types](../README.md) / SmorgasWeatherSearchResponse

# Interface: SmorgasWeatherSearchResponse

Defined in: [frontend/src/types/response.types.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/response.types.ts#L37)

The shape of the packaged search response from the backend.

## Remarks

This includes the original search query, as well as the packaged locations
obtained from the direct call from the backend to the WeatherAPI.

## Properties

| Property                       | Type                                                           | Defined in                                                                                                                                                                        |
| ------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="query"></a> `query`     | `string`                                                       | [frontend/src/types/response.types.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/response.types.ts#L38) |
| <a id="results"></a> `results` | [`Location`](../../weather_api.types/interfaces/Location.md)[] | [frontend/src/types/response.types.ts:39](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/response.types.ts#L39) |
