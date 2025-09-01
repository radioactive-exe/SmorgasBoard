import * as ClockPanel from "../panel_behaviour/clock_panel.js";

const PanelTypeBehaviour = {
    NONE: null,
    CLOCK: ClockPanel.execute,
} as const;

export { PanelTypeBehaviour };
