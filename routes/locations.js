var express = require("express");
var router = express.Router();
const locationCtrl = require("../controllers/locations");

router.get("/:productName", locationCtrl.findLocationByProductName);

module.exports = router;
