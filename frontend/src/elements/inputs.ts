import type { ConfigChangeEventDetail } from "../classes/config/config.js";

let optionEventListener: (e: PointerEvent) => void,
    previouslyFocusedSelector: HTMLElement,
    selectionText: HTMLSpanElement,
    dropdownOptions: HTMLElement[],
    lastActive: HTMLElement;

function addDropdownSelectorListeners(selector: HTMLElement): void {
    selector.addEventListener("pointerdown", () => {
        selectionText = selector.querySelector(
            ".selection-text",
        ) as HTMLSpanElement;
        dropdownOptions = [
            ...(selector.querySelectorAll(
                ".dropdown-item",
            ) as NodeListOf<HTMLElement>),
        ];
        lastActive = selector.querySelector(".selected") as HTMLElement;

        selector.classList.toggle("open");

        if (selector.classList.contains("open")) {
            selector.classList.add("focused");
            if (
                previouslyFocusedSelector
                && previouslyFocusedSelector != selector
            ) {
                previouslyFocusedSelector.classList.remove("open");
                previouslyFocusedSelector.classList.remove("focused");
            }
            previouslyFocusedSelector = selector;

            dropdownOptions.forEach((option: HTMLElement) => {
                const selectedIcon: HTMLElement = option.querySelector(
                    ".selected-icon",
                ) as HTMLElement;
                optionEventListener = (e: PointerEvent): void => {
                    e.stopPropagation();
                    selectionText.textContent = option.textContent;

                    // * We store lastActive so we don't have to query the entire list to check if there is a selected element, and then querying its children for the visible

                    if (lastActive && lastActive != option) {
                        lastActive.classList.remove("selected");
                        lastActive
                            .querySelector(".selected-icon")
                            ?.classList.remove("visible");
                    }
                    option.classList.add("selected");
                    selectedIcon.classList.add("visible");

                    lastActive = option;

                    selector.dispatchEvent(
                        new CustomEvent<ConfigChangeEventDetail>(
                            "configchange",
                            {
                                bubbles: true,
                                composed: true,
                                detail: {
                                    setting: selector.dataset
                                        .configProperty as string,
                                    value: option.dataset.configValue as string,
                                },
                            },
                        ),
                    );
                };
                option.addEventListener("pointerdown", optionEventListener);
            });
        } else {
            dropdownOptions.forEach((option) => {
                option.removeEventListener("pointerdown", optionEventListener);
            });
        }
    });
}

function addToggleSelectorListeners(selector: HTMLElement): void {
    const checkbox: HTMLInputElement = selector.querySelector(
        "#toggle",
    ) as HTMLInputElement;
    selector.addEventListener("pointerup", () => {
        setTimeout(() => {
            selector.dispatchEvent(
                new CustomEvent<ConfigChangeEventDetail>("configchange", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        setting: selector.dataset.configProperty as string,
                        value: checkbox.checked,
                    },
                }),
            );
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

        selector.dispatchEvent(
            new CustomEvent<ConfigChangeEventDetail>("configchange", {
                bubbles: true,
                composed: true,
                detail: {
                    setting: selector.dataset.configProperty as string,
                    value: parseFloat(slider.value) as number,
                },
            }),
        );
    });
}

function addStringSelectorListeners(selector: HTMLElement): void {
    const textInput: HTMLInputElement = selector.querySelector(
        ".string-selector-input",
    ) as HTMLInputElement;
    textInput.addEventListener("input", () => {
        selector.dispatchEvent(
            new CustomEvent<ConfigChangeEventDetail>("configchange", {
                bubbles: true,
                composed: true,
                detail: {
                    setting: selector.dataset.configProperty as string,
                    value: textInput.value,
                },
            }),
        );
    });
}

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
    addDropdownSelectorListeners,
    addRangeSelectorListeners,
    addStringSelectorListeners,
    addToggleSelectorListeners,
};
