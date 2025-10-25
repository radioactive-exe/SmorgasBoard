import type * as WeatherAPI from "./weather_api.types";

interface PanelFetchResponse {
    panel_type: string;
    panel_template: string;
}

interface SmorgasbaseWeatherResponse {
    query: string;
    results: WeatherAPI.Location[];
}

export { PanelFetchResponse, SmorgasbaseWeatherResponse };
