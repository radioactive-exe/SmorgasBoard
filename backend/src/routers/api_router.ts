/**
 * This file contains all routings to the individual external API routers that
 * Smorgasboard requires.
 *
 * @remarks
 * As of now, there is only the Weather API implemented, but as more Panels are
 * added, there will be more external APIs being used.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { cors, express } from "../declarations.js";

import weatherApiRouter from "./api_subrouters/weather_router.js";

const apiRouter = express.Router();

apiRouter.use(cors({ origin: true, credentials: true }));

/** Routes all calls to the Weather API route directly to that handler. */
const _weatherRouter = apiRouter.use("/weather/", weatherApiRouter);

/** A simple response when accessing the base route of this handler. */
const _baseResponse = apiRouter.get(
    "/",
    (_req: express.Request, res: express.Response) => {
        res.send("Here, all external API calls are routed from the frontend.");
    },
);

export default apiRouter;
