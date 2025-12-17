[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [backend/api/types/weather_api.types](../README.md) / Current

# Interface: Current

Defined in: backend/api/types/weather_api.types.ts:55

The shape of the Current weather information for a location.

## Remarks

The response holds all the current information for the current weather and
climate, including the condition, etc. This does not include the
maximum/minimum temperatures of the day and other information, as this is
simply the information at the current moment.

## Properties

| Property                                             | Type                        | Defined in                                |
| ---------------------------------------------------- | --------------------------- | ----------------------------------------- |
| <a id="cloud"></a> `cloud`                           | `0` \| `1`                  | backend/api/types/weather_api.types.ts:71 |
| <a id="condition"></a> `condition`                   | [`Condition`](Condition.md) | backend/api/types/weather_api.types.ts:61 |
| <a id="dewpoint_c"></a> `dewpoint_c`                 | `number`                    | backend/api/types/weather_api.types.ts:78 |
| <a id="dewpoint_f"></a> `dewpoint_f`                 | `number`                    | backend/api/types/weather_api.types.ts:79 |
| <a id="diff_rad"></a> `diff_rad`                     | `number`                    | backend/api/types/weather_api.types.ts:86 |
| <a id="dni"></a> `dni`                               | `number`                    | backend/api/types/weather_api.types.ts:87 |
| <a id="feelslike_c"></a> `feelslike_c`               | `number`                    | backend/api/types/weather_api.types.ts:72 |
| <a id="feelslike_f"></a> `feelslike_f`               | `number`                    | backend/api/types/weather_api.types.ts:73 |
| <a id="gti"></a> `gti`                               | `number`                    | backend/api/types/weather_api.types.ts:88 |
| <a id="gust_kph"></a> `gust_kph`                     | `number`                    | backend/api/types/weather_api.types.ts:84 |
| <a id="gust_mph"></a> `gust_mph`                     | `number`                    | backend/api/types/weather_api.types.ts:83 |
| <a id="heatindex_c"></a> `heatindex_c`               | `number`                    | backend/api/types/weather_api.types.ts:76 |
| <a id="heatindex_f"></a> `heatindex_f`               | `number`                    | backend/api/types/weather_api.types.ts:77 |
| <a id="humidity"></a> `humidity`                     | `number`                    | backend/api/types/weather_api.types.ts:70 |
| <a id="is_day"></a> `is_day`                         | `0` \| `1`                  | backend/api/types/weather_api.types.ts:60 |
| <a id="last_updated"></a> `last_updated`             | `string`                    | backend/api/types/weather_api.types.ts:57 |
| <a id="last_updated_epoch"></a> `last_updated_epoch` | `number`                    | backend/api/types/weather_api.types.ts:56 |
| <a id="precip_in"></a> `precip_in`                   | `number`                    | backend/api/types/weather_api.types.ts:69 |
| <a id="precip_mm"></a> `precip_mm`                   | `number`                    | backend/api/types/weather_api.types.ts:68 |
| <a id="pressure_in"></a> `pressure_in`               | `number`                    | backend/api/types/weather_api.types.ts:67 |
| <a id="pressure_mb"></a> `pressure_mb`               | `number`                    | backend/api/types/weather_api.types.ts:66 |
| <a id="short_rad"></a> `short_rad`                   | `number`                    | backend/api/types/weather_api.types.ts:85 |
| <a id="temp_c"></a> `temp_c`                         | `number`                    | backend/api/types/weather_api.types.ts:58 |
| <a id="temp_f"></a> `temp_f`                         | `number`                    | backend/api/types/weather_api.types.ts:59 |
| <a id="uv"></a> `uv`                                 | `number`                    | backend/api/types/weather_api.types.ts:82 |
| <a id="vis_km"></a> `vis_km`                         | `number`                    | backend/api/types/weather_api.types.ts:80 |
| <a id="vis_miles"></a> `vis_miles`                   | `number`                    | backend/api/types/weather_api.types.ts:81 |
| <a id="wind_degree"></a> `wind_degree`               | `number`                    | backend/api/types/weather_api.types.ts:64 |
| <a id="wind_dir"></a> `wind_dir`                     | `string`                    | backend/api/types/weather_api.types.ts:65 |
| <a id="wind_kph"></a> `wind_kph`                     | `number`                    | backend/api/types/weather_api.types.ts:63 |
| <a id="wind_mph"></a> `wind_mph`                     | `number`                    | backend/api/types/weather_api.types.ts:62 |
| <a id="windchill_c"></a> `windchill_c`               | `number`                    | backend/api/types/weather_api.types.ts:74 |
| <a id="windchill_f"></a> `windchill_f`               | `number`                    | backend/api/types/weather_api.types.ts:75 |
