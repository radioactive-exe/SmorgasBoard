[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/util](../README.md) / removeClassAfterTransition

# Function: removeClassAfterTransition()

```ts
function removeClassAfterTransition(el, cl): void;
```

Defined in: [frontend/src/functions/util.ts:154](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/functions/util.ts#L154)

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
