/**
 * This file contains all the forwarding/routing of calls to the Supabase
 * database from the frontend.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { allowedOrigins, cors, express } from "../declarations.js";
import { supabase } from "../index.js";

const databaseRouter = express.Router();

databaseRouter.use(cors({ origin: allowedOrigins, credentials: true }));

/**
 * Handles all GET requests sent to fetch data from the Supabase database.
 *
 * @see {@link _updateHandler}
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries | Supabase#Database}
 */
const _fetchHandler = databaseRouter.get(
    "/get",
    async (req: express.Request, res: express.Response) => {
        const target = req.query.target;

        if (!target)
            res.status(400)
                .send(
                    "Please enter the target column(s) to fetch from the database",
                );

        // ? Forward the request to the Supabase database, along with all necessary
        // ? Authorisation and headers.
        const fetched = await fetch(
            process.env.SUPABASE_URL
                + "/rest/v1/dashboard_data?select="
                + target,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    apiKey: process.env.SUPABASE_KEY ?? "",
                    Authorization: req.headers.authorization ?? "",
                },
            },
        );
        const data = await fetched.json();

        // ? Send the obtained data to the front end.
        res.json(data);
    },
);

/**
 * Handles all PATCH requests sent to update stored data in the Supabase
 * database.
 *
 * @see {@link _fetchHandler}
 * @see {@link https://supabase.com/docs | Supabase}
 * @see {@link https://supabase.com/docs/guides/database/connecting-to-postgres#data-apis-and-client-libraries | Supabase#Database}
 * @see {@link https://supabase.com/docs/guides/auth | Supabase#Auth}
 */
const _updateHandler = databaseRouter.patch(
    "/patch",
    async (req: express.Request, res: express.Response) => {
        // ? Attempt to verify the User's ID, and store it for use with the
        // ? PATCH/update request sent to the database for that row.
        let userId: string;
        try {
            const user = await supabase.auth.getUser(
                req.headers.authorization?.trim().split(" ")[1],
            );
            userId = user.data.user?.id as string;

            // ? If the user ID could not be obtained
        } catch {
            userId = "";
            res.status(401)
                .send(
                    "Not a valid authorised user. Please check that you are sending the proper authorisation header from the Smorgasboard frontend.",
                );
        }

        // ? Forward the request to the database, along with the payload (updated column value(s)),
        // ? and all necessary authorisation and API headers
        const fetched = await fetch(
            process.env.SUPABASE_URL
                + "/rest/v1/dashboard_data?id=eq."
                + userId,
            {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                    apiKey: process.env.SUPABASE_KEY ?? "",
                    Authorization: req.headers.authorization ?? "",
                },
                body: JSON.stringify(req.body),
            },
        );
        const data = await fetched.json();

        // ? Send the updated/new record back to the frontend
        res.json(data);
    },
);

export default databaseRouter;
