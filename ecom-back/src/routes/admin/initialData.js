const express = require("express");
const { initialData } = require("../../controller/admin/initialData");
const { requestSignin, adminMiddleware } = require("../../middleware");
const router = express.Router();

router.post('/initialdata',requestSignin, adminMiddleware, initialData);

module.exports = router;