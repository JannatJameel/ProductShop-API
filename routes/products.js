const express = require("express");
const { 
    productsList, 
    productDetail,
    productCreate,
    productDelete,
    productUpdate,
    fetchProduct
} = require("../controllers/productsController");
const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
    const foundProduct = await fetchProduct(productId, next);
    if(foundProduct) {
        req.product = foundProduct;
        next();
    }else{
        next({
            status: 404, 
            message: "Product not found"
        });
    }
});

// LIST PRODUCTS
router.get("/products", productsList);

// DETAIL PRODUCT
router.get("/products/:productId", productDetail);

// CREATE PRODUCT
router.post("/products", productCreate);

// DELETE PRODUCT
router.delete("/products/:productId", productDelete);

// UPDATE PRODUCT
router.put("/products/:productId", productUpdate);

module.exports = router;