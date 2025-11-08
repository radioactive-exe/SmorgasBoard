[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/weather\_api.types](../README.md) / Current

# Interface: Current

Defined in: [frontend/src/types/weather\_api.types.ts:53](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L53)

The shape of the Current weather information for a location.

## Remarks

The response holds all the current information for the current weather and
climate, including the condition, etc. This does not include the
maximum/minimum temperatures of the day and other information, as this is
simply the information at the current moment.

## Properties

### cloud

> **cloud**: `0` \| `1`

Defined in: [frontend/src/types/weather\_api.types.ts:69](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L69)

***

### condition

> **condition**: [`Condition`](Condition.md)

Defined in: [frontend/src/types/weather\_api.types.ts:59](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L59)

***

### dewpoint\_c

> **dewpoint\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:76](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L76)

***

### dewpoint\_f

> **dewpoint\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:77](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L77)

***

### diff\_rad

> **diff\_rad**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:84](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L84)

***

### dni

> **dni**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:85](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L85)

***

### feelslike\_c

> **feelslike\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:70](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L70)

***

### feelslike\_f

> **feelslike\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:71](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L71)

***

### gti

> **gti**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:86](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L86)

***

### gust\_kph

> **gust\_kph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:82](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L82)

***

### gust\_mph

> **gust\_mph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:81](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L81)

***

### heatindex\_c

> **heatindex\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:74](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L74)

***

### heatindex\_f

> **heatindex\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:75](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L75)

***

### humidity

> **humidity**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:68](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L68)

***

### is\_day

> **is\_day**: `0` \| `1`

Defined in: [frontend/src/types/weather\_api.types.ts:58](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L58)

***

### last\_updated

> **last\_updated**: `string`

Defined in: [frontend/src/types/weather\_api.types.ts:55](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L55)

***

### last\_updated\_epoch

> **last\_updated\_epoch**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:54](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L54)

***

### precip\_in

> **precip\_in**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:67](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L67)

***

### precip\_mm

> **precip\_mm**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:66](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L66)

***

### pressure\_in

> **pressure\_in**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:65](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L65)

***

### pressure\_mb

> **pressure\_mb**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:64](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L64)

***

### short\_rad

> **short\_rad**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:83](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L83)

***

### temp\_c

> **temp\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:56](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L56)

***

### temp\_f

> **temp\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:57](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L57)

***

### uv

> **uv**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:80](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L80)

***

### vis\_km

> **vis\_km**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:78](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L78)

***

### vis\_miles

> **vis\_miles**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:79](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L79)

***

### wind\_degree

> **wind\_degree**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:62](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L62)

***

### wind\_dir

> **wind\_dir**: `string`

Defined in: [frontend/src/types/weather\_api.types.ts:63](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L63)

***

### wind\_kph

> **wind\_kph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:61](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L61)

***

### wind\_mph

> **wind\_mph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:60](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L60)

***

### windchill\_c

> **windchill\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:72](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L72)

***

### windchill\_f

> **windchill\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:73](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L73)
