const express = require("express");
const router = express.Router();
const {
  getPostsPagination,
  getSearchPosts,
  getOnePost,
  createReview,
  getReview,
  updateReview,
  uploadImage,
} = require("../controllers/postController");
const { upload, folder } = require("../config/multerConfig"); // ch8

// @route    GET  api/post/pagination/:pagination
// @desc     Get all Post By Pagination
// @access   Public
router.route("/pagination/:pagination").get(getPostsPagination);

// @route    GET  api/post/search/:search
// @desc     Get all Post By search
// @access   Public
router.route("/search/:search").get(getSearchPosts);

// @route   GET api/post/:uuid
// @desc    Get One Posts
// @access  Public ch4
router.route("/:uuid").get(getOnePost);

// @route    POST  api/post/review
// @desc     Post review
// @access   private ch7
router.route("/review").post(createReview);

// @route    GET  api/post/review/open
// @desc     Get review
// @access   private ch7
router.route("/review/open").get(getReview);

// @route    PUT  api/post/review/update
// @desc     Update review
// @access   private ch7
router.route("/review/update").put(updateReview);

// @route    POST  api/post/upload
// @desc     Post Upload
// @access   private ch8
router.route("/upload").post(folder, upload.array("images"), uploadImage);

module.exports = router;
