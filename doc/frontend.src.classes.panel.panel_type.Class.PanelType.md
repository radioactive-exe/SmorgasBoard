[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel_type](../wiki/frontend.src.classes.panel.panel_type) / PanelType

# Class: PanelType

Defined in: [frontend/src/classes/panel/panel_type.ts:18](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L18)

PanelType Class, this is class that unifies all information about a panel's
type, including the name, data type, and other useful information and
methods.

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

Defined in: [frontend/src/classes/panel/panel_type.ts:113](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L113)

Creates an instance of PanelType. NOTE: Similarly to themes, these should
not be created at runtime and will instead be set types with set data
types and names, unless otherwise is required. All the necessary types
are declared as static instances and members of this class.

#### Parameters

| Parameter          | Type                                                                                                                                    | Default value | Description                                                                                                                                                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `typeId`           | [`PanelTypeId`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_id.Enumeration.PanelTypeId)                         | `undefined`   |                                                                                                                                                                                                                                                                    |
| `typeName`         | [`PanelTypeName`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_name.Enumeration.PanelTypeName)                   | `undefined`   |                                                                                                                                                                                                                                                                    |
| `typeData`         | [`PanelTypeData`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_data.Enumeration.PanelTypeData)                   | `undefined`   |                                                                                                                                                                                                                                                                    |
| `typeTemplate`     | [`PanelTypeTemplate`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_template.Enumeration.PanelTypeTemplate)       | `undefined`   | The panel's template source from the backend. This is stored in an enum, [PanelTypeTemplate](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_template.Enumeration.PanelTypeTemplate), whose values are strings.                                |
| `typeConfig`       | \| [`PanelTypeConfig`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_config.Class.PanelTypeConfig) \| `undefined` | `undefined`   | The panel type's config schema. As an object of type [PanelTypeConfig](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_config.Class.PanelTypeConfig), which is either a Config object, or undefined if there is no config for this panel type. |
| `typeBehaviour`    | (`panel`) => `void` \| `null`                                                                                                           | `undefined`   | The panel type's behaviour function, if this Panel has any post-initialisation behaviour, such as a clock, etc.                                                                                                                                                    |
| `typeMinSize`      | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)                                                                              | `...`         | The minimum size for this type of panel. If no custom minimum size is declared, the default value {1, 1} is used.                                                                                                                                                  |
| `typeAspectRatios` | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)[]                                                                            | `[]`          | Any aspect ratios that this panel type has to have. If it can have any aspect ratio, this array is empty.                                                                                                                                                          |
| `typeDataSource?`  | `string`                                                                                                                                | `undefined`   | If the panel's data type is external, the source/api is stored here.                                                                                                                                                                                               |

#### Returns

`PanelType`

## Properties

