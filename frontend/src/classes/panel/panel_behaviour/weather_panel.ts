import type * as WeatherAPI from "../../../types/weather_api.types.js";
import type { Panel } from "../panel.js";
import type {} from "../../constants.js";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

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
                    `http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${mainElements.searchInput.value}`,
                );
                const locations = await weatherResponse.json();
                if (locations.length == 0) {
                    addEntryToSearchResults(
                        "Sorry, no locations found. Try another query!",
                        0,
                        0,
                        false,
                        mainElements,
                        focusedLocationInfoElements,
                    );
                } else {
                    locations.forEach((location: WeatherAPI.Location) => {
                        addEntryToSearchResults(
                            `${location.name}, ${location.region ? location.region + ", " : ""}${location.country}`,
                            location.lat,
                            location.lon,
                            true,
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
                    mainElements,
                    focusedLocationInfoElements,
                );
            }
        }, 500);
    });

    mainElements.searchButton.addEventListener("click", () => {
        mainElements.searchInput.classList.toggle("visible");
        if (!mainElements.searchInput.classList.contains("visible"))
            clearSearch(mainElements);
    });

    mainElements.saveLocationButton?.addEventListener("click", () => {
        saveFocusedLocation(mainElements, focusedLocationInfoElements);
    });
    return;
}

function addEntryToSearchResults(
    content: string,
    lat: number,
    lon: number,
    withListeners = true,
    mainElements: MainWeatherPanelElements,
    focusedLocationInfoElements: FocusedLocationInfoElements,
): void {
    const newEntry = document.createElement("li");
    newEntry.classList.add("location-search-result");
    newEntry.innerHTML = content;
    newEntry.dataset.lat = lat.toString();
    newEntry.dataset.lon = lon.toString();
    if (withListeners) {
        newEntry.addEventListener("click", () => {
            focusOnLocation(
                lat,
                lon,
                true,
                mainElements,
                focusedLocationInfoElements,
            );
        });
    }
    mainElements.searchResults.appendChild(newEntry);
}

function clearSearch(mainElements: MainWeatherPanelElements): void {
    mainElements.searchResults.replaceChildren();
    mainElements.searchInput.value = "";
}

async function focusOnLocation(
    lat: number,
    lon: number,
    previewing: boolean,
    mainElements: MainWeatherPanelElements,
    focusedLocationInfoElements: FocusedLocationInfoElements,
): Promise<void> {
    const weatherResponse = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}&days=3&aqi=no&alerts=no`,
    );
    const data = await weatherResponse.json();
    console.log(data);

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
        },
    )}, ${now.toLocaleDateString("en-US", {
        dateStyle: "short",
        timeZone: data.location.tz_id,
    })}`;

    mainElements.focusedLocation.dataset.lat = data.location.lat;
    mainElements.focusedLocation.dataset.lon = data.location.lon;

    if (previewing) mainElements.previewHeader.classList.add("visible");
    else mainElements.previewHeader.classList.remove("visible");

    setConditionAndTemperature(data, focusedLocationInfoElements);
    setForecastData(
        data,
        currentTimeEpoch,
        data.location.tz_id,
        focusedLocationInfoElements,
    );
    setAstrologyData(
        data,
        currentTimeEpoch,
        currentDateEpoch,
        focusedLocationInfoElements,
    );

    clearSearch(mainElements);
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
    focusedLocationInfoElements: FocusedLocationInfoElements,
): void {
    focusedLocationInfoElements.forecast.innerHTML = "";

    data.forecast.forecastday[0].hour.forEach((hour) => {
        if (hour.time_epoch * 1000 > currentTimeEpoch)
            addForecastEntry(hour, timezone, focusedLocationInfoElements);
    });
    data.forecast.forecastday[1].hour.forEach((hour) => {
        if (hour.time_epoch * 1000 <= currentTimeEpoch + 86400000)
            addForecastEntry(hour, timezone, focusedLocationInfoElements);
    });
}

function addForecastEntry(
    hour: WeatherAPI.Hour,
    timezone: string,
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
                    },
                )}</p>
                <img
                    width="30"
                    height="30"
                    src="${hour.condition.icon}"
                    alt=""
                    class="forecast-icon"
                />
                <p class="forecast-temp">${Math.round(hour.temp_c)}&degC</p>
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
    focusedLocationInfoElements: FocusedLocationInfoElements,
): void {
    focusedLocationInfoElements.temp.innerHTML = `${Math.round(
        data.current.temp_c,
    )}&degC`;
    focusedLocationInfoElements.cond.textContent = data.current.condition.text;
    focusedLocationInfoElements.condIcon.src = data.current.condition.icon;

    focusedLocationInfoElements.feelsLike.innerHTML = `${Math.round(data.current.feelslike_c)}&degC`;
    focusedLocationInfoElements.minTemp.innerHTML = `${Math.round(
        data.forecast.forecastday[0].day.mintemp_c,
    )}&degC`;
    focusedLocationInfoElements.maxTemp.innerHTML = `${Math.round(
        data.forecast.forecastday[0].day.maxtemp_c,
    )}&degC`;
}

function saveFocusedLocation(
    mainElements: MainWeatherPanelElements,
    focusedLocationInfoElements: FocusedLocationInfoElements,
): void {
    mainElements.previewHeader.classList.remove("visible");
    const newEntry = document.createElement("li");
    newEntry.classList.add("saved-location");
    newEntry.dataset.lat = mainElements.focusedLocation.dataset.lat;
    newEntry.dataset.lon = mainElements.focusedLocation.dataset.lon;

    newEntry.innerHTML = `
            <h2 class="location-title">${focusedLocationInfoElements.city.textContent}</h2>
            <div class="location-weather">
                <div class="location-current">
                    <h4 class="location-condition">${focusedLocationInfoElements.cond.textContent}</h4>
                    <h3 class="location-temp">${focusedLocationInfoElements.temp.textContent}</h3>
                </div>
                <div class="location-max-min">
                    <p class="location-min">L: ${focusedLocationInfoElements.minTemp.textContent}</p>
                    <p class="location-max">H: ${focusedLocationInfoElements.maxTemp.textContent}</p>
                </div>
            </div>`;

    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("icon", "x-icon", "remove-location-icon");
    deleteIcon.addEventListener("click", () => {
        newEntry.remove();
    });

    newEntry.appendChild(deleteIcon);

    newEntry.addEventListener("click", () => {
        if (!newEntry.dataset.lat || !newEntry.dataset.lon) return;
        focusOnLocation(
            parseFloat(newEntry.dataset.lat),
            parseFloat(newEntry.dataset.lon),
            false,
            mainElements,
            focusedLocationInfoElements,
        );
    });

    mainElements.savedLocationList.appendChild(newEntry);
}

export { execute };
