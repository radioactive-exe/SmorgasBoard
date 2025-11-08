[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/response.types](../README.md) / SmorgasWeatherSearchResponse

# Interface: SmorgasWeatherSearchResponse

Defined in: [frontend/src/types/response.types.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/response.types.ts#L37)

The shape of the packaged search response from the backend.

## Remarks

This includes the original search query, as well as the packaged locations
obtained from the direct call from the backend to the WeatherAPI.

## Properties

### query

> **query**: `string`

Defined in: [frontend/src/types/response.types.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/response.types.ts#L38)

***

### results

> **results**: [`Location`](../../weather_api.types/interfaces/Location.md)[]

Defined in: [frontend/src/types/response.types.ts:39](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/response.types.ts#L39)
