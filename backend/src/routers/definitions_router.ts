const definitionsRouter = express.Router();

definitionsRouter.use(cors({ origin: true, credentials: true }));

definitionsRouter.use("/panels/", templatesRouter);

definitionsRouter.get("/", (req: typeof Req, res: typeof Res) => {
    res.send("Here, all the Definitions are requested and sent");
});

module.exports = definitionsRouter;
