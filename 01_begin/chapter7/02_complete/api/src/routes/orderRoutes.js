const express = require("express");
const {
  submitOrder,
  getMyshipping,
} = require("../controllers/orderController");
const { getCookieAuth } = require("../utils/getCookie");

const router = express.Router();

// @route    GET  api/order/submit
// @desc     Get all Pay Request
// @access   Public ch6
router.route("/submit").post(submitOrder);

// @route    GET  api/order/shipping
// @desc     Get all Pay Request
// @access   Public ch7
router.route("/shipping").get(getCookieAuth, getMyshipping);

module.exports = router;
