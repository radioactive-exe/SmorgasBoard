import * as ConfigEntry from "./config_entry";
import {
    addDropdownSelectorListeners,
    addRangeSelectorListeners,
    addToggleSelectorListeners,
} from "../../elements/inputs";
import { Config } from "./config";
import { getOptionLabelFromList } from "../../functions/util";

function configMenu(config: Config): HTMLUListElement {
    const lineList: HTMLUListElement = document.createElement("ul");
    lineList.classList.add("config-menu-list");
    Object.entries(config as Config).forEach((entry) => {
        const line: HTMLLIElement = document.createElement("li");
        line.classList.add("config-menu-line");
        const label: HTMLSpanElement = document.createElement("span");
        label.classList.add("line-label");
        label.textContent = (entry as [string, ConfigEntry.Entry])[1].label;
        line.appendChild(label);
        line.appendChild(builtEntryInput(entry as [string, ConfigEntry.Entry]));

        lineList.appendChild(line);
    });
    return lineList;
}

function builtEntryInput(entry: [string, ConfigEntry.Entry]): HTMLElement {
    let builtInput: HTMLElement = document.createElement("div");
    if (ConfigEntry.BooleanObject.safeParse(entry[1]).success)
        builtInput = builtBooleanEntryInput(entry[1] as ConfigEntry.Boolean);
    else if (ConfigEntry.NumberObject.safeParse(entry[1]).success)
        builtInput = builtNumberEntryInput(entry[1] as ConfigEntry.Number);
    else if (ConfigEntry.ListSelectionObject.safeParse(entry[1]).success)
        builtInput = builtListEntryInput(entry[1] as ConfigEntry.ListSelection);
    else if (ConfigEntry.StringObject.safeParse(entry[1]).success)
        builtInput = builtStringEntryInput(entry[1] as ConfigEntry.String);
    else
        console.error(
            "Invalid Config Entry sent.",
            entry[1],
            "The above was sent.",
        );

    builtInput.dataset.configProperty = entry[0];
    return builtInput;
}

function builtBooleanEntryInput(entry: ConfigEntry.Boolean): HTMLElement {
    const toggleSelector: HTMLDivElement = document.createElement("div");
    toggleSelector.classList.add("toggle-selector", "selector");

    toggleSelector.innerHTML = `
        <input type="checkbox" id="toggle" class="toggle-checkbox" />
        <label for="toggle" class="toggle-checkbox-background">
            <div class="toggle-checkbox-button"></div>
        </label>
    `;

    const checkbox: HTMLInputElement = toggleSelector.querySelector(
        ".toggle-checkbox",
    ) as HTMLInputElement;
    checkbox.checked = entry.value;

    addToggleSelectorListeners(toggleSelector);

    return toggleSelector;
}

function builtNumberEntryInput(entry: ConfigEntry.Number): HTMLElement {
    const rangeSelector: HTMLDivElement = document.createElement("div");
    rangeSelector.classList.add("range-selector", "selector");

    rangeSelector.innerHTML = `
        <label class="range-selector-label" for="">
            <span class="range-selector-text">1500</span>
        </label>
        <input
            class="range-slider"
            type="range"
            name=""
            id="range"
            min="${entry.range.min}"
            max="${entry.range.min}"
            value="${entry.value}"
            step="${entry.range.step ?? 0.05}"
        />
    `;

    addRangeSelectorListeners(rangeSelector);

    return document.createElement("div");
}

function builtStringEntryInput(entry: ConfigEntry.String): HTMLElement {
    const stringSelector: HTMLDivElement = document.createElement("div");
    stringSelector.classList.add("text-selector", "selector");

    stringSelector.innerHTML = `
        <input
            class="text-selector-input"
            type="text"
            id="text"
            required
        />
        <label class="text-selector-label" for="text">
            <span class="text-selector-label-text">${entry.placeholder}</span>
        </label>
    `;

    // addStringSelectorListeners(stringSelector);

    return stringSelector;
}

function builtListEntryInput(entry: ConfigEntry.ListSelection): HTMLElement {
    const dropdownSelector: HTMLDivElement = document.createElement("div");
    dropdownSelector.classList.add("dropdown-selector", "selector");

    dropdownSelector.innerHTML = `
        <div class="selection glassy">
            <span class="selection-text">${getOptionLabelFromList(entry.possibleOptions, entry.value)}</span>
            <div class="menu-caret icon"></div>
        </div>
        <ul class="dropdown-list glassy">
        </ul>
    `;

    const dropdownList: HTMLElement = dropdownSelector.querySelector(
        ".dropdown-list",
    ) as HTMLElement;

    entry.possibleOptions.forEach((option) => {
        dropdownList.innerHTML += `
            <li data-config-value="${option.optionValue}" class="dropdown-item${option.optionValue == entry.value ? " selected" : ""}">
                <div class="item-content">
                    <span class="item-text">${option.optionLabel}</span>
                    <div class="icon selected-icon visible"></div>
                </div>
            </li>
        `;
    });

    addDropdownSelectorListeners(dropdownSelector);

    return dropdownSelector;
}

export { configMenu };
