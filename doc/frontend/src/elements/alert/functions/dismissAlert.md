[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/alert](../README.md) / dismissAlert

# Function: dismissAlert()

```ts
function dismissAlert(alert): void;
```

Defined in: [frontend/src/elements/alert.ts:70](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/elements/alert.ts#L70)

Dismisses the alert from the application.

## Parameters

| Parameter | Type          | Description                |
| --------- | ------------- | -------------------------- |
| `alert`   | `HTMLElement` | The alert to be dismissed. |

## Returns

`void`

## Example

```ts
const alert = spawnAlert("Here is a test!", AlertLevel.INFO);
button.addEventListener("click", () => dismissAlert(alert));
```

The above dismisses the spawned alert on the click of the button called
`button`.

## See

[spawnAlert()](spawnAlert.md) , the function that spawns the alert
