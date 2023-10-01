const express = require("express");
const router = express.Router();
const { upload } = require("../config/multerConfig");

const {
  adminSummary,
  adminUser,
  adminPost,
  adminModifyNoImage,
  adminModifyImage,
  adminMakeUser,
  adminDeleteAdminUser,
  adminInitializePassword,
  adminDeletePost,
  adminOrderList,
  adminTrackingNum,
  adminReivew,
  adminDeleteReview,
} = require("../controllers/adminController");

// @route    GET  api/admin
// @desc     Admin Summary
// @access   Private
router.route("/").get(adminSummary);

// @route    GET  api/admin/user
// @desc     Get Admin User
// @access   Private
router.route("/user").get(adminUser);

// @route    GET  api/admin/user/make
// @desc     Make Admin User
// @access   Private
router.route("/user/make").put(adminMakeUser);

// @route    GET  api/admin/user/delete
// @desc     Delete Admin User
// @access   Private
router.route("/user/delete").put(adminDeleteAdminUser);

// @route    GET  api/admin/user/initialize
// @desc     Make Admin User
// @access   Private
router.route("/user/initialize").put(adminInitializePassword);

// @route    GET  api/admin/post
// @desc     Get Admin Post
// @access   Private
router.route("/post").get(adminPost);

// @route    GET  api/admin/post/delete
// @desc     Delete Admin Post
// @access   Private
router.route("/post/delete").put(adminDeletePost);

// @route    GET  api/admin/upload/modify/noimage
// @desc     Get Admin Post
// @access   Private
router.route("/upload/modify/noimage").put(adminModifyNoImage);

// @route    GET  api/admin/upload/modify/image
// @desc     Get Admin Post
// @access   Private
router
  .route("/upload/modify/image")
  .post(upload.array("images"), adminModifyImage);

// @route    GET  api/admin/order
// @desc     Get Admin Order
// @access   Private
router.route("/order").get(adminOrderList);

// @route    GET  api/admin/tracking
// @desc     Put Admin trackingNumber
// @access   Private
router.route("/tracking").put(adminTrackingNum);

// @route    GET  api/admin/review
// @desc     Get Admin Review
// @access   Private
router.route("/review").get(adminReivew);

// @route    GET  api/admin/review/delete
// @desc     Get Admin Review Delete
// @access   Private
router.route("/review/delete").put(adminDeleteReview);

module.exports = router;
