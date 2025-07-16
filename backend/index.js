const express = require("express");
const path = require("path");
const cors = require("cors");
const { get } = require("http");

const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => res.send("Hello"));

app.get("api/definitions/templates/default", (req, res) => {
    res.sendFile("definitions/templates/default.html");
});
app.get("api/definitions/templates/notepad", (req, res) => {
    res.sendFile("definitions/templates/notepad.html");
});
app.get("api/definitions/templates/photo", (req, res) => {
    res.sendFile("definitions/templates/photo.html");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
