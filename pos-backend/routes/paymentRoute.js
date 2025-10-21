const express = require("express");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { createPayment, getPaymentById, getAllPayments } = require("../controllers/paymentController");
 
router.route("/").post(isVerifiedUser, createPayment);
router.route("/").get(isVerifiedUser, getAllPayments);
router.route("/:paymentId").get(isVerifiedUser, getPaymentById);


module.exports = router;