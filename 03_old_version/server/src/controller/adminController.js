const { Order, User, Post, Review, sequelize } = require("../../models");
const bcrypt = require("bcryptjs");
const { Web3Storage, getFilesFromPath } = require("web3.storage");
const fs = require("fs");
const { Op } = require("sequelize");
const { trackingLogenByNumber } = require("../utils/webscrapping");

// @route    POST  api/order/submit
// @desc     kakao pay
// @access   Public

exports.adminSummary = async (req, res) => {
  console.log(req, "adminSummary");
  const allOrders = await Order.findAll();
  const userCount = await User.count();
  const productCount = await Post.count();
  const reviewCount = await Review.findAll();
  res.json({
    allOrders,
    userCount,
    productCount,
    reviewCount,
  });
};

exports.adminUser = async (req, res) => {
  try {
    console.log(req, "alluser");
    const allUser = await User.findAll({
      order: ["createdAt"],
      limit: req.query.pagination,
      offset: req.query.setPage,
    });
    res.json(allUser);
  } catch (error) {
    console.log(error);
  }
};

exports.adminMakeUser = async (req, res) => {
  console.log(req.body.user, "update");
  try {
    const result = await User.update(
      {
        isAdmin: !req.body.user.isAdmin,
      },
      {
        where: {
          uuid: req.body.user.uuid,
        },
      }
    );
    console.log(result);
    // res.json({ [req.body.userUUID]: { isAdmin: true } });
    res.json(req.body.user.uuid);
  } catch (error) {
    res.json(error);
  }
};

exports.adminDeleteAdminUser = async (req, res) => {
  const { data } = req.body;
  // console.log(req.body.data, "delete");

  await Promise.all(
    data.map(async (value, key) => {
      await User.destroy({ where: { uuid: value } });
      // console.log(value);
    })
  );
  res.json({ msg: "DELETE_USER_SUCCESS", count: `${data.length}`, data });
};

exports.adminInitializePassword = async (req, res) => {
  const { uuid } = req.query;
  console.log(uuid, "ini");

  await User.update(
    {
      password: "123",
    },
    { where: { uuid: req.query.uuid }, individualHooks: true }
  );
  // 여기서 hooks를 안쓰는 것은 모든 업데이트마다 작동하게 되기에, 부담이 크게 된다.
  // 그래서 기본적으로 beforeUpdate의 경우 individualHooks: true를 명시적으로 적어줄때만 작동한다
  // 우리는 업데이트를 패스워드 바꿀때만 쓸 것이기에 훅스를 적용시킨다

  // const pw = "123";
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(pw, salt);

  // await User.update(
  //   {
  //     password: hashedPassword,
  //   },
  //   { where: { uuid: req.query.uuid } }
  // );

  // console.log(result, "result update");
  res.json({ msg: "INITIALIZE SUCCESS" });
};

exports.adminPost = async (req, res) => {
  console.log(req.query);
  try {
    const count = await Post.count();
    const result = await Post.findAll({
      order: ["createdAt"],
      limit: req.query.pagination,
      offset: req.query.setPage,
    });
    // console.log(result, "result");
    res.json({ result, count });
  } catch (error) {
    console.log(error);
  }
};

exports.adminDeletePost = async (req, res) => {
  const { data } = req.body;
  console.log(req.body.data, "delete");

  await Promise.all(
    data.map(async (value, key) => {
      await Post.destroy({ where: { uuid: value } });
      // console.log(value);
    })
  );
  res.json({ msg: "DELETE_POST_SUCCESS", count: `${data.length}`, data });
};

exports.adminModifyNoImage = async (req, res) => {
  console.log(JSON.stringify(req.body), "body content");

  const userUUID =
    req.cookies && req.cookies.naver_token
      ? req.cookies.naver_token.userUUID
      : req.cookies.kakao_token
      ? req.cookies.kakao_token.userUUID
      : req.cookies.google_token
      ? req.cookies.google_token.userUUID
      : "";

  console.log(userUUID, "userUUID");

  // // const sizeArr = req.body.arrSizeEmpty;
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
  // const countInStock = req.body.form.arrStockEmpty;

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
};

