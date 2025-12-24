[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/context_menu](../README.md) / contextMenuNavHandler

# Function: contextMenuNavHandler()

```ts
function contextMenuNavHandler(): void;
```

Defined in: [frontend/src/elements/context_menu.ts:416](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/elements/context_menu.ts#L416)

Handles spawning the context menu by clicking the navigation entry for it.

## Returns

`void`

## Remarks

It spawns the context menu at the X and Y coordinates of the context nav
entry, and the X is taken care of by being clamped by the spawning function.
This handler always using these coordinates ensures that the context menu
spawned through the nav entry always spawns consistently in the same exact
place no matter where on the context nav the user presses.

## See

- [spawnContextMenu()](spawnContextMenu.md)
- [contextMenuClickHandler()](contextMenuClickHandler.md)
