const Products = require("../models/Product");

const showProducts = async (req, res) => {
  try {
    const query = {};
    const products = await Products.find(query).sort({
      name: 1,
      category: 1,
      brand: 1,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProducts = async (req, res) => {
  try {
    console.log(req.body);

    const productExists = await Products.findOne({ name: req.body.name });
    if (productExists) {
      throw new Error("Product with the same name already exists");
    }

    if (req.body.brand === "Other") {
      const brandExists = await Products.findOne({
        brand: req.body.newBrand,
      });
      if (brandExists) {
        throw new Error("Brand already exists");
      }
    }

    const products = await Products.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProducts = async (req, res) => {
  try {
    const updatedName = req.body.name;
    const existingProduct = await Products.findOne({ name: updatedName });
    if (existingProduct && existingProduct._id.toString() !== req.params.id) {
      throw new Error("Another product with the same name already exists");
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  showProducts,
  addProducts,
  updateProducts,
};
