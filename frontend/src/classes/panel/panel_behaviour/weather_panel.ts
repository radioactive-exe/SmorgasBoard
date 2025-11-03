import * as get from "../../../functions/accessors.js";
import type { SmorgasbaseWeatherResponse } from "../../../types/response.types.js";
import type * as WeatherAPI from "../../../types/weather_api.types.js";
import type { Config, ConfigChangeEventDetail } from "../../config/config.js";
import type * as ConfigEntry from "../../config/config_entry.js";
import { Panel } from "../panel.js";
import type {} from "../../constants.js";
import { PanelType } from "../panel_type.js";

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

function execute(panel: Panel): void {
    if (
        Object.values(panel.getKeyElements()).includes(null)
        || Object.values(panel.getKeyElements()).includes(undefined)
        || panel.getType() != PanelType.WEATHER
        || !panel.getConfig()
    )
        return;

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

    panel.getKeyElement("close_focus_button")?.addEventListener("click", () => {
        panel.getKeyElement("focused_location")?.classList.remove("visible");
    });

    let locationSearchTimeout: NodeJS.Timeout;

    mainElements.searchInput.addEventListener("input", () => {
        clearTimeout(locationSearchTimeout);
        locationSearchTimeout = setTimeout(async () => {
            mainElements.searchResults.replaceChildren();
            if (!mainElements.searchInput.value) {
                mainElements.searchResults.classList.remove("visible");
                return;
            }
            mainElements.searchResults.classList.add("visible");
            try {
                const weatherResponse = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}${panel.getType().getDataSource()}/search?q=${mainElements.searchInput.value}`,
                );
                const locations = (
                    (await weatherResponse.json()) as SmorgasbaseWeatherResponse
                ).results;
                if (locations.length == 0) {
                    addEntryToSearchResults(
                        "Sorry, no locations found. Try another query!",
                        0,
                        0,
                        false,
                    );
                } else {
                    locations.forEach((location: WeatherAPI.Location) => {
                        addEntryToSearchResults(
                            `${location.name}, ${location.region ? location.region + ", " : ""}${location.country}`,
                            location.lat,
                            location.lon,
                            true,
                            panel,
                            mainElements,
                            focusedLocationInfoElements,
                        );
                    });
                }
            } catch {
                addEntryToSearchResults(
                    `The Weather API Smorgasboard uses seems to be having issues. Please check back in a bit!.`,
                    0,
                    0,
                    false,
                );
            }
        }, 500);
    });

    mainElements.searchButton.addEventListener("click", () => {
        mainElements.searchSelector.classList.toggle("visible");
        if (!mainElements.searchSelector.classList.contains("visible"))
            clearSearch(panel);
    });

    mainElements.saveLocationButton?.addEventListener("click", () => {
        saveFocusedLocation(panel, mainElements, focusedLocationInfoElements);
    });

    panel.addEventListener("configchange", handleConfigChange);

    setInterval(() => {
        updateSavedLocations(mainElements.savedLocationList, panel);
    }, 1_800_000);
}

function addEntryToSearchResults(
    content: string,
    lat: number,
    lon: number,
    withListeners = true,
    panel?: Panel,
    mainElements?: MainWeatherPanelElements,
    focusedLocationInfoElements?: FocusedLocationInfoElements,
): void {
    if (
        withListeners
        && (!mainElements || !focusedLocationInfoElements || !panel)
    )
        throw new Error(
            "Must pass the panel and its key elements when adding listeners to the search result entry!",
        );
    const newEntry = document.createElement("li");
    newEntry.classList.add("location-search-result");
    newEntry.innerHTML = content;
    newEntry.dataset.lat = lat.toString();
    newEntry.dataset.lon = lon.toString();
    if (withListeners && mainElements && focusedLocationInfoElements && panel) {
        newEntry.addEventListener("click", () => {
            focusOnLocation(lat, lon, panel);
        });
    }
    mainElements?.searchResults.appendChild(newEntry);
}

function clearSearch(panel: Panel): void {
    panel.getKeyElement("search_results")?.replaceChildren();
    if (panel.getKeyElement("search_input"))
        (panel.getKeyElement("search_input") as HTMLInputElement).value = "";
}

async function focusOnLocation(
    lat: number,
    lon: number,
    panel: Panel,
): Promise<void> {
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

    let useCelsius = true,
        use24HrTime = true;

    if (panel.getConfig()) {
        useCelsius = (panel.getConfig()?.useCelsius as ConfigEntry.Boolean)
            .value;
        use24HrTime = (panel.getConfig()?.use24HrTime as ConfigEntry.Boolean)
            .value;
    }

    const weatherResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}${panel.getType().getDataSource()}/forecast/${lat},${lon}`,
    );
    const data = await weatherResponse.json();

    const now = new Date();
    const currentTimeEpoch = now.getTime();
    const currentDateEpoch =
        Math.floor(now.getTime() / 86400000) * 86400000
        - getOffset(data.location.tz_id, now);

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

    mainElements.focusedLocation.dataset.lat = data.location.lat;
    mainElements.focusedLocation.dataset.lon = data.location.lon;

    if (
        !isAlreadySaved(
            data.location.lat,
            data.location.lon,
            mainElements.savedLocationList,
        )
    )
        mainElements.previewHeader.classList.add("visible");
    else mainElements.previewHeader.classList.remove("visible");

    setConditionAndTemperature(data, useCelsius, focusedLocationInfoElements);
    setForecastData(
        data,
        currentTimeEpoch,
        data.location.tz_id,
        useCelsius,
        use24HrTime,
        focusedLocationInfoElements,
    );
    setAstrologyData(
        data,
        currentTimeEpoch,
        currentDateEpoch,
        focusedLocationInfoElements,
    );

    clearSearch(panel);
    mainElements.focusedLocation.classList.add("visible");
}

function getDailyMilliSecondsPassed(time: string): number {
    let secondsPassed = 0;
    if (time.endsWith("M")) {
        const splitTime = time.split(" ");
        if (splitTime[1].toLowerCase() === "pm") secondsPassed += 43200;
        const hoursAndMinutes = splitTime[0].split(":");
        secondsPassed += parseInt(hoursAndMinutes[1]) * 60;
        if (
            (secondsPassed >= 43200 && parseInt(hoursAndMinutes[0]) != 12)
            || secondsPassed < 43200
        )
            secondsPassed += parseInt(hoursAndMinutes[0]) * 3600;
    }
    return secondsPassed * 1000;
}

function getOffset(timeZone = "UTC", date = new Date()): number {
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
    return tzDate.getTime() - utcDate.getTime();
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

function saveFocusedLocation(
    panel: Panel,
    mainElements: MainWeatherPanelElements,
    focusedLocationInfoElements: FocusedLocationInfoElements,
): void {
    mainElements.previewHeader.classList.remove("visible");
    saveLocation(
        mainElements.savedLocationList,
        panel,
        focusedLocationInfoElements.city.textContent,
        parseFloat(mainElements.focusedLocation.dataset.lat ?? "0"),
        parseFloat(mainElements.focusedLocation.dataset.lon ?? "0"),
        focusedLocationInfoElements.cond.textContent,
        focusedLocationInfoElements.temp.textContent,
        focusedLocationInfoElements.minTemp.textContent,
        focusedLocationInfoElements.maxTemp.textContent,
    );
}

function saveLocation(
    savedLocationList: HTMLUListElement,
    panel: Panel,
    city: string,
    lat: number,
    lon: number,
    condition: string,
    temp: string,
    minTemp: string,
    maxTemp: string,
    updateStored = true,
): void {
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

    savedLocationList.appendChild(newEntry);
}

function toCelsius(tempF: number): number {
    return (tempF - 32) / 1.8;
}

function toFahrenheit(tempC: number): number {
    return tempC * 1.8 + 32;
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

export { execute, saveLocation };
