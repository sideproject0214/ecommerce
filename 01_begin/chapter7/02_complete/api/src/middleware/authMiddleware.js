const jwt = require("jsonwebtoken");
const { User } = require("../models");
const asyncHandler = require("express-async-handler");
const { userUUIDExport } = require("../utils/userUUIDExport");

// ch6
exports.auth = asyncHandler(async (req, res, next) => {
  const accessToken = userUUIDExport(req.cookies);

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
    console.log(decoded, "decoded");
    if (decoded) {
      req.user = await User.findOne({
        where: { uuid: decoded.user.uuid },
      });
      next();
    }
  } catch (error) {
    console.log(error.message); // 이렇게하면 에러메시지만 볼수 있다
    res.status(404).json({
      success: false,
      msg: "Access token expired",
    });
    throw new Error("Access token expired");
  }

  if (!accessToken) {
    res.status(401);
    throw new Error("has no token");
  }
});
