/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/no-unused-vars */
const locationSearchInput = document.querySelector(".location-search-input");
const locationSearchResults = document.querySelector(
    ".location-search-results",
);
const searchButton = document.querySelector(".location-search-button");
const locationSearchSelector = document.querySelector(
    ".location-search-selector",
);
const locationList = document.querySelector(".location-list");
const focusedLocation = document.querySelector(".focused-location");
const previewHeader = document.querySelector(".preview-header");
const saveLocationButton = document.querySelector(".save-location-button");
const closeFocusButton = document.querySelector(".close-focus-button");
const savedLocationList = document.querySelector(".saved-location-list");

const focusedLocationInfo = {
    city: document.querySelector(".location-city"),
    regionAndCountry: document.querySelector(".location-region-country"),
    time: document.querySelector(".location-time"),
    temp: document.querySelector(".temperature"),
    cond: document.querySelector(".condition-name"),
    condIcon: document.querySelector(".condition-icon"),
    feelsLike: document.querySelector(".feels-like-temp"),
    forecast: document.querySelector(".forecast-section .forecast-entries"),
    minTemp: document.querySelector(".min-temp"),
    maxTemp: document.querySelector(".max-temp"),
    astro: document.querySelector(".astrology-section"),
    sunrise: document.querySelector(".sunrise-time"),
    sunset: document.querySelector(".sunset-time"),
};

closeFocusButton.addEventListener("click", () => {
    focusedLocation.classList.remove("visible");
});

const weatherApiKey = "aa";

let locationSearchTimeout;

