[Smorgasboard](../wiki/Home) / [frontend/src/types/weather_api.types](../wiki/frontend.src.types.weather_api.types) / ForecastDay

# Interface: ForecastDay

Defined in: [frontend/src/types/weather_api.types.ts:199](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L199)

The complete object for each forecast day requested from the API.

## Remarks

This object contains the date for the day in question, both in
string/readable format and in epoch time, and it contains all astrology and
daily information. The hours array also stores 24 objects of type
[Hour](../wiki/frontend.src.types.weather_api.types.Interface.Hour), from midnight to midnight for the entire date.

## Properties

| Property                             | Type                                                                    | Defined in                                                                                                                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="astro"></a> `astro`           | [`Astro`](../wiki/frontend.src.types.weather_api.types.Interface.Astro) | [frontend/src/types/weather_api.types.ts:200](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L200) |
| <a id="date"></a> `date`             | `string`                                                                | [frontend/src/types/weather_api.types.ts:201](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L201) |
| <a id="date_epoch"></a> `date_epoch` | `number`                                                                | [frontend/src/types/weather_api.types.ts:202](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L202) |
| <a id="day"></a> `day`               | [`Day`](../wiki/frontend.src.types.weather_api.types.Interface.Day)     | [frontend/src/types/weather_api.types.ts:203](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L203) |
| <a id="hour"></a> `hour`             | [`Hour`](../wiki/frontend.src.types.weather_api.types.Interface.Hour)[] | [frontend/src/types/weather_api.types.ts:204](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/types/weather_api.types.ts#L204) |
