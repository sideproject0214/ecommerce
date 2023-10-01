const { Order, User, Post, Review, sequelize } = require("../models");
const { Web3Storage, getFilesFromPath } = require("web3.storage");
const fs = require("fs");
const { Op } = require("sequelize");
const { trackingLogenByNumber } = require("../utils/webscrapping");
const asyncHandler = require("express-async-handler");
const { userUUIDExport } = require("../utils/userUUIDExport");
const { TZ_SEOUL } = require("../config/timezone");

// @route    Get  api/amdin
// @desc     Admin Summary
// @access   Private
exports.adminSummary = asyncHandler(async (req, res) => {
  // console.log(req, "adminSummary");
  const allOrders = await Order.findAll();
  const userCount = await User.count();
  const postCount = await Post.count();
  const reviewCount = await Review.findAll();
  res.json({ allOrders, userCount, postCount, reviewCount });
});

// @route    GET  api/admin/user
// @desc     Get Admin User
// @access   Private
exports.adminUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.query, "alluser");

    console.log(typeof req.query.search);
    const result1 = await User.findAll({
      limit: req.query.pagination,
      offset: req.query.setPage,
      where: {
        [Op.or]: [
          {
            name: { [Op.like]: `%${req.query.search}%` },
          },
          {
            email: { [Op.like]: `%${req.query.search}%` },
          },
        ],
      },
      attributes: {
        include: [
          [
            sequelize.literal(
              `"User"."createdAt"::timestamptz AT TIME ZONE '${TZ_SEOUL}'`
            ),
            "createdAt",
          ],
        ],
      },
    });
    const result2 = await User.count({
      where: {
        [Op.or]: [
          {
            name: { [Op.like]: `%${req.query.search}%` },
          },
          {
            email: { [Op.like]: `%${req.query.search}%` },
          },
        ],
      },
    });

    const result3 = result1.concat({ id: result2 });

    res.json(result3);
  } catch (error) {
    console.log(error);
  }
});

// @route    GET  api/admin/user/make
// @desc     Make Admin User
// @access   Private
exports.adminMakeUser = asyncHandler(async (req, res) => {
  console.log(req.body, "update");
  try {
    const result = await User.update(
      {
        isAdmin: !req.body.isAdmin,
      },
      {
        // order: ["createdAt"],
        where: {
          uuid: req.body.uuid,
        },
      }
    );
    console.log(result);
    res.json(req.body.uuid);
  } catch (error) {
    res.json(error);
  }
});

// @route    GET  api/admin/user/delete
// @desc     Delete Admin User
// @access   Private
exports.adminDeleteAdminUser = asyncHandler(async (req, res) => {
  console.log(req.body, "delete");

  await Promise.all(
    req.body.map(async (value, key) => {
      await User.destroy({ where: { uuid: value } });
      // console.log(value);
    })
  );
  res.json({
    msg: "DELETE_USER_SUCCESS",
    count: `${req.body.length}`,
    ids: req.body,
  });
});

// @route    GET  api/admin/initialize
// @desc     Make Admin User
// @access   Private
exports.adminInitializePassword = asyncHandler(async (req, res) => {
  const { uuid } = req.body;
  // console.log(uuid, "ini");

  await User.update(
    {
      password: "123",
    },
    { where: { uuid: uuid }, individualHooks: true }
  );

  res.json({ msg: "INITIALIZE SUCCESS" });
});

exports.adminPost = asyncHandler(async (req, res) => {
  console.log(req.query, "adminPost");
  try {
    const result1 = await Post.findAll({
      order: ["createdAt"],
      limit: req.query.pagination,
      offset: req.query.setPage,
      where: {
        [Op.or]: [
          {
            name: { [Op.like]: `%${req.query.search}%` },
          },
          {
            brand: { [Op.like]: `%${req.query.search}%` },
          },
          {
            description: { [Op.like]: `%${req.query.search}%` },
          },
          {
            category: { [Op.like]: `%${req.query.search}%` },
          },
        ],
      },
    });
    const result2 = await Post.count({
      where: {
        [Op.or]: [
          {
            name: { [Op.like]: `%${req.query.search}%` },
          },
          {
            brand: { [Op.like]: `%${req.query.search}%` },
          },
          {
            description: { [Op.like]: `%${req.query.search}%` },
          },
          {
            category: { [Op.like]: `%${req.query.search}%` },
          },
        ],
      },
    });
    const result3 = result1.concat({ id: result2 });
    console.log(result3, "result1");
    res.json(result3);
  } catch (error) {
    console.log(error);
  }
});

