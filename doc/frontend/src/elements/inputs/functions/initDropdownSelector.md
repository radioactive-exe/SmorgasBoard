[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/inputs](../README.md) / initDropdownSelector

# Function: initDropdownSelector()

```ts
function initDropdownSelector(selector): void;
```

Defined in: [frontend/src/elements/inputs.ts:47](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/elements/inputs.ts#L47)

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

- [initToggleSelector()](initToggleSelector.md)
- [initRangeSelector()](initRangeSelector.md)
- [initStringSelector()](initStringSelector.md)
- The [Custom Event detail](../../../classes/config/config/interfaces/ConfigChangeEventDetail.md) for the ConfigChange event
