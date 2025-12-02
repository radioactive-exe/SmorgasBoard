[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/context_menu](../README.md) / fitContextMenuOnScreen

# Function: fitContextMenuOnScreen()

```ts
function fitContextMenuOnScreen(): void;
```

Defined in: [frontend/src/elements/context_menu.ts:306](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/elements/context_menu.ts#L306)

Ensures that the context menu stays on screen after a structure change.

## Returns

`void`

## Remarks

Once edit mode is toggled, which shows most entries in the context menu, or
once the context menu is spawned from a click over a panel (and thus the
deletion section is now visible), the context menu smoothly moves to remain
fully inside the bounds of the screen

## See

[spawnContextMenu()](spawnContextMenu.md)
