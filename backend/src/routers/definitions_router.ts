import { cors, express } from "../declarations.js";

import templatesRouter from "./definitions_subrouters/templates_router.js";

const definitionsRouter = express.Router();

definitionsRouter.use(cors({ origin: true, credentials: true }));

definitionsRouter.use("/panels/", templatesRouter);

definitionsRouter.get("/", (_req: express.Request, res: express.Response) => {
    res.send("Here, all the Definitions are requested and sent");
});

export default definitionsRouter;
