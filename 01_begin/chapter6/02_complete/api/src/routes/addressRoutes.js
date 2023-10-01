const express = require("express");
const router = express.Router();
const {
  defaultAddress,
  latestAddress,
} = require("../controllers/addressController");

const { auth } = require("../middleware/authMiddleware");

// @route    GET  api/address/default
// @desc     default Address
// @access   Private
router.route("/default", auth).get(defaultAddress);

// @route    GET  api/address/latest
// @desc     latest Address
// @access   Private
router.route("/latest", auth).get(latestAddress);

module.exports = router;
