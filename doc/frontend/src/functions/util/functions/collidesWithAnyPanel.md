[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/functions/util](../README.md) / collidesWithAnyPanel

# Function: collidesWithAnyPanel()

> **collidesWithAnyPanel**(`area`): `boolean`

Defined in: [frontend/src/functions/util.ts:74](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/functions/util.ts#L74)

Checks whether an inputted area collides with any panel at all.

## Parameters

### area

[`Area`](../../../classes/area/classes/Area.md)

The area we are checking for collision with the dashboard
  panels.

## Returns

`boolean`

Whether the inputted area is free and non-colliding with all
  occupying panels in the dashboard.

## Example

`willFit` will be true if any panel overlaps (2, 1) (coordinates) + [1, 3]
(size)

```ts
const testArea = new Area({x: 2, y: 1}, {width: 1, height: 3});
const willFit = collidesWithAnyPanel(testArea);
```
