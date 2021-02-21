const express = require("express");
const upload = require("../middleware/multer");
const { 
    shopsList, 
    shopDetail,
    shopCreate,
    productCreate,
    shopDelete,
    shopUpdate,
    fetchShop
} = require("../controllers/shops");
const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
    const foundShop = await fetchShop(shopId, next);
    if(foundShop) {
        req.shop = foundShop;
        next();
    }else{
        next({
            status: 404, 
            message: "Shop not found"
        });
    }
});

// LIST SHOPS
router.get("/", shopsList);

// DETAIL SHOP
router.get("/:shopId", shopDetail);

// CREATE SHOP
router.post("/", upload.single("image"), shopCreate);

// CREATE PRODUCT
router.post("/:shopId/products", upload.single("image"), productCreate);

// DELETE SHOP
router.delete("/:shopId", shopDelete);

// UPDATE SHOP
router.put("/:shopId", upload.single("image"), shopUpdate);

module.exports = router;