const express = require("express");
const path = require("path");
const cors = require("cors");

import { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use("/definitions/", definitionsRouter);
// app.use("/api/", apiRouter);

app.get("/", (req: Request, res: Response) => {
    res.sendFile(__dirname + "/../index.html");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
