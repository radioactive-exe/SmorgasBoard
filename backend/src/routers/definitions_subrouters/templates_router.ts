/**
 * This file contains the routing and responses to Panel template requests from
 * the frontend of Smorgasboard.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { cors, express, fs, path, url } from "../../declarations.js";

const templatesRouter = express.Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

templatesRouter.use(
    cors({ origin: "https://smorgasboard.irradiated.app", credentials: true }),
);

/** Handle calls requesting panel templates from the frontend of Smorgasboard. */
const _templateHandler = templatesRouter.get(
    "/:panel",
    (req: express.Request, res: express.Response) => {
        // ? If no parameter is passed
        if (!req.params.panel)
            res.status(400).send(
                "Please include a panel type to obtain the template for.",
            );

        // ? Obtain the (potential) location for the template file
        const templateLocation = path.join(
            __dirname
                + `/../../../definitions/templates/${req.params.panel}.html`,
        );

        // ? In case the panel parameter for which the template is requested does not
        // ? have an implemented template file
        if (!fs.existsSync(templateLocation)) {
            res.status(501).send(
                "The requested template file does not exist. Please submit an issue on the Smorgasboard repository (using the link in the context menu).",
            );
        }

        // ? In case all is well, read the contents of the file and send them to the frontend
        const templateHtml = fs.readFileSync(templateLocation);

        res.json({
            panel_type: req.params.panel,
            panel_template: templateHtml.toString(),
        });
    },
);

export default templatesRouter;
