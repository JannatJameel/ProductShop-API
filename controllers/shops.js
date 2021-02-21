const { Shop, Product } = require("../db/models");

// FETCH SHOP 
exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    return foundShop;
  } catch(error) {
    next(error);
  }
};

// LIST SHOPS
exports.shopsList = async (req, res, next) => {
    try {
      const shops = await Shop.findAll({ 
        attributes: {exclude: ["createdAt", "updatedAt"]}, 
        include: {
          model: Product,
          as: "products",
          attributes: ["id"]
        }
      });
      res.json(shops);
    } catch(error) {
      next(error);
    }
};

// DETAIL SHOP
exports.shopDetail = async (req, res, next) => {
    res.json(req.shop);
};

// CREATE SHOP
exports.shopCreate = async (req, res, next) => {
    try {
      if(req.file) req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      const newShop = await Shop.create(req.body);
      res.status(201).json(newShop);
    } catch(error) {
      next(error);
    }
};

// CREATE PRODUCT
exports.productCreate = async (req, res, next) => {
  try {
    console.log("Helloo");
    req.body.shopId = req.shop.id;
    if(req.file) req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch(error) {
    next(error);
  }
};

// DELETE SHOP
exports.shopDelete = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch(error) {
    next(error);
  }
  
};

// UPDATE SHOP
exports.shopUpdate = async (req, res, next) => {
  try {
    if(req.file) req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const updatedShop = await req.shop.update(req.body);
    res.status(201).json(updatedShop);;
  } catch(error) {
    next(error);
  }
};