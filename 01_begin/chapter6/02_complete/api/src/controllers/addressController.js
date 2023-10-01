const { Address } = require("../models");
const asyncHandler = require("express-async-handler");
// @route    GET  api/address/default
// @desc     default Address
// @access   Private
exports.defaultAddress = asyncHandler(async (req, res) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);

  const result = cookieExist.split("=j:");
  const parsingJson = JSON.parse(result[1]);
  console.log(parsingJson.userUUID, "cookie defaultAddress");
  const address = await Address.findOne({
    where: { userId: parsingJson.userUUID },
  });
  res.json(address);
});

// @route    GET  api/address/latest
// @desc     latest Address
// @access   Private
exports.latestAddress = asyncHandler(async (req, res) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);

  const result = cookieExist.split("=j:");
  const parsingJson = JSON.parse(result[1]);
  console.log(parsingJson.userUUID, "cookie defaultAddress");

  const address = await Address.findAll({
    where: { userId: parsingJson.userUUID },
    limit: 5,
  });
  res.json(address);
});
