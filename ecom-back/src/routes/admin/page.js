const express = require("express");
const { createPage, getPage } = require("../../controller/admin/page");
const { upload, requestSignin, adminMiddleware } = require("../../middleware");
const router = express.Router();

router.post('/page/create',requestSignin,adminMiddleware,upload.fields([
    {name: 'banners'},
    {name: 'products'}
]),createPage);

router.get('/page/:category/:type',getPage)

module.exports = router;