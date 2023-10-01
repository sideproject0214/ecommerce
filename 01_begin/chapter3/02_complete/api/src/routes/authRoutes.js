const express = require("express");
const {
  signup,
  verify,
  loginCheck,
  login,
  pwChange,
  logout,
  pwAddressCheck,
  makeChange,
} = require("../controllers/authController");
const {
  googleLogin,
  googleLoginCallback,
} = require("../controllers/authGoogleController");
const {
  kakaoLogin,
  kakaoLoginCallback,
} = require("../controllers/authKakaoController");
const {
  naverLogin,
  naverLoginCallback,
} = require("../controllers/authNaverController");

const router = express.Router();

// @route    POST  api/auth/signup
// @desc     Signup
// @access   Public
router.route("/signup").post(signup);

// @route    POST  api/auth/verify
// @desc     Email Token Verify
// @access   Public

router.route("/verify").get(verify);

// @route    GET  api/auth/logincheck
// @desc     login check by cookie
// @access   Public

router.route("/logincheck").get(loginCheck);

// @route    POST  api/auth/login
// @desc     Normal Login by the Id, Pw
// @access   Public

router.route("/login").post(login);

// @route    PUT  api/auth/pwchange
// @desc     change password
// @access   Public
router.route("/pwchange").put(pwChange);

// @route    PUT  api/auth/pwchange/makechange
// @desc     change password
// @access   Public
router.route("/pwchange/makechange").put(makeChange);

// @route    PUT  api/auth/pwchange/check
// @desc     check pwaddress
// @access   Public
router.route("/pwchange/check").get(pwAddressCheck);

// @route    GET  api/auth/logout
// @desc     original login
// @access   Public
router.route("/logout").get(logout);

// @route    GET  api/auth/naver, api/auth/navercallback
// @desc     Naver login
// @access   Public
router.route("/naver").get(naverLogin);
router.route("/navercallback").get(naverLoginCallback);

// @route    GET  api/auth/kakao, api/auth/kakaocallback
// @desc     original login
// @access   Public

router.route("/kakao").get(kakaoLogin);
router.route("/kakaocallback").get(kakaoLoginCallback);

// @route    GET  api/auth/google, api/auth/googlecallback
// @desc     original login
// @access   Public

router.route("/google").get(googleLogin);
router.route("/googlecallback").get(googleLoginCallback);

module.exports = router;
