const express = require('express');
const {request: Req, response: Res} = require("express");

const router = express.Router();
const fs = require('fs');

router.get("/", (req: typeof Req, res: typeof Res) => {
    res.send("Here, all the Definitions are requested and sent");
});

router.get("/:panel", (req: typeof Req , res: typeof Res) => {
    var templateHtml = fs.readFileSync(__dirname + `/../../definitions/templates/${req.params.panel}.html`)
    res.send({
        panel_type: req.params.panel,
        panel_template: templateHtml.toString()
    })
})

module.exports = router;
