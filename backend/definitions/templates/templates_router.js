const express = require("express");
const path = require("path")
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Here, all the default Panel Templates are requested");
});

router.get("/:template", (req, res) => {
    res.send({
        template_type: `${req.params.template}`,
        template_body: ``
    })
    res.sendFile(__dirname + `/${req.params.template}.html`);
})

module.exports = router;
