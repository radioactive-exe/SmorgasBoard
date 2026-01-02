[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/context_menu](../README.md) / contextMenuClickHandler

# Function: contextMenuClickHandler()

```ts
function contextMenuClickHandler(e): void;
```

Defined in: [frontend/src/elements/context_menu.ts:377](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/elements/context_menu.ts#L377)

Handles the right click/context menu click event, spawning the context menu
based on the click location and showing/hiding the deletion section as
necessary.

## Parameters

| Parameter | Type           | Description                                                                             |
| --------- | -------------- | --------------------------------------------------------------------------------------- |
| `e`       | `PointerEvent` | The pointer event based on the location/target of which the context menu will be shown. |

## Returns

`void`

## See

- [spawnContextMenu()](spawnContextMenu.md)
- [contextMenuNavHandler()](contextMenuNavHandler.md)
