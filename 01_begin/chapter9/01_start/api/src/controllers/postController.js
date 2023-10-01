const { Post, Review, sequelize } = require("../models");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { TZ_SEOUL } = require("../config/timezone"); // ch7
const { Web3Storage, getFilesFromPath } = require("web3.storage"); // ch8
const fs = require("fs"); //ch8

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

// Product Upload ch8

// web3.storage를 사용하기 위해서는 env값이 필요하다. 그렇기에 일단 파일을 받는다.
// 문제는 메모리에 올려놓을경우 대용량 파일이거나, 적은 파일이라도 많다면 운영에 지장을 줄 수 있으니
// 일단 스토리지에 저장하고 다시 보내는 방식을 취한다. 이 부분은 운영방법에 따라 선택지가 가릴 수 있다

// 일단 디스크에 쓰고 이를 업로드한다.

exports.uploadImage = asyncHandler(async (req, res) => {
  const token = process.env.WEB3_STORAGE;
  console.log(req.files, "createReview");
  console.log(JSON.stringify(req.body), "body content");
  // console.log(req, "body content");

  const storage = new Web3Storage({ token });

  console.log(token, "token");

  // web3 storage 작동방법
  let files = [];

  for (const file of Object.entries(req.files)) {
    const pathFiles = await getFilesFromPath(file[1].path);
    files.push(...pathFiles);
  }

  const onRootCidReady = (cid) => {
    console.log("uploading files with cid:", cid);
  };

  const totalSize = files
    .map((f) => f.size)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  let uploaded = 0;

  const onStoredChunk = (size) => {
    uploaded += size;
    const pct = (uploaded / totalSize) * 100;
    console.log(`Uploading... ${pct.toFixed(2)}% complete`); // 기본적으로 10mb 단위로 진행률이 표시된다
  };

  // console.log(files, "CID files");

  const filePath = files.reduce((acc, file) => {
    return [...acc, file.name];
  }, []);

  const cid = await storage.put(files, {
    name: req.body.title,
    onStoredChunk,
    onRootCidReady,
  });

  console.log("Content added with CID:", cid);

  // const image = `https://ipfs.io/ipfs/${cid}/${filePath[0]}`;
  // let thumbnail = [];

  // for (let i = 0; i < files.length; i++) {
  //   const result = `https://ipfs.io/ipfs/${cid}/${filePath[i]}`;
  //   thumbnail.push(result);
  // }
  const image = `https://w3s.link/ipfs/${cid}${filePath[0]}`;
  let thumbnail = [];

  for (let i = 0; i < files.length; i++) {
    const result = `https://w3s.link/ipfs/${cid}${filePath[i]}`;
    thumbnail.push(result);
  }

  // console.log(image, thumbnail, "Image added");

  const userUUID =
    req.cookies && req.cookies.naver_token
      ? req.cookies.naver_token.userUUID
      : req.cookies.kakao_token
      ? req.cookies.kakao_token.userUUID
      : req.cookies.google_token
      ? req.cookies.google_token.userUUID
      : req.cookies.normal_token.userUUID;

  console.log(userUUID, "userUUID");

  // const sizeArr = req.body.arrSizeEmpty;
  const sizeArr = req.body.arrSizeEmpty.split(",");
  console.log(sizeArr, "sizeArr");
  // const countInStock = req.body.arrStockEmpty;
  const countInStock = req.body.arrStockEmpty.split(",");
  console.log(countInStock, "countInStock");

  console.log(sizeArr, "sizeArr");
  console.log(countInStock, "countInStock");

  let sizeCountInStock = [];

  for (let i = 0; i < sizeArr.length; i++) {
    const result = [sizeArr[i], countInStock[i]];
    console.log(result, "result11");
    sizeCountInStock.push(result);
  }

  // console.log(sizeCountInStock, "sizeCountInStock");

  const objectSizeCountInStock = Object.fromEntries(sizeCountInStock);

  console.log(
    sizeCountInStock,
    "sizeCountInStock",
    objectSizeCountInStock,
    "objectSizeCountInStock"
  );

  const total = countInStock.reduce(
    (prev, curr) => Number(prev) + Number(curr),
    0
  );

  console.log(total, "total");

  const result = await Post.create({
    name: req.body.name,
    userId: userUUID,
    image: image,
    thumbnail: thumbnail,
    description: req.body.description,
    brand: req.body.brand,
    category: req.body.category,
    size: objectSizeCountInStock,
    price: req.body.price,
    countInStock: total,
    sale: req.body.sale,
    deliveryFee: req.body.deliveryFee,
  });
  console.log(result, "Post create");
  // ipfs://bafybeib2xlxxlwvflckwtxto7gcqp22hw2quxi6epwfvezpgtavnjogad4/11645312128422.png
  // https://ipfs.io/ipfs/bafybeib2xlxxlwvflckwtxto7gcqp22hw2quxi6epwfvezpgtavnjogad4/11645312128422.png

  // console.log(filePath, "filePath");
  // console.log(__dirname, __dirname.split("/"), "filePath2");
  console.log(`/${__dirname.split("/")[1]}/src/images/`, "filePath3");

  filePath.map((file, index) => {
    const imageFilePath = `/${__dirname.split("/")[1]}/src/images${file}`;
    fs.access(imageFilePath, fs.constants.F_OK, (err) => {
      if (err) return console.log(err);

      fs.unlink(imageFilePath, (err) => {
        err ? console.log(err) : console.log(`${imageFilePath} File Delete`);
      });
    });
  });

  return res.status(200).json(result);
});
