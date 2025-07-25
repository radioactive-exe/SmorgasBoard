const express = require("express");
const path = require("path");
const cors = require("cors");
const templatesRouter = require("./routers/definitions_router.js");
const apiRouter = require("./routers/api_router.js");

import { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use("/definitions/panels/", templatesRouter);
app.use("/api/", apiRouter);

app.get("/", (req: Request, res: Response) => {
    res.sendFile(__dirname + "/../index.html");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
