/* eslint-disable @typescript-eslint/explicit-function-return-type */

const dropdownSelectors = document.querySelectorAll(".dropdown-selector");

let optionEventListener, previouslyFocusedSelector, selectionText, dropdownOptions, lastActive;

dropdownSelectors.forEach((selector) => {

    selector.addEventListener("mousedown", (e) => {
        selectionText = selector.querySelector(".selection-text");
        dropdownOptions = [
            ...selector.querySelectorAll(".dropdown-item"),
        ];
        lastActive = selector.querySelector(".selected");

        selector.classList.toggle("open");

        if (e.currentTarget.classList.contains("open")) {
            selector.classList.add("focused");
            if (previouslyFocusedSelector && previouslyFocusedSelector != selector) {
                previouslyFocusedSelector.classList.remove("open");
                previouslyFocusedSelector.classList.remove("focused");
            }
            previouslyFocusedSelector = selector;

            dropdownOptions.forEach((option) => {
                optionEventListener = (e) => {
                    e.stopPropagation();
                    selectionText.textContent = option.textContent;
                    if (lastActive && lastActive != option) {
                        lastActive.classList.remove("selected");
                    }
                    option.classList.add("selected");
                    lastActive = option;
                    // console.log(selector.)
                };
                option.addEventListener("mousedown", optionEventListener);
            });
        } else {
            dropdownOptions.forEach((option) => {
                option.removeEventListener("mousedown", optionEventListener);
            });
        }
    });
})
