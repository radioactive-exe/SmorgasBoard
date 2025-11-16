[Smorgasboard](../wiki/Home) / [frontend/src/elements/alert](../wiki/frontend.src.elements.alert) / dismissAlert

# Function: dismissAlert()

```ts
function dismissAlert(alert): void;
```

Defined in: [frontend/src/elements/alert.ts:70](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/elements/alert.ts#L70)

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

[spawnAlert()](../wiki/frontend.src.elements.alert.Function.spawnAlert) , the function that spawns the alert
