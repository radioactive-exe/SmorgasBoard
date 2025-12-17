[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/panel/panel_type](../README.md) / PanelType

# Class: PanelType

Defined in: [frontend/src/classes/panel/panel_type.ts:31](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L31)

The class of a particular Type of Panel utilised in Smorgasboard. The
PanelType for each Panel holds information about the numerical ID of the
type, the data type, the source of any external data, the config schemas, and
more information tied to the specific type of Panel.

## Constructors

### Constructor

```ts
private new PanelType(
   typeId,
   typeName,
   typeData,
   typeTemplate,
   typeConfig,
   typeBehaviour,
   typeMinSize,
   typeAspectRatios,
   typeDataRoute?,
   typeExternalDataUrl?): PanelType;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:164](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L164)

Creates an instance of PanelType.

#### Parameters

| Parameter              | Type                                                                                                            | Default value | Description                                                                                                                                                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `typeId`               | [`PanelTypeId`](../../panel_type_properties/panel_type_id/enumerations/PanelTypeId.md)                          | `undefined`   | The numerical ID for this PanelType.                                                                                                                                                                                                       |
| `typeName`             | [`PanelTypeName`](../../panel_type_properties/panel_type_name/enumerations/PanelTypeName.md)                    | `undefined`   | The user-friendly UI-facing name for the Panel Type.                                                                                                                                                                                       |
| `typeData`             | [`PanelTypeData`](../../panel_type_properties/panel_type_data/enumerations/PanelTypeData.md)                    | `undefined`   | The type of data this PanelType uses/stores (none, local, global, or external).                                                                                                                                                            |
| `typeTemplate`         | [`PanelTypeTemplate`](../../panel_type_properties/panel_type_template/enumerations/PanelTypeTemplate.md)        | `undefined`   | The panel's template source from the backend. This is stored in an enum, [PanelTypeTemplate](../../panel_type_properties/panel_type_template/enumerations/PanelTypeTemplate.md), whose values are strings.                                 |
| `typeConfig`           | \| [`PanelTypeConfig`](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md) \| `undefined` | `undefined`   | The panel type's config schema. As an object of type [PanelTypeConfig](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md), which is either a Config object, or undefined if there is no config for this panel type. |
| `typeBehaviour`        | (`panel`) => `void` \| `null`                                                                                   | `undefined`   | The panel type's behaviour function, if this Panel has any post-initialisation behaviour, such as a clock, etc.                                                                                                                            |
| `typeMinSize`          | [`Size`](../../../area/interfaces/Size.md)                                                                      | `...`         | The minimum size for this type of panel. If no custom minimum size is declared, the default value `{1, 1}` is used.                                                                                                                        |
| `typeAspectRatios`     | [`Size`](../../../area/interfaces/Size.md)[]                                                                    | `[]`          | Any aspect ratios that this panel type has to have. If it can have any aspect ratio, this array is empty, which is the default.                                                                                                            |
| `typeDataRoute?`       | `string`                                                                                                        | `undefined`   | If the panel's data type is external, the source/api route from the backend is stored here.                                                                                                                                                |
| `typeExternalDataUrl?` | `string`                                                                                                        | `undefined`   | If the panel's data type is external, the external URL is stored here, to be used in a link tag in the info menu for the Panel.                                                                                                            |

#### Returns

`PanelType`

#### Remarks

Similarly to themes, these should not be created at runtime and will
instead be set types with set data types and names, unless otherwise is
required. All the necessary types are declared as static instances and
members of this class.

#### Example

```ts
static readonly NOTEPAD = new PanelType(
        PanelTypeId.NOTEPAD,
        PanelTypeName.NOTEPAD,
        PanelTypeData.LOCAL,
        PanelTypeTemplate.NOTEPAD,
        PanelTypeConfig.NONE,
        PanelTypeBehaviour.NOTEPAD,
        { width: 2, height: 2 },
        [{ width: 1, height: 1 }],
    );
