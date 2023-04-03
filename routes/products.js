var express = require("express");
var router = express.Router();
const productCtrl = require("../controllers/products");

router.get("/", productCtrl.showProducts);
router.post("/AdminProduct/new", productCtrl.addProducts);

module.exports = router;
