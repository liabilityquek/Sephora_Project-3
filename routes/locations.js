const express = require("express");
const router = express.Router();
const locationsCtrl = require("../controllers/locations");

router.get("/", locationsCtrl.showLocation);

module.exports = router;
