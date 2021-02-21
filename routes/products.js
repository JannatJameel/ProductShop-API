const express = require("express");
const upload = require("../middleware/multer");
const { 
    productsList, 
    productDetail,
    productDelete,
    productUpdate,
    fetchProduct
} = require("../controllers/products");
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
router.get("/", productsList);

// DETAIL PRODUCT
router.get("/:productId", productDetail);

// DELETE PRODUCT
router.delete("/:productId", productDelete);

// UPDATE PRODUCT
router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;