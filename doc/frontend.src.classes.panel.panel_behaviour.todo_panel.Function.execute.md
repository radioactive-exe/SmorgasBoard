[Smorgasboard](../wiki/Home) / [frontend/src/classes/panel/panel_behaviour/todo_panel](../wiki/frontend.src.classes.panel.panel_behaviour.todo_panel) / execute

# Function: execute()

```ts
function execute(panel): void;
```

Defined in: [frontend/src/classes/panel/panel_behaviour/todo_panel.ts:37](https://github.com/radioactive-exe/SmorgasBoard/blob/d551667d544b6b48f6ede7ed113c16e2c635d621/frontend/src/classes/panel/panel_behaviour/todo_panel.ts#L37)

The main function called upon behaviour execution after the Panel template,
base, and config setup, for the Todo List Panel Type.

## Parameters

| Parameter | Type                                                            | Description                                                        |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| `panel`   | [`Panel`](../wiki/frontend.src.classes.panel.panel.Class.Panel) | The panel whose behaviour is being executed through this function. |

## Returns

`void`

## Remarks

Any necessary validations are done to check that the panel type, config, and
key elements are properly set up. Then, config change event listeners are
setup. Finally, the behaviour is initiated. For this panel type, we add
inputted text as a task in the stored list, which if successfully added as a
task, will also have the ability to be checked or deleted. After a delay from
checking/unchecking or adding/removing a task, a save is triggered.

## See

- [tryToAddEntry()](../wiki/frontend.src.classes.panel.panel_type_properties.panel_type_behaviour.Function.validateThenAddEntry)
- [addEntry()](../wiki/frontend.src.classes.panel.panel_behaviour.todo_panel.Function.addEntry) , set as its own method to allow adding entries from saved content upon loading