// @route    GET  api/admin/post/delete
// @desc     Delete Admin Post
// @access   Private
exports.adminDeletePost = asyncHandler(async (req, res) => {
  await Promise.all(
    req.body.map(async (value, key) => {
      await Post.destroy({ where: { uuid: value } });
      // console.log(value);
    })
  );
  res.json({
    msg: "DELETE_POST_SUCCESS",
    count: `${req.body.length}`,
    ids: req.body,
  });
});

// @route    GET  api/admin/upload/modify/noimage
// @desc     Get Admin Post
// @access   Private
exports.adminModifyNoImage = asyncHandler(async (req, res) => {
  console.log(JSON.stringify(req.body), "body content");

  const userUUID = userUUIDExport(req.cookies);

  console.log(userUUID, "userUUID");

  const regexSize = /size/;
  const filteredSize = Object.entries(req.body.form).filter((el) =>
    regexSize.test(el)
  );

  const regexStock = /stock/;
  const filteredStock = Object.entries(req.body.form).filter((el) =>
    regexStock.test(el)
  );
  console.log(filteredStock, "filteredStock");

  const sizeArr = filteredSize.map((value, index) => value[1]);

  console.log(sizeArr, "sizeArr");

  const countInStock = filteredStock.map((value, index) => value[1]);
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

  const result = await Post.update(
    {
      name: req.body.form.name,
      userId: userUUID,
      description: req.body.form.description,
      brand: req.body.form.brand,
      category: req.body.form.category,
      size: objectSizeCountInStock,
      price: req.body.form.price,
      countInStock: total,
      sale: req.body.form.sale,
      deliveryFee: req.body.form.deliveryFee,
      thumbnail: req.body.thumbnail,
    },
    { where: { uuid: req.body.uuid } }
  );
  console.log(result, "Post create");

  return res.status(200).json({ uuid: req.body.uuid });
});

// @route    GET  api/admin/upload/modify/image
// @desc     Get Admin Post
// @access   Private
exports.adminModifyImage = asyncHandler(async (req, res) => {
  const token = process.env.WEB3_STORAGE;
  // console.log(JSON.stringify(req.body), "body content");
  // console.log(req, "body content");

  const storage = new Web3Storage({ token });

  // console.log(token, "token");

  console.log(req.files, "req.files");

  // web3 storage 작동방법
  let files = [];

  try {
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

    console.log(filePath, "filePath");

    const cid = await storage.put(files, {
      name: req.body.title,
      onStoredChunk,
      onRootCidReady,
    });

    console.log("Content added with CID:", cid);

    let image = "";

    if (req.body.image === "All Delete") {
      image = `https://w3s.link/ipfs/${cid}${filePath[0]}`;
    } else {
      image = req.body.image;
    }

    let thumbnail = [];

    const newThumbnailArr = req.body.thumbnail.split(",");
    console.log(newThumbnailArr, "newThumbnailArr");

    if (
      req.body.image === "All Delete" &&
      req.body.thumbnail === "All Delete"
    ) {
      for (let i = 0; i < files.length; i++) {
        const result = `https://w3s.link/ipfs/${cid}${filePath[i]}`;
        thumbnail.push(result);
      }
    } else if (
      req.body.image !== "All Delete" &&
      req.body.thumbnail === "All Delete"
    ) {
      thumbnail.push(req.body.image);
      for (let i = 0; i < files.length; i++) {
        const result = `https://w3s.link/ipfs/${cid}${filePath[i]}`;
        thumbnail.push(result);
      }
    } else if (
      req.body.image === "All Delete" &&
      req.body.thumbnail !== "All Delete"
    ) {
      thumbnail = [image, ...newThumbnailArr];

      for (let i = 1; i < files.length; i++) {
        const result = `https://w3s.link/ipfs/${cid}${filePath[i]}`;
        thumbnail.push(result);
      }
    } else {
      console.log("last");

      thumbnail = [image, ...newThumbnailArr];

      if (files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
          const result = `https://w3s.link/ipfs/${cid}${filePath[i]}`;
          thumbnail.push(result);
        }
      }
    }
    console.log(image, thumbnail, "image push");

    // console.log(image, thumbnail, "Image added");

    const userUUID = userUUIDExport(req.cookies);

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

    const result = await Post.update(
      {
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
      },
      { where: { uuid: req.body.uuid } }
    );
    console.log(result, "Post create");

    filePath.map((file, index) => {
      const imageFilePath = `/${__dirname.split("/")[1]}/${
        __dirname.split("/")[2]
      }/images${file}`;
      fs.access(imageFilePath, fs.constants.F_OK, (err) => {
        if (err) return console.log(err);

        fs.unlink(imageFilePath, (err) => {
          err ? console.log(err) : console.log(`${imageFilePath} File Delete`);
        });
      });
    });

    return res.status(200).json({ uuid: req.body.uuid });
  } catch (error) {
    console.log(error, "adminModifyImage Delete Error");
  }
});

