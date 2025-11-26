/**
 * This file contains the routing and handling for the WeatherAPI
 * ({@link https://www.weatherapi.com/docs/ | WeatherAPI}).
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { allowedOrigins, cors, express } from "../../declarations.js";

const weatherApiKey = process.env.WEATHER_API_KEY;

const weatherApiRouter = express.Router();

weatherApiRouter.use(cors({ origin: true, credentials: true }));

/**
 * The Router that handles all search Get requests sent from the Smorgasboard
 * frontend.
 *
 * @see {@link _forecastHandler}
 */
const _searchHandler = weatherApiRouter.get(
    "/search",
    async (req: express.Request, res: express.Response) => {
        // ? If the query is empty
        if (!req.query.q)
            res.status(400).send(
                'Please provide a query parameter "q" to search',
            );

        // ? Forward the call to the Weather API
        const data = await fetch(
            `http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${req.query.q}`,
        );
        const parsed = await data.json();

        // ? Package the response with the query and send it back as a response
        res.status(200).send({
            query: req.params.q,
            results: parsed,
        });
    },
);

/**
 * The Router that handles all forecast requests from the Smorgasboard frontend.
 *
 * @see {@link _searchHandler}
 */
const _forecastHandler = weatherApiRouter.get(
    // ? Mandatory request parameters
    "/forecast/:lat,:lon",
    async (req: express.Request, res: express.Response) => {
        // ? If no latitude or longitude is passed.
        // ? This validates no wrong requests are sent to the Weather API.
        if (!req.params.lat || !req.params.lon)
            res.status(400).send(
                "Please enter a latitude and longitude to get its forecast.",
            );

        // ? Forward the request to the Weather API
        const data = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${
                req.params.lat
            },${req.params.lon}&days=${req.query.days ?? 3}&aqi=no&alerts=no`,
        );
        const parsed = await data.json();

        // ? Send the response to the frontend
        res.send(parsed);
    },
);

export default weatherApiRouter;
