import { cors, express } from "../declarations.js";

import weatherApiRouter from "./api_subrouters/weather_router.js";

const apiRouter = express.Router();

apiRouter.use(cors({ origin: true, credentials: true }));

apiRouter.use("/weather/", weatherApiRouter);

apiRouter.get("/", (_req: express.Request, res: express.Response) => {
    res.send("Here, all external API calls are routed from the frontend.");
});

export default apiRouter;
