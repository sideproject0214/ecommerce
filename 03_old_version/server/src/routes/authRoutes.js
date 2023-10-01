const express = require("express");
const router = express.Router();
const {
  login,
  refresh,
  protected,
  loginCheck,
  logout,
  signup,
  verify,
} = require("../controller/auth/authController");
const {
  googleLogin,
  googleLoginCallback,
} = require("../controller/auth/googleController");
const {
  kakaoLogin,
  kakaoLoginCallback,
} = require("../controller/auth/kakaoController");
const {
  naverLogin,
  naverLoginCallback,
} = require("../controller/auth/naverController");
const { isLoggedIn, auth } = require("../middlewares/authMiddleware");

/* 초기 라우터 */
// router.route("/").get((req, res) => {
//   res.send("hi");
// });

// @route    POST  api/auth/login
// @desc     original login
// @access   Public
router.route("/login").post(login);

// @route    POST  api/auth/logout
// @desc     original login
// @access   Public
router.route("/logout").get(logout);

// @route    GET  api/auth/logincheck
// @desc     login check
// @access   Public
router.route("/logincheck").get(loginCheck);

// @route    GET  api/auth/naver
// @desc     original login
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

// @route    POST  api/auth/refresh
// @desc     accessToken refresh
// @access   private
router.route("/refresh").post(refresh);

// @route    POST  api/auth/protected
// @desc     accessToken refresh
// @access   private
router.route("/protected").post(auth, protected);

// @route    POST  api/auth/signup
// @desc     signup
// @access   Public

router.route("/signup").post(signup);

// @route    POST  api/auth/verify/:token
// @desc     signup
// @access   Public

router.route("/verify").get(verify);

module.exports = router;
