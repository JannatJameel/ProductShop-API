const { Shop, Product } = require("../db/models");

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
exports.productsList = async (req, res, next) => {
    try {
      const products = await Product.findAll({ 
        attributes: {exclude: ["createdAt", "updatedAt"]}, 
        include: {
          model: Shop, 
          as: "shop",
          attributes: ["id"]
        }
      });
      res.json(products);
    } catch(error) {
      next(error);
    }
};

// DETAIL PRODUCT
exports.productDetail = async (req, res, next) => {
    res.json(req.product);
};

// DELETE PRODUCT
exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch(error) {
    next(error);
  }
};

// UPDATE PRODUCT
exports.productUpdate = async (req, res, next) => {
  try {
    if(req.file) req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const updatedProduct = await req.product.update(req.body);
    res.status(201).json(updatedProduct);
  } catch(error) {
    next(error);
  }
};