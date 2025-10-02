/**
 * @file
 * A file containing the {@link Panel} class.
 * @author Radioactive.exe
 * {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */
import type * as zod from "zod";

import {
    commonHandler,
    current,
    dashboard,
    holdHandler,
    hoverHandler,
    preview,
    supabase,
} from "../../app.js";

import * as get from "../../functions/accessors.js";

import {
    movePanelWithinScreen,
    resizePanel,
    snapElementToGrid,
    snapElementToTarget,
} from "../../functions/manip.js";

import type { AreaInstance, Coordinate, Size } from "../area.js";
import { Area } from "../area.js";
import type { Config, ConfigChangeEventDetail } from "../config/config.js";
import { getDefaultConfig } from "../config/config.js";
import type * as ConfigEntry from "../config/config_entry.js";
import { configMenu } from "../config/config_menu_builder.js";

import { PanelType, PanelTypeConfig, PanelTypeTemplate } from "./panel_type.js";

/**
 * A type that defines the structure of a {@link Panel} in its stored format, either in localStorage or the cloud.
 */
interface PanelInstance {
    panel_id: number;
    panel_type_id: number;
    area: AreaInstance;
    content: object;
    config: Config | undefined;
}

interface PanelFetchResponse {
    panel_type: string;
    panel_template: string;
}

interface PanelContent {
    path?: string;
    body?: string;
}

/**
 * A custom HTMLElement, implements many methods for custom use with the program to make work more efficient.
 *
 * {@label Panel}.
 */
class Panel extends HTMLElement {
    private keyElements: Map<string, HTMLElement>;

    /**
     * Creates an instance of a Panel.
     * @param area
     * @param type
     * @param dashboardId
     * @param config
     * @param body
     */
    public constructor(
        private area: Area,
        private type: PanelType,
        private dashboardId: number,
        private config: Config | undefined,
        body?: object,
    ) {
        super();

        this.setArea(area);
        this.setType(type);
        this.dashboardId = dashboardId;
        this.dataset.panelId = dashboardId.toString();
        this.dataset.panelType = type.toString();
        this.init(config, body);
    }

    private init(existentConfig?: Config, body?: object): void {
        if (this.type == PanelType.PREVIEW) return;
        this.initBase()
            .then(() => {
                this.addHoverListeners();
                this.addButtonListeners();
            })
            .then(() => this.initTemplate())
            .then(() => this.initConfig(existentConfig))
            .then(() => this.bindKeyElements())
            .then(() => {
                this.dispatchEvent(new CustomEvent("finished-loading"));
                if (body) this.setContent(body);
                this.beginBehaviour();
            });
    }

    private initBase(): Promise<void> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            const baseResponse: PanelFetchResponse = await fetch(
                import.meta.env.VITE_BACKEND_URL + PanelTypeTemplate.BASE,
            ).then((res: Response) => res.json());
            const baseResponseBody: Document = new DOMParser().parseFromString(
                baseResponse.panel_template,
                "text/html",
            );
            const base: HTMLTemplateElement = baseResponseBody.querySelector(
                "template",
            ) as HTMLTemplateElement;
            const shadow: ShadowRoot = this.attachShadow({ mode: "open" });

