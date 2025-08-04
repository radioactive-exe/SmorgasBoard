/* eslint-disable no-async-promise-executor */
import * as get from "../accessors.js";

import { Coordinate, Size, AreaInstance, Area } from "./area.js";
import { Dashboard } from "./dashboard.js";
import { PanelTypeTemplate, PanelType } from "./panel_type.js";

import * as zod from "zod";

import {
    current,
    hoverHandler,
    setDocumentHandlers,
    preview,
    holdHandler,
    dashboard,
    formatTime,
    formatDate,
} from "../app.js";
import {
    movePanelWithinScreen,
    resizePanel,
    snapElementToGrid,
    snapElementToTarget,
} from "../manip.js";
import { Config, getDefaultConfig } from "./config.js";

/**
 * @description: A type that defines the structure of a @type {Panel} in its stored format, either in localStorage or the cloud.
 *
 * @this PanelInstance */
interface PanelInstance {
    panel_id: number;
    panel_type_id: number;
    area: AreaInstance;
    content: string;
    config: Config | undefined
}

/**
 * @description: A custom HTMLElement, implements many methods for custom use with the program to make work more efficient
 *
 * @class Panel
 * @extends {HTMLElement}
 */
class Panel extends HTMLElement {
    /**
     * @description: Creates an instance of a Panel.
     *
     * POINT: @param body is optional, but the data member is not, so it is instantiated either way
     *
     * NOTE: The if()s to check @param {body} are nested to assure the compiler that @param {body} is not null by then.
     *
     * @constructor
     * @param {Area} area
     * @param {PanelType} type
     * @param {number} dashboardId
     * @param {string} [body]
     * @memberof Panel
     */
    public constructor(
        private area: Area,
        private type: PanelType,
        private dashboardId: number,
        body?: string,
        private config?: Config
        // private readonly potentialAspectRatios: number[] | null
    ) {
        super();

        this.setArea(area);
        this.setType(type);
        this.dashboardId = dashboardId;
        this.dataset.panelId = dashboardId.toString();
        this.dataset.panelType = type.toString();
        this.style.setProperty("--min-width", `${type.getMinSize()?.width ?? 1}fr`);
        this.style.setProperty("--min-height", `${type.getMinSize()?.height ?? 1}fr`);
        this.init().then(() => {
            if (body) this.setContent(body);
            if (config && type.getConfigSchema() != undefined) {
                try {
                    this.config = type.getConfigSchema()?.parse(config);
                } catch (error) {
                    console.error(error, "Invalid Panel Config provided. Please ensure the config is for the appropriate Panel Type:", type.getConfigSchema());
                }
            } else if (!config && type.getConfigSchema() != undefined) {
                this.config = getDefaultConfig(type.getConfigSchema() as zod.ZodObject);
            }
        });
    }

    public getId(): number {
        return this.dashboardId;
    }

    /**
     * @description: Gets the Area of the current Panel, as an object of @type {Area}
     *
     * @return  {Area}
     * @memberof Panel
     */
    public getArea(): Area {
        return this.area;
    }

    /**
     * @description: Sets the Panel's Area with a complete @type {Area} input
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
     * @description: Updates the current Panel's Area with the values in the style, in case there is ever a disconnect between the two. This should never be the case, but it is a contingency. This is for queried Panels, in case they exist. Usually, they won't, but just in case.
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
                }
            )
        );
    }

    /**
     * @description: Gets the Panel's (Area's) position, as an object of @type {Coordinate}
     *
     * @return  {Coordinate}
     * @memberof Panel
     */
    public getPosition(): Coordinate {
        return this.area.getCoordinates();
    }

    /**
     * @description: Sets the Panel's position from an input set of numbers.
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

    /**
     * @description: Gets the size of the Panel ('s Area) as an object of @type {Size}
     *
     * @return {Size}
     * @memberof Panel
     */
    public getSize(): Size {
        return this.area.getSize();
    }

    /**
     * @description: Sets the Panel's size from an input set of numbers.
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
     * @description: Returns the Panel's type, as an object of @type {PanelType}
     *
     * @return {PanelType}
     * @memberof Panel
     */
    public getType(): PanelType {
        return this.type;
    }

    /**
     *  @description: Sets the Panel Type from a received input of @type {PanelType}
     *
     * @param {PanelType} type
     * @memberof Panel
     */
    public setType(type: PanelType): void {
        this.type = type;
    }

