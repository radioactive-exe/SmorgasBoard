[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/types/response.types](../README.md) / SmorgasWeatherSearchResponse

# Interface: SmorgasWeatherSearchResponse

Defined in: [frontend/src/types/response.types.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/response.types.ts#L37)

The shape of the packaged search response from the backend.

## Remarks

This includes the original search query, as well as the packaged locations
obtained from the direct call from the backend to the WeatherAPI.

## Properties

| Property                       | Type                                                           | Defined in                                                                                                                                                                        |
| ------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="query"></a> `query`     | `string`                                                       | [frontend/src/types/response.types.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/response.types.ts#L38) |
| <a id="results"></a> `results` | [`Location`](../../weather_api.types/interfaces/Location.md)[] | [frontend/src/types/response.types.ts:39](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/response.types.ts#L39) |
