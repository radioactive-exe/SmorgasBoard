/**
 * A file containing the {@link Panel} class, and the relevant Instance and
 * Content interfaces.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */
import type * as zod from "zod";

import {
    commonHandler,
    current,
    dashboard,
    documentPointerHandlers,
    preview,
    supabase,
} from "../../app.js";

import * as get from "../../functions/accessors.js";

import {
    hoverHandler,
    movePanelWithinScreen,
    resizePanel,
    snapElementToGrid,
    snapElementToTarget,
} from "../../functions/manip.js";

import type { EarthCoordinates, TodoTask } from "../../types/main.types.js";
import type { PanelFetchResponse } from "../../types/response.types.js";
import type * as WeatherAPI from "../../types/weather_api.types.js";
import type { AreaInstance, Coordinates, Size } from "../area.js";
import { Area } from "../area.js";
import type { Config, ConfigChangeEventDetail } from "../config/config.js";
import { getDefaultConfig } from "../config/config.js";
import type * as ConfigEntry from "../config/config_entry.js";
import { configMenu } from "../config/config_menu_builder.js";

import { addEntry } from "./panel_behaviour/todo_panel.js";
import { savedLocationEntry } from "./panel_behaviour/weather_panel.js";
import { PanelType, PanelTypeConfig, PanelTypeTemplate } from "./panel_type.js";

/**
 * A type that defines the structure of a {@link Panel} in its stored format,
 * either in localStorage or the cloud.
 */
interface PanelInstance {
    panel_id: number;
    panel_type_id: number;
    area: AreaInstance;
    content: PanelContent;
    config: Config | undefined;
}

/**
 * The shape and potential format that Panel Content can have when loaded from
 * local or database storage.
 *
 * @see {@link PanelInstance}
 * @see {@link Panel.setContent | Panel.setContent()}
 * @see {@link Panel.getContent | Panel.getContent()}
 */
interface PanelContent {
    path?: string;
    body?: string | TodoTask[] | EarthCoordinates[];
}

/**
 * The crown jewel of Smorgasboard. This is the mighty Panel, the main element
 * that serves as the cornerstone of the Dashboard. It can be manipulated,
 * configured, updated, and used to store everything your heart desires (that
 * has been implemented).
 *
 * @see {@link PanelInstance}
 * @see {@link PanelContent}
 */
class Panel extends HTMLElement {
    /**
     * The KeyElements that this panel has. This is determined by its PanelType,
     * and these elements are utilised in its behavioural execution.
     *
     * @see {@link PanelType}
     * @see {@link bindKeyElements | bindKeyElements()}
     * @see {@link getKeyElements | getKeyElements()}
     * @see {@link getKeyElement | getKeyElement()}
     */
    private keyElements: Map<string, HTMLElement | null>;
    /**
     * The timeout to trigger a save. Mostly, this is used to show the Save
     * icon, as the save delay is handled by the Dashboard itself.
     *
     * @see {@link triggerSave | triggerSave()}
     */
    private saveTimeout: NodeJS.Timeout;

    /**
     * Creates an instance of Panel and initialises all relevant and important
     * attributes, including the Config, etc.
     *
     * @param area        - The Area to initialise the Panel with (its location
     *   and size).
     * @param type        - The PanelType the Panel has.
     * @param dashboardId - The unique ID the Panel will have in the Dashboard.
     *   This is readonly as this should not be changed after being created.
     * @param config      - A Config to initialise the Panel with. Default is
     *   `undefined` as the Panel will be instantiated with the Default config
     *   for its PanelType, unless an explicit Config is loaded from saved
     *   data.
     * @param body        - Optional content to populate the Panel with upon
     *   initialisation.
     *
     * @example
     *
     * ```ts
     * const panel = new Panel(new Area({ x: 0, y: 3 }), PanelType.WEATHER, 3);
     * ```
     *
     * The above constructs a Weather Panel, positioned at (0,3) with a default
     * size of 1x1 (which is smaller than the minimum for the PanelType, but it
     * this example is illustrative) and a unique ID of 3 in the Dashboard.
     *
     * @see {@link Area}
     * @see {@link PanelType}
     * @see {@link Config}
     * @see {@link PanelContent}
     * @see {@link PanelInstance}
     */
    public constructor(
        private area: Area,
        private readonly type: PanelType,
        private readonly dashboardId: number,
        private config: Config | undefined = undefined,
        body?: PanelContent,
    ) {
        // ? Calls the HTMLElement constructor
        super();

        this.setArea(area);
        this.type = type;
        this.dashboardId = dashboardId;
        this.dataset.panelId = dashboardId.toString();
        this.dataset.panelType = type.toString();
        this.init(config, body);
    }

