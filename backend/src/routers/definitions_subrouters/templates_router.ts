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

import { allowedOrigins, cors, express, fs, path } from "../../declarations.js";

const templatesRouter = express.Router();

templatesRouter.use(cors({ origin: allowedOrigins, credentials: true }));

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

        const templateFile = path.join(
            process.cwd(),
            `./definitions/templates/${req.params.panel}.html`,
        );

        // ? Obtain the (potential) location for the template file, and then
        // ? Attempt to read the contents of the file and send them to the frontend
        fs.readFile(templateFile, (err, data) => {
            // ? In case the panel parameter for which the template is requested does not
            // ? have an implemented template file
            if (err) {
                console.log(err);
                res.status(501).json({
                    body: "The requested template file does not exist. Please submit an issue on the Smorgasboard repository (using the link in the context menu).",
                });
                // ? Otherwise, in case the template file is implemented
            } else {
                res.setHeader(
                    "Access-Control-Allow-Origin",
                    process.env.ORIGIN_URL ?? "",
                ).json({
                    panel_type: req.params.panel,
                    panel_template: data.toString(),
                });
            }
        });
    },
);

export default templatesRouter;
