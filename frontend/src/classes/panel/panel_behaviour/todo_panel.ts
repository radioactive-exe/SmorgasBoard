/**
 * This file contains the behaviour functions for the Todo List PanelType.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { AlertLevel, spawnAlert } from "../../../elements/alert.js";
import type { Config, ConfigChangeEventDetail } from "../../config/config.js";
import type * as ConfigEntry from "../../config/config_entry.js";
import type { Panel } from "../panel.js";
import { PanelType } from "../panel_type.js";

// eslint-disable-next-line jsdoc/require-example
/**
 * The main function called upon behaviour execution after the Panel template,
 * base, and config setup, for the Todo List PanelType.
 *
 * @remarks
 * Any necessary validations are done to check that the panel type, config, and
 * key elements are properly set up. Then, config change event listeners are
 * setup. Finally, the behaviour is initiated. For this panel type, we add
 * inputted text as a task in the stored list, which if successfully added as a
 * task, will also have the ability to be checked or deleted. After a delay from
 * checking/unchecking or adding/removing a task, a save is triggered.
 *
 * @param panel - The panel whose behaviour is being executed through this
 *   function.
 *
 * @see {@link validateThenAddEntry | tryToAddEntry()}
 * @see {@link addEntry | addEntry()} , set as its own method to allow adding entries from saved content upon loading
 */
function execute(panel: Panel): void {
    // ? If any elements are missing, or the panel does not have the correct Type and Config, abort.
    if (
        Object.values(panel.getKeyElements()).includes(null)
        || Object.values(panel.getKeyElements()).includes(undefined)
        || panel.getType() != PanelType.TODO
    )
        return;

    const addTaskButton: HTMLElement = panel.getKeyElement(
        "add_task_button",
    ) as HTMLElement;
    const addTaskInput: HTMLInputElement = panel.getKeyElement(
        "add_task_input",
    ) as HTMLInputElement;
    const todoList: HTMLUListElement = panel.getKeyElement(
        "todo_list",
    ) as HTMLUListElement;
    const title: HTMLUListElement = panel.getKeyElement(
        "todo_title",
    ) as HTMLUListElement;

    const loadedTitle =
        (panel.getConfig()?.listTitle as ConfigEntry.String).value ?? "";

    title.textContent = loadedTitle != "" ? loadedTitle : "To-Do List";

    addTaskButton.addEventListener("click", () =>
        validateThenAddEntry(addTaskInput, todoList, panel),
    );
    addTaskInput.addEventListener("keydown", (e) => {
        if (e.key == "Enter")
            validateThenAddEntry(addTaskInput, todoList, panel);
    });
    panel.addEventListener("configchange", (e) => {
        const customEventParsed: CustomEvent<ConfigChangeEventDetail> =
            e as CustomEvent<ConfigChangeEventDetail>;
        const panelConfig: Config | undefined = panel.getConfig();
        if (panelConfig && customEventParsed.detail.setting == "listTitle") {
            title.textContent =
                customEventParsed.detail.value == ""
                    ? "To-Do List"
                    : (panelConfig.listTitle as ConfigEntry.String).value;
        }
    });
}

/**
 * Validates the function call and then calls the `addTask()` function to
 * execute the actual adding of the task once validated with the appropriate
 * content.
 *
 * @param addTaskInput - The text input whose content is the body of the task.
 * @param todoList     - The UL element that holds all Todo tasks inside the
 *   Panel.
 * @param panel        - The Panel executing these functions.
 *
 * @example
 *
 * ```ts
 * tryToAddEntry(taskInput, todoList, panel)
 * ```
 *
 * Given that the user has typed in "Finish Smorgasboard" in the `taskInput`
 * text input, calling this function will add a task with "Finish Smorgasboard"
 * to the saved task list and trigger a delayed save.
 *
 * @see {@link addEntry | addEntry()}
 */
function validateThenAddEntry(
    addTaskInput: HTMLInputElement,
    todoList: HTMLUListElement,
    panel: Panel,
): void {
    // ? If the text input is empty
    if (!addTaskInput.value) {
        spawnAlert("Please enter a task to add!", AlertLevel.INFO);
        return;
    }

    // ? Add the entry itself, using the input's value as the task body/content
    addEntry(panel, todoList, addTaskInput.value);
    addTaskInput.value = "";
}

/**
 * Adds an entry with an inputted content (and checked status if loading) to the
 * list of tasks, which can be checked/unchecked and removed.
 *
 * @remarks
 * The saving mechanism might be changed to simply firing off a save event that
 * is caught by the panel, without needing to pass the panel as a parameter
 * through multiple functions.
 *
 * @param panel        - The Panel executing these functions, passed to trigger
 *   a save.
 * @param todoList     - The UList that holds all current todo tasks.
 * @param value        - The content/body of the task to add.
 * @param isChecked    - Whether the new task should be added as checked.
 *   Default is `false`, as most tasks will be added newly. This is relevant
 *   when loading the todo panel and populating saved tasks with their
 *   completion status.
 * @param updateStored - Whether to trigger a save. Default is `true`, as most
 *   tasks will be new. This is relevant when loading the todo panel and
 *   populating saved tasks without triggering a save/changing the information
 *   being loaded.
 *
 * @example
 *
 * ```ts
 * addEntry(panel, todoList, "Finish Smorgasboard", true, false);
 * ```
 *
 * The above adds (or in this case, loads) a new task into the task list with a
 * task of "Finish Smorgasboard", and a status of completed. Additionally, we
 * will not update the stored data as we are loading saved data, and not adding
 * a newly inputted task.
 */
function addEntry(
    panel: Panel,
    todoList: HTMLUListElement,
    value: string,
    isChecked = false,
    updateStored = true,
): void {
    // ? Create the new entry container
    const newEntry = document.createElement("li");
    newEntry.classList.add("todo-list-entry");

    // ? Update the class to reflect that the entry is checked/completed, matching with the input
    if (isChecked) newEntry.classList.add("checked");

    // * The button/icon to delete/remove a task
    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("icon", "x-icon");

    // ? Create a checkbox container element.
    const checkboxSelector = document.createElement("div");
    checkboxSelector.classList.add("selector", "checkbox-selector");

    // ? Populate the checkbox container, including the checked status and the value of the task.
    checkboxSelector.innerHTML = `<label class="checkbox-label">
                    <input type="checkbox" class="checkbox-input" ${isChecked ? "checked" : ""}/>
                    <div class="checkbox-tick">
                        <svg class="checkbox-tick-svg" width="20px" height="20px">
                            <polyline points="4 9 7 13 13 4"></polyline>
                        </svg>
                    </div>
                    <span class="todo-list-entry-text">${value}</span>
                </label>`;

    // ? Handle checking/unchecking a task
    newEntry.addEventListener("click", () => {
        panel.triggerSave();
    });

    // ? Handle removing a listed task
    deleteIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        newEntry.remove();
        panel.triggerSave();
    });

    // ? Add the checkbox container (with the task in the label)
    // ? and the delete icon to the new task entry
    newEntry.appendChild(checkboxSelector);
    newEntry.appendChild(deleteIcon);

    // ? Then append the new task entry into the list
    todoList.appendChild(newEntry);

    // ? If needed, trigger a save
    if (updateStored) panel.triggerSave();
}

export { addEntry, execute };
