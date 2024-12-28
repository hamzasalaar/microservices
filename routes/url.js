const express = require("express");
const { handleGenerateNewShortURL } = require("../contollers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

module.exports = router;
