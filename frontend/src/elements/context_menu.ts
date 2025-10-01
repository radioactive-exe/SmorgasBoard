import { contextMenuLoseFocusHandler, current } from "../app.js";
import { Panel } from "../classes/panel/panel.js";
import * as get from "../functions/accessors.js";
import * as math from "../functions/math.js";
import * as utils from "../functions/util.js";

let contextMenuOffset: number;

const contextMenu = document.querySelector(".context-menu") as HTMLElement;
const innerMenu: HTMLElement | null =
    contextMenu.firstElementChild as HTMLElement | null;
const themeMenu: HTMLElement = document.querySelector(
    "#theme-menu",
) as HTMLElement;
const panelMenu: HTMLElement = document.querySelector(
    "#panel-menu",
) as HTMLElement;
const dimensionsMenu: HTMLElement = document.querySelector(
    "#dimensions-menu",
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
const hoverItems = contextMenu.querySelectorAll(
    ".hover-item",
) as NodeListOf<HTMLElement>;

let contextMenuDeleteTimeout: NodeJS.Timeout;
function spawnContextMenu(e: PointerEvent): void {
    e.preventDefault();
    if (
        contextMenu == null
        || themeMenu == null
        || panelMenu == null
        || innerMenu == null
    )
        return;
    if (
        e.target instanceof Panel
        || (e.target instanceof HTMLElement
            && (e.target as HTMLElement).closest("panel-element") != null)
    ) {
        if (e.target instanceof Panel) current.panel = e.target;
        else current.panel = e.target.closest("panel-element") as Panel;
        deletePanelSection?.classList.add("visible");
        keepContextMenuOnScreen();
    } else deletePanelSection?.classList.remove("visible");

    try {
        if (e.pageY > window.innerHeight - contextMenu.offsetHeight - 100) {
            themeMenu.style.top = "";
            themeMenu.style.left = "-2%";
            themeMenu.style.bottom = "88%";
            panelMenu.style.top = "";
            panelMenu.style.left = "-2%";
            panelMenu.style.bottom = "88%";
            dimensionsMenu.style.top = "";
            dimensionsMenu.style.left = "-2%";
            dimensionsMenu.style.bottom = "88%";
        } else if (
            window.innerWidth < 2 * contextMenu.offsetWidth
            || (e.pageX > window.innerWidth - 2 * contextMenu.offsetWidth
                && e.pageX < contextMenu.offsetWidth)
        ) {
            themeMenu.style.top = "88%";
            themeMenu.style.left = "-2%";
            panelMenu.style.top = "88%";
            panelMenu.style.left = "-2%";
            dimensionsMenu.style.top = "88%";
            dimensionsMenu.style.left = "-2%";
        } else if (e.pageX > window.innerWidth - 2 * contextMenu.offsetWidth) {
            themeMenu.style.top = "";
            themeMenu.style.left = "-102%";
            themeMenu.style.bottom = "";
            panelMenu.style.top = "";
            panelMenu.style.left = "-102%";
            panelMenu.style.bottom = "";
            dimensionsMenu.style.top = "88%";
            dimensionsMenu.style.left = "-2%";
            dimensionsMenu.style.bottom = "";
        } else {
            themeMenu.style.top = "";
            themeMenu.style.left = "98%";
            themeMenu.style.bottom = "";
            panelMenu.style.top = "";
            panelMenu.style.left = "98%";
            panelMenu.style.bottom = "";
            dimensionsMenu.style.top = "";
            dimensionsMenu.style.left = "98%";
            dimensionsMenu.style.bottom = "";
        }

        contextMenu.classList.remove("lerping");

        clearTimeout(contextMenuDeleteTimeout);

        const x: number = math.clamp(
            e.pageX,
            0,
            window.innerWidth - contextMenu.offsetWidth - 10,
        );
        const y: number = math.clamp(
            e.pageY,
            0,
            window.innerHeight - innerMenu.offsetHeight - 10,
        );

        contextMenu.style.setProperty("--x", x + "px");
        contextMenu.style.setProperty("--y", y + "px");

        contextMenu.classList.add("visible");

        contextMenu.addEventListener("mouseenter", keepContextMenu);
        contextMenu.addEventListener("pointermove", keepContextMenu);
        contextMenu.addEventListener("click", keepContextMenu);
        contextMenu.addEventListener("mouseleave", removeContextMenu);
        document.addEventListener("click", contextMenuLoseFocusHandler);
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
        document.removeEventListener("click", contextMenuLoseFocusHandler);
    }, 1000);
}

function keepContextMenuOnScreen(): void {
    contextMenuOffset = 180;
    if (deletePanelSection.classList.contains("visible")) {
        contextMenuOffset += 36;
    }
    const destination = Math.min(
        window.innerHeight - contextMenuOffset,
        get.normalisedCssPropertyValue(contextMenu, "--y"),
    );

    contextMenu.style.setProperty("--y", destination + "px");
    contextMenu.style.setProperty("--y-vector", destination + "px");
    contextMenu.classList.add("lerping");
    utils.removeClassAfterTransition(contextMenu, "lerping");
}

export {
    contextMenu,
    deletePanelButton,
    deletePanelSection,
    editModeButton,
    hoverItems,
    innerMenu,
    keepContextMenu,
    keepContextMenuOnScreen,
    panelMenu,
    removeContextMenu,
    spawnContextMenu,
    themeMenu,
};
