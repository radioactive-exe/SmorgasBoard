[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/alert](../README.md) / dismissAlert

# Function: dismissAlert()

```ts
function dismissAlert(alert): void;
```

Defined in: [frontend/src/elements/alert.ts:70](https://github.com/radioactive-exe/SmorgasBoard/blob/926cbddda26fb97159fb37a817d7bc65d47642d7/frontend/src/elements/alert.ts#L70)

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
