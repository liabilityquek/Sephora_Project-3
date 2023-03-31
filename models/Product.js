const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  imgurl: { type: String, required: true },
  price: { type: Int, required: true, min: 1 },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
});

const Appointment = mongoose.model("Product", ProductSchema);
module.exports = Appointment;
