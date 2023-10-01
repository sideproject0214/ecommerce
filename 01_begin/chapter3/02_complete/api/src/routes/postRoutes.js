const express = require("express");
const router = express.Router();
const {
  getPostsPagination,
  getSearchPosts,
} = require("../controllers/postController");

// @route    GET  api/post/pagination/:pagination
// @desc     Get all Post By Pagination
// @access   Public
router.route("/pagination/:pagination").get(getPostsPagination);

// @route    GET  api/post/search/:search
// @desc     Get all Post By search
// @access   Public
router.route("/search/:search").get(getSearchPosts);

module.exports = router;
