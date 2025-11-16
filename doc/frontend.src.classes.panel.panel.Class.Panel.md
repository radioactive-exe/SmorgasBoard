[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel](../wiki/frontend.src.classes.panel.panel) / Panel

# Class: Panel

Defined in: [frontend/src/classes/panel/panel.ts:67](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L67)

A custom HTMLElement, implements many methods for custom use with the program
to make work more efficient.

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

Defined in: [frontend/src/classes/panel/panel.ts:79](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L79)

Creates an instance of a Panel.

#### Parameters

| Parameter     | Type                                                                              | Default value | Description |
| ------------- | --------------------------------------------------------------------------------- | ------------- | ----------- |
| `area`        | [`Area`](../wiki/frontend.src.classes.area.Class.Area)                            | `undefined`   |             |
| `type`        | [`PanelType`](../wiki/frontend.src.classes.panel.panel_type.Class.PanelType)      | `undefined`   |             |
| `dashboardId` | `number`                                                                          | `undefined`   |             |
| `config`      | `Record`\<`string`, `unknown`\> \| `undefined`                                    | `undefined`   |             |
| `body?`       | [`PanelContent`](../wiki/frontend.src.classes.panel.panel.Interface.PanelContent) | `undefined`   |             |

#### Returns

`Panel`

#### Overrides

```ts
HTMLElement.constructor;
```

## Properties

| Property                               | Modifier  | Type                                                                         | Default value | Defined in                                                                                                                                                                      |
| -------------------------------------- | --------- | ---------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="area"></a> `area`               | `private` | [`Area`](../wiki/frontend.src.classes.area.Class.Area)                       | `undefined`   | [frontend/src/classes/panel/panel.ts:80](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L80) |
| <a id="config"></a> `config`           | `private` | `Record`\<`string`, `unknown`\> \| `undefined`                               | `undefined`   | [frontend/src/classes/panel/panel.ts:83](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L83) |
| <a id="dashboardid"></a> `dashboardId` | `private` | `number`                                                                     | `undefined`   | [frontend/src/classes/panel/panel.ts:82](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L82) |
| <a id="keyelements"></a> `keyElements` | `private` | `Map`\<`string`, `HTMLElement` \| `null`\>                                   | `undefined`   | [frontend/src/classes/panel/panel.ts:68](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L68) |
| <a id="type"></a> `type`               | `private` | [`PanelType`](../wiki/frontend.src.classes.panel.panel_type.Class.PanelType) | `undefined`   | [frontend/src/classes/panel/panel.ts:81](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L81) |

## Methods

### addButtonListeners()

```ts
addButtonListeners(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:498](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L498)

#### Returns

`void`

---

### addHoverListeners()

```ts
addHoverListeners(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:554](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L554)

#### Returns

`void`

---

### beginBehaviour()

```ts
beginBehaviour(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:691](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L691)

#### Returns

`void`

---

### bindKeyElements()

```ts
private bindKeyElements(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:579](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L579)

#### Returns

`void`

---

### getArea()

```ts
getArea(): Area;
```

Defined in: [frontend/src/classes/panel/panel.ts:233](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L233)

Gets the Area of the current Panel, as an object of [Area](../wiki/frontend.src.classes.area.Class.Area).

#### Returns

[`Area`](../wiki/frontend.src.classes.area.Class.Area)

---

### getConfig()

```ts
getConfig(): Record<string, unknown> | undefined;
```

Defined in: [frontend/src/classes/panel/panel.ts:494](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L494)

#### Returns

`Record`\<`string`, `unknown`\> \| `undefined`

---

### getContent()

```ts
getContent(): PanelContent;
```

Defined in: [frontend/src/classes/panel/panel.ts:356](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L356)

#### Returns

[`PanelContent`](../wiki/frontend.src.classes.panel.panel.Interface.PanelContent)

---

### getId()

```ts
getId(): number;
```

Defined in: [frontend/src/classes/panel/panel.ts:224](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L224)

#### Returns

`number`

---

### getKeyElement()

```ts
getKeyElement(element): HTMLElement | null | undefined;
```

Defined in: [frontend/src/classes/panel/panel.ts:687](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L687)

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `element` | `string` |

#### Returns

`HTMLElement` \| `null` \| `undefined`

---

### getKeyElements()

```ts
getKeyElements(): Map<string, HTMLElement | null>;
```

Defined in: [frontend/src/classes/panel/panel.ts:683](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L683)

#### Returns

`Map`\<`string`, `HTMLElement` \| `null`\>

---

### getPosition()

```ts
getPosition(): Coordinate;
```

Defined in: [frontend/src/classes/panel/panel.ts:275](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L275)

Gets the Panel's (Area's) position, as an object of [Coordinate](../wiki/frontend.src.classes.area.Interface.Coordinate).

