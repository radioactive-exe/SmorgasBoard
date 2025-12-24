[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [backend/api/types/weather_api.types](../README.md) / Location

# Interface: Location

Defined in: [backend/api/types/weather_api.types.ts:35](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L35)

The general Location object inside Weather API responses.

## Remarks

This object is how location information is stored in both search results from
the search API, as well as all forecast, current, and other responses from
the API. It is a type explained in the API Docs.

## Properties

| Property                                        | Type     | Defined in                                                                                                                                                                            |
| ----------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="country"></a> `country`                  | `string` | [backend/api/types/weather_api.types.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L38) |
| <a id="lat"></a> `lat`                          | `number` | [backend/api/types/weather_api.types.ts:39](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L39) |
| <a id="localtime"></a> `localtime`              | `string` | [backend/api/types/weather_api.types.ts:42](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L42) |
| <a id="localtime_epoch"></a> `localtime_epoch?` | `number` | [backend/api/types/weather_api.types.ts:43](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L43) |
| <a id="lon"></a> `lon`                          | `number` | [backend/api/types/weather_api.types.ts:40](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L40) |
| <a id="name"></a> `name`                        | `string` | [backend/api/types/weather_api.types.ts:36](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L36) |
| <a id="region"></a> `region`                    | `string` | [backend/api/types/weather_api.types.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L37) |
| <a id="tz_id"></a> `tz_id?`                     | `string` | [backend/api/types/weather_api.types.ts:41](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L41) |
