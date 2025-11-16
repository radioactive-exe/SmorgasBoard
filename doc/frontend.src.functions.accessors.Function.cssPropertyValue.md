[Smorgasboard](../wiki/Home) / [frontend/src/functions/accessors](../wiki/frontend.src.functions.accessors) / cssPropertyValue

# Function: cssPropertyValue()

```ts
function cssPropertyValue(el, property): number;
```

Defined in: [frontend/src/functions/accessors.ts:99](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/accessors.ts#L99)

Gets the numerical value of the CSS property of an element directly.

## Parameters

| Parameter  | Type          | Description                                |
| ---------- | ------------- | ------------------------------------------ |
| `el`       | `HTMLElement` | The element whose property we are getting. |
| `property` | `string`      | The target property.                       |

## Returns

`number`

The extracted and parsed value of the CSS property of the
element as a number.

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
console.log(cssPropertyValue(panel, "transition-duration")); // => Outputs 0.2 as a number
```

## See

- [cssProperty()](../wiki/frontend.src.functions.accessors.Function.cssProperty) , the function to obtain the CSS property as a string
- [numericalValue()](../wiki/frontend.src.functions.accessors.Function.numericalValue) , the function that extracts and parses the number in a string
