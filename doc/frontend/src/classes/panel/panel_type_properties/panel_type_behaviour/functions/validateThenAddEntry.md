[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_type_properties/panel_type_behaviour](../README.md) / validateThenAddEntry

# Function: validateThenAddEntry()

```ts
function validateThenAddEntry(addTaskInput, todoList, panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/todo_panel.ts:108](https://github.com/radioactive-exe/SmorgasBoard/blob/8f4f7feb3d95b1e6f220d9a6d967884a54a55d8e/frontend/src/classes/panel/panel_behaviour/todo_panel.ts#L108)

Validates the function call and then calls the `addTask()` function to
execute the actual adding of the task once validated with the appropriate
content.

## Parameters

| Parameter      | Type                                       | Description                                                |
| -------------- | ------------------------------------------ | ---------------------------------------------------------- |
| `addTaskInput` | `HTMLInputElement`                         | The text input whose content is the body of the task.      |
| `todoList`     | `HTMLUListElement`                         | The UL element that holds all Todo tasks inside the Panel. |
| `panel`        | [`Panel`](../../../panel/classes/Panel.md) | The Panel executing these functions.                       |

## Returns

`void`

## Example

```ts
tryToAddEntry(taskInput, todoList, panel);
```

Given that the user has typed in "Finish Smorgasboard" in the `taskInput`
text input, calling this function will add a task with "Finish Smorgasboard"
to the saved task list and trigger a delayed save.

## See

[addEntry()](../../../panel_behaviour/todo_panel/functions/addEntry.md)
