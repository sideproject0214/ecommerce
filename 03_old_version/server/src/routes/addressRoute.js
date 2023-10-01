const express = require("express");
const router = express.Router();
const {
  defaultAddress,
  latestAddress,
} = require("../controller/addressController");

// @route    GET  api/address/default
// @desc     default Address
// @access   Public
router.route("/default").get(defaultAddress);

// @route    GET  api/address/latest
// @desc     default Address
// @access   Public
router.route("/latest").get(latestAddress);

// @route    POST  api/auth/login

module.exports = router;
