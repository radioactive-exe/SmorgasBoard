/* eslint-disable jsdoc/require-example */
/**
 * This file contains the functions and logic pertaining to all custom selectors
 * and inputs.
 *
 * @remarks
 * It includes all listeners, style updates, and custom implementation
 * behaviour, and it handles all config changes by firing up relevant events.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import type { ConfigChangeEventDetail } from "../classes/config/config.js";

/**
 * The last focused selector, most often relevant when dealing with dropdown
 * selectors.
 *
 * @remarks
 * This ensures opening another dropdown menu closes any other open dropdown
 * menu. Additionally, setting dropdown selectors as the current focused
 * selector places it in front of any other dropdowns, regardless of DOM
 * ordering.
 */
let previouslyFocusedSelector: HTMLElement;

/**
 * Adds all relevant listeners and instantiates all necessary variables for the
 * custom dropdown selectors.
 *
 * @remarks
 * This selector outputs the value of the current selected option, which can be
 * either a string or a number, or any other enum value.
 *
 * @param selector - The dropdown selector to set up.
 *
 * @see {@link initToggleSelector | initToggleSelector()}
 * @see {@link initRangeSelector | initRangeSelector()}
 * @see {@link initStringSelector | initStringSelector()}
 * @see The {@link ConfigChangeEventDetail | Custom Event detail} for the ConfigChange event
 */
function initDropdownSelector(selector: HTMLElement): void {
    // * The selected element's text
    const selectionText = selector.querySelector(
        ".selection-text",
    ) as HTMLSpanElement;

    const dropdownOptions: HTMLElement[] = [
        ...(selector.querySelectorAll(
            ".dropdown-item",
        ) as NodeListOf<HTMLElement>),
    ];

    /**
     * The last chosen option from the dropdown list options.
     *
     * @remarks
     * We store lastActive so we don't have to query the entire list to check if
     * there is a selected element, and then querying its children for the
     * visible.
     */
    let lastActive: HTMLElement = selector.querySelector(
        ".selected",
    ) as HTMLElement;

    selector.addEventListener("pointerdown", () => {
        selector.classList.toggle("open");

        // ? If we just opened the dropdown menu (1/4)
        if (selector.classList.contains("open")) {
            // ? And it is not the last focused selector
            // ? (but the last focused selector was set) (2/4)
            if (
                previouslyFocusedSelector
                && previouslyFocusedSelector != selector
            ) {
                // ? Then we remove focus from the last selector (3/4)
                previouslyFocusedSelector.classList.remove("open");
                previouslyFocusedSelector.classList.remove("focused");
            }

            // ? And then focus on the current selector, updating the variable as well (4/4)
            selector.classList.add("focused");
            previouslyFocusedSelector = selector;
        }

        dropdownOptions.forEach((option: HTMLElement) => {
            // * The small hand pointing icon that clarifies which option is currently selected
            const selectedIcon: HTMLElement = option.querySelector(
                ".selected-icon",
            ) as HTMLElement;

            option.addEventListener("pointerdown", (e: PointerEvent): void => {
                // ? So the dropdown menu does not close again.
                e.stopPropagation();

                // ? Set the clicked option as the selected one, updating the selection text,
                // ? and lastActive
                selectionText.textContent = option.textContent;
                option.classList.add("selected");
                lastActive = option;

                // ? If the clicked option is different than the last active one,
                // ? we remove all selection classes and information from the last chosen option,
                // ? and visually update to show the transition of selection.
                if (lastActive && lastActive != option) {
                    lastActive.classList.remove("selected");
                    lastActive
                        .querySelector(".selected-icon")
                        ?.classList.remove("visible");
                    selectedIcon.classList.add("visible");
                }

                // ? We fire a config change event when the dropdown selection is changed,
                // ? the detail of which holds the config setting changed, as well as the value
                // ? of the selected option.
                selector.dispatchEvent(
                    new CustomEvent<ConfigChangeEventDetail>("configchange", {
                        bubbles: true,
                        composed: true,
                        detail: {
                            setting: selector.dataset.configProperty as string,
                            value: option.dataset.configValue as string,
                        },
                    }),
                );
            });
        });
    });
}

/**
 * Adds all relevant listeners and instantiates all necessary variables for the
 * custom checkbox/toggle selectors.
 *
 * @remarks
 * This selector outputs a boolean value.
 *
 * @param selector - The dropdown selector to set up.
 *
 * @see {@link initToggleSelector | initToggleSelector()}
 * @see {@link initRangeSelector | initRangeSelector()}
 * @see {@link initStringSelector | initStringSelector()}
 * @see The {@link ConfigChangeEventDetail | Custom Event detail} for the ConfigChange event
 */
