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

import {
    allowedOrigins,
    cors,
    express,
    fs,
    path,
    url,
} from "../../declarations.js";

const templatesRouter = express.Router();

templatesRouter.use(cors({ origin: allowedOrigins, credentials: true }));

const __filename = url.fileURLToPath(import.meta.url);
/** The current directory as a file path. */
const __dirname = path.dirname(__filename);

/** Handle calls requesting panel templates from the frontend of Smorgasboard. */
const _templateHandler = templatesRouter.get(
    "/:panel",
    (req: express.Request, res: express.Response) => {
        // ? If no parameter is passed
        if (!req.params.panel) {
            res.status(400).json({
                body: "Please include a panel type to obtain the template for.",
            });
            return;
        }

        // ! This is added to make vercel bundle the definition files automatically
        const _pathForBundling = path.join(
            __dirname
                + `/../../../public/definitions/templates/${req.params.panel}.html`,
        );

        // ? Obtain the (potential) location for the template file
        // ! Using an environment variable allows running the application both locally
        // ! and in production
        const templateFile = path.join(
            process.cwd()
                + `${process.env.DEFINITIONS_RELATIVE_PATH}/templates/${req.params.panel}.html`,
        );

        // ? Attempt to read the contents of the file and send them to the frontend
        fs.readFile(templateFile, (err, data) => {
            // ? In case the panel parameter for which the template is requested does not
            // ? have an implemented template file
            if (err) {
                res.status(501).json({
                    body: "The requested template file does not exist. Please submit an issue on the Smorgasboard repository (using the link in the context menu).",
                });
                // ? Otherwise, in case the template file is implemented
            } else {
                res.json({
                    panel_type: req.params.panel,
                    panel_template: data.toString(),
                });
            }
        });
    },
);

export default templatesRouter;
