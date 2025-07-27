import { express, cors } from "../declarations";

const definitionsRouter = express.Router();

definitionsRouter.use(cors({ origin: true, credentials: true }));

const templatesRouter: express.Router = require("./definitions_subrouters/templates_router.js");

definitionsRouter.use("/panels/", templatesRouter);

definitionsRouter.get("/", (req: express.Request, res: express.Response) => {
    res.send("Here, all the Definitions are requested and sent");
});

module.exports = definitionsRouter;
