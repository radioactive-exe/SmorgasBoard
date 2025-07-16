const express = require("express");
const path = require("path")
const router = express.Router();
const fs = require('fs');

router.get("/", (req, res) => {
    res.send("Here, all the Definitions are requested and sent");
});

router.get("/:panel", (req, res) => {
    var templateHtml = fs.readFileSync(__dirname + `/templates/${req.params.panel}.html`)
    res.send({
        panel_type: req.params.panel,
        panel_template: templateHtml.toString()
    })
})

module.exports = router;
