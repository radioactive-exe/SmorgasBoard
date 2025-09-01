/**
 * @file
 * A file containing the {@link Panel} class.
 * @author Radioactive.exe
 * {@link https://github.com/radioactive-exe | GitHub Profile}
 */


/** File Header Delimiter. */
import * as zod from "zod";

import {
    commonHandler,
    current,
    holdHandler,
    hoverHandler,
    preview,
} from "../../app.js";

import * as get from "../../functions/accessors.js";

import {
    movePanelWithinScreen,
    resizePanel,
    snapElementToGrid,
    snapElementToTarget,
} from "../../functions/manip.js";

import { Area, AreaInstance, Coordinate, Size } from "../area.js";

import {
    Config,
    ConfigChangeEventDetail,
    getDefaultConfig,
} from "../config/config.js";

import * as ConfigEntry from "../config/config_entry.js";
import { configMenu } from "../config/config_menu_builder.js";

import { PanelType, PanelTypeConfig, PanelTypeTemplate } from "./panel_type.js";

/**
 * @description A type that defines the structure of a @type {Panel} in its stored format, either in localStorage or the cloud.
 */
interface PanelInstance {
    panel_id: number;
    panel_type_id: number;
    area: AreaInstance;
    content: string;
    config: Config | undefined;
}

interface PanelFetchResponse {
    panel_type: string;
    panel_template: string;
}

/**
 * @description A custom HTMLElement, implements many methods for custom use with the program to make work more efficient
 *
 * {@label Panel}
 * @extends {HTMLElement}
 */
class Panel extends HTMLElement {
    /**
     * @description Creates an instance of a Panel.
     *
     *
     * @constructor
     * @param {Area} area
     * @param {PanelType} type
     * @param {number} dashboardId
     * @param {string} [body]
     * @memberof Panel
     */
    public constructor(
        protected area: Area,
        protected type: PanelType,
        protected dashboardId: number,
        protected config: Config | undefined,
        body?: string,
    ) {
        super();

        this.setArea(area);
        this.setType(type);
        this.dashboardId = dashboardId;
        this.dataset.panelId = dashboardId.toString();
        this.dataset.panelType = type.toString();
        this.init(config, body);
    }

    private init(existentConfig?: Config, body?: string): void {
        this.initBase()
            .then(() => {
                this.addHoverListeners();
                this.addHandleListeners();
            })
            .then(() => this.initTemplate())
            .then(() => this.initConfig(existentConfig))
            .then(() => {
                this.dispatchEvent(new CustomEvent("finished-loading"));
                if (body) this.setContent(body);
                this.beginBehaviour();
            });
    }

