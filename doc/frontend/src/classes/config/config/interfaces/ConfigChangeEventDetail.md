[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/config/config](../README.md) / ConfigChangeEventDetail

# Interface: ConfigChangeEventDetail

Defined in: [frontend/src/classes/config/config.ts:28](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/classes/config/config.ts#L28)

The interface holding the shape of a custom event detail for the ConfigChange
custom event.

## Remarks

This interface is the payload when a custom event is fired off by
changing/selecting a config option, triggering a save and applying the
changed config setting.

## Properties

| Property                       | Type                              | Description                                                                                              | Defined in                                                                                                                                                                          |
| ------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="setting"></a> `setting` | `string`                          | The config setting that was changed, obtained from the dataset attributes of the selector that fired it. | [frontend/src/classes/config/config.ts:33](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/classes/config/config.ts#L33) |
| <a id="value"></a> `value`     | `string` \| `number` \| `boolean` | The new value of the changed setting, obtained from the value of the selector upon firing.               | [frontend/src/classes/config/config.ts:38](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/classes/config/config.ts#L38) |
