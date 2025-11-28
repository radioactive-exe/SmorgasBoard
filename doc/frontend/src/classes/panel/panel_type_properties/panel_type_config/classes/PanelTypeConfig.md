[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_type_properties/panel_type_config](../README.md) / PanelTypeConfig

# Class: PanelTypeConfig

Defined in: [frontend/src/classes/panel/panel_type_properties/panel_type_config.ts:29](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_type_properties/panel_type_config.ts#L29)

The class that contains all defined Configuration schemas for Smorgasboard
panel types.

## Remarks

The PanelTypeConfig's are all in this class as static members, each named as
the PanelType they belong to.

## See

- [zod.ZodObject](https://zod.dev/api#objects)
- [ConfigEntry](../../../../config/config_entry/README.md)

## Constructors

### Constructor

```ts
private new PanelTypeConfig(config): PanelTypeConfig;
```

Defined in: [frontend/src/classes/panel/panel_type_properties/panel_type_config.ts:132](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_type_properties/panel_type_config.ts#L132)

Creates an instance of PanelTypeConfig.

#### Parameters

| Parameter | Type                                       | Description                                                                 |
| --------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| `config`  | [`ZodObject`](https://zod.dev/api#objects) | The Zod schema defining the shape of the Config object for that panel type. |

#### Returns

`PanelTypeConfig`

#### Remarks

The constructor is private so that no new PanelType configs are declared
at runtime, they are all already established.

#### Example

```ts
See the static members of this class for examples.
```

## Properties

| Property                       | Modifier   | Type                                       | Default value | Description                                                                 | Defined in                                                                                                                                                                                                                                            |
| ------------------------------ | ---------- | ------------------------------------------ | ------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="config"></a> `config`   | `private`  | [`ZodObject`](https://zod.dev/api#objects) | `undefined`   | The Zod schema defining the shape of the Config object for that panel type. | [frontend/src/classes/panel/panel_type_properties/panel_type_config.ts:132](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_type_properties/panel_type_config.ts#L132) |
| <a id="clock"></a> `CLOCK`     | `readonly` | `PanelTypeConfig`                          | `undefined`   | -                                                                           | [frontend/src/classes/panel/panel_type_properties/panel_type_config.ts:33](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_type_properties/panel_type_config.ts#L33)   |
| <a id="none"></a> `NONE`       | `readonly` | `undefined`                                | `undefined`   | This member is assigned to any PanelType that does not have a config.       | [frontend/src/classes/panel/panel_type_properties/panel_type_config.ts:31](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_type_properties/panel_type_config.ts#L31)   |
| <a id="photo"></a> `PHOTO`     | `readonly` | `PanelTypeConfig`                          | `undefined`   | -                                                                           | [frontend/src/classes/panel/panel_type_properties/panel_type_config.ts:88](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_type_properties/panel_type_config.ts#L88)   |
| <a id="todo"></a> `TODO`       | `readonly` | `PanelTypeConfig`                          | `undefined`   | -                                                                           | [frontend/src/classes/panel/panel_type_properties/panel_type_config.ts:96](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_type_properties/panel_type_config.ts#L96)   |
| <a id="weather"></a> `WEATHER` | `readonly` | `PanelTypeConfig`                          | `undefined`   | -                                                                           | [frontend/src/classes/panel/panel_type_properties/panel_type_config.ts:105](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_type_properties/panel_type_config.ts#L105) |

## Methods

### getConfig()

```ts
getConfig(): ZodObject;
```

Defined in: [frontend/src/classes/panel/panel_type_properties/panel_type_config.ts:139](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/classes/panel/panel_type_properties/panel_type_config.ts#L139)

Gets the stored schema as a Zod Object directly.

#### Returns

[`ZodObject`](https://zod.dev/api#objects)

The Zod Object/Schema for the PanelType Config.
