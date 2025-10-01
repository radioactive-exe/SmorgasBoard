/* eslint-disable */
const dropArea = document.querySelector(".drop-area");
const img = document.querySelector(".panel-image");

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
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64Image = e.target.result;
        img.src = base64Image;
        console.log("Base64 Image:", base64Image);
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);
    // console.log(e.dataTransfer.files[0]);
});
