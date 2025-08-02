import * as get from "./accessors.js";
import * as utils from "./util.js";

import { Area } from "./definitions/area.js";
import { PanelType } from "./definitions/panel_type.js";
import { Panel } from "./definitions/panel.js";
import { Dashboard, Theme } from "./definitions/dashboard.js";

import {
    snapElementToTarget,
    rotatePanel,
    rotateElementStyle,
} from "./manip.js";
import { months, weekdays } from "./definitions/constants.js";

const dashboard: Dashboard = document.querySelector(
    "smorgas-board"
) as Dashboard;

const contextMenu = document.querySelector(".context-menu") as HTMLElement;
const editModeButton = document.querySelector(
    "#edit-mode-button"
) as HTMLElement;
const deletePanelSection = document.querySelector(
    "#remove-panel-section"
) as HTMLElement;
const deletePanelButton = document.querySelector(
    "#remove-panel-button"
) as HTMLElement;

const current = {
    flag: "" as string,
    panel: Panel.defaultPanel() as Panel,
};
const holdHandler = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    drag: function (e: MouseEvent): void {
        return;
    },
    release: releaseHandler,
};
const hoverHandler = {
    enter: enterPanelHoverHandler,
    move: movePanelHoverHandler,
    exit: exitPanelHoverHandler,
};
let contextMenuDeleteTimeout: NodeJS.Timeout;

const preview: Panel = new Panel(Area.INIT, PanelType.PREVIEW, -1);
preview.classList.add("final-preview");

function spawnContextMenu(e: MouseEvent): void {
    e.preventDefault();
    const themeMenu = document.querySelector<HTMLElement>(".theme-menu");
    if (contextMenu == null || themeMenu == null) return;

    if (e.target instanceof Panel && dashboard.isEditing()) {
        current.panel = e.target;
        deletePanelSection?.classList.add("visible");
    } else deletePanelSection?.classList.remove("visible");

    try {
        if (e.pageX > window.innerWidth - 2 * contextMenu.offsetWidth)
            themeMenu.style.left = "-102%";
        else themeMenu.style.left = "98%";

        clearTimeout(contextMenuDeleteTimeout);

        contextMenu.style.left =
            utils.clamp(
                e.pageX,
                0,
                window.innerWidth - contextMenu.offsetWidth - 10
            ) + "px";
        contextMenu.style.top =
            utils.clamp(
                e.pageY - 0.5 * contextMenu.offsetHeight,
                0,
                window.innerHeight - contextMenu.offsetHeight + 10
            ) + "px";
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

function releaseHandler(): void {
    snapElementToTarget(current.panel, preview);

    snapElementToTarget(preview, preview);
    preview.classList.remove("visible");
    current.panel.classList.remove(current.flag, "being-manipulated");

    dashboard.updateStoredPanels();

    document.removeEventListener("mouseup", holdHandler.release);
    document.removeEventListener("mousemove", holdHandler.drag);

    utils.deleteAfterTransition(preview);
}

function enterPanelHoverHandler(e: MouseEvent): void {
    if (dashboard.isEditing()) return;
    const target: Panel = e.currentTarget as Panel;
    const panel: Panel = target?.shadowRoot?.querySelector(
        ".panel-body"
    ) as Panel;

    if (!panel?.classList.contains("moving")) {
        target.classList.add("hovering");
        setTimeout(
            () => {
                if (target.classList.contains("hovering")) {
                    if (panel) panel.part = "panel-body in-motion";
                }
            },
            get.normalisedCssPropertyValue(panel, "transition-duration")
        );
    }
}

function movePanelHoverHandler(e: MouseEvent): void {
    if (dashboard.isEditing()) return;
    e.stopPropagation();
    if (
        !(e.currentTarget as Panel)?.shadowRoot
            ?.querySelector(".panel-body")
            ?.classList.contains("moving")
    ) {
        rotatePanel(e);
    }
}

function exitPanelHoverHandler(e: MouseEvent): void {
    rotateElementStyle(e.target as HTMLElement, {
        rotation: { x: 0, y: 0 },
        shadow: { x: 0, y: 0 },
    });

    if (dashboard.isEditing()) return;
    const panel = (e.currentTarget as Panel)?.shadowRoot?.querySelector(
        ".panel-body"
    );
    if (panel) panel.part = "panel-body";
    (e.currentTarget as Panel)?.classList.remove("hovering");
}

function setDocumentHandlers(): void {
    document.addEventListener("mousemove", holdHandler.drag);
    document.addEventListener("mouseup", holdHandler.release);
}

// ~ Listener Initialisation

window.addEventListener("resize", () => {
    dashboard.organiseElements();
});

document.addEventListener("keydown", async (e) => {
    switch (e.key) {
        case "ArrowDown":
            dashboard.setCurrentTheme(Theme.DEFAULT);
            break;
        case "ArrowUp":
            dashboard.setCurrentTheme(Theme.YELLOW);
            break;
        case "ArrowRight":
            dashboard.toggleEditMode();
            break;
        case "ArrowLeft":
            dashboard.spawnPanel(new Panel(
                Area.INIT,
                PanelType.CLOCK,
                10,
                "",
                {
                    showSeconds: true,
                }
            ));
    }
});

dashboard.addEventListener("contextmenu", spawnContextMenu);

editModeButton?.addEventListener("click", () => {
    dashboard.toggleEditMode();
});

deletePanelButton?.addEventListener("click", () => {
    dashboard.deletePanel(current.panel);
});

// ~ Panel Data Functionality

function formatTime(time: Date): string {
    return time.toLocaleTimeString("gmt", {"hour12": false, "timeStyle": "short"});
    const hours: number = time.getHours();
    const minutes: number = time.getMinutes();
    const seconds: number = time.getSeconds();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function formatDate(time: Date): string {
    return time.toLocaleDateString("en-gb", {"dateStyle": "short"});
    const weekday = time.getDay();
    const day = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    return `${weekdays[weekday]}, ${months[month]} ${day}, ${year}`;
}

export {
    current,
    preview,
    holdHandler,
    hoverHandler,
    dashboard,
    setDocumentHandlers,
    formatTime,
    formatDate,
};
