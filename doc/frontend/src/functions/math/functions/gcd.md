[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/math](../README.md) / gcd

# Function: gcd()

```ts
function gcd(a, b): number;
```

Defined in: [frontend/src/functions/math.ts:96](https://github.com/radioactive-exe/SmorgasBoard/blob/468e606912a299394e1853645fa504c70b13b52b/frontend/src/functions/math.ts#L96)

Finds the greatest common divisor/factor of 2 input numbers.

## Parameters

| Parameter | Type     | Description        |
| --------- | -------- | ------------------ |
| `a`       | `number` | The first number.  |
| `b`       | `number` | The second number. |

## Returns

`number`

The found GCD of the 2 input numbers.

## Example

```ts
console.log(gcd(6, 15)); // => Outputs 3
console.log(gcd(4, 12)); // => Outputs 4
console.log(gcd(9, 8)); // => Outputs 1, as there are no other common factors
```
