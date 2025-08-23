import * as math from "../functions/math.js";

import { Panel } from "../classes/panel.js";
import { dashboard, current } from "../app.js";

const contextMenu = document.querySelector(".context-menu") as HTMLElement;
const themeMenu: HTMLElement = document.querySelector(
    "#theme-menu",
) as HTMLElement;
const panelMenu: HTMLElement = document.querySelector(
    "#panel-menu",
) as HTMLElement;
const editModeButton = document.querySelector(
    "#edit-mode-button",
) as HTMLElement;
const deletePanelSection = document.querySelector(
    "#remove-panel-section",
) as HTMLElement;
const deletePanelButton = document.querySelector(
    "#remove-panel-button",
) as HTMLElement;

let contextMenuDeleteTimeout: NodeJS.Timeout;
function spawnContextMenu(e: MouseEvent): void {
    e.preventDefault();
    if (contextMenu == null || themeMenu == null || panelMenu == null) return;

    if (e.target instanceof Panel && dashboard.isEditing()) {
        current.panel = e.target;
        deletePanelSection?.classList.add("visible");
    } else deletePanelSection?.classList.remove("visible");

    try {
        if (
            window.innerWidth < 2 * contextMenu.offsetWidth
            || (e.pageX > window.innerWidth - 2 * contextMenu.offsetWidth
                && e.pageX < contextMenu.offsetWidth)
        ) {
            themeMenu.style.top = "88%";
            themeMenu.style.left = "-2%";
            panelMenu.style.top = "88%";
            panelMenu.style.left = "-2%";
        } else if (e.pageX > window.innerWidth - 2 * contextMenu.offsetWidth) {
            themeMenu.style.top = "";
            themeMenu.style.left = "-102%";
            panelMenu.style.top = "";
            panelMenu.style.left = "-102%";
        } else {
            themeMenu.style.top = "";
            themeMenu.style.left = "98%";
            panelMenu.style.top = "";
            panelMenu.style.left = "98%";
        }

        clearTimeout(contextMenuDeleteTimeout);

        const x: number = math.clamp(
            e.pageX,
            0,
            window.innerWidth - contextMenu.offsetWidth - 10,
        );
        const y: number = math.clamp(
            e.pageY - 0.5 * contextMenu.offsetHeight,
            0,
            window.innerHeight - contextMenu.offsetHeight + 10,
        );

        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";

        contextMenu.classList.add("visible");

        contextMenu.addEventListener("mouseenter", keepContextMenu);
        contextMenu.addEventListener("mouseleave", removeContextMenu);
    } catch (error) {
        console.error(error);
    }
}

function keepContextMenu(): void {
    clearTimeout(contextMenuDeleteTimeout);
}

function removeContextMenu(): void {
    if (!contextMenu) return;

    contextMenuDeleteTimeout = setTimeout(() => {
        contextMenu.classList.remove("visible");
        contextMenu.removeEventListener("mouseleave", removeContextMenu);
    }, 1000);
}

export {
    editModeButton,
    deletePanelButton,
    deletePanelSection,
    themeMenu,
    panelMenu,
    spawnContextMenu,
    keepContextMenu,
    removeContextMenu,
};
