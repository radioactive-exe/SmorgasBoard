[Smorgasboard](../wiki/Home) / [frontend/src/elements/context_menu](../wiki/frontend.src.elements.context_menu) / spawnContextMenu

# Function: spawnContextMenu()

```ts
function spawnContextMenu(e): void;
```

Defined in: [frontend/src/elements/context_menu.ts:127](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/elements/context_menu.ts#L127)

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

- [keepContextMenu()](../wiki/frontend.src.elements.context_menu.Function.keepContextMenu)
- [removeContextMenu()](../wiki/frontend.src.elements.context_menu.Function.removeContextMenu)
