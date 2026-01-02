[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/inputs](../README.md) / initToggleSelector

# Function: initToggleSelector()

```ts
function initToggleSelector(selector): void;
```

Defined in: [frontend/src/elements/inputs.ts:151](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/elements/inputs.ts#L151)

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
- [initRangeSelector()](initRangeSelector.md)
- [initStringSelector()](initStringSelector.md)
- The [Custom Event detail](../../../classes/config/config/interfaces/ConfigChangeEventDetail.md) for the ConfigChange event
