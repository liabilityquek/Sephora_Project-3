const Products = require("../models/Products");

const showProducts = async (req, res) => {
  try {
    const query = {};
    const products = await Products.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  showProducts,
};
