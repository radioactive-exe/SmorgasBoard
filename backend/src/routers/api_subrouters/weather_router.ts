import { cors, express, fs } from "../../declarations";

const weatherApiKey = process.env.WEATHER_API_KEY;

const weatherApiRouter = express.Router();

weatherApiRouter.use(cors({ origin: true, credentials: true }));

weatherApiRouter.get(
    "/search",
    async (req: express.Request, res: express.Response) => {
        if (!req.query.q)
            res.status(400).send(
                'Please provide a query parameter "q" to search'
            );
        const data = await fetch(
            `http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${req.query.q}`
        );
        const parsed = await data.json();
        res.status(200).send({
            query: req.params.q,
            results: parsed,
        });
    }
);

weatherApiRouter.get(
    "/forecast/:lat,:lon",
    (req: express.Request, res: express.Response) => {
        `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${
            req.params.lat
        },${req.params.lon}&days=${req.query.days ?? 3}&aqi=no&alerts=no`;
    }
);

module.exports = weatherApiRouter;