exports.adminModifyImage = async (req, res) => {
  const token = process.env.WEB3_STORAGE;
  console.log(JSON.stringify(req.body), "body content");
  console.log(req, "body content");
  // if (req.files === undefined) {
  //   console.log("req files undefined");
  // } else {
  //   console.log(req.files, "createReview");
  // }
  const storage = new Web3Storage({ token });

  // console.log(token, "token");

  console.log(req.files, "req.files");
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

  let image = "";

  if (req.body.image === "All Delete") {
    image = `https://ipfs.io/ipfs/${cid}/${filePath[0]}`;
  } else {
    image = req.body.image;
  }

  let thumbnail = [];

  const newThumbnailArr = req.body.thumbnail.split(",");
  console.log(newThumbnailArr, "newThumbnailArr");

  if (req.body.image === "All Delete" && req.body.thumbnail === "All Delete") {
    for (let i = 0; i < files.length; i++) {
      const result = `https://ipfs.io/ipfs/${cid}/${filePath[i]}`;
      thumbnail.push(result);
    }
  } else if (
    req.body.image !== "All Delete" &&
    req.body.thumbnail === "All Delete"
  ) {
    thumbnail.push(req.body.image);
    for (let i = 0; i < files.length; i++) {
      const result = `https://ipfs.io/ipfs/${cid}/${filePath[i]}`;
      thumbnail.push(result);
    }
  } else if (
    req.body.image === "All Delete" &&
    req.body.thumbnail !== "All Delete"
  ) {
    // newThumbnailArr.length === 1
    //   ? thumbnail = [image, ...newThumbnailArr]
    //   : thumbnail.concat(image, newThumbnailArr);

    thumbnail = [image, ...newThumbnailArr];

    for (let i = 1; i < files.length; i++) {
      const result = `https://ipfs.io/ipfs/${cid}/${filePath[i]}`;
      thumbnail.push(result);
    }
  } else {
    console.log("last");
    // newThumbnailArr.length === 1
    //   ? thumbnail.concat(image, newThumbnailArr)
    //   : thumbnail.concat(image, newThumbnailArr);
    thumbnail = [image, ...newThumbnailArr];
    // for (let i = 1 + req.body.thumbnail.length; i < files.length; i++) {
    //   const result = `https://ipfs.io/ipfs/${cid}/${filePath[i]}`;
    //   thumbnail.push(result);
    // }
    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) {
        const result = `https://ipfs.io/ipfs/${cid}/${filePath[i]}`;
        thumbnail.push(result);
      }
    }
  }
  console.log(image, thumbnail, "image push");

  // console.log(image, thumbnail, "Image added");

  const userUUID =
    req.cookies && req.cookies.naver_token
      ? req.cookies.naver_token.userUUID
      : req.cookies.kakao_token
      ? req.cookies.kakao_token.userUUID
      : req.cookies.google_token
      ? req.cookies.google_token.userUUID
      : "";

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
  console.log(
    thumbnail.filter((v, i) => i !== 0),
    "thumnail"
  );
  console.log(
    thumbnail.filter((v, i) => i === 0),
    "thumnail"
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
  // ipfs://bafybeib2xlxxlwvflckwtxto7gcqp22hw2quxi6epwfvezpgtavnjogad4/11645312128422.png
  // https://ipfs.io/ipfs/bafybeib2xlxxlwvflckwtxto7gcqp22hw2quxi6epwfvezpgtavnjogad4/11645312128422.png

  // console.log(filePath, "filePath");
  // console.log(__dirname, __dirname.split("/"), "filePath2");
  // console.log(
  //   `/${__dirname.split("/")[1]}/${__dirname.split("/")[2]}/images/`,
  //   "filePath3"
  // );

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
};

