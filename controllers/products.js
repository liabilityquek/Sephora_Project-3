const Products = require("../models/Product");

const showProducts = async (req, res) => {
  try {
    const query = {};
    const products = await Products.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProducts = async (req, res) => {
  try {
    console.log(req.body);
    const products = await Products.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProducts = async (req, res) => {
  try {
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
