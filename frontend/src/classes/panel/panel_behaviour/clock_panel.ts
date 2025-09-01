import { Config } from "../../config/config.js";
import * as ConfigEntry from "../../config/config_entry.js";
import { Panel } from "../panel.js";

function execute(panel: Panel): void {
    const dateText: HTMLSpanElement | null = panel.querySelector(".date-text");
    const timeText: HTMLSpanElement | null = panel.querySelector(".time-text");
    updateTimeAndDate(panel, dateText, timeText);
}

function formatTime(time: Date, options: Config): string {
    return time.toLocaleTimeString("en-gb", {
        hour12: !(options?.use24HrTime as ConfigEntry.Boolean).value,
        timeStyle: (options?.showSeconds as ConfigEntry.Boolean).value
            ? "medium"
            : "short",
    });
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
    }, 1000);
}

export { execute };
