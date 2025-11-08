[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/weather\_api.types](../README.md) / Hour

# Interface: Hour

Defined in: [frontend/src/types/weather\_api.types.ts:149](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L149)

Hourly weather information.

## Remarks

This includes the current or forecasted information for a particular hour in
a day, along with the conclusive [Day](Day.md) in forecast responses. The time
of the hour in question is stored, as well as temperatures,
snow/precipitation chances, and forecasted conditions and humidity.

## Properties

### chance\_of\_rain

> **chance\_of\_rain**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:176](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L176)

***

### chance\_of\_snow

> **chance\_of\_snow**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:178](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L178)

***

### cloud

> **cloud**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:166](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L166)

***

### condition

> **condition**: [`Condition`](Condition.md)

Defined in: [frontend/src/types/weather\_api.types.ts:155](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L155)

***

### dewpoint\_c

> **dewpoint\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:173](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L173)

***

### dewpoint\_f

> **dewpoint\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:174](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L174)

***

### diff\_rad

> **diff\_rad**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:185](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L185)

***

### dni

> **dni**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:186](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L186)

***

### feelslike\_c

> **feelslike\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:167](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L167)

***

### feelslike\_f

> **feelslike\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:168](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L168)

***

### gti

> **gti**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:187](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L187)

***

### gust\_kph

> **gust\_kph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:182](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L182)

***

### gust\_mph

> **gust\_mph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:181](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L181)

***

### heatindex\_c

> **heatindex\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:171](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L171)

***

### heatindex\_f

> **heatindex\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:172](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L172)

***

### humidity

> **humidity**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:165](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L165)

***

### is\_day

> **is\_day**: `0` \| `1`

Defined in: [frontend/src/types/weather\_api.types.ts:154](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L154)

***

### precip\_in

> **precip\_in**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:163](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L163)

***

### precip\_mm

> **precip\_mm**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:162](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L162)

***

### pressure\_in

> **pressure\_in**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:161](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L161)

***

### pressure\_mb

> **pressure\_mb**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:160](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L160)

***

### short\_rad

> **short\_rad**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:184](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L184)

***

### snow\_cm

> **snow\_cm**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:164](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L164)

***

### temp\_c

> **temp\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:152](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L152)

***

### temp\_f

> **temp\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:153](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L153)

***

### time

> **time**: `string`

Defined in: [frontend/src/types/weather\_api.types.ts:151](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L151)

***

### time\_epoch

> **time\_epoch**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:150](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L150)

***

### uv

> **uv**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:183](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L183)

***

### vis\_km

> **vis\_km**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:179](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L179)

***

### vis\_miles

> **vis\_miles**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:180](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L180)

***

### will\_it\_rain

> **will\_it\_rain**: `0` \| `1`

Defined in: [frontend/src/types/weather\_api.types.ts:175](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L175)

***

### will\_it\_snow

> **will\_it\_snow**: `0` \| `1`

Defined in: [frontend/src/types/weather\_api.types.ts:177](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L177)

***

### wind\_degree

> **wind\_degree**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:158](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L158)

***

### wind\_dir

> **wind\_dir**: `string`

Defined in: [frontend/src/types/weather\_api.types.ts:159](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L159)

***

### wind\_kph

> **wind\_kph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:157](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L157)

***

### wind\_mph

> **wind\_mph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:156](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L156)

***

### windchill\_c

> **windchill\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:169](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L169)

***

### windchill\_f

> **windchill\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:170](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/types/weather_api.types.ts#L170)
