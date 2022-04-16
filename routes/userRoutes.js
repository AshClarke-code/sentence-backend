const express = require('express');
const authController = require('./../controllers/authController');


const router = express.Router({ mergeParams: true});

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/is-logged-in").get(authController.isLoggedIn);



module.exports = router;