const { Post, Review } = require("../models");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

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
      include: {
        model: Review,
      },
      // raw: true,
    });
    console.log(post, "FindOne Result");
    return res.json(post);
  } catch (error) {
    console.log(error);
  }
});
