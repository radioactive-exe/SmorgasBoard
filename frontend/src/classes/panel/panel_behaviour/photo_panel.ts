import type { Panel } from "../panel.js";

function execute(panel: Panel): void {
    const dropArea: HTMLElement | undefined = panel
        .getKeyElements()
        .get("drop_area");
    const img: HTMLImageElement | undefined = panel
        .getKeyElements()
        .get("panel_image") as HTMLImageElement | undefined;

    if (!dropArea || !img) return;
    const dragEvents: string[] = ["dragenter", "dragover", "dragleave", "drop"];

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
        reader.onload = function (e): void {
            const base64Image = e.target?.result;
            img.src = base64Image?.toString() ?? "";
            console.log("Base64 Image:", base64Image);
        };
        const file: File | undefined = e.dataTransfer?.files[0];
        if (file) reader.readAsDataURL(file);
        // console.log(e.dataTransfer.files[0]);
    });
}

export { execute };
