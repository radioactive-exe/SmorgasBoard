const templatesRouter = express.Router();

templatesRouter.use(cors({ origin: true, credentials: true }));

templatesRouter.get("/:panel", (req: typeof Req, res: typeof Res) => {
    var templateHtml = fs.readFileSync(
        __dirname + `/../../../definitions/templates/${req.params.panel}.html`
    );
    res.send({
        panel_type: req.params.panel,
        panel_template: templateHtml.toString(),
    });
});

module.exports = templatesRouter;