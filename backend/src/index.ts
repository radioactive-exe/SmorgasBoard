import { cors, express, path, dotenv } from "./declarations.js";

dotenv.config();

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

app.use(
    cors({
        origin: allowedOrigins,
    })
);

app.use("/definitions/", definitionsRouter);
// app.use("/api/", apiRouter);

app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname + "/../index.html"));
});

app.listen(port, () =>
    console.log(
        `SmorgasBoard listening on SmorgasPort ${port}! (Get it? Cuz... SmorgasB- eh whatever)`
    )
);