// @route    GET  api/admin/order
// @desc     Get Admin Order
// @access   Private
exports.adminOrderList = asyncHandler(async (req, res) => {
  console.log(req.query, req.params, "adminOrderList");
  const today = new Date();
  try {
    const searchFunc = async () => {
      if (req.query.search === " ") {
        const result = await Order.findAll({
          where: {
            createdAt: {
              [Op.gt]: new Date(
                new Date().setDate(
                  today.getDate() - (Number(req.query.pages) + 1) * 30
                )
              ),
              [Op.lte]: new Date(
                new Date().setDate(
                  today.getDate() - Number(req.query.pages) * 30
                )
              ),
            },
          },
          attributes: {
            include: [
              [
                sequelize.literal(
                  `"Order"."createdAt"::timestamptz AT TIME ZONE '${TZ_SEOUL}'`
                ),
                "createdAt",
              ],
            ],
          },
        });
        return result;
      } else {
        console.log("search");
        const result = await Order.findAll({
          where: {
            [Op.or]: [
              {
                orderId: { [Op.like]: `%${req.query.search}%` },
              },
              {
                userName: { [Op.like]: `%${req.query.search}%` },
              },
            ],
            createdAt: {
              [Op.gt]: new Date(
                new Date().setDate(
                  today.getDate() - (Number(req.query.pages) + 1) * 30
                )
              ),
              [Op.lte]: new Date(
                new Date().setDate(
                  today.getDate() - Number(req.query.pages) * 30
                )
              ),
            },
          },
          attributes: {
            include: [
              [
                sequelize.literal(
                  `"Order"."createdAt"::timestamptz AT TIME ZONE '${TZ_SEOUL}'`
                ),
                "createdAt",
              ],
            ],
          },
        });
        return result;
      }
    };

    const myOrder = await searchFunc();
    // console.log(myOrder, "myOrder");

    const myTrackingNumberFiltered = myOrder.map(
      (Order) => Order.dataValues.trackingNumber
    );
    const myOrderIdFiltered = myOrder.map((Order) => Order.dataValues.orderId);

    // console.log(myOrderIdFiltered, "myOrderIdFiltered");

    const myOrderFilteredResult = await Promise.all(
      myTrackingNumberFiltered.map(async (x) => {
        if (x !== null) {
          const result = await trackingLogenByNumber(x);
          return result;
        }
      })
    );

    // console.log(myOrderFilteredResult, "<myOrderFilteredResult>");

    let orderUpdateArray = [];

    const updateMyOrder = async () => {
      await Promise.all(
        myOrderFilteredResult.map(async (x, i) => {
          if (x === undefined) {
            orderUpdateArray.push(myOrder[i]);
          } else {
            await Order.update(
              {
                trackingContents: x,
              },
              {
                where: { orderId: myOrderIdFiltered[i] },
                returning: true,
                plain: true,
              }
            );
            const updateResult = await Order.findOne({
              where: { orderId: myOrderIdFiltered[i] },

              include: [{ model: User }],
            });

            orderUpdateArray.push(updateResult);
            console.log("update complete !");
          }
        })
      );
    };

    await updateMyOrder();

    // console.log(orderUpdateArray, "orderUpdateArray1111");
    const sortResult = orderUpdateArray.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    res.json(sortResult);
  } catch (e) {
    console.log(e);
  }
});

