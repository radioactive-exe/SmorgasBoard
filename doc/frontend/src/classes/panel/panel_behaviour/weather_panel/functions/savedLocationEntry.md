[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_behaviour/weather_panel](../README.md) / savedLocationEntry

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

Defined in: [frontend/src/classes/panel/panel_behaviour/weather_panel.ts:829](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/classes/panel/panel_behaviour/weather_panel.ts#L829)

Creates and returns a saved location entry to be added to the saved location
list.

## Parameters

| Parameter      | Type                                       | Default value | Description                                                                                                                                                                                              |
| -------------- | ------------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `panel`        | [`Panel`](../../../panel/classes/Panel.md) | `undefined`   | The panel calling these functions.                                                                                                                                                                       |
| `city`         | `string`                                   | `undefined`   | The city/location name to be placed in the entry.                                                                                                                                                        |
| `lat`          | `number`                                   | `undefined`   | The location latitude.                                                                                                                                                                                   |
| `lon`          | `number`                                   | `undefined`   | The location longitude.                                                                                                                                                                                  |
| `condition`    | `string`                                   | `undefined`   | The description of the current condition at the location.                                                                                                                                                |
| `temp`         | `string`                                   | `undefined`   | The current temperature at the location.                                                                                                                                                                 |
| `minTemp`      | `string`                                   | `undefined`   | The minimum temperature at the location for the day.                                                                                                                                                     |
| `maxTemp`      | `string`                                   | `undefined`   | The maximum temperature at the location for the day.                                                                                                                                                     |
| `updateStored` | `boolean`                                  | `true`        | Whether or not to trigger a save when the entry is added. This defaults to `true`, as most entries will be new, but this parameter will be set to false when populating saved entries on dashboard load. |

## Returns

`HTMLLIElement`

The formulated LI element for the location to save.

## Example

```ts
savedLocationList.appendChild(
  savedLocationEntry(
    panel,
    "Atlantis",
    "-10.5",
    "-26.7",
    "Drowned",
    "-15&degC",
    "-20&degC",
    "-12&degC",
    true,
  ),
);
```

The above creates and adds a new entry to save the weather information for
"Atlantis". The latitude and longitude are negative given its mythical
nature, and the condition and temperature information is, well, an
unfortunate state.
