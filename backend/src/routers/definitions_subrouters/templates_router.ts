import { cors, express, fs, path, url } from "../../declarations.js";

const templatesRouter = express.Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
