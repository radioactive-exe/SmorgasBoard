/**
 * This file contains the behaviour functions for the Photo PanelType.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { supabase, user } from "../../../app.js";
import { MAX_FILE_SIZE, VALID_FILE_TYPES } from "../../../constants.js";
import { AlertLevel, spawnAlert } from "../../../elements/alert.js";
import type { Config, ConfigChangeEventDetail } from "../../config/config.js";
import type * as ConfigEntry from "../../config/config_entry.js";
import type { Panel } from "../panel.js";
import { PanelType, PanelTypeConfig } from "../panel_type.js";

// eslint-disable-next-line jsdoc/require-example
/**
 * The main function called upon behaviour execution after the Panel template,
 * base, and config setup, for the Photo PanelType.
 *
 * @remarks
 * Any necessary validations are done to check that the panel type, config, and
 * key elements are properly set up. Then, config change event listeners are
 * setup. Finally, the behaviour is initiated. For this panel type, we handle
 * drag and drop events, as well as a file input, and then upload and save the
 * file to be used later/in any session before being removed.
 *
 * @param panel - The panel whose behaviour is being executed through this
 *   function.
 *
 * @see The function that {@link processFile | processes all inputted files} to be uploaded
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/storage | Supabase#Storage}
 */
function execute(panel: Panel): void {
    // * All the necessary elements
    const dropArea: HTMLElement | null | undefined =
        panel.getKeyElement("drop_area");
    const fileInput: HTMLInputElement | null | undefined = panel.getKeyElement(
        "upload_input",
    ) as HTMLInputElement | null | undefined;
    const img: HTMLImageElement | null | undefined = panel.getKeyElement(
        "panel_image",
    ) as HTMLImageElement | null | undefined;

    // ? If anything is missing, abort. Something is not right.
    if (!dropArea || !fileInput || !img || panel.getType() != PanelType.PHOTO)
        return;

    // ? On loading, ensure the image fit matches with the config.
    img.style.setProperty("object-fit", getImageFit(panel));

    const dragEvents: string[] = ["dragenter", "dragover", "dragleave", "drop"];

    // ? Handle all events relating to activating and deactivating the input visually
    // ? As well as stopping all default behaviour (i.e. opening the file in a new tab, etc.)

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

    // ? Handle drag and drops of files, sending them to be processed

    dropArea?.addEventListener("drop", (e) => {
        const file: File | undefined = e.dataTransfer?.files[0];
        if (file) processFile(file, panel, img);
    });

    // ? Handle file input entry of files, sending them to be processed

    fileInput.addEventListener("change", (e) => {
        if (!e.target) return;
        const files: FileList | null = (e.target as HTMLInputElement).files;
        if (files && files[0]) processFile(files[0], panel, img);
    });

    // ? Handle changing the config setting for whether to cover or contain the image
    // ? in the frame
    panel.addEventListener("configchange", (e) => {
        const customEventParsed: CustomEvent<ConfigChangeEventDetail> =
            e as CustomEvent<ConfigChangeEventDetail>;
        const panelConfig: Config | undefined = panel.getConfig();

        // ? Ensuring the correct config change was the trigger, update the image fit
        if (panelConfig && customEventParsed.detail.setting == "fillFrame") {
            img.style.setProperty("object-fit", getImageFit(panel));
        }
    });
}

/**
 * Handles a provided/inputted file, either accepting it and uploading it, or
 * rejecting it and informing the user of the reason.
 *
 * @param file  - The inputted file to process.
 * @param panel - The panel that holds the Config and that triggered this
 *   behaviour.
 * @param img   - The image element that holds the actual image itself, if
 *   uploaded.
 *
 * @example
 *
 * See the handling of drag and drops as well as inputted files in the execute
 * function (below).
 *
 * @see The Photo Panel {@link execute | execute()} function
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/storage | Supabase#Storage}
 */
function processFile(file: File, panel: Panel, img: HTMLImageElement): void {
    const reader = new FileReader();

    /**
     * Handles the inputted file through a FileReader, uploading it and
     * inputting the resulting URL.
     */
    reader.onload = async function (): Promise<void> {
        // ? Extract the file extension
        const fileExt = file.name.split(".").pop();

        // ? Give the file a random name
        const fileName = `${Math.random()}.${fileExt}`;

        // ? Set the file path in the Supabase storage to be under the user's ID,
        // ? and store that path in a dataset attribute on the image element.
        const filePath = `${user?.id}/${fileName}`;
        img.dataset.path = filePath;

        // ? Upload the image to the Supabase storage bucket.
        const { error } = await supabase.storage
            .from("dashboard_media")
            .upload(filePath, file);

        // ? Catch and send the error to the console.
        if (error) {
            console.error(error);
        } else {
            // ? Obtain the signed URL for the uploaded image (signed to only allow the user themselves
            // ? to access the media in their own user folder).
            const { data } = await supabase.storage
                .from("dashboard_media")
                .createSignedUrl(filePath, 60);

            // ? If all is well
            if (data?.signedUrl) {
                // ? Update the image element to become visible.
                img.classList.add("filled");
                // ? Set the image's source URL to the obtained Signed URL
                img.src = data?.signedUrl;
                // ? Save
                panel.triggerSave();
            }
        }
    };

    // ? Handle all possible scenarios when the user inputs a file to be processed.

    // ? If the user is signed in, the file type is valid, and the file is smaller than the maximum size
    if (
        user
        && VALID_FILE_TYPES.includes(
            file.name.split(".")[file.name.split(".").length - 1],
        )
        && file.size <= MAX_FILE_SIZE
    ) {
        // ? Process and upload the file using the `reader.onload` above.
        reader.readAsDataURL(file);

        // ? If the user is not signed in. This is necessary as localStorage has a miniscule size limit, so
        // ? one image would take up a lot of the storage. Being logged in allows the creation and use of a
        // ? user folder in the dashboard media bucket.
    } else if (!user) {
        spawnAlert(
            "If you want to use Photo panels, consider logging in/signing up! Local storage has limited space, but the database can hold a lot more!",
            AlertLevel.INFO,
        );

        // ? If the user is signed in, but the file is too big, spawn a relevant informative alert.
    } else if (file.size > MAX_FILE_SIZE) {
        spawnAlert(
            "File too big! You can only upload files up to 10MB in size.",
            AlertLevel.INFO,
        );

        // ? If the file is small enough and the user is signed in, but the file type is invalid,
        // ? spawn a relevant informative alert.
    } else if (!VALID_FILE_TYPES.includes(file.name.split(".")[1])) {
        spawnAlert("Invalid File Type!", AlertLevel.INFO);
    }
}

/**
 * Get the object/image fit based on the Config setting in the Panel.
 *
 * @param   panel - The panel holding the Config.
 *
 * @returns       The object fit derived from the Config setting.
 *
 * @example
 *
 * ```ts
 * console.log(getImageFit(panel));
 * ```
 *
 * Assuming `panel` has `fillFrame` set to true, the above would output "cover".
 */
function getImageFit(panel: Panel): string {
    if (
        panel.getType().getConfigSchema() == PanelTypeConfig.PHOTO.getConfig()
        && (panel.getConfig()?.fillFrame as ConfigEntry.Boolean).value
    )
        return "cover";
    return "contain";
}

export { execute };
