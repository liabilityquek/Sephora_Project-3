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
module.exports = {
  findLocationByProductName,
};
