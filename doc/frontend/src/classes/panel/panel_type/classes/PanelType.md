[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/panel/panel_type](../README.md) / PanelType

# Class: PanelType

Defined in: [frontend/src/classes/panel/panel_type.ts:31](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L31)

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
   typeDataSource?): PanelType;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:152](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L152)

Creates an instance of PanelType.

#### Parameters

| Parameter          | Type                                                                                                            | Default value | Description                                                                                                                                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `typeId`           | [`PanelTypeId`](../../panel_type_properties/panel_type_id/enumerations/PanelTypeId.md)                          | `undefined`   | The numerical ID for this PanelType.                                                                                                                                                                                                       |
| `typeName`         | [`PanelTypeName`](../../panel_type_properties/panel_type_name/enumerations/PanelTypeName.md)                    | `undefined`   | The user-friendly UI-facing name for the Panel Type.                                                                                                                                                                                       |
| `typeData`         | [`PanelTypeData`](../../panel_type_properties/panel_type_data/enumerations/PanelTypeData.md)                    | `undefined`   | The type of data this PanelType uses/stores (none, local, global, or external).                                                                                                                                                            |
| `typeTemplate`     | [`PanelTypeTemplate`](../../panel_type_properties/panel_type_template/enumerations/PanelTypeTemplate.md)        | `undefined`   | The panel's template source from the backend. This is stored in an enum, [PanelTypeTemplate](../../panel_type_properties/panel_type_template/enumerations/PanelTypeTemplate.md), whose values are strings.                                 |
| `typeConfig`       | \| [`PanelTypeConfig`](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md) \| `undefined` | `undefined`   | The panel type's config schema. As an object of type [PanelTypeConfig](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md), which is either a Config object, or undefined if there is no config for this panel type. |
| `typeBehaviour`    | (`panel`) => `void` \| `null`                                                                                   | `undefined`   | The panel type's behaviour function, if this Panel has any post-initialisation behaviour, such as a clock, etc.                                                                                                                            |
| `typeMinSize`      | [`Size`](../../../area/interfaces/Size.md)                                                                      | `...`         | The minimum size for this type of panel. If no custom minimum size is declared, the default value `{1, 1}` is used.                                                                                                                        |
| `typeAspectRatios` | [`Size`](../../../area/interfaces/Size.md)[]                                                                    | `[]`          | Any aspect ratios that this panel type has to have. If it can have any aspect ratio, this array is empty, which is the default.                                                                                                            |
| `typeDataSource?`  | `string`                                                                                                        | `undefined`   | If the panel's data type is external, the source/api route from the backend is stored here.                                                                                                                                                |

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