    // eslint-disable-next-line jsdoc/require-example
    /**
     * Initialise the Panel completely, starting with the base/template and
     * ending when behaviour begins.
     *
     * @param existentConfig - An optional existent Config to assign to the
     *   Panel. If this is not passed, the Default Config for the PanelType will
     *   be assigned.
     * @param body           - An optional existent object with Content to
     *   populate into the Panel upon loading/initialising.
     *
     * @see {@link initBase | initBase()}
     * @see {@link addHoverListeners | addHoverListeners()}
     * @see {@link addButtonListeners | addButtonListeners()}
     * @see {@link initTemplate | initTemplate()}
     * @see {@link bindKeyElements | bindKeyElements()}
     * @see {@link initConfig | initConfig()}
     */
    private init(existentConfig?: Config, body?: PanelContent): void {
        // ? If this is the Preview panel, (which should only be created once)
        // ? add the preview class and exit. All is done here
        if (this.type == PanelType.PREVIEW) {
            this.classList.add("final-preview");
            return;
        }

        // ? Initialise the Panel step by step, moving to the next step once the previous Promise resolved

        // ? (1) Initialise the base, with the empty Panel body, handles, and buttons
        this.initBase()

            // ? (2) Add the rotation/scale hover listeners and the button listeners for the handles
            // ?     and manipulation handles
            .then(() => {
                this.addHoverListeners();
                this.addButtonListeners();
            })
            // ? (3) Initialise the template for the Panel's PanelType
            .then(() => this.initTemplate())
            // ? (4) Initialise the Config, passing an existing one if present
            .then(() => this.initConfig(existentConfig))
            // ? (5) Bind any key elements for the PanelType
            .then(() => this.bindKeyElements())
            // ? (6) Dispatch the event signaling that the Panel has finished loading,
            // ?     then populate the body if one is passed in, and begin the behaviour!
            .then(() => {
                this.dispatchEvent(new CustomEvent("finished-loading"));
                if (body) this.setContent(body);
                this.beginBehaviour();
            });
    }

    /**
     * Initialise the base/empty body of the Panel with its buttons and
     * container.
     *
     * @returns A promise that is resolved once the base has initialised.
     *
     * @see {@link init | init()}
     * @see {@link addHoverListeners | addHoverListeners()}
     * @see {@link addButtonListeners | addButtonListeners()}
     * @see {@link initTemplate | initTemplate()}
     * @see {@link bindKeyElements | bindKeyElements()}
     * @see {@link initConfig | initConfig()}
     */
    private initBase(): Promise<void> {
        return new Promise(async (resolve) => {
            // ? Fetch the base definition from the backend, parse it,
            // ? and store it as a Template Element
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

            // ? Append a shadow DOM to the Panel
            const shadow: ShadowRoot = this.attachShadow({ mode: "open" });

            // ? Once the base has finished being fetched and parsed, fill the shadow DOM with it
            if (base) {
                shadow.prepend(base.content.cloneNode(true));
            }
            resolve();
        });
    }

    /**
     * Initiates the Panel's shape/content with its defined template in the
     * backend, determined by its PanelType.
     *
     * @returns A promise that is resolved once the template has initialised.
     *
     * @see {@link init | init()}
     * @see {@link initBase | initBase()}
     * @see {@link addHoverListeners | addHoverListeners()}
     * @see {@link addButtonListeners | addButtonListeners()}
     * @see {@link bindKeyElements | bindKeyElements()}
     * @see {@link initConfig | initConfig()}
     */
    private initTemplate(): Promise<void> {
        return new Promise(async (resolve) => {
            // ? Fetch the template definition from the backend, parse it,
            // ? and store it as a Template Element
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

            // ? Once the template has been fetched and parsed, remove the Skeleton,
            // ? and append the contents of the template. Then, resolve
            if (template) {
                const skeleton: HTMLElement | null | undefined =
                    this.shadowRoot?.querySelector(".skeleton");
                if (skeleton) skeleton.remove();
                this.prepend(template.content.cloneNode(true));
            }
            resolve();
        });
    }

