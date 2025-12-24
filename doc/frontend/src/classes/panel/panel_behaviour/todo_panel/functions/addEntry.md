[**Smorgasboard**](../../../../../../../README.md)

---

[Smorgasboard](../../../../../../../README.md) / [frontend/src/classes/panel/panel_behaviour/todo_panel](../README.md) / addEntry

# Function: addEntry()

```ts
function addEntry(panel, todoList, value, isChecked, updateStored): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/todo_panel.ts:157](https://github.com/radioactive-exe/SmorgasBoard/blob/33eed8942f295b0c4031e7847b84f067b2d59ff1/frontend/src/classes/panel/panel_behaviour/todo_panel.ts#L157)

Adds an entry with an inputted content (and checked status if loading) to the
list of tasks, which can be checked/unchecked and removed.

## Parameters

| Parameter      | Type                                       | Default value | Description                                                                                                                                                                                                       |
| -------------- | ------------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `panel`        | [`Panel`](../../../panel/classes/Panel.md) | `undefined`   | The Panel executing these functions, passed to trigger a save.                                                                                                                                                    |
| `todoList`     | `HTMLUListElement`                         | `undefined`   | The UList that holds all current todo tasks.                                                                                                                                                                      |
| `value`        | `string`                                   | `undefined`   | The content/body of the task to add.                                                                                                                                                                              |
| `isChecked`    | `boolean`                                  | `false`       | Whether the new task should be added as checked. Default is `false`, as most tasks will be added newly. This is relevant when loading the todo panel and populating saved tasks with their completion status.     |
| `updateStored` | `boolean`                                  | `true`        | Whether to trigger a save. Default is `true`, as most tasks will be new. This is relevant when loading the todo panel and populating saved tasks without triggering a save/changing the information being loaded. |

## Returns

`void`

## Remarks

The saving mechanism might be changed to simply firing off a save event that
is caught by the panel, without needing to pass the panel as a parameter
through multiple functions.

## Example

```ts
addEntry(panel, todoList, "Finish Smorgasboard", true, false);
```

The above adds (or in this case, loads) a new task into the task list with a
task of "Finish Smorgasboard", and a status of completed. Additionally, we
will not update the stored data as we are loading saved data, and not adding
a newly inputted task.
