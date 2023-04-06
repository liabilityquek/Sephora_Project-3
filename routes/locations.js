const express = require("express");
const router = express.Router();
const locationsCtrl = require("../controllers/locations");

router.get("/:productName", locationsCtrl.findLocationByProductName);
router.get("/", locationsCtrl.showLocation);
router.delete(
  "/:locationId/products/:productId",
  locationsCtrl.deleteLocProduct
);
router.put("/:locationId/products/:productId", locationsCtrl.editLocProductQty);
router.get("/getlocation/:locationId", locationsCtrl.showAddProduct);
router.post("/:locationId/", locationsCtrl.addLocProduct);
router.delete("/products/:productID", locationsCtrl.deleteProductFromBothCol);

module.exports = router;
