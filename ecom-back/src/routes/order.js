const { requestSignin, userMiddleware } = require("../middleware");
const { addOrder, getOrders, getOrder } = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requestSignin, userMiddleware, addOrder);
router.get("/getOrders", requestSignin, userMiddleware, getOrders);
router.post("/getOrder", requestSignin, userMiddleware, getOrder);

module.exports = router;