function initToggleSelector(selector: HTMLElement): void {
    const checkbox: HTMLInputElement = selector.querySelector(
        "#toggle",
    ) as HTMLInputElement;

    /**
     * The timeout to ensure the event is only fired off once the toggle has not
     * been clicked for at least 100ms (set below) to avoid
     * overwhelming/over-triggering saves and applying config changes repeatedly
     * and constantly if we receive spams of input for whatever reason.
     */
    let emitSignalTimeout: NodeJS.Timeout;

    selector.addEventListener("pointerup", () => {
        // ? We clear the timeout and set it again to ensure that we continue
        // ? to wait for 100ms of no inputs to send the update
        clearTimeout(emitSignalTimeout);
        emitSignalTimeout = setTimeout(() => {
            // ? We fire a config change event when the checkbox/toggle is changed,
            // ? the detail of which holds the config setting changed, as well as the
            // ? boolean value of the checkbox.
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
        }, 100);
    });
}

/**
 * Adds all relevant listeners and instantiates all necessary variables for the
 * custom range/numerical selectors.
 *
 * @remarks
 * This selector outputs a numerical value.
 *
 * @param selector - The dropdown selector to set up.
 *
 * @see {@link initDropdownSelector | initDropdownSelector()}
 * @see {@link initToggleSelector | initToggleSelector()}
 * @see {@link initStringSelector | initStringSelector()}
 * @see The {@link ConfigChangeEventDetail | Custom Event detail} for the ConfigChange event
 */
function initRangeSelector(selector: HTMLElement): void {
    const slider: HTMLInputElement = selector.querySelector(
        ".range-slider",
    ) as HTMLInputElement;

    const label: HTMLElement = selector.querySelector(
        ".range-selector-text",
    ) as HTMLElement;

    /**
     * The timeout to ensure the event is only fired off once the slider has not
     * been dragged for at least 250ms (set below) to avoid
     * overwhelming/over-triggering saves and applying config changes repeatedly
     * and constantly every time the slider is dragged. It is only fired off
     * once the user has released the drag handle/maintained it in place for at
     * least a quarter of a second, as otherwise the event would be fired off
     * for every step along the way when dragging, which, as you can imagine,
     * would cripple the program depending on how small the step is.
     */
    let emitSignalTimeout: NodeJS.Timeout;

    // ? Ensures that the visuals are matched up to the value on initial loading time.
    updateSliderStyle(slider);
    label.textContent = Math.round(parseFloat(slider.value)).toString();

    slider.addEventListener("input", () => {
        // ? Ensures the visuals are always updated with the slider values.
        label.textContent = Math.round(parseFloat(slider.value)).toString();
        updateSliderStyle(slider);

        // ? We clear the timeout and set it again to ensure that we continue
        // ? to wait for 250ms of the slider being stationary before sending an update
        clearTimeout(emitSignalTimeout);
        emitSignalTimeout = setTimeout(() => {
            // ? We fire a config change event, the detail of which holds
            // ? the config setting changed, as well as the value of the slider.
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
        }, 250);
    });
}

/**
 * Adds all relevant listeners and instantiates all necessary variables for the
 * custom text/string selectors.
 *
 * @remarks
 * This selector outputs a string value.
 *
 * @param selector - The dropdown selector to set up.
 *
 * @see {@link initDropdownSelector | initDropdownSelector()}
 * @see {@link initToggleSelector | initToggleSelector()}
 * @see {@link initRangeSelector | initRangeSelector()}
 * @see The {@link ConfigChangeEventDetail | Custom Event detail} for the ConfigChange event
 */
function initStringSelector(selector: HTMLElement): void {
    const textInput: HTMLInputElement = selector.querySelector(
        ".string-selector-input",
    ) as HTMLInputElement;

    /**
     * The timeout to ensure the event is only fired off once the user has
     * stopped typing for at least 3 seconds. This is to avoid
     * overwhelming/over-triggering saves and applying config changes repeatedly
     * and constantly every time, and depending on the person typing, there may
     * be different delays and timings between each key press, etc. So, this
     * delay, set to 3 seconds, accounts for all of that and only fires off a
     * config change event after 3 seconds without an input change, accounting
     * for all speeds of typing and ensuring that save triggers do not get fired
     * off repeatedly, especially not faster than the dashboard's auto-save
     * delay.
     */
    let emitSignalTimeout: NodeJS.Timeout;
    textInput.addEventListener("input", () => {
        // ? We clear the timeout and set it again to ensure that we continue
        // ? to wait for 3 seconds after the last input from the user
        clearTimeout(emitSignalTimeout);

        emitSignalTimeout = setTimeout(() => {
            // ? We fire a config change event, the detail of which holds
            // ? the config setting changed, as well as the value of the text input.
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
        }, 3000);
    });
}

/**
 * Updates the slider/range selector's `--fill-amount` property, which is used
 * throughout its styles to affect multiple things.
 *
 * @remarks
 * This is called every time the slider is changed, ensuring that the style
 * (fill, glow, etc.) are always perfectly in sync with the slider as its values
 * change
 *
 * @param slider - The slider/range selector's range input.
 */
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
    initDropdownSelector,
    initRangeSelector,
    initStringSelector,
    initToggleSelector,
};
