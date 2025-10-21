import { AlertLevel, spawnAlert } from "../../../elements/alert.js";
import type { Config, ConfigChangeEventDetail } from "../../config/config.js";
import type * as ConfigEntry from "../../config/config_entry.js";
import type { Panel } from "../panel.js";
import { PanelType } from "../panel_type.js";

let triggerSaveTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {
    return;
}, 0);

function execute(panel: Panel): void {
    const addTaskButton: HTMLElement | null | undefined =
        panel.getKeyElement("add_task_button");
    const addTaskInput: HTMLInputElement | null | undefined =
        panel.getKeyElement("add_task_input") as
            | HTMLInputElement
            | null
            | undefined;
    const todoList: HTMLUListElement | null | undefined = panel.getKeyElement(
        "todo_list",
    ) as HTMLUListElement | null | undefined;
    const title: HTMLUListElement | null | undefined = panel.getKeyElement(
        "todo_title",
    ) as HTMLUListElement | null | undefined;

    if (
        !addTaskButton
        || !addTaskInput
        || !todoList
        || !title
        || panel.getType() != PanelType.TODO
    )
        return;

    const loadedTitle = (panel.getConfig()?.listTitle as ConfigEntry.String)
        .value;

    title.textContent = loadedTitle != "" ? loadedTitle : "To-Do List";

    addTaskButton.addEventListener("click", () =>
        tryToAddEntry(addTaskInput, todoList, panel),
    );
    addTaskInput.addEventListener("keydown", (e) => {
        if (e.key == "Enter") tryToAddEntry(addTaskInput, todoList, panel);
    });
    panel.addEventListener("configchange", (e) => {
        const customEventParsed: CustomEvent<ConfigChangeEventDetail> =
            e as CustomEvent<ConfigChangeEventDetail>;
        const panelConfig: Config | undefined = panel.getConfig();
        if (panelConfig && customEventParsed.detail.setting == "listTitle") {
            title.textContent =
                customEventParsed.detail.value == ""
                    ? "To-Do List"
                    : (panel.getConfig()?.listTitle as ConfigEntry.String)
                          .value;
        }
    });
}

function tryToAddEntry(
    addTaskInput: HTMLInputElement,
    todoList: HTMLUListElement,
    panel: Panel,
): void {
    if (!addTaskInput.value) {
        spawnAlert("Please enter a task to add!", AlertLevel.INFO);
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

    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("icon", "x-icon");

    const checkboxSelector = document.createElement("div");
    checkboxSelector.classList.add("selector", "checkbox-selector");
    checkboxSelector.innerHTML = `<label class="checkbox-label">
                    <input type="checkbox" class="checkbox-input" ${isChecked ? "checked" : ""}/>
                    <div class="checkbox-tick">
                        <svg class="checkbox-tick-svg" width="20px" height="20px">
                            <polyline points="4 9 7 13 13 4"></polyline>
                        </svg>
                    </div>
                    <span class="todo-list-entry-text">${value}</span>
                </label>`;

    newEntry.addEventListener("click", () => {
        triggerDelayedSave(panel);
    });
    deleteIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        newEntry.remove();
        triggerDelayedSave(panel);
    });
    newEntry.appendChild(checkboxSelector);
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