locationSearchInput.addEventListener("input", (e) => {
    clearTimeout(locationSearchTimeout);
    locationSearchTimeout = setTimeout(async () => {
        locationSearchResults.replaceChildren();
        if (!locationSearchInput.value) {
            locationSearchResults.classList.remove("visible");
            return;
        }
        locationSearchResults.classList.add("visible");
        try {
            const weatherResponse = await fetch(
                `http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${locationSearchInput.value}`,
            );
            const locations = await weatherResponse.json();
            if (locations.length == 0) {
                addEntryToSearchResults(
                    "Sorry, no locations found. Try another query!",
                    0,
                    0,
                    false,
                );
            } else {
                locations.forEach((location) => {
                    addEntryToSearchResults(
                        `${location.name}, ${location.region ? location.region + ", " : ""}${location.country}`,
                        location.lat,
                        location.lon,
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

searchButton.addEventListener("click", () => {
    locationSearchSelector.classList.toggle("visible");
    if (!locationSearchSelector.classList.contains("visible")) clearSearch();
});

function addEntryToSearchResults(content, lat, lon, withListeners = true) {
    const newEntry = document.createElement("li");
    newEntry.classList.add("location-search-result");
    newEntry.innerHTML = content;
    newEntry.dataset.lat = lat;
    newEntry.dataset.lon = lon;
    if (withListeners) {
        newEntry.addEventListener("click", () => {
            focusOnLocation(lat, lon, true);
        });
    }
    locationSearchResults.appendChild(newEntry);
}

function clearSearch() {
    locationSearchResults.replaceChildren();
    locationSearchInput.value = "";
}

async function focusOnLocation(lat, lon, previewing) {
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

    focusedLocationInfo.city.textContent = data.location.name;
    focusedLocationInfo.regionAndCountry.textContent = `${data.location.region}, ${data.location.country}`;
    focusedLocationInfo.time.textContent = `${now.toLocaleTimeString("en-US", {
        timeStyle: "short",
        timeZone: data.location.tz_id,
    })}, ${now.toLocaleDateString("en-US", {
        dateStyle: "short",
        timeZone: data.location.tz_id,
    })}`;

    focusedLocation.dataset.lat = data.location.lat;
    focusedLocation.dataset.lon = data.location.lon;

    if (previewing) previewHeader.classList.add("visible");
    else previewHeader.classList.remove("visible");

    setConditionAndTemperature(data);
    setForecastData(data, currentTimeEpoch, data.location.tz_id);
    setAstrologyData(data, currentTimeEpoch, currentDateEpoch);

    clearSearch();
    focusedLocation.classList.add("visible");
}

function getDailyMilliSecondsPassed(time) {
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

function getOffset(timeZone = "UTC", date = new Date()) {
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
    return tzDate.getTime() - utcDate.getTime();
}

function setForecastData(data, currentTimeEpoch, timezone) {
    focusedLocationInfo.forecast.innerHTML = "";

    data.forecast.forecastday[0].hour.forEach((hour) => {
        if (hour.time_epoch * 1000 > currentTimeEpoch)
            addForecastEntry(hour, timezone);
    });
    data.forecast.forecastday[1].hour.forEach((hour) => {
        if (hour.time_epoch * 1000 <= currentTimeEpoch + 86400000)
            addForecastEntry(hour, timezone);
    });
}

function addForecastEntry(hour, timezone) {
    const hourlyDate = new Date(hour.time_epoch * 1000);
    focusedLocationInfo.forecast.innerHTML += `
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

function setAstrologyData(data, currentTimeEpoch, currentDateEpoch) {
    focusedLocationInfo.sunrise.innerHTML =
        data.forecast.forecastday[0].astro.sunrise;
    focusedLocationInfo.sunset.innerHTML =
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

    focusedLocationInfo.astro.style.setProperty(
        "--day-progress",
        dailyProgress.toString() + "deg",
    );

    const isDay = dailyProgress >= 0 && dailyProgress < 180;

    focusedLocationInfo.astro.style.setProperty(
        "--astro-icon",
        `var(--${isDay ? "sun" : "moon"}-icon)`,
    );
    focusedLocationInfo.astro.style.setProperty(
        "--astro-bg",
        `var(--${isDay ? "sun" : "moon"}-col)`,
    );
}

function setConditionAndTemperature(data) {
    focusedLocationInfo.temp.innerHTML = `${Math.round(
        parseFloat(data.current.temp_c),
    )}&degC`;
    focusedLocationInfo.cond.textContent = data.current.condition.text;
    focusedLocationInfo.condIcon.src = data.current.condition.icon;

    focusedLocationInfo.feelsLike.innerHTML = `${Math.round(parseFloat(data.current.feelslike_c))}&degC`;
    focusedLocationInfo.minTemp.innerHTML = `${Math.round(
        data.forecast.forecastday[0].day.mintemp_c,
    )}&degC`;
    focusedLocationInfo.maxTemp.innerHTML = `${Math.round(
        data.forecast.forecastday[0].day.maxtemp_c,
    )}&degC`;
}

saveLocationButton.addEventListener("click", () => {
    saveFocusedLocation();
});

function saveFocusedLocation() {
    previewHeader.classList.remove("visible");
    const newEntry = document.createElement("li");
    newEntry.classList.add("saved-location");
    newEntry.dataset.lat = focusedLocation.dataset.lat;
    newEntry.dataset.lon = focusedLocation.dataset.lon;

    newEntry.innerHTML = `
            <h2 class="location-title">${focusedLocationInfo.city.textContent}</h2>
            <div class="location-weather">
                <div class="location-current">
                    <h4 class="location-condition">${focusedLocationInfo.cond.textContent}</h4>
                    <h3 class="location-temp">${focusedLocationInfo.temp.textContent}</h3>
                </div>
                <div class="location-max-min">
                    <p class="location-min">L: ${focusedLocationInfo.minTemp.textContent}</p>
                    <p class="location-max">H: ${focusedLocationInfo.maxTemp.textContent}</p>
                </div>
            </div>`;

    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("icon", "x-icon", "remove-location-icon");
    deleteIcon.addEventListener("click", () => {
        newEntry.remove();
    });

    newEntry.appendChild(deleteIcon);

    newEntry.addEventListener("click", () => {
        focusOnLocation(newEntry.dataset.lat, newEntry.dataset.lon, false);
    });

    savedLocationList.appendChild(newEntry);
}
