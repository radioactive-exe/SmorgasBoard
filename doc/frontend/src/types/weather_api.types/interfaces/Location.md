[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/types/weather_api.types](../README.md) / Location

# Interface: Location

Defined in: [frontend/src/types/weather_api.types.ts:36](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/types/weather_api.types.ts#L36)

The general Location object inside Weather API responses.

## Remarks

This object is how location information is stored in both search results from
the search API, as well as all forecast, current, and other responses from
the API. It is a type explained in the API Docs.

## Properties

| Property                                        | Type     | Defined in                                                                                                                                                                              |
| ----------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="country"></a> `country`                  | `string` | [frontend/src/types/weather_api.types.ts:39](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/types/weather_api.types.ts#L39) |
| <a id="lat"></a> `lat`                          | `number` | [frontend/src/types/weather_api.types.ts:40](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/types/weather_api.types.ts#L40) |
| <a id="localtime"></a> `localtime`              | `string` | [frontend/src/types/weather_api.types.ts:43](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/types/weather_api.types.ts#L43) |
| <a id="localtime_epoch"></a> `localtime_epoch?` | `number` | [frontend/src/types/weather_api.types.ts:44](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/types/weather_api.types.ts#L44) |
| <a id="lon"></a> `lon`                          | `number` | [frontend/src/types/weather_api.types.ts:41](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/types/weather_api.types.ts#L41) |
| <a id="name"></a> `name`                        | `string` | [frontend/src/types/weather_api.types.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/types/weather_api.types.ts#L37) |
| <a id="region"></a> `region`                    | `string` | [frontend/src/types/weather_api.types.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/types/weather_api.types.ts#L38) |
| <a id="tz_id"></a> `tz_id?`                     | `string` | [frontend/src/types/weather_api.types.ts:42](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/types/weather_api.types.ts#L42) |
