[**Smorgasboard**](../../../../README.md)

---

[Smorgasboard](../../../../README.md) / [frontend/src/app](../README.md) / setFirstTime

# Function: setFirstTime()

```ts
function setFirstTime(val): void;
```

Defined in: [frontend/src/app.ts:99](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/app.ts#L99)

Updates the value of `firstTime`. This is called during login and/or
registration.

## Parameters

| Parameter | Type      | Description                         |
| --------- | --------- | ----------------------------------- |
| `val`     | `boolean` | The value to assign to `firstTime`. |

## Returns

`void`

## Example

```ts
setFirstTime(true);
```

The above sets the variable to `true`, indicating for the program that this
sign in event was a first registration for a new user.

## See

[firstTime](../variables/firstTime.md)
