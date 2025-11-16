[Smorgasboard](../wiki/Home) / [frontend/src/elements/inputs](../wiki/frontend.src.elements.inputs) / initStringSelector

# Function: initStringSelector()

```ts
function initStringSelector(selector): void;
```

Defined in: [frontend/src/elements/inputs.ts:264](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/elements/inputs.ts#L264)

Adds all relevant listeners and instantiates all necessary variables for the
custom text/string selectors.

## Parameters

| Parameter  | Type          | Description                      |
| ---------- | ------------- | -------------------------------- |
| `selector` | `HTMLElement` | The dropdown selector to set up. |

## Returns

`void`

## Remarks

This selector outputs a string value.

## See

- [initDropdownSelector()](../wiki/frontend.src.elements.inputs.Function.initDropdownSelector)
- [initToggleSelector()](../wiki/frontend.src.elements.inputs.Function.initToggleSelector)
- [initRangeSelector()](../wiki/frontend.src.elements.inputs.Function.initRangeSelector)
- The [Custom Event detail](../wiki/frontend.src.classes.config.config.Interface.ConfigChangeEventDetail) for the ConfigChange event
