const panels = [...document.querySelectorAll(".panel")];

function moveElementWithinScreen(el, e, xInit, yInit, elLeftInit, elTopInit) {
        
    el.style.setProperty("--x", clamp(elLeftInit + (e.pageX - xInit), 0, window.innerWidth - el.offsetWidth) + "px");
    el.style.setProperty("--y", clamp(elTopInit + (e.pageY - yInit), 0, window.innerHeight - el.offsetHeight) + "px");

}

function resizeElement(el, e, xInit, yInit, elWidthInit, elHeightInit) {
    el.style.setProperty("--width", clamp(elWidthInit + e.pageX - xInit, getNormalisedCssPropertyValue(el, "--min-width"), window.innerWidth - el.offsetLeft) + "px");
    el.style.setProperty("--height", clamp(elHeightInit + e.pageY - yInit, getNormalisedCssPropertyValue(el, "--min-height"), window.innerHeight - el.offsetTop) + "px");
}

function snapElementToGrid(el, source) {
    el.classList.add("snapping");
    el.style.setProperty("--x", roundToNearest(getNormalisedCssPropertyValue(source, "--x"), window.innerWidth / 3) + "px");
    el.style.setProperty("--y", roundToNearest(getNormalisedCssPropertyValue(source, "--y"), window.innerHeight / 3) + "px");

    el.style.setProperty("--width", clamp(roundToNearest(getNormalisedCssPropertyValue(source, "--width"), window.innerWidth / 3), getNormalisedCssPropertyValue(source, "--min-width"), window.innerWidth - source.offsetLeft) + "px");
    el.style.setProperty("--height", clamp(roundToNearest(getNormalisedCssPropertyValue(source, "--height"), window.innerHeight / 3), getNormalisedCssPropertyValue(source, "--min-height"), window.innerHeight - source.offsetTop) + "px");
    
    setTimeout(() => {
        el.classList.remove("snapping");
    }, getNormalisedCssPropertyValue(el, "transition-duration"));
}

function updateElementDestinationPreview(el) {
    snapElementToGrid(el.parentElement.querySelector(".final-preview"), el);
}


panels.forEach((i) => {

    i.style.setProperty("--x", "0px");
    i.style.setProperty("--y", "0px");
    i.style.setProperty("--width", "var(--min-width)");
    i.style.setProperty("--height", "var(--min-height)");

    const preview = document.createElement("div");
    preview.classList.add("final-preview");
    
    i.querySelector(".drag-handle").addEventListener("mousedown", (e) => {
        i.classList.add("being-dragged");
        i.parentElement.prepend(preview);
        
        const xInit = e.pageX;
        const yInit = e.pageY;
        const panelLeftInit = i.offsetLeft;
        const panelTopInit = i.offsetTop;
        
        const dragHandler = (e) => {
            e.preventDefault;
            moveElementWithinScreen(i, e, xInit, yInit, panelLeftInit, panelTopInit);
            updateElementDestinationPreview(i);
        };

        const releaseHandler = (e) => {
            i.classList.remove("being-dragged");
            document.removeEventListener("mouseup", releaseHandler);
            document.removeEventListener("mousemove", dragHandler);
            snapElementToGrid(i, i);            
            setTimeout(() => {
                i.parentElement.removeChild(preview);
            }, getNormalisedCssPropertyValue(preview, "transition-duration"));
        }

        document.addEventListener("mouseup", releaseHandler);

        document.addEventListener("mousemove", dragHandler);
    })
    i.querySelector(".resize-handle").addEventListener("mousedown", (e) => {
        i.classList.add("being-resized");
        i.parentElement.prepend(preview);

        const xInit = e.pageX;
        const yInit = e.pageY;
        const panelWidthInit = i.offsetWidth;
        const panelHeightInit = i.offsetHeight;

        const dragHandler = (e) => {
            e.preventDefault;
            resizeElement(i, e, xInit, yInit, panelWidthInit, panelHeightInit);
            updateElementDestinationPreview(i);
        };

        const releaseHandler = (e) => {
            i.parentElement.removeChild(preview);
            i.classList.remove("being-resized");
            document.removeEventListener("mouseup", releaseHandler);
            document.removeEventListener("mousemove", dragHandler);
            snapElementToGrid(i, i);
        }

        document.addEventListener("mouseup", releaseHandler);

        document.addEventListener("mousemove", dragHandler);
    })
})