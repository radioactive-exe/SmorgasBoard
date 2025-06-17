const panels = [...document.querySelectorAll(".panel")];

function boundElementToScreen(el, x, y) {
    
}

function clamp(number)

panels.forEach((i) => {
    i.addEventListener("mousedown", (e) => {
        i.classList.add("being-dragged");

        const xInit = e.pageX;
        const yInit = e.pageY;
        const paneLeftInit = i.offsetLeft;
        const paneTopInit = i.offsetTop;

        const dragHandler = (e) => {
            e.preventDefault;
            i.style.setProperty("--x", clamp (paneLeftInit + (e.pageX - xInit)) + "px");
            i.style.setProperty("--y", (paneTopInit + (e.pageY - yInit)) + "px");
        };

        const releaseHandler = (e) => {
            i.classList.remove("being-dragged");
            document.removeEventListener("mouseup", releaseHandler);
            document.removeEventListener("mousemove", dragHandler);
        }

        document.addEventListener("mouseup", releaseHandler);

        document.addEventListener("mousemove", dragHandler);
    })
})