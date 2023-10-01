const { Address } = require("../../models");

// @route    POST  api/order/submit
// @desc     kakao pay
// @access   Public

exports.defaultAddress = async (req, res) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);

  const result = cookieExist.split("=j:");
  const parsingJson = JSON.parse(result[1]);
  console.log(parsingJson.userUUID, "cookie defaultAddress");
  const address = await Address.findOne({
    where: { userId: parsingJson.userUUID },
  });
  res.json(address);
};

exports.latestAddress = async (req, res) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);

  const result = cookieExist.split("=j:");
  const parsingJson = JSON.parse(result[1]);
  console.log(parsingJson.userUUID, "cookie defaultAddress");

  const address = await Address.findAll({
    where: { userId: parsingJson.userUUID },
    limit: 5,
  });
  res.json(address);
};
