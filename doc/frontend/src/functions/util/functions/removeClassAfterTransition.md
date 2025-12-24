[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/util](../README.md) / removeClassAfterTransition

# Function: removeClassAfterTransition()

```ts
function removeClassAfterTransition(el, cl): void;
```

Defined in: [frontend/src/functions/util.ts:154](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/functions/util.ts#L154)

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