    /**
     * Initiates the Panel's Config, with an optional existing Config, otherwise
     * initialising with the Default Config for the PanelType.
     *
     * @param   existentConfig - An optional existing Config to assign to the
     *   Panel. If this is not provided (always the case with new Panels), then
     *   the Default Config will be used.
     *
     * @returns                A promise that is resolved once the Config has
     *   initialised.
     *
     * @example
     *
     * ```ts
     * initConfig({"use24Hr": { "label": "Use 24 Hour time", "value": true}});
     * ```
     *
     * The above passes an existing Config with one simple Boolean Entry to be
     * assigned to the Panel.
     *
     * @see {@link Config}
     * @see {@link PanelTypeConfig}
     * @see {@link init | init()}
     * @see {@link initBase | initBase()}
     * @see {@link initTemplate | initTemplate()}
     * @see {@link addHoverListeners | addHoverListeners()}
     * @see {@link addButtonListeners | addButtonListeners()}
     * @see {@link bindKeyElements | bindKeyElements()}
     */
    private initConfig(existentConfig?: Config): Promise<void> {
        return new Promise((resolve): void => {
            // * The PanelType's Config schema
            const configSchema: zod.ZodObject | undefined =
                this.type.getConfigSchema();

            // ? If the PanelType has no Config, simply resolve and exit. Nothing to do here
            if (configSchema == PanelTypeConfig.NONE) {
                resolve();
                return;
            }

            // * The Config container, Menu, and Button elements, queried to be
            // * made visible as if the function reaches this point, then the PanelType
            // * has a Config schema. Additionally, the Menu will be populated below
            const configContainer: HTMLElement = this.shadowRoot?.querySelector(
                ".config",
            ) as HTMLElement;
            const configMenuDiv: HTMLElement = configContainer?.querySelector(
                ".config-menu",
            ) as HTMLElement;
            const configButton: HTMLElement = configContainer?.querySelector(
                ".config-button",
            ) as HTMLElement;

            // ? Make all relevant elements visible
            configContainer.removeAttribute("hidden");
            configButton.removeAttribute("hidden");

            // ? If there is an existent Config being passed, ensure it satisfies
            // ? the PanelType's schema, and assign it if all is well, or throw an error if not
            if (existentConfig) {
                try {
                    this.config = configSchema.parse(existentConfig);
                } catch (error) {
                    console.error(
                        error,
                        "Invalid Panel Config provided. Please ensure the config is for the appropriate PanelType.",
                    );
                }
            } else {
                // ? Otherwise, assign the default Config for the PanelType
                this.config = getDefaultConfig(configSchema);
            }

            // ? Build the Config Menu for the Config resulting at this point, and append it to the container
            configMenuDiv.appendChild(configMenu(this.config as Config));

            // ? Handle clicking the Config button to open and close the Configuration menu,
            // ? moving the Panel to the centre and setting it as the current one if the menu was opened
            // ? on this toggle
            configButton.addEventListener("click", () => {
                this.classList.toggle("configuring");
                if (this.classList.contains("configuring")) {
                    current.panel = this;
                    this.moveToCentre();
                }
            });

            // ? Handle a config change event, setting the new value to the changed setting,
            // ? and triggering a delayed save.
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

            // ? All is initialised, resolve
            resolve();
        });
    }

    /**
     * Gets the Panel's Config, if available.
     *
     * @returns The Config object, if present, or `undefined` if the PanelType
     *   has no Config Schema (and thus no Config was initialised).
     *
     * @see {@link initConfig | initConfig()}
     */
    public getConfig(): Config | undefined {
        return this.config;
    }

    /**
     * Get the numerical ID of the Panel in the Dashboard.
     *
     * @returns The ID the Panel has in the Dashboard.
     */
    public getId(): number {
        return this.dashboardId;
    }

    /**
     * Gets the Area of the current Panel.
     *
     * @returns The Area object for the Panel's Area, including both the
     *   position and size.
     *
     * @see {@link setArea | setArea()}
     */
    public getArea(): Area {
        return this.area;
    }

    /**
     * Sets the Panel's Area to an inputted one.
     *
     * @param other - The complete Area to copy and apply to the Panel.
     *
     * @example
     *
     * ```ts
     * panel.setArea(Area.INIT);
     * ```
     *
     * The above sets the Panel's Area to be positioned at (0,0) with a size of
     * 1x1.
     *
     * @see {@link getArea | getArea()}
     */
    public setArea(other: Area): void {
        this.setPosition(other.getAbsoluteX(), other.getAbsoluteY());
        this.setSize(other.getAbsoluteWidth(), other.getAbsoluteHeight());
    }

    /**
     * Updates the current Panel's Area with the values in the style, in case
     * there is ever a disconnect between the two.
     *
     * @remarks
     * This should never be the case, but it is a contingency. This is for
     * queried Panels already in the body when the Dashboard loads, in case they
     * exist. Usually, they won't, but just in case. It updates the connection
     * by simply setting the Area to the absolute values already stored in the
     * styles, where they are handled by the Area constructor and rounded.
     *
     * @see {@link area}
     * @see {@link Area}
     * @see {@link getArea | getArea()}
     * @see {@link setArea | setArea()}
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
     * Gets the Panel's position.
     *
     * @returns The Position stored in the Panel's Area, as an object of type
     *   {@link Coordinates}.
     *
     * @see {@link area}
     * @see {@link getArea | getArea()}
     * @see {@link setPosition | setPosition()}
     * @see {@link Coordinates}
     */
    public getPosition(): Coordinates {
        return this.area.getCoordinates();
    }