```

The above is an example of the declaration of the Notepad panel type
([NOTEPAD](#notepad)). It has a minimum size of 2x2 and is only allowed to
have an aspect ratio of 1:1, i.e. equal width and height in terms of
dashboard cells.

## Properties

| Property                                                | Modifier   | Type                                                                                                            | Default value | Description                                                                                                                                                                                                                                | Defined in                                                                                                                                                                                  |
| ------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="typeaspectratios"></a> `typeAspectRatios`        | `private`  | [`Size`](../../../area/interfaces/Size.md)[]                                                                    | `[]`          | Any aspect ratios that this panel type has to have. If it can have any aspect ratio, this array is empty, which is the default.                                                                                                            | [frontend/src/classes/panel/panel_type.ts:172](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L172) |
| <a id="typebehaviour"></a> `typeBehaviour`              | `private`  | (`panel`) => `void` \| `null`                                                                                   | `undefined`   | The panel type's behaviour function, if this Panel has any post-initialisation behaviour, such as a clock, etc.                                                                                                                            | [frontend/src/classes/panel/panel_type.ts:170](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L170) |
| <a id="typeconfig"></a> `typeConfig`                    | `private`  | \| [`PanelTypeConfig`](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md) \| `undefined` | `undefined`   | The panel type's config schema. As an object of type [PanelTypeConfig](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md), which is either a Config object, or undefined if there is no config for this panel type. | [frontend/src/classes/panel/panel_type.ts:169](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L169) |
| <a id="typedata"></a> `typeData`                        | `private`  | [`PanelTypeData`](../../panel_type_properties/panel_type_data/enumerations/PanelTypeData.md)                    | `undefined`   | The type of data this PanelType uses/stores (none, local, global, or external).                                                                                                                                                            | [frontend/src/classes/panel/panel_type.ts:167](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L167) |
| <a id="typedataroute"></a> `typeDataRoute?`             | `private`  | `string`                                                                                                        | `undefined`   | If the panel's data type is external, the source/api route from the backend is stored here.                                                                                                                                                | [frontend/src/classes/panel/panel_type.ts:173](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L173) |
| <a id="typeexternaldataurl"></a> `typeExternalDataUrl?` | `private`  | `string`                                                                                                        | `undefined`   | If the panel's data type is external, the external URL is stored here, to be used in a link tag in the info menu for the Panel.                                                                                                            | [frontend/src/classes/panel/panel_type.ts:174](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L174) |
| <a id="typeid"></a> `typeId`                            | `private`  | [`PanelTypeId`](../../panel_type_properties/panel_type_id/enumerations/PanelTypeId.md)                          | `undefined`   | The numerical ID for this PanelType.                                                                                                                                                                                                       | [frontend/src/classes/panel/panel_type.ts:165](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L165) |
| <a id="typeminsize"></a> `typeMinSize`                  | `private`  | [`Size`](../../../area/interfaces/Size.md)                                                                      | `undefined`   | The minimum size for this type of panel. If no custom minimum size is declared, the default value `{1, 1}` is used.                                                                                                                        | [frontend/src/classes/panel/panel_type.ts:171](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L171) |
| <a id="typename"></a> `typeName`                        | `private`  | [`PanelTypeName`](../../panel_type_properties/panel_type_name/enumerations/PanelTypeName.md)                    | `undefined`   | The user-friendly UI-facing name for the Panel Type.                                                                                                                                                                                       | [frontend/src/classes/panel/panel_type.ts:166](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L166) |
| <a id="typetemplate"></a> `typeTemplate`                | `private`  | [`PanelTypeTemplate`](../../panel_type_properties/panel_type_template/enumerations/PanelTypeTemplate.md)        | `undefined`   | The panel's template source from the backend. This is stored in an enum, [PanelTypeTemplate](../../panel_type_properties/panel_type_template/enumerations/PanelTypeTemplate.md), whose values are strings.                                 | [frontend/src/classes/panel/panel_type.ts:168](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L168) |
| <a id="clock"></a> `CLOCK`                              | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:71](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L71)   |
| <a id="default"></a> `DEFAULT`                          | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:45](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L45)   |
| <a id="notepad"></a> `NOTEPAD`                          | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:53](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L53)   |
| <a id="photo"></a> `PHOTO`                              | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:62](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L62)   |
| <a id="preview"></a> `PREVIEW`                          | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L37)   |
| <a id="todo"></a> `TODO`                                | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:88](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L88)   |
| <a id="weather"></a> `WEATHER`                          | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:97](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L97)   |

## Methods

### execute()

```ts
execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:330](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L330)

Begins the behaviour of the PanelType, executing the function, if the
PanelType has post-initialisation behaviour.

#### Parameters

| Parameter | Type                                    | Description                                |
| --------- | --------------------------------------- | ------------------------------------------ |
| `panel`   | [`Panel`](../../panel/classes/Panel.md) | The Panel object to execute the behaviour. |

#### Returns

`void`

---

### getAspectRatios()

```ts
getAspectRatios(): Size[];
```

