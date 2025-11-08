import { cors, express, fs } from "../../declarations.js";

const templatesRouter = express.Router();

templatesRouter.use(cors({ origin: true, credentials: true }));

templatesRouter.get(
    "/:panel",
    (req: express.Request, res: express.Response) => {
        const templateHtml = fs.readFileSync(
            __dirname
                + `/../../../definitions/templates/${req.params.panel}.html`,
        );
        res.json({
            panel_type: req.params.panel,
            panel_template: templateHtml.toString(),
        });
    },
);

export default templatesRouter;
