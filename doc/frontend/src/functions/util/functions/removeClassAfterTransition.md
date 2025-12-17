[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/util](../README.md) / removeClassAfterTransition

# Function: removeClassAfterTransition()

```ts
function removeClassAfterTransition(el, cl): void;
```

Defined in: [frontend/src/functions/util.ts:150](https://github.com/radioactive-exe/SmorgasBoard/blob/cface3ffad0bcfe6eefa24c05c64a6dc1416d438/frontend/src/functions/util.ts#L150)

Removes a specified class from an element after its transition duration.

## Parameters

| Parameter | Type          | Description                                   |
| --------- | ------------- | --------------------------------------------- |
| `el`      | `HTMLElement` | The element we want to remove the class from. |
| `cl`      | `string`      | The class we want to remove.                  |

## Returns

`void`

## Example

```ts
RemoveClassAfterTransition(alert, "visible");
```

After the transition duration, the class "visible" is removed from the
`alert` element.
