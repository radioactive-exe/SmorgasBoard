/**
 *
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import type { SupabaseClient } from "./declarations.js";
import { cors, createClient, dotenv, express, path } from "./declarations.js";
import apiRouter from "./routers/api_router.js";
import databaseRouter from "./routers/database_router.js";
import definitionsRouter from "./routers/definitions_router.js";

dotenv.config();

const supabase: SupabaseClient = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_KEY ?? "",
);

const app = express();
const port = 3000;
const allowedOrigins: string[] = [
    "https://smorgasboard.irradiated.app",
    "https://smorgasboard.vercel.app/",
    "https://smorgasboard.vercel.app",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
];

app.use(
    cors({
        origin: allowedOrigins,
    }),
);

app.use(express.json());

app.use("/definitions/", definitionsRouter);
app.use("/smorgasbase/", databaseRouter);
app.use("/api/", apiRouter);

app.get("/", (_req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname + "/../index.html"));
});

app.listen(port, () =>
    console.log(
        `SmorgasBoard listening on SmorgasPort ${port}! (Get it? Cuz... SmorgasB- eh whatever)`,
    ),
);

export default app;
export { supabase };
