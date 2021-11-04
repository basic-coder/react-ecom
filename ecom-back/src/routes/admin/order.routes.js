const express = require("express");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/order.admin");
const { requestSignin,adminMiddleware } = require("../../middleware");
const router = express.Router();

router.post(`/order/update`, requestSignin, adminMiddleware, updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requestSignin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;