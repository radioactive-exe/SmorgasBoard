[**Documentation**](../../../../../../README.md)

***

[Documentation](../../../../../../README.md) / [frontend/src/classes/panel/panel\_type](../README.md) / PanelType

# Class: PanelType

Defined in: [frontend/src/classes/panel/panel\_type.ts:18](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L18)

PanelType Class, this is class that unifies all information about a panel's
type, including the name, data type, and other useful information and
methods.

## Properties

### CLOCK

> `readonly` `static` **CLOCK**: `PanelType`

Defined in: [frontend/src/classes/panel/panel\_type.ts:59](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L59)

***

### DEFAULT

> `readonly` `static` **DEFAULT**: `PanelType`

Defined in: [frontend/src/classes/panel/panel\_type.ts:32](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L32)

***

### NOTEPAD

> `readonly` `static` **NOTEPAD**: `PanelType`

Defined in: [frontend/src/classes/panel/panel\_type.ts:40](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L40)

***

### PHOTO

> `readonly` `static` **PHOTO**: `PanelType`

Defined in: [frontend/src/classes/panel/panel\_type.ts:50](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L50)

***

### PREVIEW

> `readonly` `static` **PREVIEW**: `PanelType`

Defined in: [frontend/src/classes/panel/panel\_type.ts:24](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L24)

These are all the Defined Panel Types in the project/application. New
Types cannot be created during runtime unless needed.

***

### TODO

> `readonly` `static` **TODO**: `PanelType`

Defined in: [frontend/src/classes/panel/panel\_type.ts:68](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L68)

***

### WEATHER

> `readonly` `static` **WEATHER**: `PanelType`

Defined in: [frontend/src/classes/panel/panel\_type.ts:77](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L77)

## Methods

### execute()

> **execute**(`panel`): `void`

Defined in: [frontend/src/classes/panel/panel\_type.ts:185](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L185)

#### Parameters

##### panel

[`Panel`](../../panel/classes/Panel.md)

#### Returns

`void`

***

### getAspectRatios()

> **getAspectRatios**(): [`Size`](../../../area/interfaces/Size.md)[]

Defined in: [frontend/src/classes/panel/panel\_type.ts:177](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L177)

#### Returns

[`Size`](../../../area/interfaces/Size.md)[]

***

### getConfigSchema()

> **getConfigSchema**(): `ZodObject`\<`$ZodLooseShape`, `$strip`\> \| `undefined`

Defined in: [frontend/src/classes/panel/panel\_type.ts:161](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L161)

#### Returns

`ZodObject`\<`$ZodLooseShape`, `$strip`\> \| `undefined`

***

### getDataSource()

> **getDataSource**(): `string` \| `undefined`

Defined in: [frontend/src/classes/panel/panel\_type.ts:181](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L181)

#### Returns

`string` \| `undefined`

***

### getId()

> **getId**(): `number`

Defined in: [frontend/src/classes/panel/panel\_type.ts:142](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L142)

Returns the ID number for this type of panel

#### Returns

`number`

#### Memberof

PanelType

***

### getMinHeight()

> **getMinHeight**(): `number`

Defined in: [frontend/src/classes/panel/panel\_type.ts:173](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L173)

#### Returns

`number`

***

### getMinSize()

> **getMinSize**(): [`Size`](../../../area/interfaces/Size.md)

Defined in: [frontend/src/classes/panel/panel\_type.ts:165](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L165)

#### Returns

[`Size`](../../../area/interfaces/Size.md)

***

### getMinWidth()

> **getMinWidth**(): `number`

Defined in: [frontend/src/classes/panel/panel\_type.ts:169](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L169)

#### Returns

`number`

***

### getName()

> **getName**(): `string`

Defined in: [frontend/src/classes/panel/panel\_type.ts:146](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L146)

#### Returns

`string`

***

### getTemplate()

> **getTemplate**(): `string`

Defined in: [frontend/src/classes/panel/panel\_type.ts:157](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L157)

Returns the name of the template for this PanelType

#### Returns

`string`

#### Memberof

PanelType

***

### toString()

> **toString**(): `string`

Defined in: [frontend/src/classes/panel/panel\_type.ts:131](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/classes/panel/panel_type.ts#L131)

Returns the Panel Type's internal name when used in

#### Returns

`string`
