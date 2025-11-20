/**
 * This file contains the behaviour functions for the Clock PanelType.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import {
    type Config,
    type ConfigChangeEventDetail,
    getDefaultConfig,
} from "../../config/config.js";

import type * as ConfigEntry from "../../config/config_entry.js";
import type { Panel } from "../panel.js";
import { PanelType, PanelTypeConfig } from "../panel_type.js";

// eslint-disable-next-line jsdoc/require-example
/**
 * The main function called upon behaviour execution after the Panel template,
 * base, and config setup, for the Clock PanelType.
 *
 * @remarks
 * Any necessary validations are done to check that the panel type, config, and
 * key elements are properly set up. Then, config change event listeners are
 * setup. Finally, the behaviour is initiated. For this panel type, we update
 * the time and date text upon first loading, after which we update the clock
 * and date every 100ms. This is simpler and cheaper than using RAF
 * (RequestAnimationFrame), and provides enough accuracy to be passable, with a
 * maximum of 100ms of delay.
 *
 * @param panel - The panel whose behaviour is being executed through this
 *   function.
 *
 * @see {@link updateTimeAndDate | updateTimeAndDate()}
 */
function execute(panel: Panel): void {
    // ? If anything is not as it should be, abort
    if (
        panel.getType() != PanelType.CLOCK
        || !panel.getKeyElement("date_text")
        || !panel.getKeyElement("time_text")
    )
        return;

    // ? Get the font size coefficient based on the config options, shrinking the text
    // ? if either the seconds are shown, or 12 hour time is used, or both, ensuring
    // ? the clock still fits comfortably.
    panel.style.setProperty(
        "--size-coeff",
        getSizeCoefficient(panel.getConfig()).toString(),
    );

    // ? Add the config change listener to handle any setting changes
    panel.addEventListener("configchange", (e) => {
        const customEventParsed: CustomEvent<ConfigChangeEventDetail> =
            e as CustomEvent<ConfigChangeEventDetail>;
        const panelConfig: Config | undefined = panel.getConfig();
        // ? Adjust the size coefficient based on the new config, if a config option
        // ? that affects the length of the time text is the one changed.
        if (
            panelConfig
            && (customEventParsed.detail.setting == "showSeconds"
                || customEventParsed.detail.setting == "use24HrTime")
        ) {
            panel.style.setProperty(
                "--size-coeff",
                getSizeCoefficient(panel.getConfig()).toString(),
            );
        }
    });

    // ? Begin the time updating loop
    updateTimeAndDate(
        panel,
        panel.getKeyElement("date_text") as HTMLElement,
        panel.getKeyElement("time_text") as HTMLElement,
    );
}

/**
 * Get a formatted string containing the time from a `Date` object based on an
 * inputted Config.
 *
 * @param   time    - The JS/TS Date holding the time to format.
 * @param   options - The Config object holding all options for the time format.
 *
 * @returns         The formatted time based on the options.
 *
 * @example
 *
 * ```ts
 * formatTime(new Date(),
 *          {
 *              use24HrTime: { label: "Use 24 Hour Time", value: true },
 *              showSeconds: { label: "Show seconds", value: true }
 *              // [...] Other config options
 *          }
 *          );
 * ```
 *
 * The above returns the current time as a string (creating a `new Date()`
 * creates one holding the current time), including the seconds and expressed in
 * 24 hour time. At the time of writing this comment, for example, the output
 * would be "00:10:24".
 *
 * @see {@link formatDate | formatDate()}
 * @see {@link updateTimeAndDate | updateTimeAndDate()}
 */
