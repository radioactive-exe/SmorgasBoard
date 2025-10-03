import type { Panel } from "../panel.js";

function execute(panel: Panel): void {
    let saveAfterEditTimeout: NodeJS.Timeout;
    const textArea = panel.getKeyElements().get("text_area");
    if (!textArea) return;

    textArea.addEventListener("input", () => {
        clearTimeout(saveAfterEditTimeout);
        console.log("a");
        saveAfterEditTimeout = setTimeout(() => {
            panel.triggerSave();
        }, 5000);
    });

    return;
}

export { execute };
