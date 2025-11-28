[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/types/weather_api.types](../README.md) / ForecastDay

# Interface: ForecastDay

Defined in: [frontend/src/types/weather_api.types.ts:202](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/weather_api.types.ts#L202)

The complete object for each forecast day requested from the API.

## Remarks

This object contains the date for the day in question, both in
string/readable format and in epoch time, and it contains all astrology and
daily information. The hours array also stores 24 objects of type
[Hour](Hour.md), from midnight to midnight for the entire date.

## Properties

| Property                             | Type                | Defined in                                                                                                                                                                                |
| ------------------------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="astro"></a> `astro`           | [`Astro`](Astro.md) | [frontend/src/types/weather_api.types.ts:203](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/weather_api.types.ts#L203) |
| <a id="date"></a> `date`             | `string`            | [frontend/src/types/weather_api.types.ts:204](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/weather_api.types.ts#L204) |
| <a id="date_epoch"></a> `date_epoch` | `number`            | [frontend/src/types/weather_api.types.ts:205](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/weather_api.types.ts#L205) |
| <a id="day"></a> `day`               | [`Day`](Day.md)     | [frontend/src/types/weather_api.types.ts:206](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/weather_api.types.ts#L206) |
| <a id="hour"></a> `hour`             | [`Hour`](Hour.md)[] | [frontend/src/types/weather_api.types.ts:207](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/weather_api.types.ts#L207) |
