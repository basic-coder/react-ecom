const express = require('express');
const { getCategories } = require('../controller/category');
const router = express.Router();
const { addCategory } = require('../controller/category');
const { adminMiddleware, requestSignin } = require('../middleware');

router.post('/category/create', requestSignin, adminMiddleware ,addCategory)
router.get('/category/getcategory',getCategories)

module.exports = router