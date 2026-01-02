[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/util](../README.md) / areDeeplyEqual

# Function: areDeeplyEqual()

```ts
function areDeeplyEqual(obj1, obj2): boolean;
```

Defined in: [frontend/src/functions/util.ts:381](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/functions/util.ts#L381)

Recursively deeply compares objects/variables of any primitive or object
type.

## Parameters

| Parameter | Type                                                                                                  | Description                                   |
| --------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `obj1`    | \| `string` \| `number` \| `boolean` \| `object` \| (`string` \| `number` \| `boolean` \| `object`)[] | The first variable/object in the comparison.  |
| `obj2`    | \| `string` \| `number` \| `boolean` \| `object` \| (`string` \| `number` \| `boolean` \| `object`)[] | The second variable/object in the comparison. |

## Returns

`boolean`

True whether the objects are deeply equal (have the same
values/properties), and false otherwise.

## Remarks

If the passed parameters are arrays, the original method to compare arrays is
called.

## Example

```ts
const ob1 = { name: "June", age: 18, hobbies: ["tennis", "reading"] };
const ob2 = { name: "June", hobbies: ["tennis", "reading"], age: 18 };
const ob3 = { name: "May", age: 21, hobbies: ["puzzles", "science"] };

console.log(areDeeplyEqual(ob1, ob2)); // => Outputs `true`
console.log(areDeeplyEqual(ob1, ob3)); // => Outputs `false`
```

## See

[areEqualArrays()](areEqualArrays.md)
