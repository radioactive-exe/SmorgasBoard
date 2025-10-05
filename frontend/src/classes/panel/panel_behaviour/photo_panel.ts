import { supabase, user } from "../../../app.js";
import { AlertLevel, spawnAlert } from "../../../elements/alert.js";
import type { Config, ConfigChangeEventDetail } from "../../config/config.js";
import type * as ConfigEntry from "../../config/config_entry.js";
import { MAX_FILE_SIZE, VALID_FILE_TYPES } from "../../constants.js";
import type { Panel } from "../panel.js";
import { PanelType, PanelTypeConfig } from "../panel_type.js";

// [x]: Add mobile file input for when drag and drop doesn't work.

function execute(panel: Panel): void {
    const dropArea: HTMLElement | undefined = panel
        .getKeyElements()
        .get("drop_area");
    const fileInput: HTMLInputElement | undefined = panel
        .getKeyElements()
        .get("upload_input") as HTMLInputElement | undefined;
    const img: HTMLImageElement | undefined = panel
        .getKeyElements()
        .get("panel_image") as HTMLImageElement | undefined;

    if (!dropArea || !fileInput || !img || panel.getType() != PanelType.PHOTO)
        return;

    img.style.setProperty("object-fit", getImageFit(panel));

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
        const file: File | undefined = e.dataTransfer?.files[0];
        if (file) processFile(file, panel, img);
    });

    fileInput.addEventListener("change", (e) => {
        if (!e.target) return;
        const files: FileList | null = (e.target as HTMLInputElement).files;
        if (files && files[0]) processFile(files[0], panel, img);
    });

    panel.addEventListener("configchange", (e) => {
        const customEventParsed: CustomEvent<ConfigChangeEventDetail> =
            e as CustomEvent<ConfigChangeEventDetail>;
        const panelConfig: Config | undefined = panel.getConfig();
        if (panelConfig && customEventParsed.detail.setting == "fillFrame") {
            img.style.setProperty("object-fit", getImageFit(panel));
        }
    });
}

function processFile(file: File, panel: Panel, img: HTMLImageElement): void {
    const reader = new FileReader();
    reader.onload = async function (_e): Promise<void> {
        img.classList.add("filled");
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user?.id}/${fileName}`;
        img.dataset.path = filePath;
        const { error } = await supabase.storage
            .from("dashboard_media")
            .upload(filePath, file);
        if (error) {
            console.error(error);
        } else {
            const { data } = await supabase.storage
                .from("dashboard_media")
                .createSignedUrl(filePath, 60);
            if (data?.signedUrl) {
                img.src = data?.signedUrl;
                panel.triggerSave();
            }
        }
    };
    if (
        user
        && VALID_FILE_TYPES.includes(file.name.split(".")[1])
        && file.size <= MAX_FILE_SIZE
    ) {
        reader.readAsDataURL(file);
    } else if (!user) {
        spawnAlert(
            "If you want to use Photo panels, consider logging in/signing up! Local storage has limited space, but the database can hold a lot more!",
            AlertLevel.INFO,
        );
    } else if (file.size > MAX_FILE_SIZE) {
        spawnAlert(
            "File too big! You can only upload files up to 10MB in size.",
            AlertLevel.INFO,
        );
    } else if (!VALID_FILE_TYPES.includes(file.name.split(".")[1])) {
        spawnAlert("Invalid File Type!", AlertLevel.INFO);
    }
}

function getImageFit(panel: Panel): string {
    if (
        panel.getType().getConfigSchema() == PanelTypeConfig.PHOTO.getConfig()
        && (panel.getConfig()?.fillFrame as ConfigEntry.Boolean).value
    )
        return "cover";
    return "contain";
}

export { execute };