#### Returns

[`Coordinate`](../wiki/frontend.src.classes.area.Interface.Coordinate)

---

### getSize()

```ts
getSize(): Size;
```

Defined in: [frontend/src/classes/panel/panel.ts:317](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L317)

Gets the size of the Panel ('s Area) as an object of [Size](../wiki/frontend.src.classes.area.Interface.Size).

#### Returns

[`Size`](../wiki/frontend.src.classes.area.Interface.Size)

---

### getType()

```ts
getType(): PanelType;
```

Defined in: [frontend/src/classes/panel/panel.ts:343](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L343)

Returns the Panel's type, as an object of [PanelType](../wiki/frontend.src.classes.panel.panel_type.Class.PanelType).

#### Returns

[`PanelType`](../wiki/frontend.src.classes.panel.panel_type.Class.PanelType)

---

### init()

```ts
private init(existentConfig?, body?): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:96](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L96)

#### Parameters

| Parameter         | Type                                                                              |
| ----------------- | --------------------------------------------------------------------------------- |
| `existentConfig?` | `Record`\<`string`, `unknown`\>                                                   |
| `body?`           | [`PanelContent`](../wiki/frontend.src.classes.panel.panel.Interface.PanelContent) |

#### Returns

`void`

---

### initBase()

```ts
private initBase(): Promise<void>;
```

Defined in: [frontend/src/classes/panel/panel.ts:113](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L113)

#### Returns

`Promise`\<`void`\>

---

### initConfig()

```ts
private initConfig(existentConfig?): Promise<void>;
```

Defined in: [frontend/src/classes/panel/panel.ts:159](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L159)

#### Parameters

| Parameter         | Type                            |
| ----------------- | ------------------------------- |
| `existentConfig?` | `Record`\<`string`, `unknown`\> |

#### Returns

`Promise`\<`void`\>

---

### initPreview()

```ts
initPreview(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:567](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L567)

#### Returns

`void`

---

### initTemplate()

```ts
private initTemplate(): Promise<void>;
```

Defined in: [frontend/src/classes/panel/panel.ts:136](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L136)

Initiates the panel's body based on its template.

#### Returns

`Promise`\<`void`\>

---

### moveToCentre()

```ts
moveToCentre(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:296](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L296)

#### Returns

`void`

---

### removeHoverListeners()

```ts
removeHoverListeners(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:560](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L560)

#### Returns

`void`

---

### setArea()

```ts
setArea(other): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:242](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L242)

Sets the Panel's Area with a complete [Area](../wiki/frontend.src.classes.area.Class.Area) input.

#### Parameters

| Parameter | Type                                                   | Description |
| --------- | ------------------------------------------------------ | ----------- |
| `other`   | [`Area`](../wiki/frontend.src.classes.area.Class.Area) |             |

#### Returns

`void`

---

### setContent()

```ts
setContent(content): Promise<void>;
```

Defined in: [frontend/src/classes/panel/panel.ts:413](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L413)

#### Parameters

| Parameter | Type                                                                              |
| --------- | --------------------------------------------------------------------------------- |
| `content` | [`PanelContent`](../wiki/frontend.src.classes.panel.panel.Interface.PanelContent) |

#### Returns

`Promise`\<`void`\>

---

### setPosition()

```ts
setPosition(x, y): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:285](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L285)

Sets the Panel's position from an input set of numbers.

#### Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `x`       | `number` | The x (horizontal) coordinate. |
| `y`       | `number` | The y (vertical) coordinate.   |

#### Returns

`void`

---

### setSize()

```ts
setSize(width, height): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:327](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L327)

Sets the Panel's size from an input set of numbers.

#### Parameters

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `width`   | `number` |             |
| `height`  | `number` |             |

#### Returns

`void`

---

### setType()

```ts
setType(type): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:352](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L352)

Sets the Panel Type from a received input of [PanelType](../wiki/frontend.src.classes.panel.panel_type.Class.PanelType).

#### Parameters

| Parameter | Type                                                                         | Description |
| --------- | ---------------------------------------------------------------------------- | ----------- |
| `type`    | [`PanelType`](../wiki/frontend.src.classes.panel.panel_type.Class.PanelType) |             |

#### Returns

`void`

---

### triggerSave()

```ts
triggerSave(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:695](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L695)

#### Returns

`void`

---

### updateArea()

```ts
updateArea(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:253](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L253)

Updates the current Panel's Area with the values in the style, in case
there is ever a disconnect between the two. This should never be the
case, but it is a contingency. This is for queried Panels, in case they
exist. Usually, they won't, but just in case.

#### Returns

`void`

---

### updatePreview()

```ts
updatePreview(): void;
```

Defined in: [frontend/src/classes/panel/panel.ts:575](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel.ts#L575)

#### Returns

`void`
