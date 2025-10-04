/* eslint-disable */
const addTaskButton = document.querySelector(".add-todo-task-button");
const addTaskInput = document.querySelector(".add-todo-task-input");
const todoList = document.querySelector(".todo-list-items");

addTaskButton.addEventListener("click", () => addEntry());
addTaskInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") addEntry();
});

function addEntry() {
    if (!addTaskInput.value) {
        console.log("gotta do sumn");
        return;
    }
    const newEntry = document.createElement("li");
    newEntry.classList.add("todo-list-entry");
    newEntry.addEventListener("click", () => {
        newEntry.classList.toggle("checked");
        saveList();
    });

    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("icon", "x-icon");
    deleteIcon.addEventListener("click", () => {
        saveList().then(() => newEntry.remove());
    });
    newEntry.textContent = addTaskInput.value;
    newEntry.appendChild(deleteIcon);
    addTaskInput.value = "";
    todoList.appendChild(newEntry);
    saveList();
}

function saveList() {
    return new Promise((resolve) => {
        let tasks = [...todoList.children].map((entry) => {
            return {
                task: entry.textContent,
                checked: entry.classList.contains("checked"),
            };
        });

        console.log(tasks);

        resolve();
    });
}
