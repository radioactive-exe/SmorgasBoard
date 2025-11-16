/**
 * This file contains the behaviour functions for the Weather Panel Type.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import * as get from "../../../functions/accessors.js";
import type { SmorgasWeatherSearchResponse } from "../../../types/response.types.js";
import type * as WeatherAPI from "../../../types/weather_api.types.js";
import type { Config, ConfigChangeEventDetail } from "../../config/config.js";
import type * as ConfigEntry from "../../config/config_entry.js";
import { Panel } from "../panel.js";
import type {} from "../../../constants.js";
import { PanelType } from "../panel_type.js";

/**
 * The shape of the objects containing the main elements used in the Weather
 * Panel's executed behaviour.
 *
 * @remarks
 * This is defined to ensure type safety and parameter types throughout.
 */
interface MainWeatherPanelElements {
    searchInput: HTMLInputElement;
    searchSelector: HTMLDivElement;
    searchButton: HTMLDivElement;
    searchResults: HTMLUListElement;
    previewHeader: HTMLDivElement;
    focusedLocation: HTMLDivElement;
    savedLocationList: HTMLUListElement;
    saveLocationButton: HTMLDivElement;
}

/**
 * The shape of the objects containing the elements present in the focused
 * location container, all of which contain different weather and climate
 * information.
 *
 * @remarks
 * This is defined to ensure type safety and parameter types throughout.
 */
interface FocusedLocationInfoElements {
    city: HTMLHeadingElement;
    regionAndCountry: HTMLHeadingElement;
    time: HTMLParagraphElement;
    temp: HTMLHeadingElement;
    cond: HTMLHeadingElement;
    condIcon: HTMLImageElement;
    feelsLike: HTMLParagraphElement;
    forecast: HTMLUListElement;
    minTemp: HTMLParagraphElement;
    maxTemp: HTMLParagraphElement;
    astro: HTMLDivElement;
    sunrise: HTMLParagraphElement;
    sunset: HTMLParagraphElement;
}

// eslint-disable-next-line jsdoc/require-example
/**
 * The main function called upon behaviour execution after the Panel template,
 * base, and config setup, for the Weather Panel Type.
 *
 * @remarks
 * Any necessary validations are done to check that the panel type, config, and
 * key elements are properly set up. Then, config change event listeners are
 * setup. Finally, the behaviour is initiated. For this panel type, we establish
 * the main elements to be reused throughout the panel, handle config changes
 * regarding temperature and time format settings, and take care of the location
 * search functionality (and its relevant inputs), routing into other functions
 * that handle different aspects of focusing and saving locations and weather
 * information.
 *
 * @param panel - The panel whose behaviour is being executed through this
 *   function.
 */