    /**
     * Sets the Panel's position from an input set of absolute numbers (in
     * pixels).
     *
     * @param x - The x (horizontal) coordinate.
     * @param y - The y (vertical) coordinate.
     *
     * @example
     *
     * ```ts
     * panel.setPosition(0, 0)
     * ```
     *
     * The above resets the Panel's position to the top left corner of the
     * Dashboard.
     *
     * @see {@link area}
     * @see {@link getPosition | getPosition()}
     * @see {@link Area.setPosition | Area.setPosition()}
     * @see {@link Coordinates}
     */
    public setPosition(x: number, y: number): void {
        this.area.setPosition({
            x,
            y,
            isAbsolute: true,
        });

        this.style.setProperty("--x", x + "px");
        this.style.setProperty("--y", y + "px");
    }

    /**
     * Moves the Panel's body to the centre of the screen/window, both
     * vertically and horizontally.
     *
     * @remarks
     * This moves the Panel to the centre regardless of its initial position on
     * the screen, and is called when focusing on the Panel body, such as when
     * expanding to open the Config menu.
     *
     * {@link setPosition | setPosition()} is not used as this is a stylistic
     * approach that only manipulates the actual Panel's body, as opposed to
     * altering the position of the actual containing element.
     */
    public moveToCentre(): void {
        // * The bounding rectangle for the Panel's visual position
        const elemBox = this.getBoundingClientRect();

        // * The X and Y coordinates
        const x: number = elemBox.x;
        const y: number = elemBox.y;

        // * The centre of the window
        const windHorizCentre = window.innerWidth / 2;
        const windVertCentre = window.innerHeight / 2;

        // ? Get the vector you need to move to get to the centre,
        // ? accounting for the scale the Config Menu will have
        const xVector = windHorizCentre - window.innerWidth * 0.4 - x;
        const yVector = windVertCentre - window.innerHeight * 0.4 - y;

        // ? Update the style to smoothly transition the Panel body to the centre
        this.style.setProperty("--x-vector", xVector + "px");
        this.style.setProperty("--y-vector", yVector + "px");
    }

    /**
     * Gets the size of the Panel.
     *
     * @returns - The Size of the Panel's Area, as an object of type
     *   {@link Size}.
     *
     * @see {@link area}
     * @see {@link setSize | setSize()}
     * @see {@link getArea | getArea()}
     * @see {@link Size}
     */
    public getSize(): Size {
        return this.area.getSize();
    }

    /**
     * Sets the Panel's Size from an input set of absolute numbers (in pixels).
     *
     * @param width  - The width to apply to the Panel.
     * @param height - The height to apply to the Panel.
     *
     * @example
     *
     * ```ts
     * panel.setSize(150, 300);
     * ```
     *
     * The above sets the Size of the panel to be 150 pixels wide and 300 pixels
     * tall.
     *
     * @see {@link area}
     * @see {@link getSize | getSize()}
     * @see {@link Area.setSize | Area.setSize()}
     * @see {@link Size}
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
     * Gets the Panel's PanelType.
     *
     * @returns The type of Panel as an object of type {@link PanelType}.
     *
     * @see {@link PanelType}
     */
    public getType(): PanelType {
        return this.type;
    }

    /**
     * Get the Content of the Panel, parsed and formulated in a specific way
     * depending on the PanelType.
     *
     * @remarks
     * The PanelType determines how the PanelContent is formed for the specific
     * Panel, thus affecting how to Get (this method) and Set
     * ({@link setContent | setContent()}) the Content for a Panel.
     *
     * @returns The PanelContent, formed in a way determined by the PanelType,
     *   with each object property holding something different depending on the
     *   type.
     *
     * @see {@link PanelContent}
     * @see {@link PanelType}
     * @see {@link setContent | setContent()}
     */
    public getContent(): PanelContent {
        // ? Form the Content depending on the PanelType
        switch (this.type) {
            case PanelType.NOTEPAD:
                // ? In case the Panel is a Notepad Panel, the Content body is the
                // ? content of the text area
                return {
                    body:
                        (
                            this.keyElements.get(
                                "text_area",
                            ) as HTMLTextAreaElement
                        )?.value ?? "",
                };
            case PanelType.PHOTO:
                // ? In case the Panel is a Photo Panel, the content path property
                // ? is the path dataset attribute stored in the main Image element
                return {
                    path:
                        (
                            this.keyElements.get(
                                "panel_image",
                            ) as HTMLImageElement
                        )?.dataset.path ?? "",
                };
            case PanelType.TODO:
                // ? In case the Panel is a Todo Panel, the content body is a list of
                // ? entries mapped from all the Todo tasks in the body of the Panel,
                // ? with each entry task being the content of the entry, and the checked
                // ? property holding whether or not the task was completed
                const todoList = this.keyElements.get("todo_list");
                if (!todoList) return {};
                return {
                    body: [
                        ...(todoList?.children as HTMLCollectionOf<HTMLElement>),
                    ].map((entry: HTMLElement) => {
                        return {
                            task: entry.textContent,
                            checked:
                                (
                                    entry.querySelector(
                                        ".checkbox-input",
                                    ) as HTMLInputElement
                                )?.checked ?? false,
                        };
                    }),
                };
            case PanelType.WEATHER:
                // ? In case the Panel is a Weather panel, the content body is a list of
                // ? entries mapped from the list of all Saved Locations in the body of the Panel,
                // ? with each entry holding the Latitude and Longitude of the corresponding
                // ? saved location
                const savedLocations = this.keyElements.get(
                    "saved_location_list",
                );
                if (!savedLocations) return {};
                return {
                    body: [
                        ...(savedLocations?.children as HTMLCollectionOf<HTMLElement>),
                    ].map((entry) => {
                        return {
                            lat: parseFloat(entry.dataset.lat ?? "0"),
                            lon: parseFloat(entry.dataset.lon ?? "0"),
                        };
                    }),
                };
            default:
                // ? In case there is no specific implementation for the content of
                // ? a particular PanelType, simply return an empty object
                return {};
        }
    }

