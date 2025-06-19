const panels = [...document.querySelectorAll(".panel")];

function moveElementWithinScreen(el, e, xInit, yInit, elLeftInit, elTopInit) {
        
    el.style.setProperty("--x", clamp(elLeftInit + (e.pageX - xInit), 0, window.innerWidth - el.offsetWidth) + "px");
    el.style.setProperty("--y", clamp(elTopInit + (e.pageY - yInit), 0, window.innerHeight - el.offsetHeight) + "px");

}

function resizeElement(el, e, xInit, yInit, elWidthInit, elHeightInit) {
    el.style.setProperty("--width", clamp(elWidthInit + e.pageX - xInit, getNumericalValueOfCssProperty(el, "--min-width"), window.innerWidth - el.offsetLeft) + "px");
    el.style.setProperty("--height", clamp(elHeightInit + e.pageY - yInit, getNumericalValueOfCssProperty(el, "--min-height"), window.innerHeight - el.offsetTop) + "px");
}

function snapElementToGrid(el) {
    el.classList.add("snapping");
    el.style.setProperty("--x", roundToNearest(getNumericalValueOfCssProperty(el, "--x"), window.innerWidth / 3) + "px");
    el.style.setProperty("--y", roundToNearest(getNumericalValueOfCssProperty(el, "--y"), window.innerHeight / 3) + "px");

    el.style.setProperty("--width", clamp(roundToNearest(getNumericalValueOfCssProperty(el, "--width"), window.innerWidth / 3), getNumericalValueOfCssProperty(el, "--min-width"), window.innerWidth - el.offsetLeft) + "px");
    el.style.setProperty("--height", clamp(roundToNearest(getNumericalValueOfCssProperty(el, "--height"), window.innerHeight / 3), getNumericalValueOfCssProperty(el, "--min-height"), window.innerHeight - el.offsetTop) + "px");
    
    setTimeout(() => {
        el.classList.remove("snapping");
    }, getNumericalValueOfCssProperty(el, "transition-duration") * 1000);
}

function updateElementDestinationPreview(el) {
    snapElementToGrid(el.querySelector(".final-preview"));
}


panels.forEach((i) => {
    i.querySelector(".drag-handle").addEventListener("mousedown", (e) => {
        i.classList.add("being-dragged");

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
            snapElementToGrid(i);
        }

        document.addEventListener("mouseup", releaseHandler);

        document.addEventListener("mousemove", dragHandler);
    })
    i.querySelector(".resize-handle").addEventListener("mousedown", (e) => {
        i.classList.add("being-resized");

        const xInit = e.pageX;
        const yInit = e.pageY;
        const panelWidthInit = i.offsetWidth;
        const panelHeightInit = i.offsetHeight;

        const dragHandler = (e) => {
            e.preventDefault;
            resizeElement(i, e, xInit, yInit, panelWidthInit, panelHeightInit);
        };

        const releaseHandler = (e) => {
            i.classList.remove("being-resized");
            document.removeEventListener("mouseup", releaseHandler);
            document.removeEventListener("mousemove", dragHandler);
            snapElementToGrid(i);
        }

        document.addEventListener("mouseup", releaseHandler);

        document.addEventListener("mousemove", dragHandler);
    })
})