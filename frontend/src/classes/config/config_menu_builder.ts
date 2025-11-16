/**
 * This file contains all the logic and functions for procedurally generating a
 * config menu from a given Config object.
 *
 * @remarks
 * This file contains simple code, yet is one of my proudest parts of this
 * entire project, as it has provided immaculate scalability, allowing me to
 * simply define a config schema in a few lines and have a perfectly functional
 * config menu generated for any new panel type I wish to implement.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 *
 * @see {@link ConfigEntry | All Config Entry types and objects}
 * @see {@link Config | The Config object type}
 */

/** File Header Delimiter. */

import {
    initDropdownSelector,
    initRangeSelector,
    initStringSelector,
    initToggleSelector,
} from "../../elements/inputs.js";

import { getOptionLabelFromList } from "../../functions/util.js";

import type { Config } from "./config.js";
import * as ConfigEntry from "./config_entry.js";

/**
 * The entry point for the Config Menu building process.
 *
 * @remarks
 * This function receives the Config object and calls and compiles the built
 * menu entries for each constituent config item into one UList element. It
 * calls the selector building function
 * ({@link builtEntrySelector | builtEntrySelector()}) and also appends the
 * option label.
 *
 * @param   config - The Config object to generate a menu based off of.
 *
 * @returns        The built and compiled UList element containing an LI element
 *   for each config entry, complete with a label and the relevant selector, all
 *   of which have the needed listeners and behaviour.
 *
 * @example
 *
 * ```ts
 * panel.appendChild(configMenu(
 *      {
 *          use24Hr: {
 *              label: "Use 24 Hour time",
 *              value: true
 *          },
 *          decimalPlaces: {
 *              label: "Number of decimal places",
 *              value: 2,
 *              range : {
 *                  min: 0,
 *                  max: 4,
 *                  step: 1
 *              }
 *          },
 *
 *      }
 * ))
 * ```
 */
function configMenu(config: Config): HTMLUListElement {
    // ? Instantiates the UL/container
    const lineList: HTMLUListElement = document.createElement("ul");
    lineList.classList.add("config-menu-list");

    // ? Goes through each config property/entry
    Object.entries(config as Config).forEach((entry) => {
        // ? Creates the menu line, which holds all necessary classes
        const line: HTMLLIElement = document.createElement("li");
        line.classList.add("config-menu-line");
        line.part.add("config-menu-line");

        // ? As well as the label of the config option
        const label: HTMLSpanElement = document.createElement("span");
        label.classList.add("line-label");
        label.part.add("line-label");
        label.textContent = (entry as [string, ConfigEntry.Entry])[1].label;
        line.appendChild(label);

        // ? And the built/initiated selector for the config option
        line.appendChild(
            builtEntrySelector(entry as [string, ConfigEntry.Entry]),
        );

        // ? Finally, the formulated config menu line is appended to the list/container.
        lineList.appendChild(line);
    });
    return lineList;
}

/**
 * Redirects all calls for built config entry selectors to the properly-typed
 * builder function.
 *
 * @remarks
 * The config entry is parsed using the defined Zod schemas, upon which we
 * redirect the call to the proper builder function with the entry explicitly
 * cast as that config entry type.
 *
 * @param   entry - The config entry container, consisting of the config
 *   property that this selector will target, and the entry itself, which holds
 *   the label and value(s) of the entry.
 *
 * @returns       The built/compiled selector for the inputted config entry.
 *
 * @example
 *
 * ```ts
 * const builtInput = builtEntrySelector(["use24Hr", {
 *                                          label: "Use 24 Hour Time",
 *                                          value: true
 *                                      }]);
 * configMenuLine.appendChild(builtInput);
 * ```
 *
 * The above builds a config selector (in this case a BooleanEntry selector) and
 * appends it to the config menu line.
 *
 * @see {@link ConfigEntry.Entry | ConfigEntry}
 * @see {@link buildBooleanEntrySelector | Boolean Entry selector builder function}
 * @see {@link buildNumberEntrySelector | Number Entry selector builder function}
 * @see {@link buildStringEntrySelector | String Entry selector builder function}
 * @see {@link buildListEntrySelector | List Entry selector builder function}
 */
