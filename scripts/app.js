const panels = [...document.querySelectorAll(".panel")];
var originalArea;


function snapElementToGrid(el, source = el, shouldAnimate = true) {

    if (shouldAnimate) el.classList.add("snapping");

    var x = el.offsetLeft;
    var y = el.offsetTop;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var originalArea =
    [
        roundToNearest(x, window.innerWidth / getCssPropertyValue(document.body, "--num-of-cols")),
        roundToNearest(y, window.innerHeight / getCssPropertyValue(document.body, "--num-of-rows")),
        roundToNearest(width, window.innerWidth / getCssPropertyValue(document.body, "--num-of-cols")),
        roundToNearest(height, window.innerHeight / getCssPropertyValue(document.body, "--num-of-rows"))
    ];

    var potentialX = roundToNearest(getNormalisedCssPropertyValue(source, "--x"), window.innerWidth / getCssPropertyValue(document.body, "--num-of-cols"));
    var potentialY = roundToNearest(getNormalisedCssPropertyValue(source, "--y"), window.innerHeight / getCssPropertyValue(document.body, "--num-of-rows"));
    var potentialWidth = clamp(roundToNearest(getNormalisedCssPropertyValue(source, "--width"), window.innerWidth / getCssPropertyValue(document.body, "--num-of-cols")), getNormalisedCssPropertyValue(source, "--min-width"), window.innerWidth - source.offsetLeft);
    var potentialHeight = clamp(roundToNearest(getNormalisedCssPropertyValue(source, "--height"), window.innerHeight / getCssPropertyValue(document.body, "--num-of-rows")), getNormalisedCssPropertyValue(source, "--min-height"), window.innerHeight - source.offsetTop);

    var potentialArea = [potentialX, potentialY, potentialWidth, potentialHeight];

    if (collidesWithAnyPanel(el, potentialArea, panels)) {
        setItemArea(el, originalArea);
    }
    else setItemArea(el, potentialArea);
    
    setTimeout(() => {
        el.classList.remove("snapping");
    }, getNormalisedCssPropertyValue(el, "transition-duration"));
}

function snapElementToTarget(el, target) {

    el.classList.add("snapping");

    el.style.setProperty("--x", getCssProperty(target, "--x"));
    el.style.setProperty("--y", getCssProperty(target, "--y"));
    el.style.setProperty("--width", getCssProperty(target, "--width"));
    el.style.setProperty("--height", getCssProperty(target, "--height"));
        
    setTimeout(() => {
        el.classList.remove("snapping");
    }, getNormalisedCssPropertyValue(el, "transition-duration"));
}

function updateElementDestinationPreview(el) {
    snapElementToGrid(el.parentElement.querySelector(".final-preview"), el);
}

function initPanel(panel) {
    panel.style.setProperty("--x", "0px");
    panel.style.setProperty("--y", "0px");
    panel.style.setProperty("--width", getNormalisedCssPropertyValue(panel, "--min-width") + "px");
    panel.style.setProperty("--height", getNormalisedCssPropertyValue(panel, "--min-height") + "px");
}

function initPreview(i, preview) {
    preview.dataset.callerId = i.dataset.panelId;
    i.parentElement.prepend(preview);
    updateElementDestinationPreview(i);
}

