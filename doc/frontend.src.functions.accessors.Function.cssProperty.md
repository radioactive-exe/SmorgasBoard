[Smorgasboard](../wiki/Home) / [frontend/src/functions/accessors](../wiki/frontend.src.functions.accessors) / cssProperty

# Function: cssProperty()

```ts
function cssProperty(el, property): string;
```

Defined in: [frontend/src/functions/accessors.ts:67](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/accessors.ts#L67)

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

- [cssPropertyValue()](../wiki/frontend.src.functions.accessors.Function.cssPropertyValue)
- [numericalValue()](../wiki/frontend.src.functions.accessors.Function.numericalValue)
- [normalisedCssPropertyValue()](../wiki/frontend.src.functions.accessors.Function.normalisedCssPropertyValue)
