[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/inputs](../README.md) / initStringSelector

# Function: initStringSelector()

```ts
function initStringSelector(selector): void;
```

Defined in: [frontend/src/elements/inputs.ts:268](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/elements/inputs.ts#L268)

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

- [initDropdownSelector()](initDropdownSelector.md)
- [initToggleSelector()](initToggleSelector.md)
- [initRangeSelector()](initRangeSelector.md)
- The [Custom Event detail](../../../classes/config/config/interfaces/ConfigChangeEventDetail.md) for the ConfigChange event