    /**
     * Populates the Panel body with the loaded PanelContent in a way unique to
     * the Panel Type.
     *
     * @remarks
     * How the content is populated and slotted into the Panel's different
     * elements is based on the PanelType, with each PanelType setting different
     * properties of the {@link PanelContent} object in different elements,
     * locations, and ways.
     *
     * @param   content - The loaded PanelContent to populate in the Panel.
     *
     * @returns         A promise that is resolved once all content has been
     *   placed.
     *
     * @example
     *
     * ```ts
     * panel.setContent({body: "Here is some text \n And then some more"});
     * ```
     *
     * The above, in the case of a Notepad Panel, will insert the inputted
     * string `body` as the content of the Notepad TextArea.
     *
     * @see {@link PanelContent}
     * @see {@link PanelType}
     * @see {@link getContent | getContent()}
     */
    public async setContent(content: PanelContent): Promise<void> {
        // ? If the content is empty, exit
        if (!content.body && !content.path) return;

        // ? Otherwise, populate the content depending on the PanelType
        switch (this.type) {
            case PanelType.NOTEPAD:
                // ? If the Panel is a Notepad Panel, insert content.body as the content of the
                // ? main TextArea element, or throw an error if the key element is missing

                // * The main text area element
                if (this.keyElements.get("text_area"))
                    (
                        this.keyElements.get("text_area") as HTMLTextAreaElement
                    ).value = content.body as string;
                else throw new Error("Missing key element: text_area");
                break;
            case PanelType.PHOTO:
                // ? If the Panel is a Photo Panel, insert content.path as the dataset attribute for the
                // ? path in the main Image element. Then, get a signed URL from the Supabase storage
                // ? for the media at this Path, and use that signed URL as the source for the main Image

                // * The main Image element
                const img = this.keyElements.get(
                    "panel_image",
                ) as HTMLImageElement;
                // ? If the key element was found
                if (img) {
                    // ? Set the dataset attribute for the path
                    img.dataset.path = content.path;

                    // ? Get a Signed URL for the media at the given path, if present
                    if (content.path) {
                        const { data } = await supabase.storage
                            .from("dashboard_media")
                            .createSignedUrl(content.path ?? "", 60);

                        // ? Populate the Image element with the obtained URL and show it
                        img.src = data?.signedUrl ?? "";
                        img.classList.add("filled");
                    }

                    // ? Otherwise, throw an error that the key element is missing
                } else throw new Error("Missing key element: panel_image");
                break;
            case PanelType.TODO:
                // ? If the Panel is a Todo list panel, parse the content body as a list of TodoTasks
                // ? and iterate, if successful, over each entry, adding a new Todo Task in the Panel body
                // ? for each, populating the body and checking the task off if needed

                // * The UL element holding all Todo tasks in the Panel body
                const todoList = this.keyElements.get("todo_list") as
                    | HTMLUListElement
                    | undefined
                    | null;

                // ? If the UL element was found/obtained, parse the content and add the entries
                if (todoList) {
                    const parsedContent = content.body;

                    // ? If there is no content, exit.
                    if (!parsedContent) return;

                    // ? Otherwise, iterate over each TodoTask in the array, adding the task
                    // ? to the body accordingly
                    (parsedContent as TodoTask[]).forEach((entry) => {
                        addEntry(
                            this,
                            todoList,
                            entry.task,
                            entry.checked,
                            false,
                        );
                    });
                    // ? Otherwise, throw an error that the key element is missing
                } else throw new Error("Missing key element: todo_list");
                break;
            case PanelType.WEATHER:
                // ? If the Panel is a Weather Panel, iterate through all saved locations,
                // ? stored as pairs of lat/lon coordinates, fetch the necessary weather information
                // ? for the location at the coordinates, then add the saved location entry in the body
                // ? with all necessary information and listeners.

                // * The UL containing all saved locations in the Panel body
                const savedLocations = this.keyElements.get(
                    "saved_location_list",
                ) as HTMLUListElement | undefined | null;

                const parsedContent = content.body;

                // ? If the parsed content is empty, exit
                if (!parsedContent) return;

                // ? If the UL element was found/obtained, parse the content and add the entries
                if (savedLocations) {
                    (parsedContent as EarthCoordinates[]).forEach(
                        async (location) => {
                            // ? Fetch and parse the Weather Forecast information for the corresponding location
                            const weatherResponse = await fetch(
                                `${import.meta.env.VITE_BACKEND_URL}${this.type.getDataSource()}/forecast/${location.lat},${location.lon}&days=1`,
                            );
                            const data: WeatherAPI.LocationForecast =
                                await weatherResponse.json();

                            // * Whether or not to use Celsius as opposed to Fahrenheit, based on the Config
                            const useCelsius = (
                                this.config?.useCelsius as ConfigEntry.Boolean
                            ).value;
                            // * What unit symbol to use, based on `useCelsius`. Stored for reuse
                            const temperatureSymbol = useCelsius ? "C" : "F";

                            // ? Finally, add the saved location entry to the list for the EarthCoordinates entry
                            savedLocations.appendChild(
                                savedLocationEntry(
                                    this,
                                    data.location.name,
                                    location.lat,
                                    location.lon,
                                    data.current.condition.text,
                                    `${Math.round(useCelsius ? data.current.temp_c : data.current.temp_f)}&deg${temperatureSymbol}`,
                                    `${Math.round(useCelsius ? data.forecast.forecastday[0].day.mintemp_c : data.forecast.forecastday[0].day.mintemp_f)}&deg${temperatureSymbol}`,
                                    `${Math.round(useCelsius ? data.forecast.forecastday[0].day.maxtemp_c : data.forecast.forecastday[0].day.maxtemp_f)}&deg${temperatureSymbol}`,
                                    false,
                                ),
                            );
                        },
                    );
                    // ? Otherwise, throw an error that the key element is missing
                } else
                    throw new Error("Missing key element: saved_location_list");
        }
    }

