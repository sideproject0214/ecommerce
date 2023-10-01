const express = require("express");
const router = express.Router();
const { upload } = require("../../config/multerConfig");

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
  adminSearch,
} = require("../controller/adminController");
const { admin } = require("../middlewares/authMiddleware");

// @route    GET  api/admin
// @desc     Admin Summary
// @access   Private
router.route("/").get(adminSummary);
router.route("/user").get(adminUser);
router.route("/user/make").put(adminMakeUser);
router.route("/user/delete").put(adminDeleteAdminUser);
router.route("/user/initialize").get(adminInitializePassword);
router.route("/post").get(adminPost);
router.route("/post/delete").put(adminDeletePost);

router.route("/upload/modify/noimage").post(adminModifyNoImage);
router
  .route("/upload/modify/image")
  .put(upload.array("images"), adminModifyImage);
router.route("/order").get(adminOrderList);
router.route("/tracking").put(adminTrackingNum);
router.route("/review").get(adminReivew);
router.route("/review/delete").put(adminDeleteReview);

router.route("/search").get(adminSearch);

module.exports = router;