    /**
     * @description: Initiates the panel's body based on its template
     *
     * @memberof Panel
     */
    private initTemplate(): Promise<void> {
        return new Promise(async (resolve) => {
            const baseResponse = await fetch(PanelTypeTemplate.BASE).then(
                (res) => res.json()
            );
            const response = await fetch(this.type.getTemplate()).then((res) =>
                res.json()
            );
            const baseResponseBody = await new DOMParser().parseFromString(
                baseResponse.panel_template,
                "text/html"
            );
            const responseBody = await new DOMParser().parseFromString(
                response.panel_template,
                "text/html"
            );

            const base: HTMLTemplateElement =
                (baseResponseBody.querySelector(
                    "template"
                ) as HTMLTemplateElement) ??
                (document.createElement("template") as HTMLTemplateElement);
            const template: HTMLTemplateElement =
                (responseBody.querySelector(
                    "template"
                ) as HTMLTemplateElement) ??
                (document.createElement("template") as HTMLTemplateElement);

            const shadow = this.attachShadow({ mode: "open" });

            if (this.type != PanelType.PREVIEW && template && base)
                shadow.prepend(base.content.cloneNode(true));
            this.prepend(template.content.cloneNode(true));
            resolve();
        });
    }

    private init(): Promise<void> {
        return new Promise((resolve) => {
            this.initTemplate().then(() =>
                this.addHoverListeners().then(() =>
                    this.addHandleListeners().then(() => {
                        this.classList.add("loaded");
                        this.beginBehaviour();
                        resolve();
                    })
                )
            );
        });
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
        try {
            switch (this.type) {
                case PanelType.NOTEPAD:
                    focus = this.querySelector<HTMLTextAreaElement>("textarea");
                    if (focus) focus.value = content.body;
                    break;
                case PanelType.PHOTO:
                    focus =
                        this.shadowRoot?.querySelector<HTMLTextAreaElement>(
                            "textarea"
                        );
                    if (focus) focus.value = content.body;
                    break;
            }
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                this.setContent(contentString);
            }, 50);
        }
    }

    public getConfig(): Config | undefined {
        return this.config;
    }

    public addHandleListeners(): Promise<void> {
        return new Promise((resolve) => {
            this.shadowRoot
                ?.querySelector<HTMLElement>(".drag-handle")
                ?.addEventListener("mousedown", (e) => {
                    current.flag = "being-dragged";
                    current.panel = this;
                    this.classList.add(current.flag, "being-manipulated");

                    this.initPreview(dashboard);

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
                        e.preventDefault();
                        movePanelWithinScreen(this, e as MouseEvent, initData);
                        this.updatePreview(dashboard);
                    };

                    setDocumentHandlers();
                });

            this.shadowRoot
                ?.querySelector<HTMLElement>(".resize-handle")
                ?.addEventListener("mousedown", (e) => {
                    current.flag = "being-resized";
                    current.panel = this;

                    this.classList.add(current.flag, "being-manipulated");

                    this.initPreview(dashboard);

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
                        e.preventDefault();
                        resizePanel(this, e as MouseEvent, initData);
                        this.updatePreview(dashboard);
                    };

                    setDocumentHandlers();
                });
            resolve();
        });
    }

    public addHoverListeners(): Promise<void> {
        return new Promise((resolve) => {
            this.addEventListener("mouseenter", hoverHandler.enter);
            this.addEventListener("mousemove", hoverHandler.move);
            this.addEventListener("mouseleave", hoverHandler.exit);
            resolve();
        });
    }

    public removeHoverListeners(): void {
        this.removeEventListener("mouseenter", hoverHandler.enter);
        this.removeEventListener("mousemove", hoverHandler.move);
        this.dispatchEvent(new Event("mouseleave"));
        this.removeEventListener("mouseleave", hoverHandler.exit);
    }

    public initPreview(dashboard: Dashboard): void {
        preview.dataset.callerId = this.dataset.panelId;
        this.parentElement?.prepend(preview);
        snapElementToTarget(preview, this, false);
        preview.classList.add("visible");
        this.updatePreview(dashboard);
    }

    public updatePreview(dashboard: Dashboard): void {
        snapElementToGrid(
            dashboard?.querySelector(".final-preview") as Panel,
            this
        );
    }

    public beginBehaviour(): void {
        switch (this.type) {
            case PanelType.CLOCK:
                setInterval(() => {
                    const now = new Date();
                    const dateText: HTMLElement | null = this.querySelector(".date-text");
                    if (dateText) dateText.textContent = formatDate(now, this.config);
                    const timeText: HTMLElement | null = this.querySelector(".time-text");
                    if (timeText) timeText.textContent = formatTime(now, this.config);
                }, 1000);
                break;

            default:
                break;
        }
    }

    public static defaultPanel(): Panel {
        return new Panel(Area.INIT, PanelType.DEFAULT, 0);
    }
}

window.customElements.define("panel-element", Panel);

export { PanelInstance, Panel };
