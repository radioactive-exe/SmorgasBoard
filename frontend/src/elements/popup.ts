/**
 * This file contains all the logic and functionality for spawning and
 * populating popups/modals.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

// TODO: Update documentation

import { current, hideModal, modalLayer, showModal } from "../app.js";
import { deleteAfterTransition } from "../functions/util.js";

function spawnPopup(
    title: string,
    doneCallback?: () => void,
    deleteCallback?: () => void,
    content?: HTMLElement | string,
): void {
    current.panel.classList.remove("last-focused-panel");

    const popup = document.createElement("div");
    popup.classList.add("popup");

    popup.innerHTML += `<h1 class="title popup-title">${title ? title : "Popup_Placeholder"}</h1>`;

    if (content && content instanceof HTMLElement) popup.appendChild(content);
    else if (content) {
        const textContainer = document.createElement("span");
        textContainer.classList.add("popup-text-content");
        textContainer.innerText = content;
        popup.appendChild(textContainer);
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container", "popup-button-container");

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("button", "cancel-button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", () => closePopup(popup));

    buttonContainer.appendChild(cancelButton);

    if (deleteCallback) {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add(
            "button",
            "delete-button",
            "cautious-button",
        );
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", deleteCallback);
        deleteButton.addEventListener("click", () => closePopup(popup));

        buttonContainer.appendChild(deleteButton);
    }

    if (doneCallback) {
        const doneButton = document.createElement("button");
        doneButton.classList.add("button", "done-button", "confirm-button");
        doneButton.type = "button";
        doneButton.textContent = "Done!";

        doneButton.addEventListener("click", doneCallback);
        doneButton.addEventListener("click", () => closePopup(popup));

        buttonContainer.appendChild(doneButton);
    }

    if (deleteCallback && !doneCallback) {
        popup.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key == "Enter") deleteCallback();
        });
    } else if (doneCallback) {
        popup.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key == "Enter") doneCallback();
        });
    }

    popup.appendChild(buttonContainer);

    modalLayer.appendChild(popup);
    setTimeout(() => {
        showModal(popup);
    }, 0);
}

function closePopup(popup: HTMLElement): void {
    hideModal(popup);
    deleteAfterTransition(popup, modalLayer);
}

export { spawnPopup };
