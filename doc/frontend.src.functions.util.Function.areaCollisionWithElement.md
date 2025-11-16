[Smorgasboard](../wiki/Home) / [frontend/src/functions/util](../wiki/frontend.src.functions.util) / areaCollisionWithElement

# Function: areaCollisionWithElement()

```ts
function areaCollisionWithElement(area, el): boolean;
```

Defined in: [frontend/src/functions/util.ts:44](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/util.ts#L44)

Checks if an inputted Area collides with a particular HTMLElement.

## Parameters

| Parameter | Type                                                   | Description                                                   |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| `area`    | [`Area`](../wiki/frontend.src.classes.area.Class.Area) | The area input we are checking for collision.                 |
| `el`      | `HTMLElement`                                          | The HTML Element we are checking for collision with the area. |

## Returns

`boolean`

True if area and element collide. False otherwise.

## Example

Returns `true` if `someConstDivElement` overlaps with the Area at coordinates
(3, 1) and with an equal height and width of 2 cells/units.

```ts
areaCollisionWithElement(
  new Area({ x: 3, y: 1 }, { width: 2, height: 2 }),
  someConstDivElement,
);
```
