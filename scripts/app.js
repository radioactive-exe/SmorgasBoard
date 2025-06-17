const panels = [...document.querySelectorAll(".panel")];

function moveElementWithinScreen(el, e, xInit, yInit, elLeftInit, elTopInit) {
        
        el.style.setProperty("--x", clamp(elLeftInit + (e.pageX - xInit), 0, window.innerWidth - el.offsetWidth) + "px");
        el.style.setProperty("--y", clamp(elTopInit + (e.pageY - yInit), 0, window.innerHeight - el.offsetHeight) + "px");

}

function resizeElement(el, e, xInit, yInit, elWidthInit, elHeightInit) {
    el.style.setProperty("--width", clamp(elWidthInit + e.pageX - xInit, getCssProperty(el, "--min-width"), window.innerWidth - el.offsetLeft) + "px");
    el.style.setProperty("--height", clamp(elHeightInit + e.pageY - yInit, getCssProperty(el, "--min-height"), window.innerHeight - el.offsetTop) + "px");
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
        };

        const releaseHandler = (e) => {
            i.classList.remove("being-dragged");
            document.removeEventListener("mouseup", releaseHandler);
            document.removeEventListener("mousemove", dragHandler);
        }

        document.addEventListener("mouseup", releaseHandler);

        document.addEventListener("mousemove", dragHandler);
    })
    i.querySelector(".resize-handle").addEventListener("mousedown", (e) => {

        const xInit = e.pageX;
        const yInit = e.pageY;
        const panelWidthInit = i.offsetWidth;
        const panelHeightInit = i.offsetHeight;

        const dragHandler = (e) => {
            e.preventDefault;
            resizeElement(i, e, xInit, yInit, panelWidthInit, panelHeightInit);
        };

        const releaseHandler = (e) => {
            document.removeEventListener("mouseup", releaseHandler);
            document.removeEventListener("mousemove", dragHandler);
        }

        document.addEventListener("mouseup", releaseHandler);

        document.addEventListener("mousemove", dragHandler);
    })
})