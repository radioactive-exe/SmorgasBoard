[**Smorgasboard**](../../../../../../README.md)

---

[Smorgasboard](../../../../../../README.md) / [frontend/src/classes/panel/panel](../README.md) / Panel

# Class: Panel

Defined in: [frontend/src/classes/panel/panel.ts:81](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L81)

The crown jewel of Smorgasboard. This is the mighty Panel, the main element
that serves as the cornerstone of the Dashboard. It can be manipulated,
configured, updated, and used to store everything your heart desires (that
has been implemented).

## See

- [PanelInstance](../interfaces/PanelInstance.md)
- [PanelContent](../interfaces/PanelContent.md)

## Extends

- `HTMLElement`

## Constructors

### Constructor

```ts
new Panel(
   area,
   type,
   dashboardId,
   config,
   body?): Panel;
```

Defined in: [frontend/src/classes/panel/panel.ts:132](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L132)

Creates an instance of Panel and initialises all relevant and important
attributes, including the Config, etc.

#### Parameters

| Parameter     | Type                                                 | Default value | Description                                                                                                                                                                                     |
| ------------- | ---------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `area`        | [`Area`](../../../area/classes/Area.md)              | `undefined`   | The Area to initialise the Panel with (its location and size).                                                                                                                                  |
| `type`        | [`PanelType`](../../panel_type/classes/PanelType.md) | `undefined`   | The PanelType the Panel has.                                                                                                                                                                    |
| `dashboardId` | `number`                                             | `undefined`   | The unique ID the Panel will have in the Dashboard. This is readonly as this should not be changed after being created.                                                                         |
| `config`      | `Record`\<`string`, `unknown`\> \| `undefined`       | `undefined`   | A Config to initialise the Panel with. Default is `undefined` as the Panel will be instantiated with the Default config for its PanelType, unless an explicit Config is loaded from saved data. |
| `body?`       | [`PanelContent`](../interfaces/PanelContent.md)      | `undefined`   | Optional content to populate the Panel with upon initialisation.                                                                                                                                |

#### Returns

`Panel`

#### Example

```ts
const panel = new Panel(new Area({ x: 0, y: 3 }), PanelType.WEATHER, 3);
```

The above constructs a Weather Panel, positioned at (0,3) with a default
size of 1x1 (which is smaller than the minimum for the PanelType, but it
this example is illustrative) and a unique ID of 3 in the Dashboard.

#### See

- [Area](../../../area/classes/Area.md)
- [PanelType](../../panel_type/classes/PanelType.md)
- [Config](../../../config/config/type-aliases/Config.md)
- [PanelContent](../interfaces/PanelContent.md)
- [PanelInstance](../interfaces/PanelInstance.md)

#### Overrides

```ts
HTMLElement.constructor;
```

## Properties

