[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [backend/api/types/weather_api.types](../README.md) / Hour

# Interface: Hour

Defined in: [backend/api/types/weather_api.types.ts:151](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L151)

Hourly weather information.

## Remarks

This includes the current or forecasted information for a particular hour in
a day, along with the conclusive [Day](Day.md) in forecast responses. The time
of the hour in question is stored, as well as temperatures,
snow/precipitation chances, and forecasted conditions and humidity.

## Properties

| Property                                     | Type                        | Defined in                                                                                                                                                                              |
| -------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="chance_of_rain"></a> `chance_of_rain` | `number`                    | [backend/api/types/weather_api.types.ts:178](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L178) |
| <a id="chance_of_snow"></a> `chance_of_snow` | `number`                    | [backend/api/types/weather_api.types.ts:180](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L180) |
| <a id="cloud"></a> `cloud`                   | `number`                    | [backend/api/types/weather_api.types.ts:168](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L168) |
| <a id="condition"></a> `condition`           | [`Condition`](Condition.md) | [backend/api/types/weather_api.types.ts:157](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L157) |
| <a id="dewpoint_c"></a> `dewpoint_c`         | `number`                    | [backend/api/types/weather_api.types.ts:175](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L175) |
| <a id="dewpoint_f"></a> `dewpoint_f`         | `number`                    | [backend/api/types/weather_api.types.ts:176](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L176) |
| <a id="diff_rad"></a> `diff_rad`             | `number`                    | [backend/api/types/weather_api.types.ts:187](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L187) |
| <a id="dni"></a> `dni`                       | `number`                    | [backend/api/types/weather_api.types.ts:188](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L188) |
| <a id="feelslike_c"></a> `feelslike_c`       | `number`                    | [backend/api/types/weather_api.types.ts:169](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L169) |
| <a id="feelslike_f"></a> `feelslike_f`       | `number`                    | [backend/api/types/weather_api.types.ts:170](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L170) |
| <a id="gti"></a> `gti`                       | `number`                    | [backend/api/types/weather_api.types.ts:189](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L189) |
| <a id="gust_kph"></a> `gust_kph`             | `number`                    | [backend/api/types/weather_api.types.ts:184](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L184) |
| <a id="gust_mph"></a> `gust_mph`             | `number`                    | [backend/api/types/weather_api.types.ts:183](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L183) |
| <a id="heatindex_c"></a> `heatindex_c`       | `number`                    | [backend/api/types/weather_api.types.ts:173](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L173) |
| <a id="heatindex_f"></a> `heatindex_f`       | `number`                    | [backend/api/types/weather_api.types.ts:174](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L174) |
| <a id="humidity"></a> `humidity`             | `number`                    | [backend/api/types/weather_api.types.ts:167](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L167) |
| <a id="is_day"></a> `is_day`                 | `0` \| `1`                  | [backend/api/types/weather_api.types.ts:156](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L156) |
| <a id="precip_in"></a> `precip_in`           | `number`                    | [backend/api/types/weather_api.types.ts:165](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L165) |
| <a id="precip_mm"></a> `precip_mm`           | `number`                    | [backend/api/types/weather_api.types.ts:164](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L164) |
| <a id="pressure_in"></a> `pressure_in`       | `number`                    | [backend/api/types/weather_api.types.ts:163](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L163) |
| <a id="pressure_mb"></a> `pressure_mb`       | `number`                    | [backend/api/types/weather_api.types.ts:162](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L162) |
| <a id="short_rad"></a> `short_rad`           | `number`                    | [backend/api/types/weather_api.types.ts:186](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L186) |
| <a id="snow_cm"></a> `snow_cm`               | `number`                    | [backend/api/types/weather_api.types.ts:166](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L166) |
| <a id="temp_c"></a> `temp_c`                 | `number`                    | [backend/api/types/weather_api.types.ts:154](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L154) |
| <a id="temp_f"></a> `temp_f`                 | `number`                    | [backend/api/types/weather_api.types.ts:155](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L155) |
| <a id="time"></a> `time`                     | `string`                    | [backend/api/types/weather_api.types.ts:153](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L153) |
| <a id="time_epoch"></a> `time_epoch`         | `number`                    | [backend/api/types/weather_api.types.ts:152](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L152) |
| <a id="uv"></a> `uv`                         | `number`                    | [backend/api/types/weather_api.types.ts:185](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L185) |
| <a id="vis_km"></a> `vis_km`                 | `number`                    | [backend/api/types/weather_api.types.ts:181](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L181) |
| <a id="vis_miles"></a> `vis_miles`           | `number`                    | [backend/api/types/weather_api.types.ts:182](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L182) |
| <a id="will_it_rain"></a> `will_it_rain`     | `0` \| `1`                  | [backend/api/types/weather_api.types.ts:177](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L177) |
| <a id="will_it_snow"></a> `will_it_snow`     | `0` \| `1`                  | [backend/api/types/weather_api.types.ts:179](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L179) |
| <a id="wind_degree"></a> `wind_degree`       | `number`                    | [backend/api/types/weather_api.types.ts:160](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L160) |
| <a id="wind_dir"></a> `wind_dir`             | `string`                    | [backend/api/types/weather_api.types.ts:161](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L161) |
| <a id="wind_kph"></a> `wind_kph`             | `number`                    | [backend/api/types/weather_api.types.ts:159](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L159) |
| <a id="wind_mph"></a> `wind_mph`             | `number`                    | [backend/api/types/weather_api.types.ts:158](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L158) |
| <a id="windchill_c"></a> `windchill_c`       | `number`                    | [backend/api/types/weather_api.types.ts:171](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L171) |
| <a id="windchill_f"></a> `windchill_f`       | `number`                    | [backend/api/types/weather_api.types.ts:172](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/backend/api/types/weather_api.types.ts#L172) |
