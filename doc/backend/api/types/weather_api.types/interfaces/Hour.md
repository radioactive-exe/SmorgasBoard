[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [backend/api/types/weather_api.types](../README.md) / Hour

# Interface: Hour

Defined in: backend/api/types/weather_api.types.ts:151

Hourly weather information.

## Remarks

This includes the current or forecasted information for a particular hour in
a day, along with the conclusive [Day](Day.md) in forecast responses. The time
of the hour in question is stored, as well as temperatures,
snow/precipitation chances, and forecasted conditions and humidity.

## Properties

| Property                                     | Type                        | Defined in                                 |
| -------------------------------------------- | --------------------------- | ------------------------------------------ |
| <a id="chance_of_rain"></a> `chance_of_rain` | `number`                    | backend/api/types/weather_api.types.ts:178 |
| <a id="chance_of_snow"></a> `chance_of_snow` | `number`                    | backend/api/types/weather_api.types.ts:180 |
| <a id="cloud"></a> `cloud`                   | `number`                    | backend/api/types/weather_api.types.ts:168 |
| <a id="condition"></a> `condition`           | [`Condition`](Condition.md) | backend/api/types/weather_api.types.ts:157 |
| <a id="dewpoint_c"></a> `dewpoint_c`         | `number`                    | backend/api/types/weather_api.types.ts:175 |
| <a id="dewpoint_f"></a> `dewpoint_f`         | `number`                    | backend/api/types/weather_api.types.ts:176 |
| <a id="diff_rad"></a> `diff_rad`             | `number`                    | backend/api/types/weather_api.types.ts:187 |
| <a id="dni"></a> `dni`                       | `number`                    | backend/api/types/weather_api.types.ts:188 |
| <a id="feelslike_c"></a> `feelslike_c`       | `number`                    | backend/api/types/weather_api.types.ts:169 |
| <a id="feelslike_f"></a> `feelslike_f`       | `number`                    | backend/api/types/weather_api.types.ts:170 |
| <a id="gti"></a> `gti`                       | `number`                    | backend/api/types/weather_api.types.ts:189 |
| <a id="gust_kph"></a> `gust_kph`             | `number`                    | backend/api/types/weather_api.types.ts:184 |
| <a id="gust_mph"></a> `gust_mph`             | `number`                    | backend/api/types/weather_api.types.ts:183 |
| <a id="heatindex_c"></a> `heatindex_c`       | `number`                    | backend/api/types/weather_api.types.ts:173 |
| <a id="heatindex_f"></a> `heatindex_f`       | `number`                    | backend/api/types/weather_api.types.ts:174 |
| <a id="humidity"></a> `humidity`             | `number`                    | backend/api/types/weather_api.types.ts:167 |
| <a id="is_day"></a> `is_day`                 | `0` \| `1`                  | backend/api/types/weather_api.types.ts:156 |
| <a id="precip_in"></a> `precip_in`           | `number`                    | backend/api/types/weather_api.types.ts:165 |
| <a id="precip_mm"></a> `precip_mm`           | `number`                    | backend/api/types/weather_api.types.ts:164 |
| <a id="pressure_in"></a> `pressure_in`       | `number`                    | backend/api/types/weather_api.types.ts:163 |
| <a id="pressure_mb"></a> `pressure_mb`       | `number`                    | backend/api/types/weather_api.types.ts:162 |
| <a id="short_rad"></a> `short_rad`           | `number`                    | backend/api/types/weather_api.types.ts:186 |
| <a id="snow_cm"></a> `snow_cm`               | `number`                    | backend/api/types/weather_api.types.ts:166 |
| <a id="temp_c"></a> `temp_c`                 | `number`                    | backend/api/types/weather_api.types.ts:154 |
| <a id="temp_f"></a> `temp_f`                 | `number`                    | backend/api/types/weather_api.types.ts:155 |
| <a id="time"></a> `time`                     | `string`                    | backend/api/types/weather_api.types.ts:153 |
| <a id="time_epoch"></a> `time_epoch`         | `number`                    | backend/api/types/weather_api.types.ts:152 |
| <a id="uv"></a> `uv`                         | `number`                    | backend/api/types/weather_api.types.ts:185 |
| <a id="vis_km"></a> `vis_km`                 | `number`                    | backend/api/types/weather_api.types.ts:181 |
| <a id="vis_miles"></a> `vis_miles`           | `number`                    | backend/api/types/weather_api.types.ts:182 |
| <a id="will_it_rain"></a> `will_it_rain`     | `0` \| `1`                  | backend/api/types/weather_api.types.ts:177 |
| <a id="will_it_snow"></a> `will_it_snow`     | `0` \| `1`                  | backend/api/types/weather_api.types.ts:179 |
| <a id="wind_degree"></a> `wind_degree`       | `number`                    | backend/api/types/weather_api.types.ts:160 |
| <a id="wind_dir"></a> `wind_dir`             | `string`                    | backend/api/types/weather_api.types.ts:161 |
| <a id="wind_kph"></a> `wind_kph`             | `number`                    | backend/api/types/weather_api.types.ts:159 |
| <a id="wind_mph"></a> `wind_mph`             | `number`                    | backend/api/types/weather_api.types.ts:158 |
| <a id="windchill_c"></a> `windchill_c`       | `number`                    | backend/api/types/weather_api.types.ts:171 |
| <a id="windchill_f"></a> `windchill_f`       | `number`                    | backend/api/types/weather_api.types.ts:172 |
