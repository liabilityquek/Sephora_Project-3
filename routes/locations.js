const express = require("express");
const router = express.Router();
const locationsCtrl = require("../controllers/locations");

router.get("/", locationsCtrl.showLocation);
router.delete(
  "/locations/:locationId/products/:productId",
  locationsCtrl.deleteLocProduct
);

module.exports = router;
