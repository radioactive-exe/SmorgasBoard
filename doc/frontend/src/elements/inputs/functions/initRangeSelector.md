[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/inputs](../README.md) / initRangeSelector

# Function: initRangeSelector()

```ts
function initRangeSelector(selector): void;
```

Defined in: [frontend/src/elements/inputs.ts:204](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/elements/inputs.ts#L204)

Adds all relevant listeners and instantiates all necessary variables for the
custom range/numerical selectors.

## Parameters

| Parameter  | Type          | Description                      |
| ---------- | ------------- | -------------------------------- |
| `selector` | `HTMLElement` | The dropdown selector to set up. |

## Returns

`void`

## Remarks

This selector outputs a numerical value.

## See

- [initDropdownSelector()](initDropdownSelector.md)
- [initToggleSelector()](initToggleSelector.md)
- [initStringSelector()](initStringSelector.md)
- The [Custom Event detail](../../../classes/config/config/interfaces/ConfigChangeEventDetail.md) for the ConfigChange event
