[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/context_menu](../README.md) / spawnContextMenu

# Function: spawnContextMenu()

```ts
function spawnContextMenu(posX, posY): void;
```

Defined in: [frontend/src/elements/context_menu.ts:142](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/elements/context_menu.ts#L142)

Makes the context menu visible.

## Parameters

| Parameter | Type     | Default value | Description                                                                           |
| --------- | -------- | ------------- | ------------------------------------------------------------------------------------- |
| `posX`    | `number` | `0`           | The X (horizontal) position to (attempt) to spawn the context menu at. Defaults to 0. |
| `posY`    | `number` | `0`           | The Y (vertical) position to (attempt) to spawn the context menu at. Defaults to 0.   |

## Returns

`void`

## Remarks

This function spawns/shows the context menu at a specific location determined
by the respective handler for the context menu click (right click) or the nav
entry button click.

## Example

```ts
spawnContextMenu(200, 350);
```

The above spawns the context menu with its top left corner positioned 200
pixels from the left edge and 350 pixels from the top edge.

## See

- [contextMenuClickHandler()](contextMenuClickHandler.md)
- [contextMenuNavHandler()](contextMenuNavHandler.md)
- [keepContextMenu()](keepContextMenu.md)
- [removeContextMenu()](removeContextMenu.md)
