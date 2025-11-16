[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel_type_properties/panel_type_behaviour](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_behaviour) / validateThenAddEntry

# Function: validateThenAddEntry()

```ts
function validateThenAddEntry(addTaskInput, todoList, panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/todo_panel.ts:106](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_behaviour/todo_panel.ts#L106)

Validates the function call and then calls the `addTask()` function to
execute the actual adding of the task once validated with the appropriate
content.

## Parameters

| Parameter      | Type                                                            | Description                                                |
| -------------- | --------------------------------------------------------------- | ---------------------------------------------------------- |
| `addTaskInput` | `HTMLInputElement`                                              | The text input whose content is the body of the task.      |
| `todoList`     | `HTMLUListElement`                                              | The UL element that holds all Todo tasks inside the Panel. |
| `panel`        | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | The Panel executing these functions.                       |

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

[addEntry()](../wiki/frontend.src.classes.panel.panel_behaviour.todo_panel.Function.addEntry)
