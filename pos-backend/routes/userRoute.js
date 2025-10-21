const express = require("express");
const { quickLogin, getAvailableRoles, getUserData, logout } = require("../controllers/userController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

// Quick Login Routes
router.route("/roles").get(getAvailableRoles);
router.route("/quick-login").post(quickLogin);
router.route("/logout").post(isVerifiedUser, logout);
router.route("/").get(isVerifiedUser, getUserData);

module.exports = router;