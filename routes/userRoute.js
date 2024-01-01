const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
    signUpUser,
    signInUser,
    getUserDetails,
    logOut
} = require("../controllers/userController");

router.route("/auth/signup").post(signUpUser);
router.route("/auth/signin").post(signInUser);
router.route("/auth/logout").get(logOut);
router.route("/auth/me").get(isAuthenticatedUser, getUserDetails);

module.exports = router;