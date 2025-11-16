[Smorgasboard](../wiki/Home) / [frontend/src/types/response.types](../wiki/frontend.src.types.response.types) / SmorgasWeatherSearchResponse

# Interface: SmorgasWeatherSearchResponse

Defined in: [frontend/src/types/response.types.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/response.types.ts#L37)

The shape of the packaged search response from the backend.

## Remarks

This includes the original search query, as well as the packaged locations
obtained from the direct call from the backend to the WeatherAPI.

## Properties

| Property                       | Type                                                                            | Defined in                                                                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="query"></a> `query`     | `string`                                                                        | [frontend/src/types/response.types.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/response.types.ts#L38) |
| <a id="results"></a> `results` | [`Location`](../wiki/frontend.src.types.weather_api.types.Interface.Location)[] | [frontend/src/types/response.types.ts:39](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/response.types.ts#L39) |
