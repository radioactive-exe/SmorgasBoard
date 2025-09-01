const dropArea = document.querySelector(".drop-area");

// let photos = [];

const dragEvents = ["dragenter", "dragover", "dragleave", "drop"];

dragEvents.forEach((dragEvent) => {
    dropArea?.addEventListener(dragEvent, (e) => e.preventDefault());
});

["dragenter", "dragover"].forEach((dragEvent) => {
    dropArea?.addEventListener(dragEvent, () => {
        dropArea.classList.add("active");
    });
});

["dragleave", "drop"].forEach((dragEvent) => {
    dropArea?.addEventListener(dragEvent, () => {
        dropArea.classList.remove("active");
    });
});

dropArea?.addEventListener("drop", (e) => {
    const im = document.createElement("img");
    const url = URL.createObjectURL([...e.dataTransfer.files][0]);
    im.src = url;
    document.body.appendChild(im);
});
