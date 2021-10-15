const express = require('express');
const { addItemsToCart} = require('../controller/cart');
const router = express.Router();
const { requestSignin, userMiddleware } = require('../middleware');

router.post('/user/cart/addtocart', requestSignin, userMiddleware ,addItemsToCart)
//router.get('/category/getcategory',getCategories)

module.exports = router