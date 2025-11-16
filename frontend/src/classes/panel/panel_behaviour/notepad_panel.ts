/**
 * This file contains the behaviour functions for the Notepad Panel Type.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import type { Panel } from "../panel.js";

// eslint-disable-next-line jsdoc/require-example
/**
 * The main function called upon behaviour execution after the Panel template,
 * base, and config setup, for the Notepad Panel Type.
 *
 * @remarks
 * Any necessary validations are done to check that the panel type, config, and
 * key elements are properly set up. Then, config change event listeners are
 * setup. Finally, the behaviour is initiated. For this panel type, we wait for
 * 5 seconds after the last user input, and then trigger a save. That's about it
 * for the Notepad panel. Not much to discuss here.
 *
 * @param panel - The panel whose behaviour is being executed through this
 *   function.
 */
function execute(panel: Panel): void {
    let saveAfterEditTimeout: NodeJS.Timeout;
    const textArea = panel.getKeyElement("text_area");

    // ? If the key element is not available/present, abort. Something is not right.
    if (!textArea) return;

    textArea.addEventListener("input", () => {
        // ? Clear the timeout and set it again each time the user types or deletes anything
        // ? ensuring that the program waits for 5 seconds without input to trigger a save
        clearTimeout(saveAfterEditTimeout);
        saveAfterEditTimeout = setTimeout(() => {
            panel.triggerSave();
        }, 5000);
    });

    return;
}

export { execute };
