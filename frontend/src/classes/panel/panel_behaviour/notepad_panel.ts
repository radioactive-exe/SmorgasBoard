import type { Panel } from "../panel.js";

function execute(panel: Panel): void {
    let saveAfterEditTimeout: NodeJS.Timeout;
    const textArea = panel.getKeyElement("text_area");
    if (!textArea) return;

    textArea.addEventListener("input", () => {
        clearTimeout(saveAfterEditTimeout);
        saveAfterEditTimeout = setTimeout(() => {
            panel.triggerDelayedSave();
        }, 5000);
    });

    return;
}

export { execute };
