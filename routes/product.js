var express = require("express");
var router = express.Router();
const productCtrl = require("../controllers/product");

router.get("/", productCtrl.showProducts);

module.exports = router;