// @route    GET  api/admin/tracking
// @desc     Put Admin trackingNumber
// @access   Private
exports.adminTrackingNum = asyncHandler(async (req, res) => {
  try {
    console.log("adminTrackingNum", req.body);
    const orderId = Object.keys(req.body)[0].split("-")[0];
    const trackingNumber = Object.values(req.body);

    // console.log(orderId, Array.from(filteredtrackingNumber));
    await Order.update(
      {
        trackingNumber: trackingNumber,
      },
      {
        where: {
          orderId: orderId,
        },
      }
    );
    res.json(200);
  } catch (e) {
    console.log(e);
  }
});

// @route    GET  api/admin/review
// @desc     Get Admin Review
// @access   Private
exports.adminReivew = asyncHandler(async (req, res) => {
  console.log(req.query.search, "adminReivew");
  try {
    const result1 = await Review.findAll({
      limit: req.query.pagination,
      offset: req.query.setPage,
      include: [{ model: Post }],
      where: {
        [Op.or]: [
          {
            comments: { [Op.like]: `%${req.query.search}%` },
          },
          {
            userName: { [Op.like]: `%${req.query.search}%` },
          },
          {
            "$Post.name$": { [Op.like]: `%${req.query.search}%` },
          },

          {
            rating: {
              [Op.gte]: Number(req.query.search),
              [Op.lt]: Number(req.query.search) + 1,
            },
          },
        ],
      },
      attributes: {
        include: [
          [
            sequelize.literal(
              `"Review"."createdAt"::timestamptz AT TIME ZONE '${TZ_SEOUL}'`
            ),
            "createdAt",
          ],
        ],
        order: ["createdAt", "DESC"],
      },
    });

    const result2 = await Review.count({
      include: [{ model: Post }],
      where: {
        [Op.or]: [
          {
            comments: { [Op.like]: `%${req.query.search}%` },
          },
          {
            userName: { [Op.like]: `%${req.query.search}%` },
          },
          {
            "$Post.name$": { [Op.like]: `%${req.query.search}%` },
          },

          {
            rating: {
              [Op.gte]: Number(req.query.search),
              [Op.lt]: Number(req.query.search) + 1,
            },
          },
        ],
      },
    });

    const result3 = result1.concat({ uuid: result2 });
    console.log(result1, result2, result3, "adminReivew");

    res.json(result3);
  } catch (error) {
    console.log(error);
  }
});

// @route    GET  api/admin/review/delete
// @desc     Get Admin Review Delete
// @access   Private
exports.adminDeleteReview = asyncHandler(async (req, res) => {
  const { id, deleteRatingNum, productId } = req.body;
  console.log(req.body.data, "delete");

  await Promise.all(
    productId.map(async (value, index) => {
      console.log(value.split("/")[0]);
      await Review.destroy({ where: { id: Number(id[index]) } });

      const { rating, numReviews } = await Post.findOne({
        where: { uuid: value.split("/")[0] },
        raw: true,
      });
      console.log(rating, numReviews);

      const updateRating =
        Math.round(
          ((rating * numReviews - deleteRatingNum[index]) * 10) /
            (numReviews - 1)
        ) / 10;

      await Post.update(
        { rating: updateRating, numReviews: numReviews - 1 },

        { where: { uuid: value.split("/")[0] } }
      );

      await sequelize.query(
        `update orders set "reviewCheck" = array_remove("reviewCheck", '${
          value.split("/")[0]
        }') where "orderId"='${value.split("/")[1]}';`
      );

      return;
    })
  );

  res.json({ count: deleteRatingNum.length });
});