| Property                               | Modifier  | Type                                                 | Default value | Description                                                                                                                                                                                                                                                                                                            | Defined in                                                                                                                                                                        |
| -------------------------------------- | --------- | ---------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="area"></a> `area`               | `private` | [`Area`](../../../area/classes/Area.md)              | `undefined`   | The Area to initialise the Panel with (its location and size).                                                                                                                                                                                                                                                         | [frontend/src/classes/panel/panel.ts:133](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L133) |
| <a id="config"></a> `config`           | `private` | `Record`\<`string`, `unknown`\> \| `undefined`       | `undefined`   | A Config to initialise the Panel with. Default is `undefined` as the Panel will be instantiated with the Default config for its PanelType, unless an explicit Config is loaded from saved data.                                                                                                                        | [frontend/src/classes/panel/panel.ts:136](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L136) |
| <a id="dashboardid"></a> `dashboardId` | `private` | `number`                                             | `undefined`   | The unique ID the Panel will have in the Dashboard. This is readonly as this should not be changed after being created.                                                                                                                                                                                                | [frontend/src/classes/panel/panel.ts:135](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L135) |
| <a id="keyelements"></a> `keyElements` | `private` | `Map`\<`string`, `HTMLElement` \| `null`\>           | `undefined`   | The KeyElements that this panel has. This is determined by its PanelType, and these elements are utilised in its behavioural execution. **See** - [PanelType](../../panel_type/classes/PanelType.md) - [bindKeyElements()](#bindkeyelements) - [getKeyElements()](#getkeyelements) - [getKeyElement()](#getkeyelement) | [frontend/src/classes/panel/panel.ts:91](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L91)   |
| <a id="savetimeout"></a> `saveTimeout` | `private` | `Timeout`                                            | `undefined`   | The timeout to trigger a save. Mostly, this is used to show the Save icon, as the save delay is handled by the Dashboard itself. **See** [triggerSave()](#triggersave)                                                                                                                                                 | [frontend/src/classes/panel/panel.ts:98](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L98)   |
| <a id="type"></a> `type`               | `private` | [`PanelType`](../../panel_type/classes/PanelType.md) | `undefined`   | The PanelType the Panel has.                                                                                                                                                                                                                                                                                           | [frontend/src/classes/panel/panel.ts:134](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L134) |

## Methods

### addButtonListeners()

```ts
addButtonListeners(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:882](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L882)

Initialise all button handlers and listeners for both handles and
buttons.

#### Returns

`void`

#### Remarks

This includes the resize handle, the drag handle, and the delete button,
but this list may grow as the implementation evolves.

#### See

- [init()](#init)
- [initBase()](#initbase)
- [initTemplate()](#inittemplate)
- [addHoverListeners()](#addhoverlisteners)
- [bindKeyElements()](#bindkeyelements)

---

### addHoverListeners()

```ts
addHoverListeners(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:987](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L987)

Adds all hover handlers responsible for rotating the Panel on mouse
hovering.

#### Returns

`void`

#### See

- [hoverHandler](../../../../functions/manip/variables/hoverHandler.md)
- [removeHoverListeners()](#removehoverlisteners)
- [init()](#init)
- [initBase()](#initbase)
- [initTemplate()](#inittemplate)
- [addButtonListeners()](#addbuttonlisteners)
- [bindKeyElements()](#bindkeyelements)

---

### beginBehaviour()

```ts
beginBehaviour(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:1210](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L1210)

Begin executing the Panel's actual logic and behaviour.

#### Returns

`void`

#### Remarks

This is determined by the PanelType, and is different for each Panel.

#### See

- [PanelType](../../panel_type/classes/PanelType.md)
- [PanelType.execute()](../../panel_type/classes/PanelType.md#execute)

---

### bindKeyElements()

```ts
private bindKeyElements(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:1051](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L1051)

Bind and assign all KeyElements for the Panel.

#### Returns

`void`

#### Remarks

Based on the PanelType, the KeyElements map is populated, with each key
having the value of one KeyElement.

#### See

- [PanelType](../../panel_type/classes/PanelType.md)
- [getKeyElements()](#getkeyelements)

---

### getArea()

```ts
getArea(): Area;
```

Defined in: [frontend/src/classes/panel/panel.ts:420](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L420)

Gets the Area of the current Panel.

#### Returns

[`Area`](../../../area/classes/Area.md)

The Area object for the Panel's Area, including both the
position and size.

#### See

[setArea()](#setarea)

---

### getConfig()

```ts
getConfig(): Record<string, unknown> | undefined;
```

Defined in: [frontend/src/classes/panel/panel.ts:399](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L399)

Gets the Panel's Config, if available.

#### Returns

`Record`\<`string`, `unknown`\> \| `undefined`

The Config object, if present, or `undefined` if the PanelType
has no Config Schema (and thus no Config was initialised).

#### See

[initConfig()](#initconfig)

---

### getContent()

```ts
getContent(): PanelContent;
```

Defined in: [frontend/src/classes/panel/panel.ts:634](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L634)

Get the Content of the Panel, parsed and formulated in a specific way
depending on the PanelType.

#### Returns

[`PanelContent`](../interfaces/PanelContent.md)

The PanelContent, formed in a way determined by the PanelType,
with each object property holding something different depending on the
type.

#### Remarks

The PanelType determines how the PanelContent is formed for the specific
Panel, thus affecting how to Get (this method) and Set
([setContent()](#setcontent)) the Content for a Panel.

#### See

- [PanelContent](../interfaces/PanelContent.md)
- [PanelType](../../panel_type/classes/PanelType.md)
- [setContent()](#setcontent)

---

### getId()

```ts
getId(): number;
```

Defined in: [frontend/src/classes/panel/panel.ts:408](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L408)

Get the numerical ID of the Panel in the Dashboard.

#### Returns

`number`

The ID the Panel has in the Dashboard.

---

### getKeyElement()

```ts
getKeyElement(element): HTMLElement | null | undefined;
```

Defined in: [frontend/src/classes/panel/panel.ts:1197](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L1197)

Gets a particular Key Element from the Panel's KeyElements map, used for
direct access.

#### Parameters

| Parameter | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| `element` | `string` | The key of the element to obtain. |

#### Returns

`HTMLElement` \| `null` \| `undefined`

The found element that is the value of the key passed in
the parameter, either as an element, undefined, or null, depending on
both the initial binding of the key element, and the presence of the
requested key.

#### Example

```ts
const textArea = panel.getKeyElement("text_area");
```

The above will be an HTML element if the `text_area` key has been
assigned a value, and the element assigned to it exists.

#### See

- [keyElements](#keyelements)
- [getKeyElements()](#getkeyelements)

---

### getKeyElements()

```ts
getKeyElements(): Map<string, HTMLElement | null>;
```

Defined in: [frontend/src/classes/panel/panel.ts:1170](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L1170)

Get all KeyElements for the Panel.

#### Returns

`Map`\<`string`, `HTMLElement` \| `null`\>

The Map of KeyElements for the Panel, containing the key as a
string, and the value as either a located HTML Element or null if not
found when bound.

---

### getPosition()

```ts
getPosition(): Coordinates;
```

Defined in: [frontend/src/classes/panel/panel.ts:489](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L489)

Gets the Panel's position.

#### Returns

[`Coordinates`](../../../area/interfaces/Coordinates.md)

The Position stored in the Panel's Area, as an object of type
[Coordinates](../../../area/interfaces/Coordinates.md).

#### See

- [area](#area)
- [getArea()](#getarea)
- [setPosition()](#setposition)
- [Coordinates](../../../area/interfaces/Coordinates.md)

---

### getSize()

```ts
getSize(): Size;
```

Defined in: [frontend/src/classes/panel/panel.ts:571](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L571)

Gets the size of the Panel.

#### Returns

[`Size`](../../../area/interfaces/Size.md)

- The Size of the Panel's Area, as an object of type
  [Size](../../../area/interfaces/Size.md).

#### See

- [area](#area)
- [setSize()](#setsize)
- [getArea()](#getarea)
- [Size](../../../area/interfaces/Size.md)

---

### getType()

```ts
getType(): PanelType;
```

Defined in: [frontend/src/classes/panel/panel.ts:613](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L613)

Gets the Panel's PanelType.

#### Returns

[`PanelType`](../../panel_type/classes/PanelType.md)

The type of Panel as an object of type [PanelType](../../panel_type/classes/PanelType.md).

#### See

[PanelType](../../panel_type/classes/PanelType.md)

---

### init()

```ts
private init(existentConfig?, body?): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:168](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L168)

Initialise the Panel completely, starting with the base/template and
ending when behaviour begins.

#### Parameters

| Parameter         | Type                                            | Description                                                                                                                       |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `existentConfig?` | `Record`\<`string`, `unknown`\>                 | An optional existent Config to assign to the Panel. If this is not passed, the Default Config for the PanelType will be assigned. |
| `body?`           | [`PanelContent`](../interfaces/PanelContent.md) | An optional existent object with Content to populate into the Panel upon loading/initialising.                                    |

#### Returns

`void`

#### See

- [initBase()](#initbase)
- [addHoverListeners()](#addhoverlisteners)
- [addButtonListeners()](#addbuttonlisteners)
- [initTemplate()](#inittemplate)
- [bindKeyElements()](#bindkeyelements)
- [initConfig()](#initconfig)

---

### initBase()

```ts
private initBase(): Promise<void>;
```

Defined in: [frontend/src/classes/panel/panel.ts:215](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L215)

Initialise the base/empty body of the Panel with its buttons and
container.

#### Returns

`Promise`\<`void`\>

A promise that is resolved once the base has initialised.

#### See

- [init()](#init)
- [addHoverListeners()](#addhoverlisteners)
- [addButtonListeners()](#addbuttonlisteners)
- [initTemplate()](#inittemplate)
- [bindKeyElements()](#bindkeyelements)
- [initConfig()](#initconfig)

---

### initConfig()

```ts
private initConfig(existentConfig?): Promise<void>;
```

Defined in: [frontend/src/classes/panel/panel.ts:310](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L310)

Initiates the Panel's Config, with an optional existing Config, otherwise
initialising with the Default Config for the PanelType.

#### Parameters

| Parameter         | Type                            | Description                                                                                                                                          |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `existentConfig?` | `Record`\<`string`, `unknown`\> | An optional existing Config to assign to the Panel. If this is not provided (always the case with new Panels), then the Default Config will be used. |

#### Returns

`Promise`\<`void`\>

A promise that is resolved once the Config has
initialised.

#### Example

```ts
initConfig({ use24Hr: { label: "Use 24 Hour time", value: true } });
```

The above passes an existing Config with one simple Boolean Entry to be
assigned to the Panel.

#### See

- [Config](../../../config/config/type-aliases/Config.md)
- [PanelTypeConfig](../../panel_type_properties/panel_type_config/classes/PanelTypeConfig.md)
- [init()](#init)
- [initBase()](#initbase)
- [initTemplate()](#inittemplate)
- [addHoverListeners()](#addhoverlisteners)
- [addButtonListeners()](#addbuttonlisteners)
- [bindKeyElements()](#bindkeyelements)

---

### initPreview()

```ts
initPreview(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:1017](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L1017)

Set up the Preview with all necessary information to preview where the
Panel would end up snapped to the grid while being manipulated.

#### Returns

`void`

#### See

- [preview](../../../../app/variables/preview.md)
- [updatePreview()](#updatepreview)

---

### initTemplate()

```ts
private initTemplate(): Promise<void>;
```

Defined in: [frontend/src/classes/panel/panel.ts:254](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L254)

Initiates the Panel's shape/content with its defined template in the
backend, determined by its PanelType.

#### Returns

`Promise`\<`void`\>

A promise that is resolved once the template has initialised.

#### See

- [init()](#init)
- [initBase()](#initbase)
- [addHoverListeners()](#addhoverlisteners)
- [addButtonListeners()](#addbuttonlisteners)
- [bindKeyElements()](#bindkeyelements)
- [initConfig()](#initconfig)

---

### moveToCentre()

```ts
moveToCentre(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:538](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L538)

Moves the Panel's body to the centre of the screen/window, both
vertically and horizontally.

#### Returns

`void`

#### Remarks

This moves the Panel to the centre regardless of its initial position on
the screen, and is called when focusing on the Panel body, such as when
expanding to open the Config menu.

[setPosition()](#setposition) is not used as this is a stylistic
approach that only manipulates the actual Panel's body, as opposed to
altering the position of the actual containing element.

---

### removeHoverListeners()

```ts
removeHoverListeners(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:1000](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L1000)

Removes all hover handlers responsible for rotating the Panel on mouse
hovering.

#### Returns

`void`

#### See

- [hoverHandler](../../../../functions/manip/variables/hoverHandler.md)
- [addHoverListeners()](#addhoverlisteners)

---

### setArea()

```ts
setArea(other): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:440](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L440)

Sets the Panel's Area to an inputted one.

#### Parameters

| Parameter | Type                                    | Description                                       |
| --------- | --------------------------------------- | ------------------------------------------------- |
| `other`   | [`Area`](../../../area/classes/Area.md) | The complete Area to copy and apply to the Panel. |

#### Returns

`void`

#### Example

```ts
panel.setArea(Area.INIT);
```

The above sets the Panel's Area to be positioned at (0,0) with a size of
1x1.

#### See

[getArea()](#getarea)

---

### setContent()

```ts
setContent(content): Promise<void>;
```

Defined in: [frontend/src/classes/panel/panel.ts:735](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L735)

Populates the Panel body with the loaded PanelContent in a way unique to
the Panel Type.

#### Parameters

| Parameter | Type                                            | Description                                       |
| --------- | ----------------------------------------------- | ------------------------------------------------- |
| `content` | [`PanelContent`](../interfaces/PanelContent.md) | The loaded PanelContent to populate in the Panel. |

#### Returns

`Promise`\<`void`\>

A promise that is resolved once all content has been
placed.

#### Remarks

How the content is populated and slotted into the Panel's different
elements is based on the PanelType, with each PanelType setting different
properties of the [PanelContent](../interfaces/PanelContent.md) object in different elements,
locations, and ways.

#### Example

```ts
panel.setContent({ body: "Here is some text \n And then some more" });
```

The above, in the case of a Notepad Panel, will insert the inputted
string `body` as the content of the Notepad TextArea.

#### See

- [PanelContent](../interfaces/PanelContent.md)
- [PanelType](../../panel_type/classes/PanelType.md)
- [getContent()](#getcontent)

---

### setPosition()

```ts
setPosition(x, y): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:514](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L514)

Sets the Panel's position from an input set of absolute numbers (in
pixels).

#### Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `x`       | `number` | The x (horizontal) coordinate. |
| `y`       | `number` | The y (vertical) coordinate.   |

#### Returns

`void`

#### Example

```ts
panel.setPosition(0, 0);
```

The above resets the Panel's position to the top left corner of the
Dashboard.

#### See

- [area](#area)
- [getPosition()](#getposition)
- [Area.setPosition()](../../../area/classes/Area.md#setposition)
- [Coordinates](../../../area/interfaces/Coordinates.md)

---

### setSize()

```ts
setSize(width, height): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:595](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L595)

Sets the Panel's Size from an input set of absolute numbers (in pixels).

#### Parameters

| Parameter | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| `width`   | `number` | The width to apply to the Panel.  |
| `height`  | `number` | The height to apply to the Panel. |

#### Returns

`void`

#### Example

```ts
panel.setSize(150, 300);
```

The above sets the Size of the panel to be 150 pixels wide and 300 pixels
tall.

#### See

- [area](#area)
- [getSize()](#getsize)
- [Area.setSize()](../../../area/classes/Area.md#setsize)
- [Size](../../../area/interfaces/Size.md)

---

### triggerSave()

```ts
triggerSave(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:1222](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L1222)

Triggers a save by firing off an update event that is listened to by the
Dashboard.

#### Returns

`void`

#### Remarks

The Dashboard handles the delayed save. This function also shows the Save
icon after a delay, representing when the Dashboard save occurs.

---

### updateArea()

```ts
updateArea(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:461](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L461)

Updates the current Panel's Area with the values in the style, in case
there is ever a disconnect between the two.

#### Returns

`void`

#### Remarks

This should never be the case, but it is a contingency. This is for
queried Panels already in the body when the Dashboard loads, in case they
exist. Usually, they won't, but just in case. It updates the connection
by simply setting the Area to the absolute values already stored in the
styles, where they are handled by the Area constructor and rounded.

#### See

- [area](#area)
- [Area](../../../area/classes/Area.md)
- [getArea()](#getarea)
- [setArea()](#setarea)

---

### updatePreview()

```ts
updatePreview(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:1037](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/classes/panel/panel.ts#L1037)

Updates the Preview currently bound to the Panel, snapping it to the grid
based on the position of this calling Panel.

#### Returns

`void`

#### See

- [preview](../../../../app/variables/preview.md)
- [initPreview()](#initpreview)
