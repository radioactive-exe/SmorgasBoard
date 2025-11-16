[Smorgasboard](../wiki/Home) / [frontend/src/functions/accessors](../wiki/frontend.src.functions.accessors) / normalisedCssPropertyValue

# Function: normalisedCssPropertyValue()

```ts
function normalisedCssPropertyValue(el, property): number;
```

Defined in: [frontend/src/functions/accessors.ts:173](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/functions/accessors.ts#L173)

Gets and normalises the CSS property of an element.

## Parameters

| Parameter  | Type          | Description                                             |
| ---------- | ------------- | ------------------------------------------------------- |
| `el`       | `HTMLElement` | The element to extract and normalise the property from. |
| `property` | `string`      | The target property to extract and normalise.           |

## Returns

`number`

The extracted and normalised numerical value of the CSS
property.

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
console.log(normalisedCssPropertyValue(panel, "transition-duration")); // => Outputs 200 as a number
```

## See

- [cssProperty()](../wiki/frontend.src.functions.accessors.Function.cssProperty) , the function to obtain the CSS property as a string
- [normalisedValue()](../wiki/frontend.src.functions.accessors.Function.normalisedValue) , the main function used in this one