function execute(panel: Panel): void {
    // ? Define the main sets of elements to be repeatedly used throughout this panel's behavioural lifetime
    // ? This includes the focal elements, inputs, and containers, as well as the elements holding all
    // ? weather information for the focused location

    const mainElements: MainWeatherPanelElements = {
        searchInput: panel.getKeyElement("search_input") as HTMLInputElement,
        searchResults: panel.getKeyElement(
            "search_results",
        ) as HTMLUListElement,
        searchSelector: panel.getKeyElement(
            "search_selector",
        ) as HTMLDivElement,
        searchButton: panel.getKeyElement("search_button") as HTMLDivElement,
        previewHeader: panel.getKeyElement("preview_header") as HTMLDivElement,
        focusedLocation: panel.getKeyElement(
            "focused_location",
        ) as HTMLDivElement,
        savedLocationList: panel.getKeyElement(
            "saved_location_list",
        ) as HTMLUListElement,
        saveLocationButton: panel.getKeyElement(
            "save_location_button",
        ) as HTMLDivElement,
    };
    const focusedLocationInfoElements: FocusedLocationInfoElements = {
        city: panel.getKeyElement("focused_city") as HTMLHeadingElement,
        regionAndCountry: panel.getKeyElement(
            "focused_region_and_country",
        ) as HTMLHeadingElement,
        time: panel.getKeyElement("focused_time") as HTMLParagraphElement,
        temp: panel.getKeyElement("focused_temp") as HTMLHeadingElement,
        cond: panel.getKeyElement("focused_condition") as HTMLHeadingElement,
        condIcon: panel.getKeyElement(
            "focused_condition_icon",
        ) as HTMLImageElement,
        feelsLike: panel.getKeyElement(
            "focused_feels_like",
        ) as HTMLParagraphElement,
        forecast: panel.getKeyElement(
            "focused_forecast_list",
        ) as HTMLUListElement,
        minTemp: panel.getKeyElement(
            "focused_min_temp",
        ) as HTMLParagraphElement,
        maxTemp: panel.getKeyElement(
            "focused_max_temp",
        ) as HTMLParagraphElement,
        astro: panel.getKeyElement("focused_astro") as HTMLDivElement,
        sunrise: panel.getKeyElement("focused_sunrise") as HTMLParagraphElement,
        sunset: panel.getKeyElement("focused_sunset") as HTMLParagraphElement,
    };

    // ? We check if any key elements were not properly set up/present in the populated
    // ? body of the panel.
    if (
        Object.values(panel.getKeyElements()).includes(null)
        || Object.values(panel.getKeyElements()).includes(undefined)
        || Object.values(mainElements).includes(null)
        || Object.values(mainElements).includes(undefined)
        || Object.values(focusedLocationInfoElements).includes(null)
        || Object.values(focusedLocationInfoElements).includes(undefined)
        || panel.getType() != PanelType.WEATHER
        || !panel.getConfig()
    )
        return;

    // ? Handle exiting the focused view for a location
    panel.getKeyElement("close_focus_button")?.addEventListener("click", () => {
        panel.getKeyElement("focused_location")?.classList.remove("visible");
    });

    // * The timeout used to call the search function in the backend after a delay with no input
    let locationSearchTimeout: NodeJS.Timeout;

    mainElements.searchInput.addEventListener("input", () => {
        clearTimeout(locationSearchTimeout);
        locationSearchTimeout = setTimeout(async () => {
            // ? Clear the current search results in the list
            mainElements.searchResults.replaceChildren();

            // ? If the last input emptying/deleting the inputted text (i.e. the input is now empty),
            // ? then remove the results list altogether
            if (!mainElements.searchInput.value) {
                mainElements.searchResults.classList.remove("visible");
                return;
            }

            // ? Otherwise, we make the list visible
            mainElements.searchResults.classList.add("visible");

            try {
                // ? We then send the search request to the backend
                const weatherResponse = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}${panel.getType().getDataSource()}/search?q=${mainElements.searchInput.value}`,
                );
                // ? And parse the results into a list of location search results
                const locations: WeatherAPI.Location[] = (
                    (await weatherResponse.json()) as SmorgasWeatherSearchResponse
                ).results;

                // ? If no results were found for the query, then use a dummy entry stating such
                if (locations.length == 0) {
                    mainElements.searchResults.appendChild(
                        searchResultEntry(
                            "Sorry, no locations found. Try another query!",
                            0,
                            0,
                        ),
                    );

                    // ? Otherwise, if entries were found, add each location to the search results
                    // ? list, populating the necessary information
                } else {
                    locations.forEach((location: WeatherAPI.Location) => {
                        mainElements.searchResults.appendChild(
                            searchResultEntry(
                                `${location.name}, ${location.region ? location.region + ", " : ""}${location.country}`,
                                location.lat,
                                location.lon,
                                true,
                                panel,
                            ),
                        );
                    });
                }
            } catch {
                // ? If something went wrong at all, add a dummy entry stating such.
                mainElements.searchResults.appendChild(
                    searchResultEntry(
                        `The Weather API Smorgasboard uses seems to be having issues. Please check back in a bit!.`,
                        0,
                        0,
                    ),
                );
            }

            // ? Wait 500ms (or half a second) of no input change before executing the search behaviour
        }, 500);
    });

    // ? Handle showing and hiding the search bar using the search button
    mainElements.searchButton.addEventListener("click", () => {
        mainElements.searchSelector.classList.toggle("visible");
        if (!mainElements.searchSelector.classList.contains("visible"))
            clearSearch(mainElements.searchInput, mainElements.searchResults);
    });

    // ? Handle saving the focused location to the saved location list
    mainElements.saveLocationButton?.addEventListener("click", () => {
        mainElements.previewHeader.classList.remove("visible");
        mainElements.savedLocationList.appendChild(
            savedLocationEntry(
                panel,
                focusedLocationInfoElements.city.textContent,
                parseFloat(mainElements.focusedLocation.dataset.lat ?? "0"),
                parseFloat(mainElements.focusedLocation.dataset.lon ?? "0"),
                focusedLocationInfoElements.cond.textContent,
                focusedLocationInfoElements.temp.textContent,
                focusedLocationInfoElements.minTemp.textContent,
                focusedLocationInfoElements.maxTemp.textContent,
            ),
        );
    });

    // ? Listen for config changes and handle them accordingly
    panel.addEventListener("configchange", handleConfigChange);

    // ? Every 30 minutes (1,800,000 ms) update the weather shown in the overview/saved location list
    // ? on the main panel container (not focused)
    setInterval(() => {
        updateSavedLocations(mainElements.savedLocationList, panel);
    }, 1_800_000);
}

/**
 * Builds an entry to add to the search results list.
 *
 * @remarks
 * Simply building the entry as opposed to adding it here directly eliminates
 * many extra arguments when calling the function, and instead adds one function
 * call surrounding the original function call in {@link execute | execute()}.
 *
 * @param   content       - The text content of the search result.
 * @param   lat           - The latitude of the location being added.
 * @param   lon           - The longitude of the location being added.
 * @param   withListeners - Whether or not to add listeners to handle clicking
 *   and focusing on a particular search result. Defaults to `false`, so that
 *   calls adding dummy entries will not require extra arguments, unlike calls
 *   adding proper search entries, which will need to set this parameter in
 *   order to reach the last optional parameter ({@link panel}) anyways. It is
 *   set to false when adding a dummy entry to inform the user of (1) no results
 *   or (2) an unexpected error.
 * @param   panel         - The panel executing these behavioural functions.
 *   Optional as adding dummy entries does not require a logic executor.
 *
 * @returns               The built search result entry, with all necessary
 *   listeners if requested.
 *
 * @example
 *
 * ```ts
 * addEntryToSearchResults(
 *      "Example City, Example Country",
 *      20,
 *      30.5,
 *      true,
 *      panel
 * );
 * ```
 *
 * Builds a search result for a location called "Example City" in "Example
 * Country", the entry for which holds the location's latitude and longitude,
 * 20' and 30.5' respectively, as well as passing the executing panel for
 * handling the search result's clicks and focusing.
 */
function searchResultEntry(
    content: string,
    lat: number,
    lon: number,
    withListeners = false,
    panel?: Panel,
): HTMLLIElement {
    // ? If the function is called with an attempt to add listeners but the
    // ? necessary behavioural callers and elements are not passed, throw an error
    if (withListeners && !panel)
        throw new Error(
            "Must pass the panel and its key elements when adding listeners to the search result entry!",
        );

    // ? Create the search result entry container
    const newEntry = document.createElement("li");
    newEntry.classList.add("location-search-result");

    // ? Populate the entry with its content and attributes with necessary information
    newEntry.innerHTML = content;
    newEntry.dataset.lat = lat.toString();
    newEntry.dataset.lon = lon.toString();

    // ? If listeners were requested and all elements are in place,
    // ? focus on the search result's location on click
    if (withListeners && panel) {
        newEntry.addEventListener("click", () => {
            focusOnLocation(lat, lon, panel);
        });
    }

    return newEntry;
}

// eslint-disable-next-line jsdoc/require-example
/**
 * Clears the search input contents and the search result list menu.
 *
 * @param searchInput   - The text input to clear.
 * @param searchResults - The search result list to empty.
 */
function clearSearch(
    searchInput: HTMLInputElement,
    searchResults: HTMLUListElement,
): void {
    searchResults.replaceChildren();
    searchInput.value = "";
}

/**
 * Obtain and populate all weather information for the location at the inputted
 * coordinates and switch to the focused view.
 *
 * @param lat   - The latitude of the location to focus on.
 * @param lon   - The longitude of the location to focus on.
 * @param panel - The panel executing these behavioural functions.
 *
 * @example
 *
 * ```ts
 * focusOnLocation(48.86, 2.35, panel);
 * ```
 *
 * The above gets all weather information for the location at latitude and
 * longitude 48.86 and 2.35 respectively (which is actually Paris), and thus
 * populates and switches to the focused view holding all the details.
 */
async function focusOnLocation(
    lat: number,
    lon: number,
    panel: Panel,
): Promise<void> {
    // ? Redefine the focal and informative elements in objects.
    // ? This is not efficient in terms of memory, but it helps clean up function calls.
    const mainElements = {
        searchInput: panel.getKeyElement("search_input") as HTMLInputElement,
        searchResults: panel.getKeyElement(
            "search_results",
        ) as HTMLUListElement,
        searchSelector: panel.getKeyElement(
            "search_selector",
        ) as HTMLDivElement,
        searchButton: panel.getKeyElement("search_button") as HTMLDivElement,
        previewHeader: panel.getKeyElement("preview_header") as HTMLDivElement,
        focusedLocation: panel.getKeyElement(
            "focused_location",
        ) as HTMLDivElement,
        savedLocationList: panel.getKeyElement(
            "saved_location_list",
        ) as HTMLUListElement,
        saveLocationButton: panel.getKeyElement(
            "save_location_button",
        ) as HTMLDivElement,
    };
    const focusedLocationInfoElements = {
        city: panel.getKeyElement("focused_city") as HTMLHeadingElement,
        regionAndCountry: panel.getKeyElement(
            "focused_region_and_country",
        ) as HTMLHeadingElement,
        time: panel.getKeyElement("focused_time") as HTMLParagraphElement,
        temp: panel.getKeyElement("focused_temp") as HTMLHeadingElement,
        cond: panel.getKeyElement("focused_condition") as HTMLHeadingElement,
        condIcon: panel.getKeyElement(
            "focused_condition_icon",
        ) as HTMLImageElement,
        feelsLike: panel.getKeyElement(
            "focused_feels_like",
        ) as HTMLParagraphElement,
        forecast: panel.getKeyElement(
            "focused_forecast_list",
        ) as HTMLUListElement,
        minTemp: panel.getKeyElement(
            "focused_min_temp",
        ) as HTMLParagraphElement,
        maxTemp: panel.getKeyElement(
            "focused_max_temp",
        ) as HTMLParagraphElement,
        astro: panel.getKeyElement("focused_astro") as HTMLDivElement,
        sunrise: panel.getKeyElement("focused_sunrise") as HTMLParagraphElement,
        sunset: panel.getKeyElement("focused_sunset") as HTMLParagraphElement,
    };

    // ? Derive config options as simple booleans, allowing us to reuse
    // ? them and clean up backtick string filling.
    const useCelsius =
        (panel.getConfig()?.useCelsius as ConfigEntry.Boolean).value ?? true;
    const use24HrTime =
        (panel.getConfig()?.use24HrTime as ConfigEntry.Boolean).value ?? true;

    // ? Get the complete forecast information for the location we want to focus on
    // ? using the latitude and longitude saved in either
    // ? (1) The search result entry, if called from there
    // ? (2) The saved location entry, if called from there
    const weatherResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}${panel.getType().getDataSource()}/forecast/${lat},${lon}`,
    );
    const data = await weatherResponse.json();

    // ? Get the current date and time in multiple formats, normalising to get
    // ? the epoch for the current date at the start of the day at midnight,
    // ? accounting for the timezone offset
    const now = new Date();
    const currentTimeEpoch = now.getTime();
    const currentDateEpoch =
        Math.floor(now.getTime() / 86400000) * 86400000
        - getOffset(data.location.tz_id, now);

    // ? Populate the info header of the focused location window/container,
    // ? with the location city, region, and time, all accounting for the
    // ? current config settings and the location timezone
    focusedLocationInfoElements.city.textContent = data.location.name;
    focusedLocationInfoElements.regionAndCountry.textContent = `${data.location.region}, ${data.location.country}`;
    focusedLocationInfoElements.time.textContent = `${now.toLocaleTimeString(
        "en-US",
        {
            timeStyle: "short",
            timeZone: data.location.tz_id,
            hour12: !use24HrTime,
        },
    )}, ${now.toLocaleDateString("en-US", {
        dateStyle: "short",
        timeZone: data.location.tz_id,
    })}`;

    // ? Assign the latitude and longitude to a dataset attribute for global access when needed
    mainElements.focusedLocation.dataset.lat = data.location.lat;
    mainElements.focusedLocation.dataset.lon = data.location.lon;

    // ? Check if the location is currently already saved, and set the preview header visibility accordingly.
    // ? A separate function checks the saved location list to ensure that focusing on a location
    // ? from a search query does not come up as a preview if the location is already present,
    // ? preventing the same location from being saved multiple times as separate entries.
    if (
        !isAlreadySaved(
            data.location.lat,
            data.location.lon,
            mainElements.savedLocationList,
        )
    )
        mainElements.previewHeader.classList.add("visible");
    else mainElements.previewHeader.classList.remove("visible");

    // ? Populate the individual weather info sections, including the:

    // ? (1) Current condition and temperature info
    setConditionAndTemperature(data, useCelsius, focusedLocationInfoElements);
    // ? (2) Hourly weather forecast data for the next 24 hours
    setForecastData(
        data,
        currentTimeEpoch,
        data.location.tz_id,
        useCelsius,
        use24HrTime,
        focusedLocationInfoElements,
    );
    // ? (3) Astrology information for the day
    setAstrologyData(
        data,
        currentTimeEpoch,
        currentDateEpoch,
        focusedLocationInfoElements,
    );

    // ? Lastly, clear the search and show the focused view
    clearSearch(mainElements.searchInput, mainElements.searchResults);
    mainElements.focusedLocation.classList.add("visible");
}

function setForecastData(
    data: WeatherAPI.LocationForecast,
    currentTimeEpoch: number,
    timezone: string,
    useCelsius: boolean,
    use24HrTime: boolean,
    focusedLocationInfoElements: FocusedLocationInfoElements,
): void {
    focusedLocationInfoElements.forecast.innerHTML = "";

    data.forecast.forecastday[0].hour.forEach((hour) => {
        if (hour.time_epoch * 1000 > currentTimeEpoch)
            addForecastEntry(
                hour,
                timezone,
                useCelsius,
                use24HrTime,
                focusedLocationInfoElements,
            );
    });
    data.forecast.forecastday[1].hour.forEach((hour) => {
        if (hour.time_epoch * 1000 <= currentTimeEpoch + 86400000)
            addForecastEntry(
                hour,
                timezone,
                useCelsius,
                use24HrTime,
                focusedLocationInfoElements,
            );
    });
}

function addForecastEntry(
    hour: WeatherAPI.Hour,
    timezone: string,
    useCelsius: boolean,
    use24HrTime: boolean,
    focusedLocationInfoElements: FocusedLocationInfoElements,
): void {
    const hourlyDate = new Date(hour.time_epoch * 1000);
    focusedLocationInfoElements.forecast.innerHTML += `
            <li class="forecast-entry">
                <p class="forecast-time">${hourlyDate.toLocaleTimeString(
                    "en-US",
                    {
                        timeStyle: "short",
                        timeZone: timezone,
                        hour12: !use24HrTime,
                    },
                )}</p>
                <img
                    width="30"
                    height="30"
                    src="${hour.condition.icon}"
                    alt=""
                    class="forecast-icon"
                />
                <p class="forecast-temp">${Math.round(useCelsius ? hour.temp_c : hour.temp_f)}&deg${useCelsius ? "C" : "F"}</p>
            </li>`;
}

function setAstrologyData(
    data: WeatherAPI.LocationForecast,
    currentTimeEpoch: number,
    currentDateEpoch: number,
    focusedLocationInfoElements: FocusedLocationInfoElements,
): void {
    focusedLocationInfoElements.sunrise.innerHTML =
        data.forecast.forecastday[0].astro.sunrise;
    focusedLocationInfoElements.sunset.innerHTML =
        data.forecast.forecastday[0].astro.sunset;

    const parsedSunrise =
        currentDateEpoch
        + getDailyMilliSecondsPassed(
            data.forecast.forecastday[0].astro.sunrise,
        );
    const parsedSunset =
        currentDateEpoch
        + getDailyMilliSecondsPassed(data.forecast.forecastday[0].astro.sunset);
    const parsedTomorrowSunrise =
        currentDateEpoch
        + 86400000
        + getDailyMilliSecondsPassed(
            data.forecast.forecastday[0].astro.sunrise,
        );

    let dailyProgress = 0;
    if (currentTimeEpoch >= parsedSunset) {
        dailyProgress =
            180
            * (1
                + (currentTimeEpoch - parsedSunset)
                    / (parsedTomorrowSunrise - parsedSunset));
    } else if (
        currentTimeEpoch >= parsedSunrise
        && currentTimeEpoch < parsedSunset
    ) {
        dailyProgress =
            180
            * ((currentTimeEpoch - parsedSunrise)
                / (parsedSunset - parsedSunrise));
    } else if (currentTimeEpoch < parsedSunrise) {
        dailyProgress =
            -180
            * ((currentTimeEpoch - parsedSunset - 86400000)
                / (parsedSunrise - parsedSunset - 86400000));
    }

    focusedLocationInfoElements.astro.style.setProperty(
        "--day-progress",
        dailyProgress.toString() + "deg",
    );

    const isDay = dailyProgress >= 0 && dailyProgress < 180;

    focusedLocationInfoElements.astro.style.setProperty(
        "--astro-icon",
        `var(--${isDay ? "sun" : "moon"}-icon)`,
    );
    focusedLocationInfoElements.astro.style.setProperty(
        "--astro-bg",
        `var(--${isDay ? "sun" : "moon"}-col)`,
    );
}

function setConditionAndTemperature(
    data: WeatherAPI.LocationForecast,
    useCelsius: boolean,
    focusedLocationInfoElements: FocusedLocationInfoElements,
): void {
    const temperatureSymbol = useCelsius ? "C" : "F";

    focusedLocationInfoElements.temp.innerHTML = `${Math.round(
        useCelsius ? data.current.temp_c : data.current.temp_f,
    )}&deg${temperatureSymbol}`;
    focusedLocationInfoElements.cond.textContent = data.current.condition.text;
    focusedLocationInfoElements.condIcon.src = data.current.condition.icon;

    focusedLocationInfoElements.feelsLike.innerHTML = `${Math.round(useCelsius ? data.current.feelslike_c : data.current.feelslike_f)}&deg${temperatureSymbol}`;
    focusedLocationInfoElements.minTemp.innerHTML = `${Math.round(
        useCelsius
            ? data.forecast.forecastday[0].day.mintemp_c
            : data.forecast.forecastday[0].day.mintemp_f,
    )}&deg${temperatureSymbol}`;
    focusedLocationInfoElements.maxTemp.innerHTML = `${Math.round(
        useCelsius
            ? data.forecast.forecastday[0].day.maxtemp_c
            : data.forecast.forecastday[0].day.maxtemp_f,
    )}&deg${temperatureSymbol}`;
}

function savedLocationEntry(
    panel: Panel,
    city: string,
    lat: number,
    lon: number,
    condition: string,
    temp: string,
    minTemp: string,
    maxTemp: string,
    updateStored = true,
): HTMLLIElement {
    const newEntry = document.createElement("li");
    newEntry.classList.add("saved-location");
    newEntry.dataset.lat = lat.toString();
    newEntry.dataset.lon = lon.toString();

    newEntry.innerHTML = `
            <h2 class="location-title">${city}</h2>
            <div class="location-weather">
                <div class="location-current">
                    <h4 class="location-condition">${condition}</h4>
                    <h3 class="location-temp">${temp}</h3>
                </div>
                <div class="location-max-min">
                    <p class="location-min"><span class="temp-label">L:</span> ${minTemp}</p>
                    <p class="location-max"><span class="temp-label">H:</span> ${maxTemp}</p>
                </div>
            </div>`;

    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("icon", "x-icon", "remove-location-icon");
    deleteIcon.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        newEntry.remove();
        panel.triggerSave();
    });

    newEntry.appendChild(deleteIcon);

    newEntry.addEventListener("click", () => {
        if (!newEntry.dataset.lat || !newEntry.dataset.lon) return;
        focusOnLocation(
            parseFloat(newEntry.dataset.lat),
            parseFloat(newEntry.dataset.lon),
            panel,
        );
    });

    if (updateStored) panel.triggerSave();

    return newEntry;
}

function handleConfigChange(e: Event): void {
    if (!(e.currentTarget instanceof Panel)) return;
    const panel: Panel = e.currentTarget;
    const customEventParsed: CustomEvent<ConfigChangeEventDetail> =
        e as CustomEvent<ConfigChangeEventDetail>;
    const panelConfig: Config | undefined = panel.getConfig();
    panel.getKeyElement("focused_location")?.classList.remove("visible");
    if (panelConfig && customEventParsed.detail.setting == "useCelsius") {
        [
            ...(panel.getKeyElement("saved_location_list")
                ?.children as HTMLCollectionOf<HTMLElement>),
        ].forEach((location) => {
            const temp = location.querySelector(
                ".location-temp",
            ) as HTMLElement | null;
            const min = location.querySelector(
                ".location-min",
            ) as HTMLElement | null;
            const max = location.querySelector(
                ".location-max",
            ) as HTMLElement | null;
            if (!temp || !min || !max)
                throw new Error(
                    "Saved location list entry does not contain key elements. Should not happen!",
                );
            if (
                customEventParsed.detail.value
                && temp.innerHTML.endsWith("F")
                && min.innerHTML.endsWith("F")
                && max.innerHTML.endsWith("F")
            ) {
                temp.innerHTML = `${Math.round(
                    toCelsius(get.numericalValue(temp.textContent)),
                )}&degC`;
                min.innerHTML = `L: ${Math.round(
                    toCelsius(
                        get.numericalValue(min.textContent.split(" ")[1]),
                    ),
                )}&degC`;
                max.innerHTML = `H: ${Math.round(
                    toCelsius(
                        get.numericalValue(max.textContent.split(" ")[1]),
                    ),
                )}&degC`;
            } else if (
                !customEventParsed.detail.value
                && temp.innerHTML.endsWith("C")
                && min.innerHTML.endsWith("C")
                && max.innerHTML.endsWith("C")
            ) {
                temp.innerHTML = `${Math.round(
                    toFahrenheit(get.numericalValue(temp.textContent)),
                )}&degF`;
                min.innerHTML = `L: ${Math.round(
                    toFahrenheit(
                        get.numericalValue(min.textContent.split(" ")[1]),
                    ),
                )}&degF`;
                max.innerHTML = `H: ${Math.round(
                    toFahrenheit(
                        get.numericalValue(max.textContent.split(" ")[1]),
                    ),
                )}&degF`;
            }
        });
    }
}

function updateSavedLocations(
    savedLocationList: HTMLUListElement,
    panel: Panel,
): void {
    [...(savedLocationList.children as HTMLCollectionOf<HTMLElement>)].forEach(
        async (location) => {
            if (!location.dataset.lat || !location.dataset.lon) return;

            const weatherResponse = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}${panel.getType().getDataSource()}/forecast/${location.dataset.lat},${location.dataset.lon}&days=1`,
            );
            const data: WeatherAPI.LocationForecast =
                await weatherResponse.json();
            const useCelsius = (
                panel.getConfig()?.useCelsius as ConfigEntry.Boolean
            ).value;
            const temperatureSymbol = useCelsius ? "C" : "F";

            const conditionText = location.querySelector(".location-condition");
            if (conditionText)
                conditionText.textContent = data.current.condition.text;

            const tempText = location.querySelector(".location-temp");
            if (tempText)
                tempText.innerHTML = `${useCelsius ? data.current.temp_c : data.current.temp_f}&deg${temperatureSymbol}`;

            const minTempText = location.querySelector(".location-min");
            if (minTempText)
                minTempText.innerHTML = `${useCelsius ? data.forecast.forecastday[0].day.mintemp_c : data.forecast.forecastday[0].day.mintemp_f}&deg${temperatureSymbol}`;

            const maxTempText = location.querySelector(".location-max");
            if (maxTempText)
                maxTempText.innerHTML = `${useCelsius ? data.forecast.forecastday[0].day.maxtemp_c : data.forecast.forecastday[0].day.maxtemp_f}&deg${temperatureSymbol}`;
        },
    );
}

// ~ UTILITY FUNCTIONS

function isAlreadySaved(
    lat: string,
    lon: string,
    savedLocationList: HTMLUListElement,
): boolean {
    let flag = false;

    [...(savedLocationList.children as HTMLCollectionOf<HTMLElement>)].forEach(
        (savedLocation) => {
            console.log(savedLocation.dataset.lat, lat);
            if (
                savedLocation.dataset.lat == lat
                && savedLocation.dataset.lon == lon
            ) {
                flag = true;
            }
        },
    );

    return flag;
}

function toCelsius(tempF: number): number {
    return (tempF - 32) / 1.8;
}

function toFahrenheit(tempC: number): number {
    return tempC * 1.8 + 32;
}

/**
 * A utility function to convert a string format of a time into the number of
 * milliseconds passed between midnight and that time.
 *
 * @param   time - The string format containing the time. E.g. "12:05 PM", or
 *   "16:25".
 *
 * @returns      The number of milliseconds elapsed between midnight at the
 *   start of the day and the inputted time.
 *
 * @example
 *
 * ```ts
 * console.log(getDailyMillisecondsPassed("9:30 AM"));
 * ```
 *
 * The above outputs the number of milliseconds in the 9 and a half hours
 * elapsed in the day. This would be 9.5*3,600,000ms = 34,200,000ms elapsed.
 */
function getDailyMilliSecondsPassed(time: string): number {
    // * The start of the milliseconds passed
    let secondsPassed = 0;
    // ? If the time is in 12 hour format
    if (time.endsWith("M")) {
        // ? Extract the time and the modifier (AM/PM)
        const splitTime = time.split(" ");
        // ? If it has PM, that means 12 hours need to be added
        if (splitTime[1].toLowerCase() === "pm") secondsPassed += 43200;
        // ? Split the time into hours and minutes
        const hoursAndMinutes = splitTime[0].split(":");
        // ? Then, add the elapsed seconds in the minutes
        secondsPassed += parseInt(hoursAndMinutes[1]) * 60;
        // ? If we already have more than 12 hours in the seconds passed (and thus are PM),
        // ? Only add the number of seconds in the hour section of the time if it is NOT 12.
        // ? I.e. if it is 12:05PM, we have already accounted for the 12 hours till noon
        // ? (by checking for "PM"), and thus should add only 5 minutes worth of seconds
        if (
            (secondsPassed >= 43200 && parseInt(hoursAndMinutes[0]) != 12)
            || secondsPassed < 43200
        )
            secondsPassed += parseInt(hoursAndMinutes[0]) * 3600;

        // ? Otherwise, if the time is in 24 hour time, the math is very straightforward
    } else {
        // ? Split the time into minutes and hours
        const hoursAndMinutes = time.split(":");
        // ? Add the number of seconds in the hours elapsed
        secondsPassed += parseInt(hoursAndMinutes[0]) * 3600;
        // ? Add the number of seconds in the minutes elapsed
        secondsPassed += parseInt(hoursAndMinutes[1]) * 60;
    }

    // ? Convert into milliseconds and return (for use in epoch time scenarios)
    return secondsPassed * 1000;
}

/**
 * A utility function to get the offset value for an inputted timezone.
 *
 * @param   timeZone - The timezone to obtain the offset of. Defaults to `UTC`,
 *   which would return a 0.
 * @param   date     - The date object to use to declare 2 timezone Date objects
 *   to calculate the offset. Default is an object holding the current time.
 *
 * @returns          The offset between the inputted timezone and the UTC
 *   timezone.
 *
 * @example
 *
 * ```ts
 * getOffset("Europe/Gibraltar");
 * ```
 *
 * The above gets the offset between UTC and the timezone with TZ ID
 * "Europe/Gibraltar", which is at a timezone of UTC+2:00 during DST. Thus, the
 * function would output the offset between UTC+2:00 and UTC, an offset of +2.
 */
function getOffset(timeZone = "UTC", date = new Date()): number {
    // * The inputted time converted to the UTC timezone
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    // * The inputted time converted to the desired timezone
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
    // * The difference in epoch times between the desired timezone and UTC
    return tzDate.getTime() - utcDate.getTime();
}

export { execute, savedLocationEntry };
