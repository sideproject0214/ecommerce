const express = require("express");
const { submitOrder } = require("../controllers/orderController");

const router = express.Router();

// @route    GET  api/order/submit
// @desc     Get all Pay Request
// @access   Public ch6
router.route("/submit").post(submitOrder);

module.exports = router;
