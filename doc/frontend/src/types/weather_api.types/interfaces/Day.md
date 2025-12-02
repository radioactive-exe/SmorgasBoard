[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/types/weather_api.types](../README.md) / Day

# Interface: Day

Defined in: [frontend/src/types/weather_api.types.ts:120](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L120)

This includes information for the Day as a whole in responses.

## Remarks

This is the object that we utilise when we want precipitation chances and
amounts for the whole day, as well as maximums, minimums, and/or averages for
temperature, wind speed, and visibility throughout the day. This object is
included in forecast responses, in addition to [Hour](Hour.md)s for each forecast
day.

## Properties

| Property                                                 | Type                        | Defined in                                                                                                                                                                                |
| -------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="avghumidity"></a> `avghumidity`                   | `number`                    | [frontend/src/types/weather_api.types.ts:121](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L121) |
| <a id="avgtemp_c"></a> `avgtemp_c`                       | `number`                    | [frontend/src/types/weather_api.types.ts:122](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L122) |
| <a id="avgtemp_f"></a> `avgtemp_f`                       | `number`                    | [frontend/src/types/weather_api.types.ts:123](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L123) |
| <a id="avgvis_km"></a> `avgvis_km`                       | `number`                    | [frontend/src/types/weather_api.types.ts:124](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L124) |
| <a id="avgvis_miles"></a> `avgvis_miles`                 | `number`                    | [frontend/src/types/weather_api.types.ts:125](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L125) |
| <a id="condition"></a> `condition`                       | [`Condition`](Condition.md) | [frontend/src/types/weather_api.types.ts:126](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L126) |
| <a id="daily_chance_of_rain"></a> `daily_chance_of_rain` | `number`                    | [frontend/src/types/weather_api.types.ts:127](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L127) |
| <a id="daily_chance_of_snow"></a> `daily_chance_of_snow` | `number`                    | [frontend/src/types/weather_api.types.ts:128](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L128) |
| <a id="daily_will_it_rain"></a> `daily_will_it_rain`     | `0` \| `1`                  | [frontend/src/types/weather_api.types.ts:129](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L129) |
| <a id="daily_will_it_snow"></a> `daily_will_it_snow`     | `0` \| `1`                  | [frontend/src/types/weather_api.types.ts:130](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L130) |
| <a id="maxtemp_c"></a> `maxtemp_c`                       | `number`                    | [frontend/src/types/weather_api.types.ts:131](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L131) |
| <a id="maxtemp_f"></a> `maxtemp_f`                       | `number`                    | [frontend/src/types/weather_api.types.ts:132](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L132) |
| <a id="maxwind_kph"></a> `maxwind_kph`                   | `number`                    | [frontend/src/types/weather_api.types.ts:135](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L135) |
| <a id="maxwind_mph"></a> `maxwind_mph`                   | `number`                    | [frontend/src/types/weather_api.types.ts:136](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L136) |
| <a id="mintemp_c"></a> `mintemp_c`                       | `number`                    | [frontend/src/types/weather_api.types.ts:133](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L133) |
| <a id="mintemp_f"></a> `mintemp_f`                       | `number`                    | [frontend/src/types/weather_api.types.ts:134](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L134) |
| <a id="totalprecip_in"></a> `totalprecip_in`             | `number`                    | [frontend/src/types/weather_api.types.ts:137](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L137) |
| <a id="totalprecip_mm"></a> `totalprecip_mm`             | `number`                    | [frontend/src/types/weather_api.types.ts:138](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L138) |
| <a id="totalsnow_cm"></a> `totalsnow_cm`                 | `number`                    | [frontend/src/types/weather_api.types.ts:139](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L139) |
| <a id="uv"></a> `uv`                                     | `number`                    | [frontend/src/types/weather_api.types.ts:140](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/types/weather_api.types.ts#L140) |
