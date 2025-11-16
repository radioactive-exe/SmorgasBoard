[Smorgasboard](../wiki/Home) / [frontend/src/elements/alert](../wiki/frontend.src.elements.alert) / spawnAlert

# Function: spawnAlert()

```ts
function spawnAlert(alertMessage, alertLevel): HTMLElement;
```

Defined in: [frontend/src/elements/alert.ts:97](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/elements/alert.ts#L97)

Summons/spawns an alert with a certain message and alert level.

## Parameters

| Parameter      | Type                                                                       | Default value        | Description                                                                                                                                                                           |
| -------------- | -------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alertMessage` | `string`                                                                   | `undefined`          | The text content of the Alert.                                                                                                                                                        |
| `alertLevel`   | [`AlertLevel`](../wiki/frontend.src.elements.alert.Enumeration.AlertLevel) | `AlertLevel.WARNING` | The alert level to spawn the alert with. This affects things such as the colour scheme used (and will affect more in the future). Defaults to a Warning level - `AlertLevel.WARNING`. |

## Returns

`HTMLElement`

The spawned alert as an HTMLElement.

## Example

```ts
spawnAlert("Invalid Login Credentials!", AlertLevel.ERROR);
```

The above spawns an error alert informing the user of invalid login
credentials.

## See

- [The Interface for different Alert Levels](../wiki/frontend.src.elements.alert.Enumeration.AlertLevel)
- [dismissAlert()](../wiki/frontend.src.elements.alert.Function.dismissAlert) , the alert dismissal function
