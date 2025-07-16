const express = require("express");
const path = require("path")
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Here, all the default Panel Templates are requested");
});

router.get("/:template", (req, res) => {
    res.sendFile(`/backend/definitions/templates/${req.params.template}.html`);
})

module.exports = router;
