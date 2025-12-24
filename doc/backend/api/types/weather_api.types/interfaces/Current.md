[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [backend/api/types/weather_api.types](../README.md) / Current

# Interface: Current

Defined in: [backend/api/types/weather_api.types.ts:55](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L55)

The shape of the Current weather information for a location.

## Remarks

The response holds all the current information for the current weather and
climate, including the condition, etc. This does not include the
maximum/minimum temperatures of the day and other information, as this is
simply the information at the current moment.

## Properties

| Property                                             | Type                        | Defined in                                                                                                                                                                            |
| ---------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="cloud"></a> `cloud`                           | `0` \| `1`                  | [backend/api/types/weather_api.types.ts:71](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L71) |
| <a id="condition"></a> `condition`                   | [`Condition`](Condition.md) | [backend/api/types/weather_api.types.ts:61](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L61) |
| <a id="dewpoint_c"></a> `dewpoint_c`                 | `number`                    | [backend/api/types/weather_api.types.ts:78](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L78) |
| <a id="dewpoint_f"></a> `dewpoint_f`                 | `number`                    | [backend/api/types/weather_api.types.ts:79](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L79) |
| <a id="diff_rad"></a> `diff_rad`                     | `number`                    | [backend/api/types/weather_api.types.ts:86](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L86) |
| <a id="dni"></a> `dni`                               | `number`                    | [backend/api/types/weather_api.types.ts:87](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L87) |
| <a id="feelslike_c"></a> `feelslike_c`               | `number`                    | [backend/api/types/weather_api.types.ts:72](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L72) |
| <a id="feelslike_f"></a> `feelslike_f`               | `number`                    | [backend/api/types/weather_api.types.ts:73](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L73) |
| <a id="gti"></a> `gti`                               | `number`                    | [backend/api/types/weather_api.types.ts:88](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L88) |
| <a id="gust_kph"></a> `gust_kph`                     | `number`                    | [backend/api/types/weather_api.types.ts:84](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L84) |
| <a id="gust_mph"></a> `gust_mph`                     | `number`                    | [backend/api/types/weather_api.types.ts:83](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L83) |
| <a id="heatindex_c"></a> `heatindex_c`               | `number`                    | [backend/api/types/weather_api.types.ts:76](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L76) |
| <a id="heatindex_f"></a> `heatindex_f`               | `number`                    | [backend/api/types/weather_api.types.ts:77](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L77) |
| <a id="humidity"></a> `humidity`                     | `number`                    | [backend/api/types/weather_api.types.ts:70](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L70) |
| <a id="is_day"></a> `is_day`                         | `0` \| `1`                  | [backend/api/types/weather_api.types.ts:60](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L60) |
| <a id="last_updated"></a> `last_updated`             | `string`                    | [backend/api/types/weather_api.types.ts:57](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L57) |
| <a id="last_updated_epoch"></a> `last_updated_epoch` | `number`                    | [backend/api/types/weather_api.types.ts:56](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L56) |
| <a id="precip_in"></a> `precip_in`                   | `number`                    | [backend/api/types/weather_api.types.ts:69](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L69) |
| <a id="precip_mm"></a> `precip_mm`                   | `number`                    | [backend/api/types/weather_api.types.ts:68](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L68) |
| <a id="pressure_in"></a> `pressure_in`               | `number`                    | [backend/api/types/weather_api.types.ts:67](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L67) |
| <a id="pressure_mb"></a> `pressure_mb`               | `number`                    | [backend/api/types/weather_api.types.ts:66](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L66) |
| <a id="short_rad"></a> `short_rad`                   | `number`                    | [backend/api/types/weather_api.types.ts:85](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L85) |
| <a id="temp_c"></a> `temp_c`                         | `number`                    | [backend/api/types/weather_api.types.ts:58](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L58) |
| <a id="temp_f"></a> `temp_f`                         | `number`                    | [backend/api/types/weather_api.types.ts:59](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L59) |
| <a id="uv"></a> `uv`                                 | `number`                    | [backend/api/types/weather_api.types.ts:82](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L82) |
| <a id="vis_km"></a> `vis_km`                         | `number`                    | [backend/api/types/weather_api.types.ts:80](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L80) |
| <a id="vis_miles"></a> `vis_miles`                   | `number`                    | [backend/api/types/weather_api.types.ts:81](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L81) |
| <a id="wind_degree"></a> `wind_degree`               | `number`                    | [backend/api/types/weather_api.types.ts:64](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L64) |
| <a id="wind_dir"></a> `wind_dir`                     | `string`                    | [backend/api/types/weather_api.types.ts:65](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L65) |
| <a id="wind_kph"></a> `wind_kph`                     | `number`                    | [backend/api/types/weather_api.types.ts:63](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L63) |
| <a id="wind_mph"></a> `wind_mph`                     | `number`                    | [backend/api/types/weather_api.types.ts:62](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L62) |
| <a id="windchill_c"></a> `windchill_c`               | `number`                    | [backend/api/types/weather_api.types.ts:74](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L74) |
| <a id="windchill_f"></a> `windchill_f`               | `number`                    | [backend/api/types/weather_api.types.ts:75](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L75) |
