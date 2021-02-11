const { Product } = require("../db/models");

// FETCH PRODUCT 
exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch(error) {
    next(error);
  }
};

// LIST PRODUCTS
exports.productsList = async (req, res) => {
    try {
      const products = await Product.findAll({ attributes: {exclude: ["createdAt", "updatedAt"]} });
      res.json(products);
    } catch(error) {
      next(error);
    }
};

// DETAIL PRODUCT
exports.productDetail = async (req, res) => {
  res.json(req.product);
};

// CREATE PRODUCT
exports.productCreate = async (req, res, next) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch(error) {
      next(error);
    }
};

// DELETE PRODUCT
exports.productDelete = async (req, res) => {
  await req.product.destroy();
  res.status(204).end();
};

// UPDATE PRODUCT
exports.productUpdate = async (req, res) => {
  await req.product.update(req.body);
  res.status(204).end();
};