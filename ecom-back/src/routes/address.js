const express = require('express');
const { userMiddleware, requestSignin } = require('../middleware');
const { addAddress, getAddress } = require('../controller/address');
const router = express.Router();


router.post('/user/address/create', requestSignin, userMiddleware, addAddress);
router.post('/user/getaddress', requestSignin, userMiddleware, getAddress);

module.exports = router;