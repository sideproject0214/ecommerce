const express = require("express");
const {
  postKakaoPay,
  getSuccess,
  getFailure,
  getCancel,
  postPayCancel,
} = require("../controllers/payController");
const router = express.Router();

// @route    GET  api/pay/kakao
// @desc     Get all Pay Request
// @access   Public
router.route("/kakao").get(postKakaoPay);
// router.route("/redirect/success").get((req, res) => {
//   console.log("Pay Success", req.query);
//   return res.json("success").redirect("/pay/redirect/success");
// });

// @route    GET  api/pay/kakao/redirect/success
// @desc     POST  approve
// @access   Public
router.route("/kakao/redirect/success").get(getSuccess);

// @route    GET  api/pay/kakao/redirect/failure
// @desc     POST  approve
// @access   Public
router.route("/kakao/redirect/failure").get(getFailure);

// @route    GET  api/pay/kakao/redirect/cancel
// @desc     POST  approve
// @access   Public
router.route("/kakao/redirect/cancel").get(getCancel);

// @route    POST  api/pay/kakao/payment/cancel
// @desc     POST  approve
// @access   Public
router.route("/kakao/payment/cancel").post(postPayCancel);

// @route    POST  api/pay/kakao/approve (안쓰는 코드)
// @desc     POST  approve
// @access   Public
// router.route("/kakao/approve").post(postKakaoPayApprove);

module.exports = router;
