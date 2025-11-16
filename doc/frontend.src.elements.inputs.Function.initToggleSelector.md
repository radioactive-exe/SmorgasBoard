[Smorgasboard](../wiki/Home) / [frontend/src/elements/inputs](../wiki/frontend.src.elements.inputs) / initToggleSelector

# Function: initToggleSelector()

```ts
function initToggleSelector(selector): void;
```

Defined in: [frontend/src/elements/inputs.ts:151](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/elements/inputs.ts#L151)

Adds all relevant listeners and instantiates all necessary variables for the
custom checkbox/toggle selectors.

## Parameters

| Parameter  | Type          | Description                      |
| ---------- | ------------- | -------------------------------- |
| `selector` | `HTMLElement` | The dropdown selector to set up. |

## Returns

`void`

## Remarks

This selector outputs a boolean value.

## See

- initToggleSelector()
- [initRangeSelector()](../wiki/frontend.src.elements.inputs.Function.initRangeSelector)
- [initStringSelector()](../wiki/frontend.src.elements.inputs.Function.initStringSelector)
- The [Custom Event detail](../wiki/frontend.src.classes.config.config.Interface.ConfigChangeEventDetail) for the ConfigChange event
