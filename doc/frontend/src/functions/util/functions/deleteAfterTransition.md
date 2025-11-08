[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/functions/util](../README.md) / deleteAfterTransition

# Function: deleteAfterTransition()

> **deleteAfterTransition**(`el`, `parent`): `void`

Defined in: [frontend/src/functions/util.ts:160](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/functions/util.ts#L160)

Deletes/removes an element from the DOM after its transition duration.

## Parameters

### el

`HTMLElement`

The child element to be removed.

### parent

`HTMLElement` = `dashboard`

The parent from which the child is being removed.

## Returns

`void`

## Remarks

`parent.removeChild()` is used as opposed to `child.remove()` for IE11 and
older browser compatibility.

## Example

```ts
DeleteAfterTransition(spawnedAlert, modalLayer);
```
