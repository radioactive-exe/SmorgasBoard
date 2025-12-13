[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/functions/accessors](../README.md) / cssProperty

# Function: cssProperty()

```ts
function cssProperty(el, property): string;
```

Defined in: [frontend/src/functions/accessors.ts:67](https://github.com/radioactive-exe/SmorgasBoard/blob/9f1d0dc382a9eea2c4a3df32f8f8d12feec01794/frontend/src/functions/accessors.ts#L67)

Gets the normal un-altered string value of a CSS property of an element.

## Parameters

| Parameter  | Type          | Description                                |
| ---------- | ------------- | ------------------------------------------ |
| `el`       | `HTMLElement` | The element whose property we are getting. |
| `property` | `string`      | The string property we are getting.        |

## Returns

`string`

The value of the property from the computed style of the
input element.

## Example

```css
.panel {
  transition-duration: 0.2s;
}
```

Given the above style, calling the function as below will output the
following:

```ts
const panel: HTMLElement = document.querySelector(".panel") as HTMLElement;
console.log(cssProperty(panel, "transition-duration")); // => Outputs "0.2s" as a string
```

## See

- [cssPropertyValue()](cssPropertyValue.md)
- [numericalValue()](numericalValue.md)
- [normalisedCssPropertyValue()](normalisedCssPropertyValue.md)