| Property                                         | Modifier   | Type                                                                                                                                    | Default value | Description                                                                                                                                                                                                                                                        | Defined in                                                                                                                                                                                  |
| ------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="typeaspectratios"></a> `typeAspectRatios` | `private`  | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)[]                                                                            | `[]`          | Any aspect ratios that this panel type has to have. If it can have any aspect ratio, this array is empty.                                                                                                                                                          | [frontend/src/classes/panel/panel_type.ts:121](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L121) |
| <a id="typebehaviour"></a> `typeBehaviour`       | `private`  | (`panel`) => `void` \| `null`                                                                                                           | `undefined`   | The panel type's behaviour function, if this Panel has any post-initialisation behaviour, such as a clock, etc.                                                                                                                                                    | [frontend/src/classes/panel/panel_type.ts:119](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L119) |
| <a id="typeconfig"></a> `typeConfig`             | `private`  | \| [`PanelTypeConfig`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_config.Class.PanelTypeConfig) \| `undefined` | `undefined`   | The panel type's config schema. As an object of type [PanelTypeConfig](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_config.Class.PanelTypeConfig), which is either a Config object, or undefined if there is no config for this panel type. | [frontend/src/classes/panel/panel_type.ts:118](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L118) |
| <a id="typedata"></a> `typeData`                 | `private`  | [`PanelTypeData`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_data.Enumeration.PanelTypeData)                   | `undefined`   | -                                                                                                                                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:116](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L116) |
| <a id="typedatasource"></a> `typeDataSource?`    | `private`  | `string`                                                                                                                                | `undefined`   | If the panel's data type is external, the source/api is stored here.                                                                                                                                                                                               | [frontend/src/classes/panel/panel_type.ts:122](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L122) |
| <a id="typeid"></a> `typeId`                     | `private`  | [`PanelTypeId`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_id.Enumeration.PanelTypeId)                         | `undefined`   | -                                                                                                                                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:114](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L114) |
| <a id="typeminsize"></a> `typeMinSize`           | `private`  | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)                                                                              | `undefined`   | The minimum size for this type of panel. If no custom minimum size is declared, the default value {1, 1} is used.                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:120](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L120) |
| <a id="typename"></a> `typeName`                 | `private`  | [`PanelTypeName`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_name.Enumeration.PanelTypeName)                   | `undefined`   | -                                                                                                                                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:115](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L115) |
| <a id="typetemplate"></a> `typeTemplate`         | `private`  | [`PanelTypeTemplate`](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_template.Enumeration.PanelTypeTemplate)       | `undefined`   | The panel's template source from the backend. This is stored in an enum, [PanelTypeTemplate](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_template.Enumeration.PanelTypeTemplate), whose values are strings.                                | [frontend/src/classes/panel/panel_type.ts:117](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L117) |
| <a id="clock"></a> `CLOCK`                       | `readonly` | `PanelType`                                                                                                                             | `undefined`   | -                                                                                                                                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:59](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L59)   |
| <a id="default"></a> `DEFAULT`                   | `readonly` | `PanelType`                                                                                                                             | `undefined`   | -                                                                                                                                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:32](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L32)   |
| <a id="notepad"></a> `NOTEPAD`                   | `readonly` | `PanelType`                                                                                                                             | `undefined`   | -                                                                                                                                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:40](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L40)   |
| <a id="photo"></a> `PHOTO`                       | `readonly` | `PanelType`                                                                                                                             | `undefined`   | -                                                                                                                                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:50](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L50)   |
| <a id="preview"></a> `PREVIEW`                   | `readonly` | `PanelType`                                                                                                                             | `undefined`   | These are all the Defined Panel Types in the project/application. New Types cannot be created during runtime unless needed.                                                                                                                                        | [frontend/src/classes/panel/panel_type.ts:24](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L24)   |
| <a id="todo"></a> `TODO`                         | `readonly` | `PanelType`                                                                                                                             | `undefined`   | -                                                                                                                                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:68](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L68)   |
| <a id="weather"></a> `WEATHER`                   | `readonly` | `PanelType`                                                                                                                             | `undefined`   | -                                                                                                                                                                                                                                                                  | [frontend/src/classes/panel/panel_type.ts:77](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L77)   |

## Methods

### execute()

```ts
execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:181](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L181)

#### Parameters

| Parameter | Type                                                            |
| --------- | --------------------------------------------------------------- |
| `panel`   | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) |

#### Returns

`void`

---

### getAspectRatios()

```ts
getAspectRatios(): Size[];
```

Defined in: [frontend/src/classes/panel/panel_type.ts:173](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L173)

#### Returns

[`Size`](../wiki/frontend.src.classes.area.Interface.Size)[]

---

### getConfigSchema()

```ts
getConfigSchema():
  | ZodObject<$ZodLooseShape, $strip>
  | undefined;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:157](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L157)

#### Returns

\| [`ZodObject`](https://zod.dev/api#objects)\<`$ZodLooseShape`, `$strip`\>
\| `undefined`

---

### getDataSource()

```ts
getDataSource(): string | undefined;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:177](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L177)

#### Returns

`string` \| `undefined`

---

### getId()

```ts
getId(): number;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:140](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L140)

Returns the ID number for this type of panel

#### Returns

`number`

---

### getMinHeight()

```ts
getMinHeight(): number;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:169](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L169)

#### Returns

`number`

---

### getMinSize()

```ts
getMinSize(): Size;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:161](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L161)

#### Returns

[`Size`](../wiki/frontend.src.classes.area.Interface.Size)

---

### getMinWidth()

```ts
getMinWidth(): number;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:165](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L165)

#### Returns

`number`

---

### getName()

```ts
getName(): string;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:144](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L144)

#### Returns

`string`

---

### getTemplate()

```ts
getTemplate(): string;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:153](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L153)

Returns the name of the template for this PanelType

#### Returns

`string`

---

### toString()

```ts
toString(): string;
```

Defined in: [frontend/src/classes/panel/panel_type.ts:131](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_type.ts#L131)

Returns the Panel Type's internal name when used in printed/string
contexts.

#### Returns

`string`