exports.adminOrderList = async (req, res) => {
  try {
    const myOrder = await Order.findAll({
      where: {
        createdAt: {
          [Op.lte]: new Date(
            new Date() - req.query.pages * 30 * 24 * 60 * 60 * 1000
          ),
          [Op.gt]: new Date(
            new Date() - (req.query.pages + 1) * 30 * 24 * 60 * 60 * 1000
          ),
        },
      },

      // include: [{ model: User }],
    });

    console.log(myOrder, "myOrder important");
    // console.log(JSON.stringify(myOrder), "myOrder important");

    const myTrackingNumberFiltered = myOrder.map(
      (Order) => Order.dataValues.trackingNumber
    );
    const myOrderIdFiltered = myOrder.map((Order) => Order.dataValues.orderId);

    console.log(myOrderIdFiltered, "myOrderIdFiltered");

    // **** 여기는 "배송완료 필터로 조회하는 코드"
    // const filterResult = myOrder.map((Order) =>
    //   Order.dataValues.trackingContents.map((x) => x.map((x) => x.state.text))
    // );
    // console.log(filterResult, "filterResult");
    // ******************************* 여기까지

    // userId로 주문을 찾는다.
    // 이때 송장번호가 없다면 '상품준비 중', 송장번호가 있으면 조회후 최종상태는 일단 보여주고, 상세 조회하고 싶으면 클릭시 아래로 나옴
    // console.log(updateMyOrder[1], "updateMyOrder");

    const myOrderFilteredResult = await Promise.all(
      myTrackingNumberFiltered.map(async (x) => {
        // const result = await trackingLogenByNumber(x);
        // return result;

        if (x !== null) {
          const result = await trackingLogenByNumber(x);
          return result;
        }
      })
    );

    console.log(myOrderFilteredResult, "<myOrderFilteredResult>");

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
            console.log(updateResult, "updateMyOrder YYYYYYYYYYYY");
            // orderUpdateArray.push(updateResult[1].dataValues);
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
};

exports.adminTrackingNum = async (req, res) => {
  try {
    console.log("adminTrackingNum", req.body);
    const orderId = Object.keys(req.body)[0].split("-")[0];
    const trackingNumber = Object.values(req.body);
    console.log(orderId, Array.from(trackingNumber));
    const updateResult = await Order.update(
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
};

exports.adminReivew = async (req, res) => {
  console.log(req.query);
  try {
    const count = await Review.count();
    const result = await Review.findAll({
      order: ["createdAt"],
      limit: req.query.pagination,
      offset: req.query.setPage,
      include: [{ model: Post }],
    });
    console.log(result, "result");
    res.json({ result, count });
  } catch (error) {
    console.log(error);
  }
};

exports.adminDeleteReview = async (req, res) => {
  const { id, pagination, setPage, deleteRatingNum, productId } = req.body.data;
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

      return updateRating;
    })
  );

  // console.log(value)
  // console.log(productRatingNum, "productRatingNum");
  // await Promise.all(
  //   id.map(async (value, key) => {
  //     await Review.destroy({ where: { id: Number(value) } });
  //     // console.log(value);
  //   })
  // );

  const result = await Review.findAll({
    order: ["createdAt"],
    limit: pagination,
    offset: setPage,
    include: [{ model: Post }],
  });

  res.json({
    msg: "DELETE_REVIEW_SUCCESS",
    count: deleteRatingNum.length,
    data: result,
  });
};

exports.adminSearch = async (req, res) => {
  const { splitResult, search } = req.query;
  console.log(req.query, "alluser");
  try {
    switch (splitResult) {
      case "1":
        if (search === "undefined") {
          const result1 = await User.findAll({});
          return res.json({ data: result1, splitResult: splitResult });
        } else {
          const result1 = await User.findAll({
            where: {
              [Op.or]: [
                {
                  name: { [Op.like]: `%${search}%` },
                },
                {
                  email: { [Op.like]: `%${search}%` },
                },
              ],
            },
          });
          console.log(result1, "result1");
          return res.json({ data: result1, splitResult: splitResult });
        }
      case "2":
        if (search === "undefined") {
          const result2 = await Post.findAll({});
          return res.json({ data: result2, splitResult: splitResult });
        } else {
          const result2 = await Post.findAll({
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
          return res.json({ data: result2, splitResult: splitResult });
        }

      case "3":
        if (search === "undefined") {
          const result3 = await Order.findAll({});
          return res.json({ data: result3, splitResult: splitResult });
        } else {
          const result3 = await Order.findAll({
            where: {
              [Op.or]: [
                {
                  orderId: { [Op.like]: `%${search}%` },
                },
                {
                  userName: { [Op.like]: `%${search}%` },
                },
              ],
            },
          });
          return res.json({ data: result3, splitResult: splitResult });
        }

      case "4":
        if (search === "undefined") {
          const result4 = await Review.findAll({});
          return res.json({ data: result4, splitResult: splitResult });
        } else {
          const result4 = await Review.findAll({
            where: {
              [Op.or]: [
                {
                  comments: { [Op.like]: `%${search}%` },
                },
                {
                  userName: { [Op.like]: `%${search}%` },
                },
              ],
            },
          });
          return res.json({ data: result4, splitResult: splitResult });
        }

      default:
        console.log("default");
    }

    // const allUser = await User.findAll({
    //   order: ["createdAt"],
    //   limit: req.query.pagination,
    //   offset: req.query.setPage,
    // });
    res.json("allUser");
  } catch (error) {
    console.log(error);
  }
};
