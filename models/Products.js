const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  imgurl: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