function builtEntrySelector(entry: [string, ConfigEntry.Entry]): HTMLElement {
    // * The empty box to start building into
    let builtInput: HTMLElement = document.createElement("div");

    // ? If it is a Boolean/Toggle Config entry
    if (ConfigEntry.BooleanObject.safeParse(entry[1]).success)
        builtInput = buildBooleanEntrySelector(entry[1] as ConfigEntry.Boolean);
    // ? If it is a Number/Range Config entry
    else if (ConfigEntry.NumberObject.safeParse(entry[1]).success)
        builtInput = buildNumberEntrySelector(entry[1] as ConfigEntry.Number);
    // ? If it is a List/Dropdown Config entry
    else if (ConfigEntry.ListSelectionObject.safeParse(entry[1]).success)
        builtInput = buildListEntrySelector(
            entry[1] as ConfigEntry.ListSelection,
        );
    // ? If it is a String/Text Config entry
    else if (ConfigEntry.StringObject.safeParse(entry[1]).success)
        builtInput = buildStringEntrySelector(entry[1] as ConfigEntry.String);
    // ? If it is somehow none of the above
    else
        throw new Error(
            "Invalid Config Entry sent. The below was sent:\n" + entry[1],
        );

    // ? The config property that this built selector will be responsible for setting/changing
    builtInput.dataset.configProperty = entry[0];

    return builtInput;
}

/**
 * The builder function for a Boolean Config Entry selector, called from the
 * base redirector function.
 *
 * @param   entry - The ConfigEntry itself, in this case one of a Boolean/Toggle
 *   type.
 *
 * @returns       The built selector for the inputted entry.
 *
 * @example
 *
 * ```ts
 * const builtInput = buildBooleanEntrySelector({
 *                                                  label: "Use 24 Hour Time",
 *                                                  value: true
 *                                              });
 * configMenuLine.appendChild(builtInput);
 *
 * ```
 *
 * Builds the appropriate Boolean selector for the `use24Hr` Config option.
 *
 * @see {@link builtEntrySelector | The base Builder redirector function}
 * @see {@link buildNumberEntrySelector | Number Entry selector builder function}
 * @see {@link buildStringEntrySelector | String Entry selector builder function}
 * @see {@link buildListEntrySelector | List Entry selector builder function}
 */
function buildBooleanEntrySelector(entry: ConfigEntry.Boolean): HTMLElement {
    // ? Creating the container element
    const toggleSelector: HTMLDivElement = document.createElement("div");
    toggleSelector.classList.add("toggle-selector", "selector");

    // ? Filling out the selector container
    toggleSelector.innerHTML = `
        <label class="toggle-checkbox-background">
            <input type="checkbox" id="toggle" class="toggle-checkbox" />
            <div class="toggle-checkbox-button"></div>
        </label>
    `;

    const checkbox: HTMLInputElement = toggleSelector.querySelector(
        ".toggle-checkbox",
    ) as HTMLInputElement;

    // ? Setting the checkbox to reflect the config option value
    checkbox.checked = entry.value;

    // ? Calls the function that initiates all listeners and config change events
    // ? for the Toggle/Boolean selector.
    initToggleSelector(toggleSelector);

    return toggleSelector;
}

/**
 * The builder function for a Number Config Entry selector, called from the base
 * redirector function.
 *
 * @param   entry - The ConfigEntry itself, in this case one of a Number/Range
 *   type.
 *
 * @returns       The built selector for the inputted entry.
 *
 * @example
 *
 * ```ts
 * const builtInput = buildNumberEntrySelector({
 *                                                  label: "Number of decimal places",
 *                                                  value: 2,
 *                                                  range : {
 *                                                      min: 0,
 *                                                      max: 4,
 *                                                      step: 1
 *                                                  }
 *                                             });
 * configMenuLine.appendChild(builtInput);
 *
 * ```
 *
 * Builds the appropriate Number selector for the `decimalPlaces` Config option.
 *
 * @see {@link builtEntrySelector | The base Builder redirector function}
 * @see {@link buildBooleanEntrySelector | Boolean Entry selector builder function}
 * @see {@link buildStringEntrySelector | String Entry selector builder function}
 * @see {@link buildListEntrySelector | List Entry selector builder function}
 */
function buildNumberEntrySelector(entry: ConfigEntry.Number): HTMLElement {
    // ? Creating the container element
    const rangeSelector: HTMLDivElement = document.createElement("div");
    rangeSelector.classList.add("range-selector", "selector");

    // ? Filling out the selector container, along with all necessary information
    // ? including the maximum, minimum, step size, and the current entry value,
    // ? to reflect the config option setting.
    rangeSelector.innerHTML = `
        <label class="range-selector-label">
            <p><span class="range-selector-text">1500</span></p>
            <input
                class="range-slider"
                type="range"
                min="${entry.range.min}"
                max="${entry.range.max}"
                value="${entry.value}"
                step="${entry.range.step ?? 0.05}"
            />
        </label>
    `;

    // ? Calls the function that initiates all listeners and config change events
    // ? for the Range/Number selector.
    initRangeSelector(rangeSelector);

    return rangeSelector;
}

