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

const deleteLocProduct = async (req, res) => {
  try {
    const locationId = req.params.locationId; // get the location id from the request parameters
    const productId = req.params.productId; // get the product id from the request parameters

    // Find the location by its id
    const location = await Location.findById(locationId);

    // Find the index of the product in the product array
    const productIndex = location.products.findIndex(
      (p) => p.productDetails.toString() === productId
    );

    // If the product exists in the array, remove it
    if (productIndex >= 0) {
      location.products.splice(productIndex, 1);
    } else {
      return res.status(404).json({ error: "Product not found in location" });
    }

    // Save the updated location
    const updatedLocation = await location.save();

    // Return the updated location
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  showLocation,
  deleteLocProduct,
};