panels.forEach((i) => {

    initPanel(i);

    const preview = document.createElement("div");
    preview.classList.add("final-preview");
    
    i.querySelector(".drag-handle").addEventListener("hover", (e) => {
        e.stopPropagation();
    })

    i.querySelector(".drag-handle").addEventListener("mousedown", (e) => {

        i.classList.add("being-dragged");
        initPreview(i, preview);

        const initCoords = [e.pageX, e.pageY];
        const panelPosInit = [panelLeftInit = i.offsetLeft, panelTopInit = i.offsetTop];
        
        const dragHandler = (e) => {
            e.preventDefault;
            moveElementWithinScreen(i, e, initCoords, panelPosInit);
            updateElementDestinationPreview(i);
        };

        const releaseHandler = (e) => {
            i.classList.remove("being-dragged");
            document.removeEventListener("mouseup", releaseHandler);
            document.removeEventListener("mousemove", dragHandler);
            snapElementToTarget(i, preview);
            setTimeout(() => {
                i.parentElement.removeChild(preview);
            }, getNormalisedCssPropertyValue(preview, "transition-duration"));
        }

        document.addEventListener("mousemove", dragHandler);
        document.addEventListener("mouseup", releaseHandler);
    })
    i.querySelector(".resize-handle").addEventListener("mousedown", (e) => {

        i.classList.add("being-resized");
        initPreview(i, preview);

        const initCoords = [e.pageX, e.pageY];
        const panelSizeInit = [i.offsetWidth, i.offsetHeight];

        const dragHandler = (e) => {
            e.preventDefault;
            resizeElement(i, e, initCoords, panelSizeInit);
            updateElementDestinationPreview(i);
        };

        const releaseHandler = (e) => {
            i.classList.remove("being-resized");
            document.removeEventListener("mouseup", releaseHandler);
            document.removeEventListener("mousemove", dragHandler);
            snapElementToTarget(i, preview);
            setTimeout(() => {
                i.parentElement.removeChild(preview);
            }, getNormalisedCssPropertyValue(preview, "transition-duration"));
        }

        document.addEventListener("mouseup", releaseHandler);

        document.addEventListener("mousemove", dragHandler);
    })
});

window.addEventListener("resize", () => {
    panels.forEach((i) => {
        snapElementToGrid(i, i, false);
    })
});




// ~ panel FANCY STUFF




[...document.querySelectorAll(".panel")].forEach((i) =>
        {
            // i.addEventListener("mousemove", panelHoverHandler);
            // i.addEventListener("mouseleave", resetPanelHoverHandler);
            // i.addEventListener("mouseenter", enterPanelHoverHandler);
        }
    );

function ignoreEventHandler(e) {
    e.stopPropagation();
}

function panelHoverHandler(e) {
    e.stopPropagation();
    if (!e.currentTarget.children.item(1).classList.contains("moving")) {
        rotateElement(e, e.currentTarget);
    }
    // console.log(e.target);
}

function resetPanelHoverHandler(e) {
    e.target.style.setProperty("--rotate-x", 0 + "deg");
    e.target.style.setProperty("--rotate-y", 0 + "deg");
    e.target.style.setProperty("--shadow-offset-x", 0 + "rem");
    e.target.style.setProperty("--shadow-offset-y", 0 + "rem");
    const panel = e.currentTarget.querySelector(".panel-wrap");
    panel.classList.remove("in-motion");
    e.currentTarget.classList.remove("hovering");
}

function enterPanelHoverHandler(e) {
    e.stopImmediatePropagation();
    // console.log("Entered");
    const target = e.currentTarget;
    const panel = target.querySelector(".panel-wrap");
    if (!panel.classList.contains("moving")) {
        target.classList.add("hovering");
        setTimeout(() => {
            // if (!e.currentTarget) {return};
            if (target.classList.contains("hovering")) {panel.classList.add("in-motion");}
        }, 300);
    }
    // console.log(panel);
}

function rotateElement(e, elem) {
    // if (elem.children.item(1).classList.contains("moving")) {return;}

    if (!elem.classList.contains("hovering")) { elem.dispatchEvent(new Event("mouseenter"));}
    
    const x = e.clientX;
    const y = e.clientY;

    var left, top, right, bottom;

    if (elem.classList.contains("focused")) {
        left = -0.5 *  window.innerWidth; right = window.innerWidth * 1.5;
        top = -0.5 * window.innerHeight; bottom = window.innerHeight * 1.5;
    } else {
        const box = elem.getBoundingClientRect();
        left = box.left; right = box.right; top = box.top; bottom = box.bottom;
    }


    let centreX = (left + right) / 2;
    let centreY = (top + bottom) / 2;
    const offsetX = ((x - centreX) / (right - left)) * 60;
    const offsetY = ((y - centreY) / (bottom - top)) * 40;
    const shadowOffsetX = ((x - centreX) / (right - left)) * -8;
    const shadowOffsetY = ((y - centreY) / (top - bottom)) * -6;
    elem.style.setProperty("--rotate-x", offsetY + "deg");
    elem.style.setProperty("--rotate-y", offsetX + "deg");
    elem.style.setProperty("--shadow-offset-x", shadowOffsetX + "rem");
    elem.style.setProperty("--shadow-offset-y", shadowOffsetY + "rem");
}