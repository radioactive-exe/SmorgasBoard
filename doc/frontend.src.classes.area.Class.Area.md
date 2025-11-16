[Smorgasboard](../wiki/Home) / [frontend/src/classes/area](../wiki/frontend.src.classes.area) / Area

# Class: Area

Defined in: [frontend/src/classes/area.ts:133](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L133)

This is the Area class.

## Remarks

This class holds all information for the Area (position and size) of a Panel
or other object, with relevant and helpful methods and members. It includes
setters and getters, as well as parsing for both absolute and fractional
units used for Sizes and Coordinates. This class is used when checking for
collision, snapping Panels, and holistically keeping the dashboard
organised.

## See

[Size](../wiki/frontend.src.classes.area.Interface.Size) [Coordinate](../wiki/frontend.src.classes.area.Interface.Coordinate) [AreaInstance](../wiki/frontend.src.classes.area.Interface.AreaInstance)

## Constructors

### Constructor

```ts
new Area(coords, size): Area;
```

Defined in: [frontend/src/classes/area.ts:176](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L176)

Creates an instance of an Area.

#### Parameters

| Parameter | Type                                                                   | Description                                                                                                                                                        |
| --------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `coords`  | [`Coordinate`](../wiki/frontend.src.classes.area.Interface.Coordinate) | The input coordinates (absolute or fractional) to instantiate the Area with. These are passed to and dealt with inside [setCoordinates](../wiki/#setcoordinates) . |
| `size`    | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)             | The input size (absolute or fractional) to instantiate the Area with. These are passed to and dealt with inside [setSize](../wiki/#setsize) .                      |

#### Returns

`Area`

#### Remarks

The constructor creates an Area from a pair of Coordinates and an
optional Size input. If no size is passed, default size of {1, 1} is used
instead.

#### Example

```ts
const a = new Area({ x: 0, y: 0 });
```

Instantiates a new Area positioned at the origin (top left of the
dashboard/container) and with a default size of `{width: 1, height: 1}`.

## Properties

| Property                 | Modifier   | Type                                                                   | Description                                                                                                                                                                                                    | Defined in                                                                                                                                                          |
| ------------------------ | ---------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="pos"></a> `pos`   | `private`  | [`Coordinate`](../wiki/frontend.src.classes.area.Interface.Coordinate) | Position component of the Area.                                                                                                                                                                                | [frontend/src/classes/area.ts:148](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L148) |
| <a id="size"></a> `size` | `private`  | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)             | Size component of the Area.                                                                                                                                                                                    | [frontend/src/classes/area.ts:150](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L150) |
| <a id="init"></a> `INIT` | `readonly` | `Area`                                                                 | A bare-bones default Area. **Remarks** This is a static member used when a Panel needs to be initialised from scratch and either (a) does not have a set Area or (b) has one that will be changed right after. | [frontend/src/classes/area.ts:142](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L142) |

## Methods

### getAbsoluteHeight()

```ts
getAbsoluteHeight(): number;
```

Defined in: [frontend/src/classes/area.ts:313](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L313)

Gets the absolute height of the Area in pixels.

#### Returns

`number`

The absolute Height (in pixels) of the Area.

#### See

