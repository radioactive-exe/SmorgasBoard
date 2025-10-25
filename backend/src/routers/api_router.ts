import { express, cors } from "../declarations";

const apiRouter = express.Router();

apiRouter.use(cors({ origin: true, credentials: true }));

const weatherApiRouter: express.Router = require("./api_subrouters/weather_router.js");

apiRouter.use("/weather/", weatherApiRouter);

apiRouter.get("/", (req: express.Request, res: express.Response) => {
    res.send("Here, all external API calls are routed from the frontend.");
});

module.exports = apiRouter;
