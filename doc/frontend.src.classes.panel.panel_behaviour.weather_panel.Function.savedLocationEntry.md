[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel_behaviour/weather_panel](../wiki/frontend.src.classes.panel.panel_behaviour.weather_panel) / savedLocationEntry

# Function: savedLocationEntry()

```ts
function savedLocationEntry(
  panel,
  city,
  lat,
  lon,
  condition,
  temp,
  minTemp,
  maxTemp,
  updateStored,
): HTMLLIElement;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/weather_panel.ts:657](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_behaviour/weather_panel.ts#L657)

## Parameters

| Parameter      | Type                                                            | Default value |
| -------------- | --------------------------------------------------------------- | ------------- |
| `panel`        | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | `undefined`   |
| `city`         | `string`                                                        | `undefined`   |
| `lat`          | `number`                                                        | `undefined`   |
| `lon`          | `number`                                                        | `undefined`   |
| `condition`    | `string`                                                        | `undefined`   |
| `temp`         | `string`                                                        | `undefined`   |
| `minTemp`      | `string`                                                        | `undefined`   |
| `maxTemp`      | `string`                                                        | `undefined`   |
| `updateStored` | `boolean`                                                       | `true`        |

## Returns

`HTMLLIElement`
