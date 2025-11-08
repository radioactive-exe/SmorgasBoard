[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/types/weather\_api.types](../README.md) / Day

# Interface: Day

Defined in: [frontend/src/types/weather\_api.types.ts:117](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L117)

This includes information for the Day as a whole in responses.

## Remarks

This is the object that we utilise when we want precipitation chances and
amounts for the whole day, as well as maximums, minimums, and/or averages for
temperature, wind speed, and visibility throughout the day. This object is
included in forecast responses, in addition to [Hour](Hour.md)s for each forecast
day.

## Properties

### avghumidity

> **avghumidity**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:118](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L118)

***

### avgtemp\_c

> **avgtemp\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:119](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L119)

***

### avgtemp\_f

> **avgtemp\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:120](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L120)

***

### avgvis\_km

> **avgvis\_km**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:121](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L121)

***

### avgvis\_miles

> **avgvis\_miles**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:122](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L122)

***

### condition

> **condition**: [`Condition`](Condition.md)

Defined in: [frontend/src/types/weather\_api.types.ts:123](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L123)

***

### daily\_chance\_of\_rain

> **daily\_chance\_of\_rain**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:124](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L124)

***

### daily\_chance\_of\_snow

> **daily\_chance\_of\_snow**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:125](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L125)

***

### daily\_will\_it\_rain

> **daily\_will\_it\_rain**: `0` \| `1`

Defined in: [frontend/src/types/weather\_api.types.ts:126](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L126)

***

### daily\_will\_it\_snow

> **daily\_will\_it\_snow**: `0` \| `1`

Defined in: [frontend/src/types/weather\_api.types.ts:127](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L127)

***

### maxtemp\_c

> **maxtemp\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:128](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L128)

***

### maxtemp\_f

> **maxtemp\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:129](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L129)

***

### maxwind\_kph

> **maxwind\_kph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:132](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L132)

***

### maxwind\_mph

> **maxwind\_mph**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:133](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L133)

***

### mintemp\_c

> **mintemp\_c**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:130](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L130)

***

### mintemp\_f

> **mintemp\_f**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:131](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L131)

***

### totalprecip\_in

> **totalprecip\_in**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:134](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L134)

***

### totalprecip\_mm

> **totalprecip\_mm**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:135](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L135)

***

### totalsnow\_cm

> **totalsnow\_cm**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:136](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L136)

***

### uv

> **uv**: `number`

Defined in: [frontend/src/types/weather\_api.types.ts:137](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/types/weather_api.types.ts#L137)