[size](../wiki/#size) [getHeight](../wiki/#getheight)

---

### getAbsoluteWidth()

```ts
getAbsoluteWidth(): number;
```

Defined in: [frontend/src/classes/area.ts:291](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L291)

Gets the absolute width of the Area in pixels.

#### Returns

`number`

The absolute Width (in pixels) of the Area.

#### See

[size](../wiki/#size) [getWidth](../wiki/#getwidth)

---

### getAbsoluteX()

```ts
getAbsoluteX(): number;
```

Defined in: [frontend/src/classes/area.ts:202](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L202)

Returns the X (horizontal) coordinate of the Area in pixels.

#### Returns

`number`

The X coordinate in pixels.

#### See

[getCoordinates](../wiki/#getcoordinates) [pos](../wiki/#pos)

---

### getAbsoluteY()

```ts
getAbsoluteY(): number;
```

Defined in: [frontend/src/classes/area.ts:224](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L224)

Returns the Y (Vertical) coordinate of the Area in pixels.

#### Returns

`number`

The Y coordinate in pixels.

#### See

[getCoordinates](../wiki/#getcoordinates) [pos](../wiki/#pos)

---

### getCoordinates()

```ts
getCoordinates(): Coordinate;
```

Defined in: [frontend/src/classes/area.ts:237](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L237)

Returns the position/coordinates of this Area.

#### Returns

[`Coordinate`](../wiki/frontend.src.classes.area.Interface.Coordinate)

- The Coordinates (relative/fractional) of the Area.

#### Remarks

The position is returned as as an object of type [Coordinate](../wiki/frontend.src.classes.area.Interface.Coordinate),
expressed in fractional units ([pos](../wiki/#pos)).

---

### getHeight()

```ts
getHeight(): number;
```

Defined in: [frontend/src/classes/area.ts:302](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L302)

Gets the fractional height of the Area.

#### Returns

`number`

The fractional Height of the Area.

#### See

[size](../wiki/#size) [getAbsoluteHeight](../wiki/#getabsoluteheight)

---

### getSize()

```ts
getSize(): Size;
```

Defined in: [frontend/src/classes/area.ts:323](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L323)

Returns the fractional Size of the Area, as an object of type
[Size](../wiki/frontend.src.classes.area.Interface.Size).

#### Returns

[`Size`](../wiki/frontend.src.classes.area.Interface.Size)

The Size (fractional/relative) of the Area.

---

### getWidth()

```ts
getWidth(): number;
```

Defined in: [frontend/src/classes/area.ts:280](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L280)

Gets the fractional width of the Area.

#### Returns

`number`

The fractional Width of the Area.

#### See

[size](../wiki/#size) [getAbsoluteWidth](../wiki/#getabsolutewidth)

---

### getX()

```ts
getX(): number;
```

Defined in: [frontend/src/classes/area.ts:191](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L191)

Returns the X (horizontal) coordinate of the Area.

#### Returns

`number`

The X coordinate.

#### See

[getCoordinates](../wiki/#getcoordinates) [pos](../wiki/#pos)

---

### getY()

```ts
getY(): number;
```

Defined in: [frontend/src/classes/area.ts:213](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L213)

Returns the Y (Vertical) coordinate of the Area.

#### Returns

`number`

The Y coordinate.

#### See

[getCoordinates](../wiki/#getcoordinates) [pos](../wiki/#pos)

---

### setCoordinates()

```ts
setCoordinates(coords): void;
```

Defined in: [frontend/src/classes/area.ts:262](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L262)

Sets the Area's position from an input.

#### Parameters

| Parameter | Type                                                                   | Description                                                     |
| --------- | ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| `coords`  | [`Coordinate`](../wiki/frontend.src.classes.area.Interface.Coordinate) | The input coordinates to set the Area's [pos](../wiki/#pos) to. |

#### Returns

`void`

#### Remarks

This setter deals with both absolute and fractional sizes. If an absolute
set of coordinates is passed, it is converted to fractional units to be
stored as such. As such, the [pos](../wiki/#pos) member will always store the
coordinates in units.

#### Example

```ts
areaOne.setCoordinates({ x: 200, y: 250, isAbsolute: true });
```

Sets `areaOne`'s coordinates with literal pixel values 200 and 250. In
other words, `areaOne` will be positioned 200 pixels horizontally and 250
pixels vertically inside the dashboard/container.

---

### setSize()

```ts
setSize(size): void;
```

Defined in: [frontend/src/classes/area.ts:347](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/area.ts#L347)

Sets the Area's current Size from an input.

#### Parameters

| Parameter | Type                                                       | Description                         |
| --------- | ---------------------------------------------------------- | ----------------------------------- |
| `size`    | [`Size`](../wiki/frontend.src.classes.area.Interface.Size) | The input size to set for the Area. |

#### Returns

`void`

#### Remarks

This setter deals with both absolute and fractional sizes. If an absolute
Size is passed, it is converted to fractional units to be stored as such.
As such, the [size](../wiki/#setsize-1) member will always store a size in units.

#### Example

```ts
areaOne.setSize({ width: 1, height: 1 });
```

Sets `areaOne`'s size to be one unit wide and tall

#### See

[Size#isAbsolute](../wiki/frontend.src.classes.area.Interface.Size#isabsolute)
