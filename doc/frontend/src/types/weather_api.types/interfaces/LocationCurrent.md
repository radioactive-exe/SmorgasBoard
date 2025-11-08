[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/weather\_api.types](../README.md) / LocationCurrent

# Interface: LocationCurrent

Defined in: [frontend/src/types/weather\_api.types.ts:229](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L229)

The complete current response from the API.

## Remarks

This is the complete response from a Current API request, including both the
location and all its information (in the form of a [Location](Location.md) object),
and the current weather information for said location (in the form of a
[Current](Current.md) object).

## Extended by

- [`LocationForecast`](LocationForecast.md)

## Properties

### current

> **current**: [`Current`](Current.md)

Defined in: [frontend/src/types/weather\_api.types.ts:231](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L231)

***

### location

> **location**: [`Location`](Location.md)

Defined in: [frontend/src/types/weather\_api.types.ts:230](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L230)
