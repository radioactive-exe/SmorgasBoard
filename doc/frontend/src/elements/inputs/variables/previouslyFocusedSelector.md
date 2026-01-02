[**Smorgasboard**](../../../../../README.md)

---

[Smorgasboard](../../../../../README.md) / [frontend/src/elements/inputs](../README.md) / previouslyFocusedSelector

# Variable: previouslyFocusedSelector

```ts
previouslyFocusedSelector: HTMLElement;
```

Defined in: [frontend/src/elements/inputs.ts:30](https://github.com/radioactive-exe/SmorgasBoard/blob/b7e70e00b8d9b893db79f710da3fcc31dd37ee28/frontend/src/elements/inputs.ts#L30)

The last focused selector, most often relevant when dealing with dropdown
selectors.

## Remarks

This ensures opening another dropdown menu closes any other open dropdown
menu. Additionally, setting dropdown selectors as the current focused
selector places it in front of any other dropdowns, regardless of DOM
ordering.
