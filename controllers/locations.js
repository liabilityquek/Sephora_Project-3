const Location = require("../models/Location");
const Product = require("../models/Product");

const showLocation = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  showLocation,
};
