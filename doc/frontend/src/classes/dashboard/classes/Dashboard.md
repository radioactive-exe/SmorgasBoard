[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/classes/dashboard](../README.md) / Dashboard

# Class: Dashboard

Defined in: [frontend/src/classes/dashboard.ts:45](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L45)

The Dashboard class.

## Remarks

This class houses the main object for the application/website. This dashboard
will be the only element initially in the DOM when it comes to the dashboard
itself (and not modals/overlays, etc.). It handles adding and removing
panels, setting the theme, and editing the layout of its contents.

## Extends

- `HTMLElement`

## Constructors

### Constructor

```ts
new Dashboard(): Dashboard;
```

Defined in: [frontend/src/classes/dashboard.ts:95](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L95)

Creates a new Dashboard. Once created, the dashboard is filled with cells
to indicate the different slots and dimensions of the Dashboard. A shadow
DOM is attached to the Dashboard to house all the cells.

#### Returns

`Dashboard`

#### Overrides

```ts
HTMLElement.constructor;
```

## Properties

| Property                                     | Modifier  | Type                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                   | Defined in                                                                                                                                                                  |
| -------------------------------------------- | --------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="cells"></a> `cells`                   | `private` | `HTMLElement`[]                                                    | The cells in the background of the dashboard, used as indicators for its dimensions, edit mode, and previewing dimension changes. **See** [populateCells()](#populatecells)                                                                                                                                                                                                                   | [frontend/src/classes/dashboard.ts:83](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L83) |
| <a id="currenttheme"></a> `currentTheme`     | `private` | [`Theme`](../../theme/classes/Theme.md)                            | The current Theme applied to the Dashboard.                                                                                                                                                                                                                                                                                                                                                   | [frontend/src/classes/dashboard.ts:64](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L64) |
| <a id="dimensions"></a> `dimensions`         | `private` | [`Size`](../../area/interfaces/Size.md)                            | The dimensions in Units of the Dashboard. This holds the number of Rows and Columns (cells) that the Dashboard is divided into. Any reference including "cell" or "fractional" is referring to these dimensions.                                                                                                                                                                              | [frontend/src/classes/dashboard.ts:76](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L76) |
| <a id="freeids"></a> `freeIds`               | `private` | `Set`\<`number`\>                                                  | The pool of Free ID numbers in the Dashboard. Once panels are deleted, their ID number is thrown into this Set to be later reused by the new panels.                                                                                                                                                                                                                                          | [frontend/src/classes/dashboard.ts:70](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L70) |
| <a id="panelinstances"></a> `panelInstances` | `private` | [`PanelInstance`](../../panel/panel/interfaces/PanelInstance.md)[] | The stored PanelInstances for the panels in the Dashboard. **Remarks** This is stored to facilitate saving locally and to the cloud, as well as checking received updates from the Supabase database for any differences with the local data before reloading, avoiding unnecessary reloads if an update was received in conflicting timing with resetting whether a change was local or not. | [frontend/src/classes/dashboard.ts:62](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L62) |
| <a id="panels"></a> `panels`                 | `private` | [`Panel`](../../panel/panel/classes/Panel.md)[]                    | The Panels stored in the dashboard/application. **See** [Panel](../../panel/panel/classes/Panel.md)                                                                                                                                                                                                                                                                                           | [frontend/src/classes/dashboard.ts:51](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L51) |
| <a id="savetimeout"></a> `saveTimeout`       | `private` | `Timeout`                                                          | The timeout/delay to trigger an autosave after a dashboard change or update is made.                                                                                                                                                                                                                                                                                                          | [frontend/src/classes/dashboard.ts:88](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L88) |

## Methods

### clear()

```ts
clear(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:973](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L973)

Resets the Dashboard completely, removing all locally stored data and
resetting the Theme to default, clearing out all Panels and stored IDs.

#### Returns

`void`

#### See

[clearLoadedPanels()](#clearpaneldata)

---

### clearPanelData()

```ts
clearPanelData(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:993](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L993)

Clears all Panel data for the Dashboard, removing all free IDs and stored
Panels, as well as all Panels in the body, without replacing any
locally/remotely saved data.

#### Returns

`void`

#### See

[clear()](#clear)

---

### deletePanel()

```ts
deletePanel(panel): void;
```

Defined in: [frontend/src/classes/dashboard.ts:558](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L558)

Deleted a panel from the Dashboard.

#### Parameters

| Parameter | Type                                          | Description          |
| --------- | --------------------------------------------- | -------------------- |
| `panel`   | [`Panel`](../../panel/panel/classes/Panel.md) | The panel to delete. |

#### Returns

`void`

#### Example

```ts
deletePanel(e.target);
```

The above deletes the panel targeted by an event, such as when the
context menu is spawned by a click on top of a particular panel. In that
case, the panel can be deleted directly.

#### See

[deletePanelSection](../../../elements/context_menu/variables/deletePanelSection.md)

---

### getCells()

```ts
getCells(): HTMLElement[];
```

Defined in: [frontend/src/classes/dashboard.ts:206](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L206)

Gets the background cells for the Dashboard.

#### Returns

`HTMLElement`[]

The stored array of cells.

---

### getCurrentTheme()

```ts
getCurrentTheme(): Theme;
```

Defined in: [frontend/src/classes/dashboard.ts:922](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L922)

Gets the current Theme set on the Dashboard.

#### Returns

[`Theme`](../../theme/classes/Theme.md)

The currently applied Theme.

#### See

- [Theme](../../theme/classes/Theme.md)
- [setCurrentTheme()](#setcurrenttheme)

---

### getDimensions()

```ts
getDimensions(): Size;
```

Defined in: [frontend/src/classes/dashboard.ts:218](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L218)

Gets the dimensions of the Dashboard.

#### Returns

[`Size`](../../area/interfaces/Size.md)

The size of the dashboard (width and height) as an object of
type Size.

#### See

[setDimensions()](#setdimensions)

---

### getFreeIds()

```ts
getFreeIds(): Set<number>;
```

Defined in: [frontend/src/classes/dashboard.ts:197](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L197)

Gets the Set of free IDs stored in the dashboard.

#### Returns

`Set`\<`number`\>

The set/pool of free IDs as a numerical Set.

#### See

[freeIds](#freeids)

---

### getImmediatePanelInstances()

```ts
getImmediatePanelInstances(): PanelInstance[];
```

Defined in: [frontend/src/classes/dashboard.ts:186](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L186)

Gets the immediate/current PanelInstance data for all Panels.

#### Returns

[`PanelInstance`](../../panel/panel/interfaces/PanelInstance.md)[]

An array of PanelInstances, from the immediate content.

#### Remarks

This is used to get the dashboard panels at the exact moment of calling,
and not the stored data from the last save (which is when
[panelInstances](#panelinstances) is updated). This is thus called even if during a
save timeout after an edit, used for comparing incoming payloads for
changes if those changes occur: <br/> (1) after an edit on the current
client instance, <br/> (2) after the save on the other client instance,
and <br/> (3) before the save on the current client instance.

#### See

- [PanelInstance](../../panel/panel/interfaces/PanelInstance.md)
- [Panel.getInstance()](../../panel/panel/classes/Panel.md#getinstance)
- [getPanelInstances()](#getpanelinstances)

---

### getPanelInstances()

```ts
getPanelInstances(): PanelInstance[];
```

Defined in: [frontend/src/classes/dashboard.ts:164](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L164)

Gets the stored PanelInstance data for all Panels from the last save.

#### Returns

[`PanelInstance`](../../panel/panel/interfaces/PanelInstance.md)[]

An array of PanelInstances, used when updating/saving to cloud,
as well as comparing incoming payloads for changes.

#### See

- [PanelInstance](../../panel/panel/interfaces/PanelInstance.md)
- [Panel.getInstance()](../../panel/panel/classes/Panel.md#getinstance)
- [getImmediatePanelInstances()](#getimmediatepanelinstances)

---

### getPanels()

```ts
getPanels(): Panel[];
```

Defined in: [frontend/src/classes/dashboard.ts:150](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L150)

Gets the set of Panels currently in the dashboard.

#### Returns

[`Panel`](../../panel/panel/classes/Panel.md)[]

The stored array of Panels in the dashboard.

---

### isEditing()

```ts
isEditing(): boolean;
```

Defined in: [frontend/src/classes/dashboard.ts:387](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L387)

Whether we are currently in Edit Mode.

#### Returns

`boolean`

A boolean representing whether or not we are currently editing
the Dashboard panels.

#### See

[toggleEditMode()](#toggleeditmode)

---

### load()

```ts
load(): Promise<void>;
```

Defined in: [frontend/src/classes/dashboard.ts:670](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L670)

Loads all data into the dashboard, sequentially loading each item.

#### Returns

`Promise`\<`void`\>

A promise that resolves when all data has been loaded in.

#### See

- [loadStoredDimensions()](#loadstoreddimensions)
- [loadStoredTheme()](#loadstoredtheme)
- [loadStoredPanels()](#loadstoredpanels)
- [save()](#save)

---

### loadStoredDimensions()

```ts
loadStoredDimensions(): Promise<void>;
```

Defined in: [frontend/src/classes/dashboard.ts:696](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L696)

Load the stored Dashboard dimensions, either from local storage or the
database.

#### Returns

`Promise`\<`void`\>

A promise that resolves once loading is finalised and the
dimensions are updated.

#### See

- [load()](#load)
- [loadStoredTheme()](#loadstoredtheme)
- [loadStoredPanels()](#loadstoredpanels)
- [setDimensions()](#setdimensions)

---

### loadStoredPanels()

```ts
private loadStoredPanels(): Promise<void>;
```

Defined in: [frontend/src/classes/dashboard.ts:747](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L747)

Load the stored Panels, either from local storage or the database.

#### Returns

`Promise`\<`void`\>

A promise that resolves once loading is finalised and the panels
are loaded and spawned.

#### See

- [PanelInstance](../../panel/panel/interfaces/PanelInstance.md)
- [load()](#load)
- [loadStoredTheme()](#loadstoredtheme)
- [loadStoredDimensions()](#loadstoreddimensions)

---

### loadStoredTheme()

```ts
loadStoredTheme(): Promise<void>;
```

Defined in: [frontend/src/classes/dashboard.ts:884](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L884)

Loads the stored theme, either from local storage or the database.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the Theme is loaded and applied.

#### See

- [Theme](../../theme/classes/Theme.md)
- [load()](#load)
- [loadStoredPanels()](#loadstoredpanels)
- [loadStoredDimensions()](#loadstoreddimensions)

---

### organiseElements()

```ts
organiseElements(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:585](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L585)

Snaps all elements into the grid properly, such as when resizing the
window.

#### Returns

`void`

#### See

- [Panel.getArea()](../../panel/panel/classes/Panel.md#getarea)
- [Panel.setArea()](../../panel/panel/classes/Panel.md#setarea)

---

### populateCells()

```ts
private populateCells(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:111](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L111)

Fills the Dashboard with cells. The Dashboard gets divided into a visual
grid with cells for all the rows and columns, which are used to indicate
edit mode as well as to preview different dashboard dimensions when
changing size.

#### Returns

`void`

#### See

[cells](#cells)

---

### save()

```ts
save(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:634](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L634)

Saves all data, either to local storage if not logged in, or to the
database if logged in.

#### Returns

`void`

#### See

- [saveToCloud()](#savetocloud)
- [load()](#load)

---

### saveToCloud()

```ts
private saveToCloud(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:613](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L613)

Saves all the dashboard data/information to the database.

#### Returns

`void`

#### See

- [save()](#save)
- [PanelInstance](../../panel/panel/interfaces/PanelInstance.md)
- [Panel.getContent()](../../panel/panel/classes/Panel.md#getcontent)
- [Panel.setContent()](../../panel/panel/classes/Panel.md#setcontent)

---

### setCurrentTheme()

```ts
setCurrentTheme(theme, updateStored): void;
```

Defined in: [frontend/src/classes/dashboard.ts:947](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L947)

Sets and applies an inputted Theme to the Dashboard.

#### Parameters

| Parameter      | Type                                    | Default value | Description                                                                                                                                                                                        |
| -------------- | --------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme`        | [`Theme`](../../theme/classes/Theme.md) | `undefined`   | The theme to apply.                                                                                                                                                                                |
| `updateStored` | `boolean`                               | `true`        | Whether or not to trigger a save upon setting the Theme. This defaults to `true` as most calls will be to change the theme during runtime. It is set to false when applying a Theme after loading. |

#### Returns

`void`

#### Example

```ts
setCurrentTheme(Theme.PALENIGHT);
```

The above sets the Dashboard's theme to the `Palenight` theme (my
personal favourite) and triggers a save.

#### See

- [Theme](../../theme/classes/Theme.md)
- [getCurrentTheme()](#getcurrenttheme)

---

### setDimensions()

```ts
setDimensions(
   size,
   truncate,
   updateStored): void;
```

Defined in: [frontend/src/classes/dashboard.ts:332](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L332)

Updates/sets the Dashboard dimensions.

#### Parameters

| Parameter      | Type                                    | Default value | Description                                                                                                                                                                                                                                     |
| -------------- | --------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`         | [`Size`](../../area/interfaces/Size.md) | `undefined`   | The new (potential) size to set the dashboard to.                                                                                                                                                                                               |
| `truncate`     | `boolean`                               | `false`       | Whether or not to force the dashboard to that size and delete any panels that would not have fit. Default is `false`, as the user would usually simply be warned. This is set to true when using the Shrink button on the Size Warning overlay. |
| `updateStored` | `boolean`                               | `true`        | Whether or not to save the change. Defaults to `true`, as most changes will be new. This is set to false when we are loading from saved data.                                                                                                   |

#### Returns

`void`

#### Example

```ts
dashboard.setDimensions({ width: 6, height: 4 }, true);
```

The above forcibly sets the dashboard size to 6x4 cells, trimming off all
panels that would not fit and triggering a save.

#### See

[getDimensions()](#getdimensions)

---

### spawnPanel()

```ts
private spawnPanel(panel, updateStored): void;
```

Defined in: [frontend/src/classes/dashboard.ts:530](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L530)

Spawns an inputted Panel.

#### Parameters

| Parameter      | Type                                          | Default value | Description                                                                                                                                             |
| -------------- | --------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `panel`        | [`Panel`](../../panel/panel/classes/Panel.md) | `undefined`   | The Panel to spawn and add to the dashboard.                                                                                                            |
| `updateStored` | `boolean`                                     | `true`        | Whether or not to trigger a save upon spawning. Defaults to `true` as all spawns will be new panels, as opposed to when loading Panels from saved data. |

#### Returns

`void`

#### Example

```ts
const panel = new Panel(
  area,
  PanelType.CLOCK,
  4,
  getDefaultConfig(PanelType.CLOCK.getConfigSchema()),
);
spawnPanel(panel);
```

The above spawns a new Clock panel, at the inputted Area, with a
dashboard ID of 4 and the default config for its PanelType.

#### See

- [spawnPanelOfType()](#spawnpaneloftype)
- [spawnablePanelTypes](../../../app/variables/spawnablePanelTypes.md)

---

### spawnPanelOfType()

```ts
spawnPanelOfType(panelType): void;
```

Defined in: [frontend/src/classes/dashboard.ts:442](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L442)

Spawns a Panel of an inputted Type.

#### Parameters

| Parameter   | Type                                                       | Description                              |
| ----------- | ---------------------------------------------------------- | ---------------------------------------- |
| `panelType` | [`PanelType`](../../panel/panel_type/classes/PanelType.md) | The PanelType of the new Panel to spawn. |

#### Returns

`void`

#### Remarks

This deals with checking potential areas to find an available slot,
assigning an ID to the panel, as well as obtaining the default Config for
the PanelType. This method then calls the
[spawnPanel()](#spawnpanel) method with all the resulting
information, or triggers an alert if the spawning circumstances were
unsuccessful (in other words, if no space was found).

#### Example

```ts
mainDashboard.spawnPanelOfType(PanelType.CLOCK);
```

The above attempts to spawn a new Clock panel.

#### See

- [spawnPanel()](#spawnpanel)
- [PanelType.typeMinSize](../../panel/panel_type/classes/PanelType.md#typeminsize)
- [Area](../../area/classes/Area.md)
- [spawnablePanelTypes](../../../app/variables/spawnablePanelTypes.md)

---

### toggleEditMode()

```ts
toggleEditMode(): boolean;
```

Defined in: [frontend/src/classes/dashboard.ts:398](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L398)

Toggles Edit mode for the Dashboard.

#### Returns

`boolean`

The current editing status after the toggle.

#### See

[isEditing()](#isediting)

---

### triggerDelayedSave()

```ts
triggerDelayedSave(): void;
```

Defined in: [frontend/src/classes/dashboard.ts:598](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L598)

Triggers a delayed save after 2 seconds of being called. Repeated calls
will clear and reset the Timeout, ensuring the save is triggered 2
seconds after the last call.

#### Returns

`void`

#### See

[save()](#save)

---

### getCols()

```ts
static getCols(): number;
```

Defined in: [frontend/src/classes/dashboard.ts:250](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L250)

Get the number of columns in the Dashboard.

#### Returns

`number`

The number of columns the dashboard is divided into.

#### Remarks

This is static and extracts the number from the style directly (and not
[dimensions](#dimensions)) to avoid cyclic dependency resolving at runtime pre-
and post-construction.

#### See

[getFractionalWidth()](#getfractionalwidth)

---

### getFractionalHeight()

```ts
static getFractionalHeight(): number;
```

Defined in: [frontend/src/classes/dashboard.ts:282](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L282)

Gets the height of one row/unit.

#### Returns

`number`

The height of the window divided by the number of rows to get
the height of each row in the Dashboard.

#### Remarks

This is static to avoid cyclic dependency resolving at runtime pre- and
post-construction.

#### See

[getRows()](#getrows)

---

### getFractionalWidth()

```ts
static getFractionalWidth(): number;
```

Defined in: [frontend/src/classes/dashboard.ts:266](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L266)

Gets the width of one column/unit in pixels.

#### Returns

`number`

The width of the window divided by the number of columns to get
the width of each column in the Dashboard.

#### Remarks

This is static to avoid cyclic dependency resolving at runtime pre- and
post-construction.

#### See

[getCols()](#getcols)

---

### getMaxDimensions()

```ts
static getMaxDimensions(): Size;
```

Defined in: [frontend/src/classes/dashboard.ts:302](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L302)

Gets the maximum potential dimensions that the dashboard can have at the
current size.

#### Returns

[`Size`](../../area/interfaces/Size.md)

The largest possible comfortable size.

#### Remarks

This assumes every sell must be more than 100 pixels wide and tall in
order for the content to display comfortably.

This is not a hard limit, but instead a stylistic comfort zone. It is
static as it is derived from the window itself and not the actual
dashboard content.

#### See

[getDimensions()](#getdimensions)

---

### getRows()

```ts
static getRows(): number;
```

Defined in: [frontend/src/classes/dashboard.ts:234](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/classes/dashboard.ts#L234)

Get the number of rows in the Dashboard.

#### Returns

`number`

The number of rows the dashboard is divided into.

#### Remarks

This is static and extracts the number from the style directly (and not
[dimensions](#dimensions)) to avoid cyclic dependency resolving at runtime pre-
and post-construction.

#### See

[getFractionalHeight()](#getfractionalheight)
