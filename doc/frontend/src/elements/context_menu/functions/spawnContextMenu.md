[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/context_menu](../README.md) / spawnContextMenu

# Function: spawnContextMenu()

```ts
function spawnContextMenu(e): void;
```

Defined in: [frontend/src/elements/context_menu.ts:129](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/elements/context_menu.ts#L129)

Makes the context menu visible.

## Parameters

| Parameter | Type           | Description                                                                             |
| --------- | -------------- | --------------------------------------------------------------------------------------- |
| `e`       | `PointerEvent` | The pointer event based on the location/target of which the context menu will be shown. |

## Returns

`void`

## Remarks

This function spawns/shows the context menu based on whether the input was
received, either through a mouse or the navigation entries.

## See

- [keepContextMenu()](keepContextMenu.md)
- [removeContextMenu()](removeContextMenu.md)
