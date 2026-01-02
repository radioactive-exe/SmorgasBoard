[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/context_menu](../README.md) / fitContextMenuOnScreen

# Function: fitContextMenuOnScreen()

```ts
function fitContextMenuOnScreen(): void;
```

Defined in: [frontend/src/elements/context_menu.ts:321](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/elements/context_menu.ts#L321)

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
