import * as ClockPanel from "../panel_behaviour/clock_panel.js";
import * as NotepadPanel from "../panel_behaviour/notepad_panel.js";
import * as PhotoPanel from "../panel_behaviour/photo_panel.js";

const PanelTypeBehaviour = {
    NONE: null,
    CLOCK: ClockPanel.execute,
    NOTEPAD: NotepadPanel.execute,
    PHOTO: PhotoPanel.execute,
} as const;

export { PanelTypeBehaviour };
