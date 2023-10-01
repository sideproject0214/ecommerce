const express = require("express");
const { upload } = require("../../config/multerConfig");
const router = express.Router();
const {
  getProductOne,
  createReview,
  reviewCheck,
  getReview,
  updateReview,
  uploadImage,

  ModifyNoImage,
  ModifyImage,
  getSearchProduct,

  getProductPagination,
} = require("../controller/productController");

/* 초기 라우터 */
// router.route("/").get((req, res) => {
//   res.send("hi");
// });

// @route    GET  api/product/all
// @desc     Get all Product
// @access   Public, 초기에만 쓰인 라우트, 인피니티 스크롤 적용하기 전까지만 사용됨
// router.route("/all").get(getProductAll);

// @route    GET  api/product/:id
// @desc     Get all Product
// @access   Public
router.route("/:id").get(getProductOne);

// @route    GET  api/product/skip/:number
// @desc     Get all Product
// @access   Public
router.route("/pagination/:pagination").get(getProductPagination);

// @route    GET  api/product/search/:search
// @desc     Get all Product
// @access   Public
router.route("/search/:search").get(getSearchProduct);

// @route    POST  api/product/review
// @desc     Post review
// @access   private

router.route("/review").post(createReview);

// @route    GET  api/product/review/open
// @desc     Get review
// @access   private
router.route("/review/open").get(getReview);

// @route    PUT  api/product/review/update
// @desc     Update review
// @access   private
router.route("/review/update").put(updateReview);

// @route    POST  api/product/upload
// @desc     Post Upload
// @access   private
router.route("/upload").post(upload.array("images"), uploadImage);

module.exports = router;
