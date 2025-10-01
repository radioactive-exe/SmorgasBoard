import * as ClockPanel from "../panel_behaviour/clock_panel.js";
import * as NotepadPanel from "../panel_behaviour/notepad_panel.js";

const PanelTypeBehaviour = {
    NONE: null,
    CLOCK: ClockPanel.execute,
    NOTEPAD: NotepadPanel.execute,
} as const;

export { PanelTypeBehaviour };
