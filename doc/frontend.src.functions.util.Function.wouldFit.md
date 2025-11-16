[Smorgasboard](../wiki/Home) / [frontend/src/functions/util](../wiki/frontend.src.functions.util) / wouldFit

# Function: wouldFit()

```ts
function wouldFit(potentialSize, panels): boolean;
```

Defined in: [frontend/src/functions/util.ts:115](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/util.ts#L115)

Checks if the given panels would fit in the potential layout dimensions.

## Parameters

| Parameter       | Type                                                              | Description                                                                   |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `potentialSize` | [`Size`](../wiki/frontend.src.classes.area.Interface.Size)        | The potential layout size/dimensions we are attempting to switch to.          |
| `panels`        | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel)[] | The panels we iterate through to check if they fit within the potential size. |

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
