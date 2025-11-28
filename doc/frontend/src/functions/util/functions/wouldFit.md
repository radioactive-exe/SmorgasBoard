[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/util](../README.md) / wouldFit

# Function: wouldFit()

```ts
function wouldFit(potentialSize, panels): boolean;
```

Defined in: [frontend/src/functions/util.ts:119](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/functions/util.ts#L119)

Checks if the given panels would fit in the potential layout dimensions.

## Parameters

| Parameter       | Type                                                       | Description                                                                   |
| --------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `potentialSize` | [`Size`](../../../classes/area/interfaces/Size.md)         | The potential layout size/dimensions we are attempting to switch to.          |
| `panels`        | [`Panel`](../../../classes/panel/panel/classes/Panel.md)[] | The panels we iterate through to check if they fit within the potential size. |

## Returns

`boolean`

Whether or not all panels would still fit if we switch
to the potential dimensions.

## Remarks

This is used when we are attempting to switch to new dashboard dimensions.
The function is declared with generic terms and uses, because it can be
implemented to check for enough space in any scenario.

## Example

If any of the dashboard panels would lie fully/partially outside a potential
size of 2x2, then `fullyContained` would be false. Otherwise, it would be
true

```ts
const fullyContained = wouldFit({ width: 2, height: 2 }, dashboard.getPanels());
```
