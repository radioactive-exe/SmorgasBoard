import type { Panel } from "../panel.js";

function execute(panel: Panel): void {
    let saveAfterEditTimeout: NodeJS.Timeout;
    autosaveLoop(panel);
    const textArea = panel.getKeyElements().get("text_area");
    if (!textArea) return;

    autosaveLoop(panel);
    textArea.addEventListener("input", () => {
        clearTimeout(saveAfterEditTimeout);
        console.log("a");
        saveAfterEditTimeout = setTimeout(() => {
            panel.triggerSave();
        }, 5000);
    });

    return;
}

function autosaveLoop(panel: Panel): void {
    setInterval(() => {
        panel.triggerSave();
    }, 600_000);
}

export { execute };