/**
 * The builder function for a String Config Entry selector, called from the base
 * redirector function.
 *
 * @param   entry - The ConfigEntry itself, in this case one of a String/Text
 *   type.
 *
 * @returns       The built selector for the inputted entry.
 *
 * @example
 *
 * ```ts
 * const builtInput = buildStringEntrySelector({
 *                                                  label: "Custom List Title",
 *                                                  value: "Groceries",
 *                                                  placeholder: "To-Do List"
 *                                             });
 * configMenuLine.appendChild(builtInput);
 *
 * ```
 *
 * Builds the appropriate String selector for the `listTitle` Config option.
 *
 * @see {@link builtEntrySelector | The base Builder redirector function}
 * @see {@link buildBooleanEntrySelector | Boolean Entry selector builder function}
 * @see {@link buildNumberEntrySelector | Number Entry selector builder function}
 * @see {@link buildListEntrySelector | List Entry selector builder function}
 */
function buildStringEntrySelector(entry: ConfigEntry.String): HTMLElement {
    // ? Creating the container element
    const stringSelector: HTMLDivElement = document.createElement("div");
    stringSelector.classList.add("string-selector", "selector");

    // ? Filling out the selector container, along with the placeholder and
    // ? current config option value.
    stringSelector.innerHTML = `
        <label class="string-selector-label">
            <input
                class="string-selector-input"
                type="text"
                required
                value="${entry.value}"
            />
            <span class="string-selector-label-text">${entry.placeholder}</span>
        </label>
    `;

    // ? Calls the function that initiates all listeners and config change events
    // ? for the Text/String selector.
    initStringSelector(stringSelector);

    return stringSelector;
}

/**
 * The builder function for a List Config Entry selector, called from the base
 * redirector function.
 *
 * @param   entry - The ConfigEntry itself, in this case one of a List/Dropdown
 *   type.
 *
 * @returns       The built selector for the inputted entry.
 *
 * @example
 *
 * ```ts
 * const potentialOptions: ListSelectionOption[] = [
 *     {
 *         optionLabel: "Full format, with Weekday",
 *         optionValue: "full",
 *     },
 *     {
 *         optionLabel: "Long format, with Month",
 *         optionValue: "long",
 *     },
 *     {
 *         optionLabel: "Short format - DD/MM/YYYY",
 *         optionValue: "short",
 *     },
 * ];
 * const builtInput = buildListEntrySelector({
 *     label: "Date Format",
 *     value: "short",
 *     possibleOptions: potentialOptions,
 * });
 * configMenuLine.appendChild(builtInput);
 *
 * ```
 *
 * Builds the appropriate List selector for the `dateFormat` Config option.
 *
 * @see {@link builtEntrySelector | The base Builder redirector function}
 * @see {@link buildBooleanEntrySelector | Boolean Entry selector builder function}
 * @see {@link buildNumberEntrySelector | Number Entry selector builder function}
 * @see {@link buildStringEntrySelector | String Entry selector builder function}
 */
function buildListEntrySelector(entry: ConfigEntry.ListSelection): HTMLElement {
    // ? Creating the selector container
    const dropdownSelector: HTMLDivElement = document.createElement("div");
    dropdownSelector.classList.add("dropdown-selector", "selector");

    // ? Filling the selector container, along with the label of the current
    // ? selected option from the potential options in the list
    dropdownSelector.innerHTML = `
        <div class="selection">
            <p><span class="selection-text">${getOptionLabelFromList(entry.possibleOptions, entry.value)}</span></p>
            <div class="menu-caret icon"></div>
        </div>
        <ul class="dropdown-list">
        </ul>
    `;

    // ? Querying the UList element inside the dropdown selector
    const dropdownList: HTMLElement = dropdownSelector.querySelector(
        ".dropdown-list",
    ) as HTMLElement;

    // ? Iterating over each option in the potential options
    entry.possibleOptions.forEach((option) => {
        // ? Checking if the current option is the selected one (1/2)
        const isSelected: boolean = option.optionValue == entry.value;

        // ? Adding a LI element to the dropdown UList element with the option value and label set,
        // ? as well as utilising the check mentioned above to set the LI's `selected` class and
        // ? the visibility of the small selection indicator
        dropdownList.innerHTML += `
            <li data-config-value="${option.optionValue}" class="dropdown-item${isSelected ? " selected" : ""}">
                <div class="item-content">
                    <p><span class="item-text">${option.optionLabel}</span></p>
                    <div class="icon selected-icon${isSelected ? " visible" : ""}"></div>
                </div>
            </li>
        `;
    });

    // ? Calls the function that initiates all listeners and config change events
    // ? for the List/Dropdown selector.
    initDropdownSelector(dropdownSelector);

    return dropdownSelector;
}

export { configMenu };
