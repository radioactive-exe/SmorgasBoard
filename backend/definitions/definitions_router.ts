const express = require('express');

import { Request, Response } from "express";

const router = express.Router();
const fs = require('fs');

router.get("/", (req: Request, res: Response) => {
    res.send("Here, all the Definitions are requested and sent");
});

router.get("/:panel", (req: Request , res: Response) => {
    var templateHtml = fs.readFileSync(__dirname + `/templates/${req.params.panel}.html`)
    res.send({
        panel_type: req.params.panel,
        panel_template: templateHtml.toString()
    })
})

module.exports = router;
