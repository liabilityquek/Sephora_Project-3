const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [
    {
      productDetails: { type: Schema.Types.ObjectId, ref: "Product" },
      productQty: { type: Int, required: true },
    },
  ],
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
