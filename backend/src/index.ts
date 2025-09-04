import { createClient, SupabaseClient } from "@supabase/supabase-js";

import { cors, express, path } from "./declarations.js";

require("dotenv").config({
    path: "../"
});

const supabaseUrl: string = process.env.SUPABASE_URL ?? "";
const supabaseKey: string = process.env.SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase Environment Variables not properly configured!");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const definitionsRouter: express.Router = require("./routers/definitions_router");

const app = express();
const port = 3000;
const allowedOrigins: string[] = [
    "https://smorgasboard.vercel.app/",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:3003",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
];

app.use(cors(
    {
        origin: allowedOrigins
    }
));

app.use("/definitions/", definitionsRouter);
// app.use("/api/", apiRouter);

app.get("/something", () => {
    console.log(supabase);
});

app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname + "/../index.html"));
});

app.listen(port, () =>
    console.log(
        `SmorgasBoard listening on SmorgasPort ${port}! (Get it? Cuz... Smorg- eh whatever)`
    )
);
