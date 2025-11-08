import { cors, express } from "../declarations.js";
import { supabase } from "../index.js";

const databaseRouter = express.Router();

databaseRouter.use(cors({ origin: true, credentials: true }));

databaseRouter.get(
    "/get",
    async (req: express.Request, res: express.Response) => {
        const target = req.query.target;

        const fetched = await fetch(
            "https://bvrmyobereaeybqpatjg.supabase.co/rest/v1/dashboard_data?select="
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
        res.json(data);
    },
);

databaseRouter.patch(
    "/patch",
    async (req: express.Request, res: express.Response) => {
        let userId: string;
        try {
            const user = await supabase.auth.getUser(
                req.headers.authorization?.trim().split(" ")[1],
            );
            userId = user.data.user?.id as string;
        } catch {
            userId = "";
        }

        const fetched = await fetch(
            "https://bvrmyobereaeybqpatjg.supabase.co/rest/v1/dashboard_data?id=eq."
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
        res.json(data);
    },
);

export default databaseRouter;
