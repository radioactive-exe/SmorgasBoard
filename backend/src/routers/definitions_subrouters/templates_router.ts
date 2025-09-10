import { cors, express, fs } from "../../declarations";

const templatesRouter = express.Router();

templatesRouter.use(cors({ origin: true, credentials: true }));

templatesRouter.get("/:panel", (req: express.Request, res: express.Response) => {
    var templateHtml = fs.readFileSync(
        __dirname + `/../../../definitions/templates/${req.params.panel}.html`
    );
    res.json({
        panel_type: req.params.panel,
        panel_template: templateHtml.toString(),
    });
});

module.exports = templatesRouter;
