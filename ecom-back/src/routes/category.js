const express = require('express');
const { getCategories } = require('../controller/category');
const router = express.Router();
const { addCategory } = require('../controller/category');
const { adminMiddleware, requestSignin } = require('../middleware');
const path = require('path')
const multer = require('multer')
const shortid = require('shortid')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage })

router.post('/category/create', requestSignin, adminMiddleware, upload.single('categoryImg'),addCategory)
router.get('/category/getcategory',getCategories)

module.exports = router