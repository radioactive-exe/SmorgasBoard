[**Documentation**](../../../../../README.md)

***

[Documentation](../../../../../README.md) / [frontend/src/functions/util](../README.md) / removeClassAfterTransition

# Function: removeClassAfterTransition()

> **removeClassAfterTransition**(`el`, `cl`): `void`

Defined in: [frontend/src/functions/util.ts:139](https://github.com/radioactive-exe/SmorgasBoard/blob/c5771cb1b8b31142e2e99a50ba1a0587fc429185/frontend/src/functions/util.ts#L139)

Removes a specified class from an element after its transition duration.

## Parameters

### el

`HTMLElement`

The element we want to remove the class from.

### cl

`string`

The class we want to remove.

## Returns

`void`

## Example

```ts
RemoveClassAfterTransition(alert, "visible"); // After the
transition duration, the class "visible" is removed from the `alert`
element.
```
