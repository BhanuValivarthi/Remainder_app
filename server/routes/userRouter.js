const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const user = require("../controllers/userController.js");

router.route("/register").post(wrapAsync(user.createUser));

router.route("/login").post(wrapAsync(user.loginUser));

router.route("/logout").get(wrapAsync(user.logoutUser));

router.route("/:id").get(wrapAsync(user.getUser));


module.exports = router;