import zod from "zod";

import { isValidOption } from "../../../functions/util.js";
import * as ConfigEntry from "../../config/config_entry.js";


class PanelTypeConfig {
    public static readonly NONE: undefined = undefined;
    public static readonly CLOCK: PanelTypeConfig = new PanelTypeConfig(
        zod.strictObject({
            use24HrTime: zod.custom<ConfigEntry.Boolean>().default({
                label: "Use 24-hour Time",
                value: true,
            }),
            showSeconds: zod.custom<ConfigEntry.Boolean>().default({
                label: "Show Seconds",
                value: false,
            }),
            showDate: zod.custom<ConfigEntry.Boolean>().default({
                label: "Show Date above Time",
                value: true,
            }),
            dateFormat: zod
                .custom<ConfigEntry.ListSelection>((entry) => {
                    const options: ConfigEntry.ListSelectionOption[] = [
                        {
                            optionLabel: "Full, including weekday",
                            optionValue: "full",
                        },
                        {
                            optionLabel: "Long - Month is spelled out",
                            optionValue: "long",
                        },
                        {
                            optionLabel: "Short - DD/MM/YYYY",
                            optionValue: "short",
                        },
                    ];
                    return isValidOption(
                        options,
                        (entry as ConfigEntry.ListSelection).value,
                    );
                })
                .default({
                    label: "Date Format (if shown)",
                    value: "full",
                    possibleOptions: [
                        {
                            optionLabel: "Full, including weekday",
                            optionValue: "full",
                        },
                        {
                            optionLabel: "Long - Month is spelled out",
                            optionValue: "long",
                        },
                        {
                            optionLabel: "Short - DD/MM/YYYY",
                            optionValue: "short",
                        },
                    ],
                }),
        }),
    );

    private constructor(private config: zod.ZodObject) {
    }

    public getConfig(): zod.ZodObject {
        return this.config;
    }
}

export {
    PanelTypeConfig
}