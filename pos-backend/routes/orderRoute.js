const express = require("express");
const { addOrder, getAllOrders, getOrderById, updateOrderStatus } = require("../controllers/orderController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

router.route("/").post(isVerifiedUser, addOrder);
router.route("/").get(isVerifiedUser, getAllOrders);
router.route("/:orderId").get(isVerifiedUser, getOrderById);
router.route("/:orderId/status").put(isVerifiedUser, updateOrderStatus);

module.exports = router;