            if (base) {
                shadow.prepend(base.content.cloneNode(true));
            }
            resolve();
        });
    }

    /**
     * Initiates the panel's body based on its template.
     */
    private initTemplate(): Promise<void> {
        return new Promise(async (resolve) => {
            const response: PanelFetchResponse = await fetch(
                import.meta.env.VITE_BACKEND_URL + this.type.getTemplate(),
            ).then((res: Response) => res.json());
            const responseBody: Document = new DOMParser().parseFromString(
                response.panel_template,
                "text/html",
            );
            const template: HTMLTemplateElement = responseBody.querySelector(
                "template",
            ) as HTMLTemplateElement;

            if (template) {
                const skeleton: HTMLElement | null | undefined =
                    this.shadowRoot?.querySelector(".skeleton");
                if (skeleton) skeleton.remove();
                this.prepend(template.content.cloneNode(true));
            }
            resolve();
        });
    }

    private initConfig(existentConfig?: Config): Promise<void> {
        return new Promise((resolve): void => {
            const configSchema: zod.ZodObject | undefined =
                this.type.getConfigSchema();

            if (configSchema == PanelTypeConfig.NONE) {
                resolve();
                return;
            }

            const configContainer: HTMLElement = this.shadowRoot?.querySelector(
                ".config",
            ) as HTMLElement;
            const configMenuDiv: HTMLElement = configContainer?.querySelector(
                ".config-menu",
            ) as HTMLElement;
            const configButton: HTMLElement = configContainer?.querySelector(
                ".config-button",
            ) as HTMLElement;

            configContainer.removeAttribute("hidden");
            configButton.removeAttribute("hidden");

            if (existentConfig) {
                try {
                    this.config = configSchema.parse(existentConfig);
                } catch (error) {
                    console.error(
                        error,
                        "Invalid Panel Config provided. Please ensure the config is for the appropriate Panel Type.",
                    );
                }
            } else {
                this.config = getDefaultConfig(configSchema);
            }

            configMenuDiv.appendChild(configMenu(this.config as Config));

            configButton.addEventListener("click", () => {
                this.classList.toggle("configuring");
                if (this.classList.contains("configuring")) {
                    current.panel = this;
                    this.moveToCentre();
                }
            });

            configMenuDiv.addEventListener("configchange", (e: Event) => {
                const customEventParsed: CustomEvent<ConfigChangeEventDetail> =
                    e as CustomEvent<ConfigChangeEventDetail>;
                if (this.config) {
                    const val = customEventParsed.detail.value;
                    (
                        this.config[
                            customEventParsed.detail.setting
                        ] as ConfigEntry.Entry
                    ).value = val;
                }

                this.triggerSave();
            });

            resolve();
        });
    }

    public getId(): number {
        return this.dashboardId;
    }

    /**
     * Gets the Area of the current Panel, as an object of @type {Area}.
     * @returns
     */
    public getArea(): Area {
        return this.area;
    }

    /**
     * Sets the Panel's Area with a complete @type {Area} input.
     * @param other
     */
    public setArea(other: Area): void {
        this.setPosition(other.getAbsoluteX(), other.getAbsoluteY());
        this.setSize(other.getAbsoluteWidth(), other.getAbsoluteHeight());
    }

    /**
     * Updates the current Panel's Area with the values in the style, in case there is ever a disconnect between the two. This should never be the case, but it is a contingency. This is for queried Panels, in case they exist. Usually, they won't, but just in case.
     */
    public updateArea(): void {
        this.setArea(
            new Area(
                {
                    x: get.normalisedCssPropertyValue(this, "--x"),
                    y: get.normalisedCssPropertyValue(this, "--y"),
                    isAbsolute: true,
                },
                {
                    width: get.normalisedCssPropertyValue(this, "--width"),
                    height: get.normalisedCssPropertyValue(this, "--height"),
                    isAbsolute: true,
                },
            ),
        );
    }

    /**
     * Gets the Panel's (Area's) position, as an object of @type {Coordinate}.
     * @returns
     */
    public getPosition(): Coordinate {
        return this.area.getCoordinates();
    }

    /**
     * Sets the Panel's position from an input set of numbers.
     * @param x - The x (horizontal) coordinate.
     * @param y - The y (vertical) coordinate.
     */
    public setPosition(x: number, y: number): void {
        this.area.setCoordinates({
            x,
            y,
            isAbsolute: true,
        });

        this.style.setProperty("--x", x + "px");
        this.style.setProperty("--y", y + "px");
    }

    public moveToCentre(): void {
        const elemBox = this.getBoundingClientRect();
        // ? Get the X and Y coordinates of the element
        const x: number = elemBox.x;
        const y: number = elemBox.y;
        // ? Get Centre of the window
        const windHorizCentre = window.innerWidth / 2;
        const windVertCentre = window.innerHeight / 2;
        // ? Get the vector you need to move to get to the centre
        const xVector = windHorizCentre - window.innerWidth * 0.4 - x;
        const yVector = windVertCentre - window.innerHeight * 0.4 - y;

        this.style.setProperty("--x-vector", xVector + "px");
        this.style.setProperty("--y-vector", yVector + "px");
    }

    /**
     * Gets the size of the Panel ('s Area) as an object of @type {Size}.
     * @returns
     */
    public getSize(): Size {
        return this.area.getSize();
    }

    /**
     * Sets the Panel's size from an input set of numbers.
     * @param width
     * @param height
     */
    public setSize(width: number, height: number): void {
        this.area.setSize({
            width,
            height,
            isAbsolute: true,
        });

        this.style.setProperty("--width", width + "px");
        this.style.setProperty("--height", height + "px");
    }

    /**
     * Returns the Panel's type, as an object of @type {PanelType}.
     * @returns{PanelType}
     */
    public getType(): PanelType {
        return this.type;
    }

    /**
     *  Sets the Panel Type from a received input of @type {PanelType}.
     * @param type
     */
    public setType(type: PanelType): void {
        this.type = type;
    }

    public getContent(): PanelContent {
        switch (this.type) {
            case PanelType.NOTEPAD:
                return {
                    body:
                        (
                            this.keyElements.get(
                                "text_area",
                            ) as HTMLTextAreaElement
                        )?.value ?? "",
                };
            case PanelType.PHOTO:
                return {
                    path:
                        (
                            this.keyElements.get(
                                "panel_image",
                            ) as HTMLImageElement
                        )?.dataset.path ?? "",
                };
        }
        return {};
    }

    public async setContent(content: PanelContent): Promise<void> {
        switch (this.type) {
            case PanelType.NOTEPAD:
                if (this.keyElements.get("text_area"))
                    (
                        this.keyElements.get("text_area") as HTMLTextAreaElement
                    ).value = content.body as string;
                else throw new Error("Missing key element: text_area");
                break;
            case PanelType.PHOTO:
                const img = this.keyElements.get(
                    "panel_image",
                ) as HTMLImageElement;
                if (img) {
                    img.dataset.path = content.path as string;
                    if (content.path) {
                        const { data } = await supabase.storage
                            .from("dashboard_media")
                            .createSignedUrl(content.path ?? "", 60);
                        img.src = data?.signedUrl ?? "";
                        img.classList.add("filled");
                    }
                } else throw new Error("Missing key element: panel_image");
                break;
        }
    }

    public getConfig(): Config | undefined {
        return this.config;
    }

    public addButtonListeners(): void {
        this.shadowRoot
            ?.querySelector<HTMLElement>(".drag-handle")
            ?.addEventListener("pointerdown", (e) => {
                current.flag = "being-dragged";

                const initData = {
                    eventCoords: {
                        x: e.clientX,
                        y: e.pageY,
                    } as Coordinate,
                    panelPos: {
                        x: this.offsetLeft,
                        y: this.offsetTop,
                    } as Coordinate,
                };

                holdHandler.drag = (e: PointerEvent): void => {
                    commonHandler.drag(this, e);
                    movePanelWithinScreen(this, e as PointerEvent, initData);
                };

                commonHandler.pointerdown(this);
            });

        this.shadowRoot
            ?.querySelector<HTMLElement>(".resize-handle")
            ?.addEventListener("pointerdown", (e) => {
                current.flag = "being-resized";

                const initData = {
                    eventCoords: {
                        x: e.clientX,
                        y: e.pageY,
                    } as Coordinate,
                    panelSize: {
                        width: this.offsetWidth,
                        height: this.offsetHeight,
                    } as Size,
                };

                holdHandler.drag = (e: PointerEvent): void => {
                    commonHandler.drag(this, e);
                    resizePanel(this, e as PointerEvent, initData);
                };

                commonHandler.pointerdown(this);
            });

        this.shadowRoot
            ?.querySelector<HTMLElement>(".delete-button")
            ?.addEventListener("click", () => {
                dashboard.deletePanel(this);
            });
    }

    public addHoverListeners(): void {
        this.addEventListener("mouseenter", hoverHandler.enter);
        this.addEventListener("pointermove", hoverHandler.move);
        this.addEventListener("mouseleave", hoverHandler.exit);
    }

    public removeHoverListeners(): void {
        this.removeEventListener("mouseenter", hoverHandler.enter);
        this.removeEventListener("pointermove", hoverHandler.move);
        this.dispatchEvent(new Event("mouseleave"));
        this.removeEventListener("mouseleave", hoverHandler.exit);
    }

    public initPreview(): void {
        preview.dataset.callerId = this.dataset.panelId;
        this.parentElement?.prepend(preview);
        snapElementToTarget(preview, this, false);
        preview.classList.add("visible");
        this.updatePreview();
    }

    public updatePreview(): void {
        snapElementToGrid(preview, this);
    }

    private bindKeyElements(): void {
        this.keyElements = new Map<string, HTMLElement>();
        switch (this.type) {
            case PanelType.NOTEPAD:
                this.keyElements.set(
                    "text_area",
                    this.querySelector("textarea")
                        ?? document.createElement("textarea"),
                );
                break;
            case PanelType.CLOCK:
                this.keyElements.set(
                    "date_text",
                    this.querySelector(".date-text")
                        ?? document.createElement("span"),
                );

                this.keyElements.set(
                    "time_text",
                    this.querySelector(".time-text")
                        ?? document.createElement("span"),
                );
                break;
            case PanelType.PHOTO:
                this.keyElements.set(
                    "drop_area",
                    this.querySelector(".drop-area")
                        ?? document.createElement("div"),
                );
                this.keyElements.set(
                    "panel_image",
                    this.querySelector(".panel-image")
                        ?? document.createElement("img"),
                );
                this.keyElements.set(
                    "upload_input",
                    this.querySelector('.image-upload-input input[type="file"]')
                        ?? document.createElement("input"),
                );
                break;
        }
    }

    public getKeyElements(): Map<string, HTMLElement> {
        return this.keyElements;
    }

    public beginBehaviour(): void {
        this.type.execute(this);
    }

    public triggerSave(): void {
        this.dispatchEvent(new CustomEvent("updatepanel", { bubbles: true }));
        const saveIcon: HTMLElement | null | undefined =
            this.shadowRoot?.querySelector(".save-icon");
        saveIcon?.part.add("visible");
        setTimeout(() => {
            saveIcon?.part.remove("visible");
        }, 500);
    }

    public static defaultPanel(): Panel {
        return new Panel(Area.INIT, PanelType.DEFAULT, 0, PanelTypeConfig.NONE);
    }
}

window.customElements.define("panel-element", Panel);

export { Panel, PanelInstance };
