const express = require("express");
const { request: Req, response: Res } = require("express");
const fs = require("fs");

const definitionsRouter = express.Router();

definitionsRouter.use("/panels/", templatesRouter);

definitionsRouter.get("/", (req: typeof Req, res: typeof Res) => {
    res.send("Here, all the Definitions are requested and sent");
});

module.exports = definitionsRouter;
