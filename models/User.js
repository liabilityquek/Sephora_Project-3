const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "CUSTOMER",
    enum: ["ADMIN", "CUSTOMER"],
  },
});

const Appointment = mongoose.model("User", UserSchema);
module.exports = Appointment;
