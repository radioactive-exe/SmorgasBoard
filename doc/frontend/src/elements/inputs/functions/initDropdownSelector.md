[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/inputs](../README.md) / initDropdownSelector

# Function: initDropdownSelector()

```ts
function initDropdownSelector(selector): void;
```

Defined in: [frontend/src/elements/inputs.ts:47](https://github.com/radioactive-exe/SmorgasBoard/blob/2ebef5894f4e0a25d5d13ec2211c0540e8e9bb7a/frontend/src/elements/inputs.ts#L47)

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
