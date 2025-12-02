[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/util](../README.md) / areEqualArrays

# Function: areEqualArrays()

```ts
function areEqualArrays(a1, a2): boolean;
```

Defined in: [frontend/src/functions/util.ts:307](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/functions/util.ts#L307)

Deeply compares two arrays of objects or primitives for equal contents.

## Parameters

| Parameter | Type                                                             | Description                             |
| --------- | ---------------------------------------------------------------- | --------------------------------------- |
| `a1`      | (`string` \| `number` \| `boolean` \| `object`)[] \| `undefined` | The first array of objects/primitives.  |
| `a2`      | (`string` \| `number` \| `boolean` \| `object`)[] \| `undefined` | The second array of objects/primitives. |

## Returns

`boolean`

True if the two arrays contain the same elements and values,
regardless of order, false otherwise.

## Examples

```ts
const a1: number[] = [2, 4, 3, 1];
const a2: number[] = [1, 4, 3, 2];
const a3: number[] = [3, 2, 6];

console.log(areEqual(a1, a2)); // => Outputs `true`
console.log(areEqual(a1, a3)); // => Outputs `false`
```

```ts
const ob1 = {
  name: "Kyle",
  hobbies: ["tennis", "video_games"],
  best_friend: { name: "Joe", age: 21 },
};
const ob2 = {
  name: "Kyle",
  best_friend: { name: "Joe", age: 21 },
  hobbies: ["video_games", "tennis"],
};
const ob3 = {
  name: "Maria",
  best_friend: { name: "Ibrahim", age: 24 },
  hobbies: ["reading", "baseball"],
};

console.log(areEqual([ob1, ob2], [ob2, ob1])); // => Outputs `true`
console.log(areEqual([ob1, ob2], [ob3, ob1])); // => Outputs `false`
```

## See

[areDeeplyEqual()](areDeeplyEqual.md)