| Property                                         | Modifier   | Type                                                                                                            | Default value | Description                                                                                                                                                                                                                                | Defined in                                                                                                                                                                                  |
| ------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="typeaspectratios"></a> `typeAspectRatios` | `private`  | [`Size`](../../../area/interfaces/Size.md)[]                                                                    | `[]`          | Any aspect ratios that this panel type has to have. If it can have any aspect ratio, this array is empty, which is the default.                                                                                                            | [frontend/src/classes/panel/panel_type.ts:160](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L160) |
| <a id="typebehaviour"></a> `typeBehaviour`       | `private`  | (`panel`) => `void` \| `null`                                                                                   | `undefined`   | The panel type's behaviour function, if this Panel has any post-initialisation behaviour, such as a clock, etc.                                                                                                                            | [frontend/src/classes/panel/panel_type.ts:158](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L158) |
| <a id="typeconfig"></a> `typeConfig`             | `private`  | \| [`PanelTypeConfig`](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md) \| `undefined` | `undefined`   | The panel type's config schema. As an object of type [PanelTypeConfig](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md), which is either a Config object, or undefined if there is no config for this panel type. | [frontend/src/classes/panel/panel_type.ts:157](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L157) |
| <a id="typedata"></a> `typeData`                 | `private`  | [`PanelTypeData`](../../panel_type_properties/panel_type_data/enumerations/PanelTypeData.md)                    | `undefined`   | The type of data this PanelType uses/stores (none, local, global, or external).                                                                                                                                                            | [frontend/src/classes/panel/panel_type.ts:155](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L155) |
| <a id="typedatasource"></a> `typeDataSource?`    | `private`  | `string`                                                                                                        | `undefined`   | If the panel's data type is external, the source/api route from the backend is stored here.                                                                                                                                                | [frontend/src/classes/panel/panel_type.ts:161](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L161) |
| <a id="typeid"></a> `typeId`                     | `private`  | [`PanelTypeId`](../../panel_type_properties/panel_type_id/enumerations/PanelTypeId.md)                          | `undefined`   | The numerical ID for this PanelType.                                                                                                                                                                                                       | [frontend/src/classes/panel/panel_type.ts:153](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L153) |
| <a id="typeminsize"></a> `typeMinSize`           | `private`  | [`Size`](../../../area/interfaces/Size.md)                                                                      | `undefined`   | The minimum size for this type of panel. If no custom minimum size is declared, the default value `{1, 1}` is used.                                                                                                                        | [frontend/src/classes/panel/panel_type.ts:159](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L159) |
| <a id="typename"></a> `typeName`                 | `private`  | [`PanelTypeName`](../../panel_type_properties/panel_type_name/enumerations/PanelTypeName.md)                    | `undefined`   | The user-friendly UI-facing name for the Panel Type.                                                                                                                                                                                       | [frontend/src/classes/panel/panel_type.ts:154](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L154) |
| <a id="typetemplate"></a> `typeTemplate`         | `private`  | [`PanelTypeTemplate`](../../panel_type_properties/panel_type_template/enumerations/PanelTypeTemplate.md)        | `undefined`   | The panel's template source from the backend. This is stored in an enum, [PanelTypeTemplate](../../panel_type_properties/panel_type_template/enumerations/PanelTypeTemplate.md), whose values are strings.                                 | [frontend/src/classes/panel/panel_type.ts:156](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L156) |
| <a id="clock"></a> `CLOCK`                       | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:72](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L72)   |
| <a id="default"></a> `DEFAULT`                   | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:45](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L45)   |
| <a id="notepad"></a> `NOTEPAD`                   | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:53](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L53)   |
| <a id="photo"></a> `PHOTO`                       | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:63](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L63)   |
| <a id="preview"></a> `PREVIEW`                   | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L37)   |
| <a id="todo"></a> `TODO`                         | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:81](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L81)   |
| <a id="weather"></a> `WEATHER`                   | `readonly` | `PanelType`                                                                                                     | `undefined`   | -                                                                                                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:90](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L90)   |

## Methods

### execute()

```ts
execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:303](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L303)

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

Defined in: [frontend/src/classes/panel/panel_type.ts:278](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L278)

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

Defined in: [frontend/src/classes/panel/panel_type.ts:225](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L225)

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

### getDataSource()

```ts
getDataSource(): string | undefined;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:292](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L292)

Gets the route/URL, if available, of the source of data that the
PanelType utilises, most often from the backend directly, unless stated
otherwise.

#### Returns

`string` \| `undefined`

The source of the PanelType's data, or undefined if it stores
local data or none at all.

#### See

[PanelTypeData](../../panel_type_properties/panel_type_data/enumerations/PanelTypeData.md)

---

### getId()

```ts
getId(): number;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:186](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L186)

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

Defined in: [frontend/src/classes/panel/panel_type.ts:267](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L267)

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

Defined in: [frontend/src/classes/panel/panel_type.ts:239](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L239)

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

Defined in: [frontend/src/classes/panel/panel_type.ts:253](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L253)

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

Defined in: [frontend/src/classes/panel/panel_type.ts:200](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L200)

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

Defined in: [frontend/src/classes/panel/panel_type.ts:211](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L211)

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

Defined in: [frontend/src/classes/panel/panel_type.ts:175](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel_type.ts#L175)

Gets the PanelType's internal name when used in printed/string contexts.

#### Returns

`string`

The technical stored name for this PanelType.

#### Remarks

This is not the user-facing name, but the internal name used in storing
and property objects/enums.

#### See

[PanelTypeId](../../panel_type_properties/panel_type_id/enumerations/PanelTypeId.md)