    private initBase(): Promise<void> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            if (this.type == PanelType.PREVIEW) {
                resolve();
                return;
            }
            const baseResponse: PanelFetchResponse = await fetch(
                PanelTypeTemplate.BASE,
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
     * @description Initiates the panel's body based on its template
     *
     * @memberof Panel
     */
    private initTemplate(): Promise<void> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            if (this.type == PanelType.PREVIEW) {
                resolve();
                return;
            }
            const response: PanelFetchResponse = await fetch(
                this.type.getTemplate(),
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

            if (configSchema != PanelTypeConfig.NONE) {
                const configContainer: HTMLElement =
                    this.shadowRoot?.querySelector(".config") as HTMLElement;
                const configMenuDiv: HTMLElement =
                    configContainer?.querySelector(
                        ".config-menu",
                    ) as HTMLElement;
                const configButton: HTMLElement =
                    configContainer?.querySelector(
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
                    } else this.setArea(this.getArea());
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

                    this.dispatchEvent(
                        new CustomEvent("updatepanel", { bubbles: true }),
                    );
                });
            }
            resolve();
        });
    }

    public getId(): number {
        return this.dashboardId;
    }

    /**
     * @description Gets the Area of the current Panel, as an object of @type {Area}
     *
     * @returns {Area}
     * @memberof Panel
     */
    public getArea(): Area {
        return this.area;
    }

    /**
     * @description Sets the Panel's Area with a complete @type {Area} input
     *
     * @param {Area} other
     * @memberof Panel
     */
    public setArea(other: Area): void {
        this.area = new Area(other.getCoordinates(), other.getSize());

        this.style.setProperty("--x", other.getAbsoluteX() + "px");
        this.style.setProperty("--y", other.getAbsoluteY() + "px");

        this.style.setProperty("--width", other.getAbsoluteWidth() + "px");
        this.style.setProperty("--height", other.getAbsoluteHeight() + "px");
    }

    /**
     * @description Updates the current Panel's Area with the values in the style, in case there is ever a disconnect between the two. This should never be the case, but it is a contingency. This is for queried Panels, in case they exist. Usually, they won't, but just in case.
     *
     * @memberof Panel
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
     * @description Gets the Panel's (Area's) position, as an object of @type {Coordinate}
     *
     * @returns {Coordinate}
     * @memberof Panel
     */
    public getPosition(): Coordinate {
        return this.area.getCoordinates();
    }

    /**
     * @description Sets the Panel's position from an input set of numbers.
     *
     * @param {number} x - The x (horizontal) coordinate
     * @param {number} y - The y (vertical) coordinate
     * @memberof Panel
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
     * @description Gets the size of the Panel ('s Area) as an object of @type {Size}
     *
     * @returns{Size}
     * @memberof Panel
     */
    public getSize(): Size {
        return this.area.getSize();
    }

    /**
     * @description Sets the Panel's size from an input set of numbers.
     *
     * @param {number} width
     * @param {number} height
     * @memberof Panel
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
     * @description Returns the Panel's type, as an object of @type {PanelType}
     *
     * @returns{PanelType}
     * @memberof Panel
     */
    public getType(): PanelType {
        return this.type;
    }

    /**
     *  @description Sets the Panel Type from a received input of @type {PanelType}
     *
     * @param {PanelType} type
     * @memberof Panel
     */
    public setType(type: PanelType): void {
        this.type = type;
    }

    public getContent(): object {
        switch (this.type) {
            case PanelType.NOTEPAD:
                return {
                    body: this.querySelector("textarea")?.value ?? "",
                };
        }
        return {};
    }

    public setContent(contentString: string): void {
        const content = JSON.parse(contentString);
        let focus;
        switch (this.type) {
            case PanelType.NOTEPAD:
                focus = this.querySelector<HTMLTextAreaElement>("textarea");
                if (focus) focus.value = content.body;
                break;
            case PanelType.PHOTO:
                focus =
                    this.shadowRoot?.querySelector<HTMLTextAreaElement>(
                        "textarea",
                    );
                if (focus) focus.value = content.body;
                break;
        }
    }

    public getConfig(): Config | undefined {
        return this.config;
    }

    public addHandleListeners(): void {
        this.shadowRoot
            ?.querySelector<HTMLElement>(".drag-handle")
            ?.addEventListener("mousedown", (e) => {
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

                holdHandler.drag = (e: MouseEvent): void => {
                    commonHandler.drag(this, e);
                    movePanelWithinScreen(this, e as MouseEvent, initData);
                };

                commonHandler.mouseDown(this);
            });

        this.shadowRoot
            ?.querySelector<HTMLElement>(".resize-handle")
            ?.addEventListener("mousedown", (e) => {
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

                holdHandler.drag = (e: MouseEvent): void => {
                    commonHandler.drag(this, e);
                    resizePanel(this, e as MouseEvent, initData);
                };

                commonHandler.mouseDown(this);
            });
    }

    public addHoverListeners(): void {
        this.addEventListener("mouseenter", hoverHandler.enter);
        this.addEventListener("mousemove", hoverHandler.move);
        this.addEventListener("mouseleave", hoverHandler.exit);
    }

    public removeHoverListeners(): void {
        this.removeEventListener("mouseenter", hoverHandler.enter);
        this.removeEventListener("mousemove", hoverHandler.move);
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

    public beginBehaviour(): void {
        this.type.execute(this);
    }

    public static defaultPanel(): Panel {
        return new Panel(Area.INIT, PanelType.DEFAULT, 0, PanelTypeConfig.NONE);
    }
}

window.customElements.define("panel-element", Panel);

export { Panel, PanelInstance };
