import * as type from "./defs.js";
import * as get from "./accessors.js"


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
        ((area.y + area.height) < (el.offsetTop + 10)) ||
        (area.y >= (el.offsetTop + el.offsetHeight)) ||
        ((area.x + area.width) < (el.offsetLeft)) ||
        (area.x > (el.offsetLeft + el.offsetWidth - 10))
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


export {
    ignoreEventHandler,
    clamp,
    roundToNearest,
    areaCollisionWithElement,
    collidesWithAnyPanel
}