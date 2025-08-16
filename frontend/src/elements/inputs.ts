import * as Config from "../classes/config/config_entry_type";

const dropdownSelectorTemplate = `
        <div class="dropdown-selector selector" data-config-property="Wee">
            <div class="selection glassy">
                <span class="selection-text">Fo</span>
                <div
                    class="menu-caret icon"
                    style="
                        --icon-svg: url(../assets/graphics/angle-small-right.svg);
                    "
                ></div>
            </div>
            <ul class="dropdown-list glassy">
                <li data-config-value="fee1" class="dropdown-item">
                    <div class="item-content">
                        <span class="item-text">Fee</span>
                        <div
                            class="icon selected-icon visible"
                            style="
                                --icon-svg: url(../assets/graphics/hand-back-point-left.svg);
                            "
                        ></div>
                    </div>
                </li>
                <li data-config-value="fee2" class="dropdown-item">
                    <div class="item-content">
                        <span class="item-text">Fi</span>
                        <div
                            class="icon selected-icon visible"
                            style="
                                --icon-svg: url(../assets/graphics/hand-back-point-left.svg);
                            "
                        ></div>
                    </div>
                </li>
                <li data-config-value="fee3" class="dropdown-item selected">
                    <div class="item-content">
                        <span class="item-text">Fo</span>
                        <div
                            class="icon selected-icon visible"
                            style="
                                --icon-svg: url(../assets/graphics/hand-back-point-left.svg);
                            "
                        ></div>
                    </div>
                </li>
                <li data-config-value="fee4" class="dropdown-item">
                    <div class="item-content">
                        <span class="item-text">Fum</span>
                        <div
                            class="icon selected-icon visible"
                            style="
                                --icon-svg: url(../assets/graphics/hand-back-point-left.svg);
                            "
                        ></div>
                    </div>
                </li>
            </ul>
        </div>`;

const toggleSelectorTemplate = `
        <div class="toggle-selector selector" data-config-property="Mama">
            <input type="checkbox" id="toggle" class="toggle-checkbox" />
            <label for="toggle" class="toggle-checkbox-background">
                <div class="toggle-checkbox-button"></div>
            </label>
        </div>
`;

const rangeSelectorTemplate = `
        <div class="range-selector selector">
            <label class="range-selector-label" for=""
                ><span class="range-selector-text">1500</span></label
            >
            <input
                class="range-slider"
                type="range"
                name=""
                id="range"
                min="10"
                max="30"
                value="15"
                step="0.05"
            />
        </div>
`;

const textSelectorTemplate = `

        

        <div class="text-selector selector">
            <input
                class="text-selector-input"
                type="text"
                name="text-input"
                id="text"
                required
            />
            <label class="text-selector-label" for="text">
                <span class="text-selector-label-text">Name</span>
            </label>
        </div>`;

const dropdownSelectors: HTMLElement[] = [
    ...(document.querySelectorAll(
        ".dropdown-selector",
    ) as NodeListOf<HTMLElement>),
];

let optionEventListener: (e: MouseEvent) => void,
    previouslyFocusedSelector: HTMLElement,
    selectionText: HTMLSpanElement,
    dropdownOptions: HTMLElement[],
    lastActive: HTMLElement;

dropdownSelectors.forEach((selector: HTMLElement) => {
    selector.addEventListener("mousedown", () => {
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
                optionEventListener = (e: MouseEvent): void => {
                    e.stopPropagation();
                    selectionText.textContent = option.textContent;
                    if (lastActive && lastActive != option) {
                        lastActive.classList.remove("selected");
                    }
                    option.classList.add("selected");
                    lastActive = option;
                    // console.log(selector.dataset.configProperty + " : " + option.dataset.configValue);
                };
                option.addEventListener("mousedown", optionEventListener);
            });
        } else {
            dropdownOptions.forEach((option) => {
                option.removeEventListener("mousedown", optionEventListener);
            });
        }
    });
});

const toggleSelectors = document.querySelectorAll(".toggle-selector");

toggleSelectors.forEach((selector) => {
    selector.addEventListener("mouseup", () => {
        // const checkbox = selector.querySelector("#toggle");
        // setTimeout(() => {
        //     console.log(selector.dataset.configProperty, checkbox.checked)
        // }, 0);
    });
});

const rangeSelectors: HTMLElement[] = [
    ...(document.querySelectorAll(
        ".range-selector",
    ) as NodeListOf<HTMLElement>),
];

rangeSelectors.forEach((selector: HTMLElement) => {
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
});

function updateSliderStyle(slider: HTMLInputElement): void {
    slider.parentElement?.style.setProperty(
        "--fill-amount",
        (
            (parseFloat(slider.value) - parseFloat(slider.min))
            / (parseFloat(slider.max) - parseFloat(slider.min))
        ).toString(),
    );
}

function buildEntrySelector(entry: Config.Entry): HTMLElement {
    console.log(entry);
    return document.createElement("div");
}

export {
    buildEntrySelector,
    dropdownSelectorTemplate,
    toggleSelectorTemplate,
    rangeSelectorTemplate,
    textSelectorTemplate,
};
