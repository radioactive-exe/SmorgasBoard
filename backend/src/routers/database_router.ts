import { express, cors } from "../declarations";

const databaseRouter = express.Router();

databaseRouter.use(cors({ origin: true, credentials: true }));

databaseRouter.get("/get", async (req: express.Request, res: express.Response) => {

    const target = req.query.target;

    const fetched = await fetch(
        "https://bvrmyobereaeybqpatjg.supabase.co/rest/v1/dashboard_data?select=" + target,
        {
            method: "GET",
            headers: {
                apiKey: process.env.SUPABASE_KEY ?? "",
                Authorization: req.headers.authorization ?? "",
            },
        }
    );

    const data = await fetched.json();
    res.json(data);
});

databaseRouter.get("/patch", async (req: express.Request, res: express.Response) => {

    const target = req.query.target;

    const fetched = await fetch(
        "https://bvrmyobereaeybqpatjg.supabase.co/rest/v1/dashboard_data?update=" + target,
        {
            method: "PATCH",
            headers: {
                apiKey: process.env.SUPABASE_KEY ?? "",
                Authorization: req.headers.authorization ?? "",
            },
            body: req.body
        }
    );

    const data = await fetched.json();
    res.json(data);
});

module.exports = databaseRouter;