    /**
     * Initialise all button handlers and listeners for both handles and
     * buttons.
     *
     * @remarks
     * This includes the resize handle, the drag handle, and the delete button,
     * but this list may grow as the implementation evolves.
     *
     * @see {@link init | init()}
     * @see {@link initBase | initBase()}
     * @see {@link initTemplate | initTemplate()}
     * @see {@link addHoverListeners | addHoverListeners()}
     * @see {@link bindKeyElements | bindKeyElements()}
     */
    public addButtonListeners(): void {
        // ? Add listeners to the Drag handle
        this.shadowRoot
            ?.querySelector<HTMLElement>(".drag-handle")
            ?.addEventListener("pointerdown", (e) => {
                // ? Set the current flag to the dragging flag
                current.flag = "being-dragged";

                /**
                 * The initial event coordinates and Panel Coordinates at the
                 * time of this first pointerdown event.
                 */
                const initData = {
                    eventCoords: {
                        x: e.clientX,
                        y: e.pageY,
                    } as Coordinates,
                    panelPos: {
                        x: get.normalisedCssPropertyValue(this, "--x"),
                        y: get.normalisedCssPropertyValue(this, "--y"),
                    } as Coordinates,
                };

                // eslint-disable-next-line jsdoc/require-example
                /**
                 * The function assigned to the documentPointerHandler, now
                 * calling the common handler and the moving function to drag
                 * the Panel around.
                 *
                 * @param e - The PointerEvent that will trigger this listener
                 *   as the pointer moves around the screen.
                 */
                documentPointerHandlers.drag = (e: PointerEvent): void => {
                    // ? Call the common drag handler
                    commonHandler.drag(this, e);
                    // ? And uniquely, move the Panel
                    movePanelWithinScreen(this, e as PointerEvent, initData);
                };

                // ? Call the common handler for the initial pointerdown event, adding the flags, etc.
                commonHandler.pointerdown(this);
            });

        // ? Add listeners to the Resize handle
        this.shadowRoot
            ?.querySelector<HTMLElement>(".resize-handle")
            ?.addEventListener("pointerdown", (e) => {
                current.flag = "being-resized";

                /**
                 * The initial event coordinates and Panel Size at the time of
                 * this first pointerdown event.
                 */
                const initData = {
                    eventCoords: {
                        x: e.clientX,
                        y: e.pageY,
                    } as Coordinates,
                    panelSize: {
                        width: this.offsetWidth,
                        height: this.offsetHeight,
                    } as Size,
                };

                // eslint-disable-next-line jsdoc/require-example
                /**
                 * The function assigned to the documentPointerHandler, now
                 * calling the common handler and the resizing function to
                 * resize the Panel.
                 *
                 * @param e - The PointerEvent that will trigger this listener
                 *   as the pointer moves around the screen.
                 */
                documentPointerHandlers.drag = (e: PointerEvent): void => {
                    // ? Call the common handler
                    commonHandler.drag(this, e);
                    // ? And uniquely, resize the Panel
                    resizePanel(this, e as PointerEvent, initData);
                };

                // ? Call the common handler for the initial pointerdown event, adding the flags, etc.
                commonHandler.pointerdown(this);
            });

        // ? Add listeners to the Delete button
        this.shadowRoot
            ?.querySelector<HTMLElement>(".delete-button")
            ?.addEventListener("click", () => {
                // ? Delete if clicked on. Pretty self explanatory
                dashboard.deletePanel(this);
            });
    }

