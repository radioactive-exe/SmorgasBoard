[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/weather\_api.types](../README.md) / LocationCurrent

# Interface: LocationCurrent

Defined in: [frontend/src/types/weather\_api.types.ts:229](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L229)

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

Defined in: [frontend/src/types/weather\_api.types.ts:231](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L231)

***

### location

> **location**: [`Location`](Location.md)

Defined in: [frontend/src/types/weather\_api.types.ts:230](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L230)
