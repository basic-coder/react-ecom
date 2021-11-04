const express = require('express');
const { createProduct, getProductsBySlug, getProductDetailsById ,deleteProductById,
    getProducts, } = require('../controller/product');
const router = express.Router();
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const { adminMiddleware, requestSignin } = require('../middleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/product/create', requestSignin, adminMiddleware, upload.array('productImage') ,createProduct)
//router.get('/category/getcategory',getCategories)
router.get('/products/:slug', getProductsBySlug);
router.get('/product/:productId', getProductDetailsById);
router.delete("/product/deleteProductById",requestSignin,adminMiddleware, deleteProductById);
  router.post(
    "/product/getProducts",
    requestSignin,
    adminMiddleware,
    getProducts
  );

module.exports = router