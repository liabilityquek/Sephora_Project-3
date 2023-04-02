var express = require("express");
var router = express.Router();
const locationCtrl = require("../controllers/location");

router.get("/:productName", locationCtrl.findLocationByProductName);

module.exports = router;
