/**
 * This file contains the routing to all individual definition sub-routers, such
 * as panel templates, etc.
 *
 * @remarks
 * Currently, the only definitions sub-router is that for the panel templates.
 * However, as Smorgasboard evolves, all definition sub-routers will be routed
 * through this one (`/definitions/another-router`/).
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { allowedOrigins, cors, express } from "../declarations.js";

import templatesRouter from "./definitions_subrouters/templates_router.js";

const definitionsRouter = express.Router();

definitionsRouter.use(cors({ origin: allowedOrigins, credentials: true }));

/** Routed the calls for panel templates directly to that handler. */
const _panelsHandler = definitionsRouter.use("/panels/", templatesRouter);

/**
 * A simple response in case the base route is called, or the page is accessed,
 * informing about the purpose of this route.
 */
const _baseResponse = definitionsRouter.get(
    "/",
    (_req: express.Request, res: express.Response) => {
        res.send("Here, all the Definitions are requested and sent");
    },
);

export default definitionsRouter;
