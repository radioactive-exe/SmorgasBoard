/**
 * This file contains the Type definitions for the backend call responses.
 *
 * @remarks
 * It contains all Smorgasboard backend API-translated responses, from both
 * external APIs and the database.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import type * as WeatherAPI from "./weather_api.types";

/**
 * The shape of the template responses from the backend.
 *
 * @remarks
 * This includes the panel type of the template we are fetching, and the
 * HTML-to-string template itself.
 */
interface PanelFetchResponse {
    panel_type: string;
    panel_template: string;
}

/**
 * The shape of the packaged search response from the backend.
 *
 * @remarks
 * This includes the original search query, as well as the packaged locations
 * obtained from the direct call from the backend to the WeatherAPI.
 */
interface SmorgasWeatherSearchResponse {
    query: string;
    results: WeatherAPI.Location[];
}

export { PanelFetchResponse, SmorgasWeatherSearchResponse };
