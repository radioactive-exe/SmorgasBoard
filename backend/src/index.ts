import { cors, express } from "./declarations.js";

const definitionsRouter : express.Router = require("./routers/definitions_router");

const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));

app.use("/definitions/", definitionsRouter);
// app.use("/api/", apiRouter);

app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/../index.html");
});

app.listen(port, () => console.log(`SmorgasBoard listening on SmorgasPort ${port}! (Get it? Cuz... Smorg- eh whatever)`));
