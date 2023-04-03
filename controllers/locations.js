const Location = require("../models/Location");
const Product = require("../models/Product");

const findLocationByProductName = async (req, res) => {
  try {
    const { productName } = req.params;
    const location = await Location.aggregate([
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productDetails",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $match: {
          "product.name": productName,
        },
      },
      {
        $project: {
          name: 1,
          productQty: "$products.productQty",
        },
      },
    ]);

    res.status(200).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const showLocation = async (req, res) => {
  try {
    const locations = await Location.find({}).populate(
      "products.productDetails"
    );
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

const editLocProductQty = async (req, res) => {
  try {
    console.log("edit location quantity");
    const locationId = req.params.locationId; // get the location id from the request parameters
    const productId = req.params.productId; // get the product id from the request parameters
    const newQty = req.body.qty; // get the new quantity from the request body

    // Find the location by its id
    const location = await Location.findById(locationId);

    // Find the product in the product array
    const product = location.products.find(
      (p) => p.productDetails.toString() === productId
    );

    // If the product exists in the array, update its quantity
    if (product) {
      product.productQty = newQty;
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

const showAddProduct = async (req, res) => {
  try {
    const locationId = req.params.locationId;

    // Find the location by its id
    const location = await Location.findById(locationId).populate(
      "products.productDetails"
    );

    // Find all products that are not yet in the location
    const allProducts = await Product.find({});
    const existingProducts = location.products.map((p) =>
      p.productDetails._id.toString()
    );
    const newProducts = allProducts.filter(
      (p) => !existingProducts.includes(p._id.toString())
    );

    // Return the location and list of new products
    res.status(200).json({ location, newProducts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addLocProduct = async (req, res) => {
  try {
    const locationId = req.params.locationId; // get the location id from the request parameters
    const { productId, qty } = req.body; // get the product id and quantity from the request body

    // Find the location by its id
    const location = await Location.findById(locationId);

    // Add the new product to the location
    const newProduct = { productDetails: productId, productQty: qty };
    location.products.push(newProduct);

    // Save the updated location
    const updatedLocation = await location.save();

    // Return the updated location
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  findLocationByProductName,
  showLocation,
  deleteLocProduct,
  editLocProductQty,
  showAddProduct,
  addLocProduct,
};
