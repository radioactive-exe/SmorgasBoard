[Smorgasboard](../wiki/Home) / [frontend/src/classes/dashboard](../wiki/frontend.src.classes.dashboard) / Dashboard

# Class: Dashboard

Defined in: [frontend/src/classes/dashboard.ts:44](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L44)

The Dashboard class.

## Remarks

This class houses the main object for the application/website. This dashboard
will be the only element initially in the DOM. It handles adding and removing
panels, setting the theme, and editing the layout of its contents.

## Extends

- `HTMLElement`

## Constructors

### Constructor

```ts
new Dashboard(): Dashboard;
```

Defined in: [frontend/src/classes/dashboard.ts:89](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L89)

Creates a new Dashboard.

#### Returns

`Dashboard`

#### Remarks

Once created, the dashboard is filled with cells to indicate the
different slots and dimensions of the Dashboard.

#### Overrides

```ts
HTMLElement.constructor;
```

## Properties

| Property                                 | Modifier  | Type                                                              | Description                                                                                                                                                                                                                                                                                                                                                                                              | Defined in                                                                                                                                                                  |
| ---------------------------------------- | --------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="cells"></a> `cells`               | `private` | `HTMLElement`[]                                                   | -                                                                                                                                                                                                                                                                                                                                                                                                        | [frontend/src/classes/dashboard.ts:78](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L78) |
| <a id="currenttheme"></a> `currentTheme` | `private` | [`Theme`](../wiki/frontend.src.classes.theme.Class.Theme)         | The current Theme chosen for the Dashboard.                                                                                                                                                                                                                                                                                                                                                              | [frontend/src/classes/dashboard.ts:57](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L57) |
| <a id="dimensions"></a> `dimensions`     | `private` | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)        | The dimensions in Units of the Dashboard. **Remarks** This holds the number of Rows and Columns that the Dashboard is divided into, as an object of type [Size](../wiki/frontend.src.classes.area.Interface.Size) [x] Implement the proper dimensions behaviour, and the ability to change the number of rows and columns when editing the Dashboard. [x] Implement dashboard dimension changes preview. | [frontend/src/classes/dashboard.ts:76](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L76) |
| <a id="freeids"></a> `freeIds`           | `private` | `Set`\<`number`\>                                                 | The pool of Free ID numbers in the Dashboard. **Remarks** Once panels are deleted, their ID number is thrown into this Set to be later reused by the new panels.                                                                                                                                                                                                                                         | [frontend/src/classes/dashboard.ts:65](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L65) |
| <a id="panels"></a> `panels`             | `private` | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel)[] | The Panels stored in the dashboard/application. **Remarks** All the panels in the application are stored and utilised through this array. **See** [Panel](../wiki/frontend.src.classes.panel.panel.Class.Panel)                                                                                                                                                                                          | [frontend/src/classes/dashboard.ts:55](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L55) |
| <a id="savetimeout"></a> `saveTimeout`   | `private` | `Timeout`                                                         | -                                                                                                                                                                                                                                                                                                                                                                                                        | [frontend/src/classes/dashboard.ts:80](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L80) |

## Methods

### clear()

```ts
clear(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:564](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L564)

#### Returns

`void`

---

### clearLoadedPanels()

```ts
clearLoadedPanels(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:572](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L572)

#### Returns

`void`

---

### deletePanel()

```ts
deletePanel(panel): void;
```

Defined in: [frontend/src/classes/dashboard.ts:328](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L328)

#### Parameters

| Parameter | Type                                                            |
| --------- | --------------------------------------------------------------- |
| `panel`   | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) |

#### Returns

`void`

---

### getCells()

```ts
getCells(): HTMLElement[];
```

Defined in: [frontend/src/classes/dashboard.ts:133](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L133)

#### Returns

`HTMLElement`[]

---

### getCurrentTheme()

```ts
getCurrentTheme(): Theme;
```

Defined in: [frontend/src/classes/dashboard.ts:546](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L546)

#### Returns

[`Theme`](../wiki/frontend.src.classes.theme.Class.Theme)

---

### getDimensions()

```ts
getDimensions(): Size;
```

Defined in: [frontend/src/classes/dashboard.ts:137](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L137)

#### Returns

[`Size`](../wiki/frontend.src.classes.area.Interface.Size)

---

### getPanels()

```ts
getPanels(): Panel[];
```

Defined in: [frontend/src/classes/dashboard.ts:129](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L129)

Returns the set of Panels.

#### Returns

