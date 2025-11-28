[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/types/weather_api.types](../README.md) / LocationCurrent

# Interface: LocationCurrent

Defined in: [frontend/src/types/weather_api.types.ts:232](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/weather_api.types.ts#L232)

The complete current response from the API.

## Remarks

This is the complete response from a Current API request, including both the
location and all its information (in the form of a [Location](Location.md) object),
and the current weather information for said location (in the form of a
[Current](Current.md) object).

## Extended by

- [`LocationForecast`](LocationForecast.md)

## Properties

| Property                         | Type                      | Defined in                                                                                                                                                                                |
| -------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="current"></a> `current`   | [`Current`](Current.md)   | [frontend/src/types/weather_api.types.ts:234](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/weather_api.types.ts#L234) |
| <a id="location"></a> `location` | [`Location`](Location.md) | [frontend/src/types/weather_api.types.ts:233](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/types/weather_api.types.ts#L233) |
