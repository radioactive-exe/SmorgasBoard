[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/response.types](../README.md) / SmorgasWeatherSearchResponse

# Interface: SmorgasWeatherSearchResponse

Defined in: [frontend/src/types/response.types.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/response.types.ts#L37)

The shape of the packaged search response from the backend.

## Remarks

This includes the original search query, as well as the packaged locations
obtained from the direct call from the backend to the WeatherAPI.

## Properties

### query

> **query**: `string`

Defined in: [frontend/src/types/response.types.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/response.types.ts#L38)

***

### results

> **results**: [`Location`](../../weather_api.types/interfaces/Location.md)[]

Defined in: [frontend/src/types/response.types.ts:39](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/response.types.ts#L39)