function formatTime(time: Date, options?: Config): string {
    // ? If the panel config is available, use the value inputted.
    // ? If it is not passed correctly, the default value is used.
    return time
        .toLocaleTimeString("en-gb", {
            hour12: !(
                (options?.use24HrTime as ConfigEntry.Boolean).value
                ?? (
                    getDefaultConfig(PanelTypeConfig.CLOCK.getConfig())
                        ?.use24Hr as ConfigEntry.Boolean
                ).value
            ),
            timeStyle: (options?.showSeconds as ConfigEntry.Boolean).value
                ? "medium"
                : "short",
        })
        .toUpperCase();
    // const hours: number = time.getHours();
    // const minutes: number = time.getMinutes();
    // const seconds: number = time.getSeconds();
    // return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Get a formatted string containing the date from a `Date` object based on an
 * inputted Config.
 *
 * @param   time    - The JS/TS Date holding the date to format.
 * @param   options - The Config object holding all options for the date format.
 *
 * @returns         The formatted date based on the options.
 *
 * @example
 *
 * ```ts
 * formatDate(new Date(), {
 *     dateFormat: {
 *         label: "Date Format",
 *         value: "short",
 *         possibleOptions: [
 *             { optionLabel: "Full, including weekday", optionValue: "full" },
 *             { optionLabel: "Short, DD/MM/YYYY", optionValue: "short" },
 *             // [...] Other potential values
 *         ],
 *     },
 *     // [...] Other config options
 * });
 * ```
 *
 * The above returns the current date as a string (creating a `new Date()`
 * creates one holding the current time), in the short `DD/MM/YYY` format. At
 * the time of writing this comment, for example, the output would be
 * "15/11/2025".
 */
function formatDate(time: Date, options?: Config): string {
    // ? If the panel config is available, use the values inputted.
    // ? If it is not passed correctly, the default values are used.
    return time.toLocaleDateString("en-gb", {
        dateStyle: ((options?.dateFormat as ConfigEntry.ListSelection).value
            ?? (
                getDefaultConfig(PanelTypeConfig.CLOCK.getConfig())
                    ?.dateFormat as ConfigEntry.ListSelection
            ).value) as "full" | "long" | "short",
        localeMatcher: "best fit",
    });
    // const weekday = time.getDay();
    // const day = time.getDate();
    // const month = time.getMonth();
    // const year = time.getFullYear();
    // return `${weekdays[weekday]}, ${months[month]} ${day}, ${year}`;
}

// eslint-disable-next-line jsdoc/require-example
/**
 * Begins the time/date updating loop, and calls itself.
 *
 * @param panel    - The Panel with the elements and the Config needed.
 * @param dateText - The container for the Date text in the Panel.
 * @param timeText - The container for the Time text in the Panel.
 */
function updateTimeAndDate(
    panel: Panel,
    dateText: HTMLSpanElement | null,
    timeText: HTMLSpanElement | null,
): void {
    // ? Get the current time
    const now: Date = new Date();

    // ? Show or hide the Date text depending on the config.
    dateText?.style.setProperty(
        "display",
        (panel.getConfig()?.showDate as ConfigEntry.Boolean).value
            ? "inline"
            : "none",
    );

    // ? Populate the date text with the formatted date.
    if (dateText) dateText.textContent = formatDate(now, panel.getConfig());

    // ? Populate the time text with the formatted time.
    if (timeText) timeText.textContent = formatTime(now, panel.getConfig());

    // ? After a delay, call this function again, starting a continuous time update loop.
    setTimeout(() => {
        updateTimeAndDate(panel, dateText, timeText);
    }, 100);
}

/**
 * Gets the current font size coefficient based on the inputted Config.
 *
 * @remarks
 * If either seconds are shown or 12 hour time is used (hence needing PM and
 * AM), then the text is slightly smaller, but if both are true, it is notably
 * smaller.
 *
 * @param   config - The Config options/settings to extract the font size
 *   coefficient from.
 *
 * @returns        The font size coefficient needed.
 *
 * @example
 *
 * ```ts
 * console.log(getSizeCoefficient({
 *     use24Hr: {
 *         label: "Use 24 Hour Time",
 *         value: true,
 *     },
 *     showSeconds: {
 *         label: "Show seconds",
 *         value: true,
 *     },
 *     // [...] More config options
 * }));
 * ```
 *
 * The above outputs a size coefficient of 0.5, as we are using 24 hour time but
 * showing seconds.
 */
function getSizeCoefficient(config: Config | undefined): number {
    if (
        (config?.showSeconds as ConfigEntry.Boolean).value
        && !(config?.use24HrTime as ConfigEntry.Boolean).value
    )
        return 0.35;
    else if (
        (config?.showSeconds as ConfigEntry.Boolean).value
        || !(config?.use24HrTime as ConfigEntry.Boolean).value
    )
        return 0.5;
    else return 1;
}

export { execute };
