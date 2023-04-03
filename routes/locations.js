const express = require("express");
const router = express.Router();
const locationsCtrl = require("../controllers/locations");

router.get("/:productName", locationCtrl.findLocationByProductName);
router.get("/", locationsCtrl.showLocation);
router.delete(
  "/:locationId/products/:productId",
  locationsCtrl.deleteLocProduct
);
router.put("/:locationId/products/:productId", locationsCtrl.editLocProductQty);
router.get("/:locationId", locationsCtrl.showAddProduct);
router.post("/:locationId/", locationsCtrl.addLocProduct);

module.exports = router;
