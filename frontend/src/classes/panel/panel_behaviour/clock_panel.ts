import type { Config, ConfigChangeEventDetail } from "../../config/config.js";
import type * as ConfigEntry from "../../config/config_entry.js";
import type { Panel } from "../panel.js";
import { PanelType } from "../panel_type.js";

function execute(panel: Panel): void {
    if (
        panel.getType() != PanelType.CLOCK
        || !panel.getKeyElement("date_text")
        || !panel.getKeyElement("time_text")
    )
        return;
    panel.style.setProperty(
        "--size-coeff",
        getSizeCoefficient(panel.getConfig()).toString(),
    );

    panel.addEventListener("configchange", (e) => {
        const customEventParsed: CustomEvent<ConfigChangeEventDetail> =
            e as CustomEvent<ConfigChangeEventDetail>;
        const panelConfig: Config | undefined = panel.getConfig();
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

    updateTimeAndDate(
        panel,
        panel.getKeyElement("date_text") as HTMLElement,
        panel.getKeyElement("time_text") as HTMLElement,
    );
}

function formatTime(time: Date, options: Config): string {
    return time
        .toLocaleTimeString("en-gb", {
            hour12: !(options?.use24HrTime as ConfigEntry.Boolean).value,
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

function formatDate(time: Date, options?: Config): string {
    return time.toLocaleDateString("en-gb", {
        dateStyle: (options?.dateFormat as ConfigEntry.ListSelection).value as
            | "full"
            | "long"
            | "short",
        localeMatcher: "best fit",
    });
    // const weekday = time.getDay();
    // const day = time.getDate();
    // const month = time.getMonth();
    // const year = time.getFullYear();
    // return `${weekdays[weekday]}, ${months[month]} ${day}, ${year}`;
}

function updateTimeAndDate(
    panel: Panel,
    dateText: HTMLSpanElement | null,
    timeText: HTMLSpanElement | null,
): void {
    const now: Date = new Date();
    if (dateText) {
        dateText.textContent = formatDate(now, panel.getConfig());
    }
    dateText?.style.setProperty(
        "display",
        (panel.getConfig()?.showDate as ConfigEntry.Boolean).value
            ? "inline"
            : "none",
    );
    if (timeText)
        timeText.textContent = formatTime(now, panel.getConfig() as Config);
    setTimeout(() => {
        updateTimeAndDate(panel, dateText, timeText);
    }, 100);
}

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
