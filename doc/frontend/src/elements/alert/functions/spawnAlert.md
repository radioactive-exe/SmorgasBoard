[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/alert](../README.md) / spawnAlert

# Function: spawnAlert()

```ts
function spawnAlert(alertMessage, alertLevel): HTMLElement;
```

Defined in: [frontend/src/elements/alert.ts:97](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/elements/alert.ts#L97)

Summons/spawns an alert with a certain message and alert level.

## Parameters

| Parameter      | Type                                          | Default value        | Description                                                                                                                                                                           |
| -------------- | --------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alertMessage` | `string`                                      | `undefined`          | The text content of the Alert.                                                                                                                                                        |
| `alertLevel`   | [`AlertLevel`](../enumerations/AlertLevel.md) | `AlertLevel.WARNING` | The alert level to spawn the alert with. This affects things such as the colour scheme used (and will affect more in the future). Defaults to a Warning level - `AlertLevel.WARNING`. |

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

- [The Interface for different Alert Levels](../enumerations/AlertLevel.md)
- [dismissAlert()](dismissAlert.md) , the alert dismissal function
