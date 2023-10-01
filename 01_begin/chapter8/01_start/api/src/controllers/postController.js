const { Post, Review, sequelize } = require("../models");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { TZ_SEOUL } = require("../config/timezone");

// @route   GET /api/post/pagination/:pagination
// @desc    Get All Posts
// @access  Public

exports.getPostsPagination = asyncHandler(async (req, res) => {
  console.log(req.params, " query");

  if (req.params.pagination !== "NO POST") {
    try {
      const result = await Post.findAll({
        order: ["createdAt"],
        limit: 6,
        offset: req.params.pagination,
        // include: [{ model: Review }],
      });
      // 총 개수보다 offset이 크면 빈배열만 들어온다
      res.json(result);
    } catch (err) {
      res.status(404);
      throw new Error("게시물을 찾을 수 없음");
    }
  }
  res.status(404);
});

// @route   GET /api/post/search/:search
// @desc    Get All Posts
// @access  Public

exports.getSearchPosts = asyncHandler(async (req, res) => {
  const search = req.params.search;
  console.log(search, "search");
  try {
    if (search === "undefined") {
      const post = await Post.findAll({});
      return res.json({ data: post, search: true });
    } else {
      const post = await Post.findAll({
        where: {
          [Op.or]: [
            {
              name: { [Op.like]: `%${search}%` },
            },
            {
              brand: { [Op.like]: `%${search}%` },
            },
            {
              description: { [Op.like]: `%${search}%` },
            },
            {
              category: { [Op.like]: `%${search}%` },
            },
          ],
        },
      });
      return res.json({ data: post, search: true });
    }
  } catch (error) {
    console.log(error);
  }
});

// @route   GET /api/post/:uuid
// @desc    Get One Posts
// @access  Public ch4

exports.getOnePost = asyncHandler(async (req, res) => {
  console.log(req.params, req.query, "req.params");
  const postId = req.params.uuid;

  try {
    const post = await Post.findOne({
      where: { uuid: postId },
      include: [
        {
          model: Review,
          attributes: {
            include: [
              [
                sequelize.literal(
                  `"Reviews"."createdAt"::timestamptz AT TIME ZONE '${TZ_SEOUL}'`
                ),
                "createdAt",
              ],
            ],
          },
        },
      ],
      // raw: true,
    });
    console.log(post, "FindOne Result");
    return res.json(post);
  } catch (error) {
    console.log(error);
  }
});

// @route   GET /api/post/review
// @desc    create review
// @access  private ch7

exports.createReview = asyncHandler(async (req, res) => {
  let userName = "";
  console.log(req.body, "body");

  if (req.cookies.naver_token) {
    console.log(
      req.cookies.naver_token.NaverCookieToken.response.name,
      "createReview"
    );
    userName = req.cookies.naver_token.NaverCookieToken.response.name;
  } else if (req.cookies.kakao_token) {
    console.log(req.cookies.kakao_token.KakaoCookieToken.name, "createReview");
    userName = req.cookies.kakao_token.KakaoCookieToken.name;
  } else if (req.cookies.google_token) {
    console.log(
      req.cookies.google_token.GoogleCookieToken.name,
      "createReview"
    );
    userName = req.cookies.google_token.GoogleCookieToken.name;
  } else if (req.cookies.normal_token) {
    console.log(
      req.cookies.normal_token.NormalCookieToken.name,
      "createReview"
    );
    userName = req.cookies.normal_token.NormalCookieToken.name;
  } else {
    console.log("No Cookie");
  }
  try {
    const exist = await Review.findAll({
      where: {
        orderId: { [Op.eq]: req.body.orderId },
        productId: { [Op.eq]: req.body.productId },
        userId: { [Op.eq]: req.body.userId },
      },
    });

    if (exist.length > 0) {
      res.json({ msg: "더이상 작성할 수 없습니다" });
    } else {
      await Review.create({
        rating: req.body.rating,
        comments: req.body.comments,
        orderId: req.body.orderId,
        productId: req.body.productId,
        userId: req.body.userId,
        userName,
      });

      const reviewPost = await Post.findOne({
        where: { uuid: req.body.productId },
      });

      const updatePostReviewRating =
        Math.round(
          ((reviewPost.rating * reviewPost.numReviews +
            Number(req.body.rating)) *
            10) /
            (reviewPost.numReviews + 1)
        ) / 10;

      const updateResult = await Post.update(
        {
          rating: updatePostReviewRating,
          numReviews: reviewPost.numReviews + 1,
        },
        {
          where: { uuid: req.body.productId },
        }
      );

      const result = await sequelize.query(
        `update orders set "reviewCheck"=array_append("reviewCheck", '${req.body.productId}') where "orderId"='${req.body.orderId}';`
      );
      console.log(result, "sequelize query");
      console.log(updateResult, "updateResult");

      return res.json(`${req.body.productId}`);
    }
  } catch (error) {
    console.log(error);
  }
});

// @route    GET  api/post/review/open
// @desc     Get review
// @access   private ch7

exports.getReview = asyncHandler(async (req, res) => {
  try {
    console.log(req.query, " query");
    const result = await Review.findAll({
      // findorCreate
      where: {
        orderId: { [Op.eq]: req.query.orderId },
        productId: { [Op.eq]: req.query.productId },
        userId: { [Op.eq]: req.query.userId },
      },
    });
    console.log(result, "getReview");

    return res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// @route    PUT  api/post/review/update
// @desc     Update review
// @access   private ch7

exports.updateReview = asyncHandler(async (req, res) => {
  try {
    console.log(req.body, "updateReview333333333333");

    const result = await Review.update(
      { comments: req.body.comments, rating: req.body.rating },
      {
        where: {
          orderId: { [Op.eq]: req.body.orderId },
          productId: { [Op.eq]: req.body.productId },
          userId: { [Op.eq]: req.body.userId },
        },
      }
    );
    console.log(result, "update Review");

    const amount = await Review.count();

    const totalRating = await Post.findOne({
      where: { uuid: req.body.productId },
    });

    console.log(totalRating, "totalRating");

    const totalRatingNumber =
      Math.round(
        ((totalRating.rating * amount + Number(req.body.rating)) * 10) /
          (amount + 1)
      ) / 10;

    const updateResult = await Post.update(
      { rating: totalRatingNumber },
      { where: { uuid: req.body.productId } }
    );

    console.log(updateResult, "totalRating");

    return res.json({ msg: "update ok" });
  } catch (error) {
    console.log(error);
  }
});
