const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  product: [
    {
      productDetails: { type: Schema.Types.ObjectId, ref: "product" },
      productQty: { type: Number, required: true },
    },
  ],
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