Defined in: [frontend/src/classes/panel/panel_type.ts:291](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L291)

Gets the array of allowed Aspect Ratios for the PanelType.

#### Returns

[`Size`](../../../area/interfaces/Size.md)[]

The aspect ratios as an array of Size objects. This will be
empty if there are no specific aspect ratios the PanelType needs to
have.

---

### getConfigSchema()

```ts
getConfigSchema():
  | ZodObject<$ZodLooseShape, $strip>
  | undefined;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:238](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L238)

Gets the Config Schema (if present) for the PanelType.

#### Returns

\| [`ZodObject`](https://zod.dev/api#objects)\<`$ZodLooseShape`, `$strip`\>
\| `undefined`

The Config Schema as a Zod schema (if present), or undefined if
the PanelType does not have a dedicated Config.

#### See

- [PanelTypeConfig](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md)
- [zod](https://zod.dev/)
- [zod.ZodObject](https://zod.dev/api#objects)

---

### getDataRoute()

```ts
getDataRoute(): string | undefined;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:305](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L305)

Gets the route/URL, if available, of the source of data that the
PanelType utilises, from the backend directly,.

#### Returns

`string` \| `undefined`

The source of the PanelType's data, or undefined if it stores
local data or none at all.

#### See

- [PanelTypeData](../../panel_type_properties/panel_type_data/enumerations/PanelTypeData.md)
- [getExternalDataUrl()](#getexternaldataurl)

---

### getExternalDataUrl()

```ts
getExternalDataUrl(): string | undefined;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:319](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L319)

Gets the direct external URL for the API, used to link for crediting in
the Panel's menu.

#### Returns

`string` \| `undefined`

The direct URL to the external API, or undefined if it stores
local data or none at all.

#### See

- [PanelTypeData](../../panel_type_properties/panel_type_data/enumerations/PanelTypeData.md)
- [getDataRoute()](#getdataroute)

---

### getId()

```ts
getId(): number;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:199](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L199)

Gets the numerical ID number for this PanelType.

#### Returns

`number`

The ID for the PanelType.

#### See

[PanelTypeId](../../panel_type_properties/panel_type_id/enumerations/PanelTypeId.md)

---

### getMinHeight()

```ts
getMinHeight(): number;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:280](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L280)

Gets the minimum height for the PanelType.

#### Returns

`number`

The minimum height of the PanelType in dashboard cell units.
Returns 1 if the default Size of 1x1 was filled in upon constructing
the PanelType.

#### See

- [getMinSize()](#getminsize)
- [getMinWidth()](#getminwidth)

---

### getMinSize()

```ts
getMinSize(): Size;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:252](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L252)

Gets the minimum dimensions/size for the PanelType.

#### Returns

[`Size`](../../../area/interfaces/Size.md)

The minimum size as an object of type Size, or the default 1x1
minimum size was not specified during construction.

#### See

- [Size](../../../area/interfaces/Size.md)
- [getMinWidth()](#getminwidth)
- [getMinHeight()](#getminheight)

---

### getMinWidth()

```ts
getMinWidth(): number;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:266](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L266)

Gets the minimum width for the PanelType.

#### Returns

`number`

The minimum width of the PanelType in dashboard cell units.
Returns 1 if the default Size of 1x1 was filled in upon constructing
the PanelType.

#### See

- [getMinSize()](#getminsize)
- [getMinHeight()](#getminheight)

---

### getName()

```ts
getName(): string;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:213](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L213)

Gets the user-facing name for the PanelType.

#### Returns

`string`

The UI-friendly name.

#### Remarks

This is used in menus, etc.

#### See

[PanelTypeName](../../panel_type_properties/panel_type_name/enumerations/PanelTypeName.md)

---

### getTemplate()

```ts
getTemplate(): string;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:224](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L224)

Gets the backend URL/route for the template for the PanelType.

#### Returns

`string`

The route to the template from the backend.

#### See

[PanelTypeTemplate](../../panel_type_properties/panel_type_template/enumerations/PanelTypeTemplate.md)

---

### toString()

```ts
toString(): string;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:188](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/classes/panel/panel_type.ts#L188)

Gets the PanelType's internal name when used in printed/string contexts.

#### Returns

`string`

The technical stored name for this PanelType.

#### Remarks

This is not the user-facing name, but the internal name used in storing
and property objects/enums.

#### See

[PanelTypeId](../../panel_type_properties/panel_type_id/enumerations/PanelTypeId.md)
