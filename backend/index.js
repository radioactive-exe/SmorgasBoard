const express = require("express");
const path = require("path");
const cors = require("cors");
const templatesRouter = require("./definitions/templates/templates_router.js");

const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use("definitions/templates/", templatesRouter);

app.get("/", (req, res) => res.sendFile("./index.html"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
