[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/util](../README.md) / deleteAfterTransition

# Function: deleteAfterTransition()

```ts
function deleteAfterTransition(el, parent): void;
```

Defined in: [frontend/src/functions/util.ts:179](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/functions/util.ts#L179)

Deletes/removes an element from the DOM after its transition duration.

## Parameters

| Parameter | Type          | Default value | Description                                       |
| --------- | ------------- | ------------- | ------------------------------------------------- |
| `el`      | `HTMLElement` | `undefined`   | The child element to be removed.                  |
| `parent`  | `HTMLElement` | `dashboard`   | The parent from which the child is being removed. |

## Returns

`void`

## Remarks

`parent.removeChild()` is used as opposed to `child.remove()` for IE11 and
older browser compatibility.

## Example

```ts
deleteAfterTransition(spawnedAlert, modalLayer);
```
