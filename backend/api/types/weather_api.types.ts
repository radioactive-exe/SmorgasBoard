/**
 * This file contains all the types for responses from the Weather API.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 *
 * @see {@link https://www.weatherapi.com/docs/ | WeatherAPI}
 */

/** File Header Delimiter. */

/**
 * The shape of the Condition object inside Weather API responses.
 *
 * @remarks
 * This object is included inside Forecast responses, Current responses, etc.
 * under the `condition` property.
 */
interface Condition {
    text: string;
    icon: string;
    code: number;
}

/**
 * The general Location object inside Weather API responses.
 *
 * @remarks
 * This object is how location information is stored in both search results from
 * the search API, as well as all forecast, current, and other responses from
 * the API. It is a type explained in the API Docs.
 */
interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id?: string;
    localtime: string;
    localtime_epoch?: number;
}

/**
 * The shape of the Current weather information for a location.
 *
 * @remarks
 * The response holds all the current information for the current weather and
 * climate, including the condition, etc. This does not include the
 * maximum/minimum temperatures of the day and other information, as this is
 * simply the information at the current moment.
 */
interface Current {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: 0 | 1;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: 0 | 1;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    short_rad: number;
    diff_rad: number;
    dni: number;
    gti: number;
}

/**
 * Astrology information in the Weather API response.
 *
 * @remarks
 * This holds sun and moon rise and set times, as well as current phases of the
 * moon and its illumination.
 */
interface Astro {
    is_moon_up: 0 | 1;
    is_sun_up: 0 | 1;
    moon_illumination: number;
    moon_phase: string;
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
}

/**
 * This includes information for the Day as a whole in responses.
 *
 * @remarks
 * This is the object that we utilise when we want precipitation chances and
 * amounts for the whole day, as well as maximums, minimums, and/or averages for
 * temperature, wind speed, and visibility throughout the day. This object is
 * included in forecast responses, in addition to {@link Hour}s for each forecast
 * day.
 */
interface Day {
    avghumidity: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avgvis_km: number;
    avgvis_miles: number;
    condition: Condition;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    daily_will_it_rain: 0 | 1;
    daily_will_it_snow: 0 | 1;
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    totalprecip_in: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    uv: number;
}

/**
 * Hourly weather information.
 *
 * @remarks
 * This includes the current or forecasted information for a particular hour in
 * a day, along with the conclusive {@link Day} in forecast responses. The time
 * of the hour in question is stored, as well as temperatures,
 * snow/precipitation chances, and forecasted conditions and humidity.
 */
interface Hour {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    is_day: 0 | 1;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    snow_cm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: 0 | 1;
    chance_of_rain: number;
    will_it_snow: 0 | 1;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
    short_rad: number;
    diff_rad: number;
    dni: number;
    gti: number;
}

/**
 * The complete object for each forecast day requested from the API.
 *
 * @remarks
 * This object contains the date for the day in question, both in
 * string/readable format and in epoch time, and it contains all astrology and
 * daily information. The hours array also stores 24 objects of type
 * {@link Hour}, from midnight to midnight for the entire date.
 */
interface ForecastDay {
    astro: Astro;
    date: string;
    date_epoch: number;
    day: Day;
    hour: Hour[];
}

/**
 * The complete forecast response from the API.
 *
 * @remarks
 * Th {@link forecastday} will have each forecasted day (of type
 * {@link ForecastDay}) as one entry in the array, depending on how many days we
 * request from the Forecast API. In the current (free) plan for my API key, we
 * can request up to 3 forecast days.
 */
interface Forecast {
    forecastday: ForecastDay[];
}

/**
 * The complete current response from the API.
 *
 * @remarks
 * This is the complete response from a Current API request, including both the
 * location and all its information (in the form of a {@link Location} object),
 * and the current weather information for said location (in the form of a
 * {@link Current} object).
 */
interface LocationCurrent {
    location: Location;
    current: Current;
}

/**
 * The complete Forecast response from the API.
 *
 * @remarks
 * This is the complete response from a Forecast API request, including both the
 * location and all its information (in the form of a {@link Location} object),
 * and the current weather information for said location (in the form of a
 * {@link Current} object), similar to a {@link LocationCurrent} response.
 * However, this response also includes an object with the forecast information,
 * both for the day and the hours in the days requested.
 */
interface LocationForecast extends LocationCurrent {
    forecast: Forecast;
}

export {
    Astro,
    Condition,
    Current,
    Day,
    Forecast,
    ForecastDay,
    Hour,
    Location,
    LocationCurrent,
    LocationForecast,
};
