[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/classes/area](../README.md) / Area

# Class: Area

Defined in: [frontend/src/classes/area.ts:132](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L132)

This is the Area class.

## Remarks

This class holds all information for the Area (position and size) of a
Panel or other object, with relevant and helpful methods and members.
TODO: Fix Panel Link It includes setters and getters, as well as parsing for
both absolute and fractional units used for Sizes and Coordinates. This class
is used when checking for collision, snapping Panels, and holistically
keeping the dashboard organised. 

## See

[Size](../interfaces/Size.md) [Coordinate](../interfaces/Coordinate.md) [AreaInstance](../interfaces/AreaInstance.md)

## Constructors

### Constructor

> **new Area**(`coords`, `size`): `Area`

Defined in: [frontend/src/classes/area.ts:175](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L175)

Creates an instance of an Area.

#### Parameters

##### coords

[`Coordinate`](../interfaces/Coordinate.md)

The input coordinates (absolute or fractional) to
  instantiate the Area with. These are passed to and dealt with inside
  [setCoordinates](#setcoordinates) .

##### size

[`Size`](../interfaces/Size.md) = `...`

The input size (absolute or fractional) to instantiate
  the Area with. These are passed to and dealt with inside [setSize](#setsize)
  .

#### Returns

`Area`

#### Remarks

The constructor creates an Area from a pair of Coordinates and an
optional Size input. If no size is passed, default size of {1, 1} is used
instead.

#### Example

```ts
const a = new Area({x: 0, y: 0});
```

Instantiates a new Area positioned at the origin (top left of the
dashboard/container) and with a default size of `{width: 1, height: 1}`.

## Properties

### INIT

> `readonly` `static` **INIT**: `Area`

Defined in: [frontend/src/classes/area.ts:141](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L141)

A bare-bones default Area.

#### Remarks

This is a static member used when a Panel needs to be initialised from
scratch and either (a) does not have a set Area or (b) has one that will
be changed right after.

## Methods

### getAbsoluteHeight()

> **getAbsoluteHeight**(): `number`

Defined in: [frontend/src/classes/area.ts:312](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L312)

Gets the absolute height of the Area in pixels.

#### Returns

`number`

The absolute Height (in pixels) of the Area.

#### See

size [getHeight](#getheight)

***

### getAbsoluteWidth()

> **getAbsoluteWidth**(): `number`

Defined in: [frontend/src/classes/area.ts:290](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L290)

Gets the absolute width of the Area in pixels.

#### Returns

`number`

The absolute Width (in pixels) of the Area.

#### See

size [getWidth](#getwidth)

***

### getAbsoluteX()

> **getAbsoluteX**(): `number`

Defined in: [frontend/src/classes/area.ts:201](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L201)

Returns the X (horizontal) coordinate of the Area in pixels.

#### Returns

`number`

The X coordinate in pixels.

#### See

[getCoordinates](#getcoordinates) pos

***

### getAbsoluteY()

> **getAbsoluteY**(): `number`

Defined in: [frontend/src/classes/area.ts:223](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L223)

Returns the Y (Vertical) coordinate of the Area in pixels.

#### Returns

`number`

The Y coordinate in pixels.

#### See

[getCoordinates](#getcoordinates) pos

***

### getCoordinates()

> **getCoordinates**(): [`Coordinate`](../interfaces/Coordinate.md)

Defined in: [frontend/src/classes/area.ts:236](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L236)

Returns the position/coordinates of this Area.

#### Returns

[`Coordinate`](../interfaces/Coordinate.md)

- The Coordinates (relative/fractional) of the Area.

#### Remarks

The position is returned as as an object of type [Coordinate](../interfaces/Coordinate.md),
expressed in fractional units (pos).

***

### getHeight()

> **getHeight**(): `number`

Defined in: [frontend/src/classes/area.ts:301](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L301)

Gets the fractional height of the Area.

#### Returns

`number`

The fractional Height of the Area.

#### See

size [getAbsoluteHeight](#getabsoluteheight)

***

### getSize()

> **getSize**(): [`Size`](../interfaces/Size.md)

Defined in: [frontend/src/classes/area.ts:322](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L322)

Returns the fractional Size of the Area, as an object of type
[Size](../interfaces/Size.md).

#### Returns

[`Size`](../interfaces/Size.md)

The Size (fractional/relative) of the Area.

***

### getWidth()

> **getWidth**(): `number`

Defined in: [frontend/src/classes/area.ts:279](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L279)

Gets the fractional width of the Area.

#### Returns

`number`

The fractional Width of the Area.

#### See

size [getAbsoluteWidth](#getabsolutewidth)

***

### getX()

> **getX**(): `number`

Defined in: [frontend/src/classes/area.ts:190](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L190)

Returns the X (horizontal) coordinate of the Area.

#### Returns

`number`

The X coordinate.

#### See

[getCoordinates](#getcoordinates) pos

***

### getY()

> **getY**(): `number`

Defined in: [frontend/src/classes/area.ts:212](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L212)

Returns the Y (Vertical) coordinate of the Area.

#### Returns

`number`

The Y coordinate.

#### See

[getCoordinates](#getcoordinates) pos

***

### setCoordinates()

> **setCoordinates**(`coords`): `void`

Defined in: [frontend/src/classes/area.ts:261](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L261)

Sets the Area's position from an input.

#### Parameters

##### coords

[`Coordinate`](../interfaces/Coordinate.md)

The input coordinates to set the Area's pos to.

#### Returns

`void`

#### Remarks

This setter deals with both absolute and fractional sizes. If an absolute
set of coordinates is passed, it is converted to fractional units to be
stored as such. As such, the pos member will always store the
coordinates in units.

#### Example

```ts
areaOne.setCoordinates({x: 200, y: 250, isAbsolute: true});
```

Sets `areaOne`'s coordinates with literal pixel values 200 and 250. In
other words, `areaOne` will be positioned 200 pixels horizontally and 250
pixels vertically inside the dashboard/container.

***

### setSize()

> **setSize**(`size`): `void`

Defined in: [frontend/src/classes/area.ts:346](https://github.com/radioactive-exe/SmorgasBoard/blob/8822c9949d62eadf766003fbbb6c5642b98a9f87/frontend/src/classes/area.ts#L346)

Sets the Area's current Size from an input.

#### Parameters

##### size

[`Size`](../interfaces/Size.md)

The input size to set for the Area.

#### Returns

`void`

#### Remarks

This setter deals with both absolute and fractional sizes. If an absolute
Size is passed, it is converted to fractional units to be stored as such.
As such, the [size](#setsize-1) member will always store a size in units.

#### Example

```ts
areaOne.setSize({width: 1, height: 1});
```

Sets `areaOne`'s size to be one unit wide and tall

#### See

[Size#isAbsolute](../interfaces/Size.md#isabsolute)
