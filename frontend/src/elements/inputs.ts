let optionEventListener: (e: MouseEvent) => void,
    previouslyFocusedSelector: HTMLElement,
    lastActive: HTMLElement;

function addDropdownSelectorListeners(selector: HTMLElement): void {
    selector.addEventListener("mousedown", () => {
        const selectionText = selector.querySelector(
            ".selection-text",
        ) as HTMLSpanElement;
        const dropdownOptions = [
            ...(selector.querySelectorAll(
                ".dropdown-item",
            ) as NodeListOf<HTMLElement>),
        ];
        lastActive = selector.querySelector(".selected") as HTMLElement;
        const dropdownList = selector.querySelector(
            ".dropdown-list",
        ) as HTMLElement;
        const dropdownMenuCaret = selector.querySelector(
            ".menu-caret",
        ) as HTMLElement;

        selector.classList.toggle("open");

        if (selector.classList.contains("open")) {
            selector.part.add("open");
            dropdownList.part.add("open");
            dropdownMenuCaret.part.add("open");

            selector.classList.add("focused");
            selector.part.add("focused");
            if (
                previouslyFocusedSelector
                && previouslyFocusedSelector != selector
            ) {
                previouslyFocusedSelector.classList.remove("open");
                previouslyFocusedSelector.classList.remove("focused");
                previouslyFocusedSelector.part.remove("open");
                previouslyFocusedSelector.part.remove("focused");
            }
            previouslyFocusedSelector = selector;

            dropdownOptions.forEach((option: HTMLElement) => {
                const selectedIcon: HTMLElement = option.querySelector(
                    ".selected-icon",
                ) as HTMLElement;
                optionEventListener = (e: MouseEvent): void => {
                    e.stopPropagation();
                    selectionText.textContent = option.textContent;

                    // We store lastActive so we don't have to query the entire list to check if there is a selected element, and then querying its children for the visible icon too

                    if (lastActive && lastActive != option) {
                        lastActive.classList.remove("selected");
                        lastActive.part.remove("selected");
                        lastActive
                            .querySelector(".selected-icon")
                            ?.part.remove("visible");
                    }
                    option.classList.add("selected");
                    option.part.add("selected");
                    selectedIcon.part.add("visible");

                    lastActive = option;
                    // console.log(selector.dataset.configProperty + " : " + option.dataset.configValue);
                };
                option.addEventListener("mousedown", optionEventListener);
            });
        } else {
            selector.part.remove("open");
            dropdownList.part.remove("open");
            dropdownMenuCaret.part.remove("open");
            dropdownOptions.forEach((option) => {
                option.removeEventListener("mousedown", optionEventListener);
            });
        }
    });
}

function addToggleSelectorListeners(selector: HTMLElement): void {
    selector.addEventListener("mouseup", () => {
        const checkbox: HTMLInputElement = selector.querySelector(
            "#toggle",
        ) as HTMLInputElement;
        const button = selector.querySelector(".toggle-checkbox-button");
        setTimeout(() => {
            if (checkbox.checked) {
                selector.part.add("checked");
                button?.part.add("checked");
            } else {
                selector.part.remove("checked");
                button?.part.remove("checked");
            }
            console.log(selector.dataset.configProperty, checkbox.checked);
        }, 0);
    });
}

function addRangeSelectorListeners(selector: HTMLElement): void {
    const slider: HTMLInputElement = selector.querySelector(
        ".range-slider",
    ) as HTMLInputElement;

    const label: HTMLElement = selector.querySelector(
        ".range-selector-text",
    ) as HTMLElement;

    updateSliderStyle(slider);
    label.textContent = Math.round(parseFloat(slider.value)).toString();

    slider.addEventListener("input", () => {
        label.textContent = Math.round(parseFloat(slider.value)).toString();
        updateSliderStyle(slider);
    });
}

// function addStringSelectorListeners(selector: HTMLElement): void {

// }

function updateSliderStyle(slider: HTMLInputElement): void {
    slider.parentElement?.style.setProperty(
        "--fill-amount",
        (
            (parseFloat(slider.value) - parseFloat(slider.min))
            / (parseFloat(slider.max) - parseFloat(slider.min))
        ).toString(),
    );
}

export {
    addToggleSelectorListeners,
    addDropdownSelectorListeners,
    addRangeSelectorListeners,
};
