/**
 * This file contains the definitions for the PanelType Behaviour, linking each
 * executing function with the relevant PanelType.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import * as ClockPanel from "../panel_behaviour/clock_panel.js";
import * as NotepadPanel from "../panel_behaviour/notepad_panel.js";
import * as PhotoPanel from "../panel_behaviour/photo_panel.js";
import * as TodoPanel from "../panel_behaviour/todo_panel.js";
import * as WeatherPanel from "../panel_behaviour/weather_panel.js";

/**
 * The Property object for PanelType Behaviour. Each PanelType is given its
 * executing function from the `panel_behaviour` sibling folder to the current
 * `panel_type_properties` folder.
 *
 * @remarks
 * {@link PanelTypeBehaviour.NONE} is an entry for all PanelTypes that do not
 * have executing behaviour. This is unlikely but still included for any panel
 * types that simply might not have behaviour.
 */
const PanelTypeBehaviour = {
    NONE: null,
    CLOCK: ClockPanel.execute,
    NOTEPAD: NotepadPanel.execute,
    PHOTO: PhotoPanel.execute,
    TODO: TodoPanel.execute,
    WEATHER: WeatherPanel.execute,
} as const;

export { PanelTypeBehaviour };
