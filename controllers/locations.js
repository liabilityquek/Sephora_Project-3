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
    const locationId = req.params.locationId;
    const productId = req.params.productId;

    const location = await Location.findById(locationId);

    const productIndex = location.products.findIndex(
      (p) => p.productDetails.toString() === productId
    );

    // If the product exists in the array, remove it
    if (productIndex >= 0) {
      location.products.splice(productIndex, 1);
    } else {
      return res.status(404).json({ error: "Product not found in location" });
    }

    const updatedLocation = await location.save();

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editLocProductQty = async (req, res) => {
  try {
    console.log("edit location quantity");
    const locationId = req.params.locationId; // get location id
    const productId = req.params.productId; // get the product id
    const newQty = req.body.qty; // get the new quantity

    const location = await Location.findById(locationId);

    const product = location.products.find(
      (p) => p.productDetails.toString() === productId
    );

    // If the product exists in the array, update its quantity
    if (product) {
      product.productQty = newQty;
    } else {
      return res.status(404).json({ error: "Product not found in location" });
    }

    const updatedLocation = await location.save();

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const showAddProduct = async (req, res) => {
  try {
    const locationId = req.params.locationId;

    const location = await Location.findById(locationId).populate(
      "products.productDetails"
    );

    // Find all products not in location
    const allProducts = await Product.find({});
    const existingProducts = location.products.map((p) =>
      p.productDetails._id.toString()
    );
    const newProducts = allProducts.filter(
      (p) => !existingProducts.includes(p._id.toString())
    );

    res.status(200).json({ location, newProducts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addLocProduct = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const { productId, qty } = req.body;

    const location = await Location.findById(locationId);

    // Add the new product to the location
    const newProduct = { productDetails: productId, productQty: qty };
    location.products.push(newProduct);

    const updatedLocation = await location.save();

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