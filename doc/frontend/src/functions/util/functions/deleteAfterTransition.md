[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/util](../README.md) / deleteAfterTransition

# Function: deleteAfterTransition()

```ts
function deleteAfterTransition(el, parent): void;
```

Defined in: [frontend/src/functions/util.ts:175](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/functions/util.ts#L175)

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
