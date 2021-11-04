const express = require('express');
const { addItemsToCart, getCartItems, removeCartItems} = require('../controller/cart');
const router = express.Router();
const { requestSignin, userMiddleware } = require('../middleware');

router.post('/user/cart/addtocart', requestSignin, userMiddleware ,addItemsToCart)
//router.get('/category/getcategory',getCategories)
router.post('/user/getCartItems',requestSignin, userMiddleware, getCartItems)
router.post(
    "/user/cart/removeItem",
    requestSignin,
    userMiddleware,
    removeCartItems
  );
module.exports = router