    /**
     * Adds all hover handlers responsible for rotating the Panel on mouse
     * hovering.
     *
     * @see {@link hoverHandler}
     * @see {@link removeHoverListeners | removeHoverListeners()}
     * @see {@link init | init()}
     * @see {@link initBase | initBase()}
     * @see {@link initTemplate | initTemplate()}
     * @see {@link addButtonListeners | addButtonListeners()}
     * @see {@link bindKeyElements | bindKeyElements()}
     */
    public addHoverListeners(): void {
        this.addEventListener("mouseenter", hoverHandler.enter);
        this.addEventListener("pointermove", hoverHandler.move);
        this.addEventListener("mouseleave", hoverHandler.exit);
    }

    /**
     * Removes all hover handlers responsible for rotating the Panel on mouse
     * hovering.
     *
     * @see {@link hoverHandler}
     * @see {@link addHoverListeners | addHoverListeners()}
     */
    public removeHoverListeners(): void {
        // ? Reset the rotation
        this.dispatchEvent(new Event("mouseleave"));

        // ? Then remove all listeners
        this.removeEventListener("mouseenter", hoverHandler.enter);
        this.removeEventListener("pointermove", hoverHandler.move);
        this.removeEventListener("mouseleave", hoverHandler.exit);
    }

    /**
     * Set up the Preview with all necessary information to preview where the
     * Panel would end up snapped to the grid while being manipulated.
     *
     * @see {@link preview}
     * @see {@link updatePreview | updatePreview()}
     */
    public initPreview(): void {
        // ? The Preview's caller ID is the dashboard ID of the panel that triggered its call
        preview.dataset.callerId = this.dataset.panelId;

        // ? Re-add the Preview to the dashboard and make it visible
        dashboard.prepend(preview);
        preview.classList.add("visible");

        // ? Immediately snap the Preview to the Panel's location, then update as usual
        snapElementToTarget(preview, this, false);
        this.updatePreview();
    }

    /**
     * Updates the Preview currently bound to the Panel, snapping it to the grid
     * based on the position of this calling Panel.
     *
     * @see {@link preview}
     * @see {@link initPreview | initPreview()}
     */
    public updatePreview(): void {
        snapElementToGrid(preview, this);
    }

