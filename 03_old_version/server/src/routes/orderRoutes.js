const express = require("express");
const { submitOrder, getMyshipping } = require("../controller/orderController");
const { getCookieAuth } = require("../utils/getCookie");
const router = express.Router();

// @route    GET  api/order/submit
// @desc     Get all Pay Request
// @access   Public
router.route("/submit").post(submitOrder);

// @route    GET  api/order/shipping
// @desc     Get all Pay Request
// @access   Public
router.route("/shipping").get(getCookieAuth, getMyshipping);

// router.route("/submit").get(submitOrder);

// router.route("/redirect/success").get((req, res) => {
//   console.log("Pay Success", req.query);
//   return res.json("success").redirect("/pay/redirect/success");
// });

module.exports = router;
