/**
 * The main module that handles all calls to the backend. All main routes are
 * here, along with the Supabase Client and Express app setup, and any other
 * needed steps like the dotenv configuration.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import type { SupabaseClient } from "./declarations.js";

import {
    allowedOrigins,
    cors,
    createClient,
    dotenv,
    express,
    path,
    url,
} from "./declarations.js";

import apiRouter from "./routers/api_router.js";
import databaseRouter from "./routers/database_router.js";
import definitionsRouter from "./routers/definitions_router.js";

dotenv.config();

/**
 * The Supabase client created for use throughout the backend.
 *
 * @see {@link SupabaseClient}
 */
const supabase: SupabaseClient = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_KEY ?? "",
);

const app = express();
const port = 3003;

const __filename = url.fileURLToPath(import.meta.url);
/** The current directory as a file path. */
const __dirname = path.dirname(__filename);

/** Implements CORS to only allow the origins in {@link allowedOrigins}. */
const _corsHandler = app.use(
    cors({
        origin: true,
    }),
);

app.use(express.json());

/** Routes all calls to the Definitions route directly to that handler. */
const _definitionsHandler = app.use("/definitions/", definitionsRouter);
/** Routes all calls to the Database directly to that handler. */
const _databaseHandler = app.use("/smorgasbase/", databaseRouter);
/** Routes all calls to the external API route directly to that handler. */
const _apiHandler = app.use("/api/", apiRouter);

/**
 * A simple (and incredibly primitive) page for when this backend is somehow
 * accessed or the page is landed upon/requested.
 */
const _baseResponse = app.get(
    "/",
    (_req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname + "/../index.html"));
    },
);

/** Begins the listening for all requests! */
const _listener = app.listen(port, () =>
    console.log(
        `SmorgasBoard listening on SmorgasPort ${port}! (Get it? Cuz... SmorgasBoa- eh whatever)`,
    ),
);

export default app;
export { supabase };
