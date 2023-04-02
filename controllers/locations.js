const Location = require("../models/Location");
const Product = require("../models/Product");

const showLocation = async (req, res) => {
  try {
    console.log("hello");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  showLocation,
};
