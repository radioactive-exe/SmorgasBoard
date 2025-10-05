import { spawnAlert } from "../../../elements/alert.js";
import type { Panel } from "../panel.js";

// eslint-disable-next-line prefer-const
let triggerSaveTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {
    return;
}, 0);

function execute(panel: Panel): void {
    const addTaskButton: HTMLElement | undefined = panel
        .getKeyElements()
        .get("add_task_button");
    const addTaskInput: HTMLInputElement | undefined = panel
        .getKeyElements()
        .get("add_task_input") as HTMLInputElement | undefined;
    const todoList: HTMLUListElement | undefined = panel
        .getKeyElements()
        .get("todo_list") as HTMLUListElement | undefined;

    if (!addTaskButton || !addTaskInput || !todoList) return;

    addTaskButton.addEventListener("click", () =>
        tryToAddEntry(addTaskInput, todoList, panel),
    );
    addTaskInput.addEventListener("keydown", (e) => {
        if (e.key == "Enter") tryToAddEntry(addTaskInput, todoList, panel);
    });
}

function tryToAddEntry(
    addTaskInput: HTMLInputElement,
    todoList: HTMLUListElement,
    panel: Panel,
): void {
    if (!addTaskInput.value) {
        spawnAlert("Please enter a task to add!");
        return;
    }
    addEntry(panel, todoList, addTaskInput.value);
    addTaskInput.value = "";
}

function addEntry(
    panel: Panel,
    todoList: HTMLUListElement,
    value: string,
    isChecked = false,
    updateStored = true,
): void {
    const newEntry = document.createElement("li");
    newEntry.classList.add("todo-list-entry");
    if (isChecked) newEntry.classList.add("checked");
    newEntry.addEventListener("click", () => {
        newEntry.classList.toggle("checked");
        triggerDelayedSave(panel);
    });

    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("icon", "x-icon");
    deleteIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        newEntry.remove();
        triggerDelayedSave(panel);
    });
    newEntry.textContent = value;
    newEntry.appendChild(deleteIcon);
    todoList.appendChild(newEntry);
    if (updateStored) triggerDelayedSave(panel);
}

function triggerDelayedSave(panel: Panel): void {
    clearTimeout(triggerSaveTimeout);
    triggerSaveTimeout = setTimeout(() => {
        panel.triggerSave();
    }, 3000);
}

export { addEntry, execute };