    /**
     * Bind and assign all KeyElements for the Panel.
     *
     * @remarks
     * Based on the PanelType, the KeyElements map is populated, with each key
     * having the value of one KeyElement.
     *
     * @see {@link PanelType}
     * @see {@link getKeyElements | getKeyElements()}
     */
    private bindKeyElements(): void {
        // ? Assign key elements based on the PanelType
        switch (this.type) {
            case PanelType.NOTEPAD:
                // ? If the Panel is a Notepad Panel, the only key element is the TextArea
                this.keyElements = new Map<string, HTMLElement | null>([
                    ["text_area", this.querySelector("textarea")],
                ]);
                break;
            case PanelType.CLOCK:
                // ? If the Panel is a Clock Panel, the key elements are the date and time spans
                this.keyElements = new Map<string, HTMLElement | null>([
                    ["date_text", this.querySelector(".date-text")],
                    ["time_text", this.querySelector(".time-text")],
                ]);
                break;
            case PanelType.PHOTO:
                // ? If the Panel is a Photo Panel, the key elements are the drop area/input,
                // ? and the primary Image element
                this.keyElements = new Map<string, HTMLElement | null>([
                    ["drop_area", this.querySelector(".drop-area")],
                    ["panel_image", this.querySelector(".panel-image")],
                    ["upload_input", this.querySelector(".image-upload-input")],
                ]);
                break;
            case PanelType.TODO:
                // ? If the Panel is a Todo Panel, the key elements include the task adding
                // ? input and button, as well as the list title and the container of tasks
                this.keyElements = new Map<string, HTMLElement | null>([
                    [
                        "add_task_button",
                        this.querySelector(".add-todo-task-button"),
                    ],
                    [
                        "add_task_input",
                        this.querySelector(".add-todo-task-input"),
                    ],
                    ["todo_list", this.querySelector(".todo-list")],
                    ["todo_title", this.querySelector(".todo-list-title")],
                ]);
                break;
            case PanelType.WEATHER:
                // ? If the Panel is a Weather Panel, the key elements include:
                this.keyElements = new Map<string, HTMLElement | null>([
                    // * (1) The Search behaviour elements
                    [
                        "search_input",
                        this.querySelector(".location-search-input"),
                    ],
                    [
                        "search_results",
                        this.querySelector(".location-search-results"),
                    ],
                    [
                        "search_button",
                        this.querySelector(".location-search-button"),
                    ],
                    [
                        "search_selector",
                        this.querySelector(".location-search-selector"),
                    ],
                    // * (2) The Saved Location list
                    ["location_list", this.querySelector(".location-list")],
                    // * (3) The Focused location and its primary buttons and headers
                    [
                        "focused_location",
                        this.querySelector(".focused-location"),
                    ],
                    ["preview_header", this.querySelector(".preview-header")],
                    [
                        "save_location_button",
                        this.querySelector(".save-location-button"),
                    ],
                    [
                        "close_focus_button",
                        this.querySelector(".close-focus-button"),
                    ],
                    // * (4) All the information elements for the focused location
                    ["focused_city", this.querySelector(".location-city")],
                    [
                        "focused_region_and_country",
                        this.querySelector(".location-region-country"),
                    ],
                    ["focused_time", this.querySelector(".location-time")],
                    ["focused_temp", this.querySelector(".temperature")],

                    [
                        "focused_condition",
                        this.querySelector(".condition-name"),
                    ],
                    [
                        "focused_condition_icon",
                        this.querySelector(".condition-icon"),
                    ],
                    [
                        "focused_feels_like",
                        this.querySelector(".feels-like-temp"),
                    ],
                    [
                        "focused_forecast_list",
                        this.querySelector(".forecast-entries"),
                    ],
                    ["focused_min_temp", this.querySelector(".min-temp")],
                    ["focused_max_temp", this.querySelector(".max-temp")],
                    ["focused_astro", this.querySelector(".astrology-section")],
                    ["focused_sunrise", this.querySelector(".sunrise-time")],
                    ["focused_sunset", this.querySelector(".sunset-time")],
                ]);
                break;
        }
    }

    /**
     * Get all KeyElements for the Panel.
     *
     * @returns The Map of KeyElements for the Panel, containing the key as a
     *   string, and the value as either a located HTML Element or null if not
     *   found when bound.
     */
    public getKeyElements(): Map<string, HTMLElement | null> {
        return this.keyElements;
    }

    /**
     * Gets a particular Key Element from the Panel's KeyElements map, used for
     * direct access.
     *
     * @param   element - The key of the element to obtain.
     *
     * @returns         The found element that is the value of the key passed in
     *   the parameter, either as an element, undefined, or null, depending on
     *   both the initial binding of the key element, and the presence of the
     *   requested key.
     *
     * @example
     *
     * ```ts
     * const textArea = panel.getKeyElement("text_area");
     * ```
     *
     * The above will be an HTML element if the `text_area` key has been
     * assigned a value, and the element assigned to it exists.
     *
     * @see {@link keyElements}
     * @see {@link getKeyElements | getKeyElements()}
     */
    public getKeyElement(element: string): HTMLElement | null | undefined {
        return this.keyElements.get(element);
    }

    /**
     * Begin executing the Panel's actual logic and behaviour.
     *
     * @remarks
     * This is determined by the PanelType, and is different for each Panel.
     *
     * @see {@link PanelType}
     * @see {@link PanelType.execute | PanelType.execute()}
     */
    public beginBehaviour(): void {
        this.type.execute(this);
    }

    /**
     * Triggers a save by firing off an update event that is listened to by the
     * Dashboard.
     *
     * @remarks
     * The Dashboard handles the delayed save. This function also shows the Save
     * icon after a delay, representing when the Dashboard save occurs.
     */
    public triggerSave(): void {
        // ? Fire the event to save the Dashboard
        this.dispatchEvent(new CustomEvent("updatepanel", { bubbles: true }));

        // * The small save icon in the bottom right corner of the Panel
        const saveIcon: HTMLElement | null | undefined =
            this.shadowRoot?.querySelector(".save-icon");

        // ? Clear and reset the timeout to make the Save icon momentarily visible
        // ? for half a second, 2 seconds after the last save trigger
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            saveIcon?.part.add("visible");
            setTimeout(() => {
                saveIcon?.part.remove("visible");
            }, 500);
        }, 2000);
    }
}

window.customElements.define("panel-element", Panel);

export { Panel, PanelInstance };
