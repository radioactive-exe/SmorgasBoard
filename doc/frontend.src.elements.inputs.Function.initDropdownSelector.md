[Smorgasboard](../wiki/Home) / [frontend/src/elements/inputs](../wiki/frontend.src.elements.inputs) / initDropdownSelector

# Function: initDropdownSelector()

```ts
function initDropdownSelector(selector): void;
```

Defined in: [frontend/src/elements/inputs.ts:47](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/elements/inputs.ts#L47)

Adds all relevant listeners and instantiates all necessary variables for the
custom dropdown selectors.

## Parameters

| Parameter  | Type          | Description                      |
| ---------- | ------------- | -------------------------------- |
| `selector` | `HTMLElement` | The dropdown selector to set up. |

## Returns

`void`

## Remarks

This selector outputs the value of the current selected option, which can be
either a string or a number, or any other enum value.

## See

- [initToggleSelector()](../wiki/frontend.src.elements.inputs.Function.initToggleSelector)
- [initRangeSelector()](../wiki/frontend.src.elements.inputs.Function.initRangeSelector)
- [initStringSelector()](../wiki/frontend.src.elements.inputs.Function.initStringSelector)
- The [Custom Event detail](../wiki/frontend.src.classes.config.config.Interface.ConfigChangeEventDetail) for the ConfigChange event
