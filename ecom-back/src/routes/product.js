const express = require('express');
const { createProduct } = require('../controller/product');
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

module.exports = router