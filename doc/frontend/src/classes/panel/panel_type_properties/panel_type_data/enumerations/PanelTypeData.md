[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_type_properties/panel_type_data](../README.md) / PanelTypeData

# Enumeration: PanelTypeData

Defined in: [frontend/src/classes/panel/panel_type_properties/panel_type_data.ts:16](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/panel/panel_type_properties/panel_type_data.ts#L16)

Different Panel Data Types, the keys of the entries being the type of data
content, and the values being their respective ID.

## Enumeration Members

| Enumeration Member               | Value | Description                                                                                                                                             | Defined in                                                                                                                                                                                                                                      |
| -------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="external"></a> `EXTERNAL` | `2`   | The Panel stores and utilises data from an external source, such as an external third-party API. **Example** `A Weather panel.`                         | [frontend/src/classes/panel/panel_type_properties/panel_type_data.ts:49](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/panel/panel_type_properties/panel_type_data.ts#L49) |
| <a id="global"></a> `GLOBAL`     | `1`   | The Panel stores and utilises data shared by all users on Smorgasboard. **Example** `(To be implemented) Quote of the day panel, Recommendation panel.` | [frontend/src/classes/panel/panel_type_properties/panel_type_data.ts:40](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/panel/panel_type_properties/panel_type_data.ts#L40) |
| <a id="local"></a> `LOCAL`       | `0`   | The Panel stores and saves data local to the user. **Example** `A Photo panel, or a Notepad panel.`                                                     | [frontend/src/classes/panel/panel_type_properties/panel_type_data.ts:32](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/panel/panel_type_properties/panel_type_data.ts#L32) |
| <a id="none"></a> `NONE`         | `-1`  | The Panel stores no data beyond its behaviour and Config. **Example** `A Clock panel.`                                                                  | [frontend/src/classes/panel/panel_type_properties/panel_type_data.ts:24](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/classes/panel/panel_type_properties/panel_type_data.ts#L24) |
