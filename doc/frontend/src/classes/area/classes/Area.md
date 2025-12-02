[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/classes/area](../README.md) / Area

# Class: Area

Defined in: [frontend/src/classes/area.ts:136](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L136)

This is the Area class.

## Remarks

This class holds all information for the Area (position and size) of a Panel
or other object, with relevant and helpful methods and members. It includes
setters and getters, as well as parsing for both absolute and fractional
units used for Sizes and Coordinates. This class is used when checking for
collision, snapping Panels, and holistically keeping the dashboard
organised.

## See

- [Size](../interfaces/Size.md)
- [Coordinates](../interfaces/Coordinates.md)
- [AreaInstance](../interfaces/AreaInstance.md)

## Constructors

### Constructor

```ts
new Area(coords, size): Area;
```

Defined in: [frontend/src/classes/area.ts:179](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L179)

Creates an instance of an Area.

#### Parameters

| Parameter | Type                                          | Description                                                                                                                                               |
| --------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `coords`  | [`Coordinates`](../interfaces/Coordinates.md) | The input coordinates (absolute or fractional) to instantiate the Area with. These are passed to and dealt with inside [setCoordinates()](#setposition) . |
| `size`    | [`Size`](../interfaces/Size.md)               | The input size (absolute or fractional) to instantiate the Area with. These are passed to and dealt with inside [setSize()](#setsize) .                   |

#### Returns

`Area`

#### Remarks

The constructor creates an Area from a pair of Coordinates and an
optional Size input. If no size is passed, default size of `{1, 1}` is
used instead.

#### Example

```ts
const a = new Area({ x: 0, y: 0 });
```

Instantiates a new Area positioned at the origin (top left of the
dashboard/container) and with a default size of `{width: 1, height: 1}`.

## Properties

| Property                 | Modifier   | Type                                          | Description                                                                                                                                                                                                    | Defined in                                                                                                                                                          |
| ------------------------ | ---------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="pos"></a> `pos`   | `private`  | [`Coordinates`](../interfaces/Coordinates.md) | Position component of the Area.                                                                                                                                                                                | [frontend/src/classes/area.ts:151](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L151) |
| <a id="size"></a> `size` | `private`  | [`Size`](../interfaces/Size.md)               | Size component of the Area.                                                                                                                                                                                    | [frontend/src/classes/area.ts:153](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L153) |
| <a id="init"></a> `INIT` | `readonly` | `Area`                                        | A bare-bones default Area. **Remarks** This is a static member used when a Panel needs to be initialised from scratch and either (a) does not have a set Area or (b) has one that will be changed right after. | [frontend/src/classes/area.ts:145](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L145) |

## Methods

### getAbsoluteHeight()

```ts
getAbsoluteHeight(): number;
```

Defined in: [frontend/src/classes/area.ts:341](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L341)

Gets the absolute height of the Area in pixels.

#### Returns

`number`

The absolute Height (in pixels) of the Area.

#### See

- [size](#size)
- [getSize()](#getsize)
- [getHeight()](#getheight)
- [getAbsoluteWidth()](#getabsolutewidth)

---

### getAbsoluteWidth()

```ts
getAbsoluteWidth(): number;
```

Defined in: [frontend/src/classes/area.ts:313](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L313)

Gets the absolute width of the Area in pixels.

#### Returns

`number`

The absolute Width (in pixels) of the Area.

#### See

- [size](#size)
- [getSize()](#getsize)
- [getWidth()](#getwidth)
- [getAbsoluteHeight()](#getabsoluteheight)

---

### getAbsoluteX()

```ts
getAbsoluteX(): number;
```

Defined in: [frontend/src/classes/area.ts:209](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L209)

Returns the X (horizontal) coordinate of the Area in pixels.

#### Returns

`number`

The X coordinate in pixels.

#### See

- [getCoordinates()](#getcoordinates)
- [getX()](#getx)
- [pos](#pos)

---

### getAbsoluteY()

```ts
getAbsoluteY(): number;
```

Defined in: [frontend/src/classes/area.ts:235](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L235)

Returns the Y (Vertical) coordinate of the Area in pixels.

#### Returns

`number`

The Y coordinate in pixels.

#### See

- [getCoordinates](#getcoordinates)
- [getY()](#gety)
- [pos](#pos)

---

### getCoordinates()

```ts
getCoordinates(): Coordinates;
```

Defined in: [frontend/src/classes/area.ts:248](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L248)

Returns the position/coordinates of this Area.

#### Returns

[`Coordinates`](../interfaces/Coordinates.md)

- The Coordinates (relative/fractional) of the Area.

#### Remarks

The position is returned as as an object of type [Coordinates](../interfaces/Coordinates.md),
expressed in fractional units ([pos](#pos)).

---

### getHeight()

```ts
getHeight(): number;
```

Defined in: [frontend/src/classes/area.ts:327](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L327)

Gets the fractional height of the Area.

#### Returns

`number`

The fractional Height of the Area.

#### See

- [size](#size)
- [getSize()](#getsize)
- [getAbsoluteHeight()](#getabsoluteheight)
- [getWidth()](#getwidth)

---

### getSize()

```ts
getSize(): Size;
```

Defined in: [frontend/src/classes/area.ts:358](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L358)

Returns the fractional Size of the Area, as an object of type
[Size](../interfaces/Size.md).

#### Returns

[`Size`](../interfaces/Size.md)

The Size (fractional/relative) of the Area.

#### See

- [size](#size)
- [getHeight()](#getheight)
- [getHeight()](#getabsoluteheight)
- [getWidth()](#getwidth)
- [getAbsoluteWidth()](#getabsolutewidth)
- [setSize()](#setsize)

---

### getWidth()

```ts
getWidth(): number;
```

Defined in: [frontend/src/classes/area.ts:299](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L299)

Gets the fractional width of the Area.

#### Returns

`number`

The fractional Width of the Area.

#### See

- [size](#size)
- [getSize()](#getsize)
- [getAbsoluteWidth()](#getabsolutewidth)
- [getHeight()](#getheight)

---

### getX()

```ts
getX(): number;
```

Defined in: [frontend/src/classes/area.ts:196](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L196)

Returns the X (horizontal) coordinate of the Area.

#### Returns

`number`

The X coordinate.

#### See

- [getCoordinates()](#getcoordinates)
- [getAbsoluteX()](#getabsolutex)
- [pos](#pos)

---

### getY()

```ts
getY(): number;
```

Defined in: [frontend/src/classes/area.ts:222](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L222)

Returns the Y (Vertical) coordinate of the Area.

#### Returns

`number`

The Y coordinate.

#### See

- [getCoordinates](#getcoordinates)
- [getAbsoluteY()](#getabsolutey)
- [pos](#pos)

---

### setPosition()

```ts
setPosition(coords): void;
```

Defined in: [frontend/src/classes/area.ts:277](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L277)

Sets the Area's position from an input.

#### Parameters

| Parameter | Type                                          | Description                                          |
| --------- | --------------------------------------------- | ---------------------------------------------------- |
| `coords`  | [`Coordinates`](../interfaces/Coordinates.md) | The input coordinates to set the Area's position to. |

#### Returns

`void`

#### Remarks

This setter deals with both absolute and fractional sizes. If an absolute
set of coordinates is passed, it is converted to fractional units to be
stored as such. As such, the [pos](#pos) member will always store the
coordinates in units.

#### Example

```ts
areaOne.setCoordinates({ x: 200, y: 250, isAbsolute: true });
```

Sets `areaOne`'s coordinates with literal pixel values 200 and 250. In
other words, `areaOne` will be positioned 200 pixels horizontally and 250
pixels vertically inside the dashboard/container, and will thus be
snapped/rounded to the nearest row and column in the dashboard.

#### See

- [setSize()](#setsize)
- [Coordinates#isAbsolute](../interfaces/Coordinates.md#isabsolute)

---

### setSize()

```ts
setSize(size): void;
```

Defined in: [frontend/src/classes/area.ts:383](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/area.ts#L383)

Sets the Area's current Size from an input.

#### Parameters

| Parameter | Type                            | Description                         |
| --------- | ------------------------------- | ----------------------------------- |
| `size`    | [`Size`](../interfaces/Size.md) | The input size to set for the Area. |

#### Returns

`void`

#### Remarks

This setter deals with both absolute and fractional sizes. If an absolute
Size is passed, it is converted to fractional units to be stored as such.
As such, the [size](#setsize-1) member will always store a size in units.

#### Example

```ts
areaOne.setSize({ width: 1, height: 1 });
```

Sets `areaOne`'s size to be one unit wide and tall

#### See

- [Size#isAbsolute](../interfaces/Size.md#isabsolute)
- [setPosition()](#setposition)
