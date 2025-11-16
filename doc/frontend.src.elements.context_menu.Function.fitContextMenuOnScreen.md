[Smorgasboard](../wiki/Home) / [frontend/src/elements/context_menu](../wiki/frontend.src.elements.context_menu) / fitContextMenuOnScreen

# Function: fitContextMenuOnScreen()

```ts
function fitContextMenuOnScreen(): void;
```

Defined in: [frontend/src/elements/context_menu.ts:304](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/elements/context_menu.ts#L304)

Ensures that the context menu stays on screen after a structure change.

## Returns

`void`

## Remarks

Once edit mode is toggled, which shows most entries in the context menu, or
once the context menu is spawned from a click over a panel (and thus the
deletion section is now visible), the context menu smoothly moves to remain
fully inside the bounds of the screen

## See

[spawnContextMenu()](../wiki/frontend.src.elements.context_menu.Function.spawnContextMenu)
