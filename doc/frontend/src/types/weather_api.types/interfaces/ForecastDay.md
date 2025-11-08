[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/weather\_api.types](../README.md) / ForecastDay

# Interface: ForecastDay

Defined in: [frontend/src/types/weather\_api.types.ts:199](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L199)

The complete object for each forecast day requested from the API.

## Remarks

This object contains the date for the day in question, both in
string/readable format and in epoch time, and it contains all astrology and
daily information. The hours array also stores 24 objects of type
[Hour](Hour.md), from midnight to midnight for the entire date.

## Properties

### astro

> **astro**: [`Astro`](Astro.md)

Defined in: [frontend/src/types/weather\_api.types.ts:200](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L200)

***

### date

> **date**: `string`

Defined in: [frontend/src/types/weather\_api.types.ts:201](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L201)

***

### date\_epoch

> **date\_epoch**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:202](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L202)

***

### day

> **day**: [`Day`](Day.md)

Defined in: [frontend/src/types/weather\_api.types.ts:203](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L203)

***

### hour

> **hour**: [`Hour`](Hour.md)[]

Defined in: [frontend/src/types/weather\_api.types.ts:204](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L204)
