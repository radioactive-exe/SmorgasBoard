import { currentTheme, dashboard } from "./app.js";
import * as type from "./defs.js";


function ignoreEventHandler(e) : void {
    e.stopPropagation();
}

function clamp(num : number, min : number, max : number) : number {
    return Math.min(Math.max(num, min), max);
}

function roundToNearest(num : number, stepSize : number) : number {
    let diminished = num / stepSize;
    diminished = Math.round(diminished);
    diminished *= stepSize;
    return diminished;
}

function areaCollisionWithElement(area : type.Area, el) : boolean {
    return !(
        ((area.getY() + area.getHeight()) < (el.offsetTop + 10)) ||
        (area.getY() >= (el.offsetTop + el.offsetHeight) - 20) ||
        ((area.getX() + area.getWidth()) < (el.offsetLeft)) ||
        (area.getX() > (el.offsetLeft + el.offsetWidth - 10))
    );
}

function collidesWithAnyPanel(self : HTMLElement, area : type.Area, panels) : boolean {
    
    var flag = false;
    
    panels.forEach(i => {
        if (i.dataset.panelId != self.dataset.callerId && areaCollisionWithElement(area, i)) {
            flag = true;  
        }
    });

    return flag;
}

function setCssProperty(el : HTMLElement, property : string, value : string) {
    window.getComputedStyle(el).setProperty(property, value);
}

function setCurrentTheme(theme : type.Theme) {
    currentTheme;
    const themeFileLink = document.querySelector<HTMLElement>("#app-theme");
    if (themeFileLink == null) return;
    themeFileLink.setAttribute("href", theme.getUrl())
}

function isEditing() {
    return dashboard?.classList.contains("in-edit-mode");
}

export {
    ignoreEventHandler,
    clamp,
    roundToNearest,
    areaCollisionWithElement,
    collidesWithAnyPanel,
    setCurrentTheme,
    isEditing
}