[`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel)[]

The stored array of Panels in the application/dashboard.

---

### isEditing()

```ts
isEditing(): boolean;
```

Defined in: [frontend/src/classes/dashboard.ts:226](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L226)

Whether we are currently in Edit Mode.

#### Returns

`boolean`

A boolean representing whether or not we are currently editing
the Dashboard panels.

---

### load()

```ts
load(): Promise<void>;
```

Defined in: [frontend/src/classes/dashboard.ts:344](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L344)

#### Returns

`Promise`\<`void`\>

---

### loadStoredDimensions()

```ts
loadStoredDimensions(): Promise<void>;
```

Defined in: [frontend/src/classes/dashboard.ts:360](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L360)

#### Returns

`Promise`\<`void`\>

---

### loadStoredPanels()

```ts
private loadStoredPanels(): Promise<void>;
```

Defined in: [frontend/src/classes/dashboard.ts:387](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L387)

#### Returns

`Promise`\<`void`\>

---

### loadStoredTheme()

```ts
loadStoredTheme(): Promise<void>;
```

Defined in: [frontend/src/classes/dashboard.ts:520](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L520)

#### Returns

`Promise`\<`void`\>

---

### organiseElements()

```ts
organiseElements(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:338](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L338)

#### Returns

`void`

---

### populateCells()

```ts
private populateCells(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:104](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L104)

Fills the Dashboard with cells.

#### Returns

`void`

#### Remarks

The Dashboard gets divided into a visual grid with cells for all the rows
and columns.

---

### save()

```ts
save(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:479](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L479)

#### Returns

`void`

---

### saveToCloud()

```ts
private saveToCloud(panelStorage): void;
```

Defined in: [frontend/src/classes/dashboard.ts:507](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L507)

#### Parameters

| Parameter      | Type                                                                                  |
| -------------- | ------------------------------------------------------------------------------------- |
| `panelStorage` | [`PanelInstance`](../wiki/frontend.src.classes.panel.panel.Interface.PanelInstance)[] |

#### Returns

`void`

---

### setCurrentTheme()

```ts
setCurrentTheme(theme, updateStored): void;
```

Defined in: [frontend/src/classes/dashboard.ts:550](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L550)

#### Parameters

| Parameter      | Type                                                      | Default value |
| -------------- | --------------------------------------------------------- | ------------- |
| `theme`        | [`Theme`](../wiki/frontend.src.classes.theme.Class.Theme) | `undefined`   |
| `updateStored` | `boolean`                                                 | `true`        |

#### Returns

`void`

---

### setDimensions()

```ts
setDimensions(
   size,
   truncate,
   updateStored): void;
```

Defined in: [frontend/src/classes/dashboard.ts:186](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L186)

#### Parameters

| Parameter      | Type                                                       | Default value |
| -------------- | ---------------------------------------------------------- | ------------- |
| `size`         | [`Size`](../wiki/frontend.src.classes.area.Interface.Size) | `undefined`   |
| `truncate`     | `boolean`                                                  | `false`       |
| `updateStored` | `boolean`                                                  | `true`        |

#### Returns

`void`

---

### spawnPanel()

```ts
private spawnPanel(panel, updateStored): void;
```

Defined in: [frontend/src/classes/dashboard.ts:318](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L318)

#### Parameters

| Parameter      | Type                                                            | Default value |
| -------------- | --------------------------------------------------------------- | ------------- |
| `panel`        | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | `undefined`   |
| `updateStored` | `boolean`                                                       | `true`        |

#### Returns

`void`

---

### spawnPanelOfType()

```ts
spawnPanelOfType(panelType): void;
```

Defined in: [frontend/src/classes/dashboard.ts:269](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L269)

Spawns a Panel of an inputted Type.

#### Parameters

| Parameter   | Type                                                                         | Description                              |
| ----------- | ---------------------------------------------------------------------------- | ---------------------------------------- |
| `panelType` | [`PanelType`](../wiki/frontend.src.classes.panel.panel_type.Class.PanelType) | The PanelType of the new Panel to spawn. |

#### Returns

`void`

#### Remarks

This deals with checking potential areas to find an available slot,
assigning an ID to the panel, as well as obtaining the default Config for
the PanelType. This method then calls the [spawnPanel](../wiki/#spawnpanel) method with
all the resulting information, or triggers an alert if the spawning
circumstances were unsuccessful (in other words, if no space was found).

#### Example

```ts
mainDashboard.spawnPanelOfType(PanelType.CLOCK);
```

The above attempts to spawn a new Clock panel.

---

### toggleEditMode()

```ts
toggleEditMode(): boolean;
```

Defined in: [frontend/src/classes/dashboard.ts:235](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L235)

Toggles Edit mode for the Dashboard.

#### Returns

`boolean`

The current editing status after the toggle.

---

### triggerDelayedSave()

```ts
triggerDelayedSave(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:353](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L353)

#### Returns

`void`

---

### getCols()

```ts
static getCols(): number;
```

Defined in: [frontend/src/classes/dashboard.ts:155](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L155)

Get the number of columns in the Dashboard.

#### Returns

`number`

The number of columns the dashboard is divided into.

---

### getFractionalHeight()

```ts
static getFractionalHeight(): number;
```

Defined in: [frontend/src/classes/dashboard.ts:175](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L175)

Gets the height of one row/unit.

#### Returns

`number`

The height of the window divided by the number of rows to get
the height of each row in the Dashboard.

---

### getFractionalWidth()

```ts
static getFractionalWidth(): number;
```

Defined in: [frontend/src/classes/dashboard.ts:165](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L165)

Gets the width of one column/unit.

#### Returns

`number`

The width of the window divided by the number of columns to get
the width of each column in the Dashboard.

---

### getMaxDimensions()

```ts
static getMaxDimensions(): Size;
```

Defined in: [frontend/src/classes/dashboard.ts:179](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L179)

#### Returns

[`Size`](../wiki/frontend.src.classes.area.Interface.Size)

---

### getRows()

```ts
static getRows(): number;
```

Defined in: [frontend/src/classes/dashboard.ts:146](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/dashboard.ts#L146)

Get the number of rows in the Dashboard.

#### Returns

`number`

The number of rows the dashboard is divided into.
