[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/weather\_api.types](../README.md) / LocationForecast

# Interface: LocationForecast

Defined in: [frontend/src/types/weather\_api.types.ts:245](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L245)

The complete Forecast response from the API.

## Remarks

This is the complete response from a Forecast API request, including both the
location and all its information (in the form of a [Location](Location.md) object),
and the current weather information for said location (in the form of a
[Current](Current.md) object), similar to a [LocationCurrent](LocationCurrent.md) response.
However, this response also includes an object with the forecast information,
both for the day and the hours in the days requested.

## Extends

- [`LocationCurrent`](LocationCurrent.md)

## Properties

### current

> **current**: [`Current`](Current.md)

Defined in: [frontend/src/types/weather\_api.types.ts:231](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L231)

#### Inherited from

[`LocationCurrent`](LocationCurrent.md).[`current`](LocationCurrent.md#current)

***

### forecast

> **forecast**: [`Forecast`](Forecast.md)

Defined in: [frontend/src/types/weather\_api.types.ts:246](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L246)

***

### location

> **location**: [`Location`](Location.md)

Defined in: [frontend/src/types/weather\_api.types.ts:230](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L230)

#### Inherited from

[`LocationCurrent`](LocationCurrent.md).[`location`](LocationCurrent.md#location)
