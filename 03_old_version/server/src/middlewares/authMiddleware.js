const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const asyncHandler = require("express-async-handler");
const { raw } = require("express");

/* localstorage token 저장 */
exports.normalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      req.user = await User.findOne({ where: { uuid: decoded.uuid } });
      next();
    } catch (error) {
      res.status(401);
      throw new Error("토큰이 유효하지 않습니다");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("토큰이 없습니다");
  }
  /* asyncHandler 사용안할 경우 try catch를 2번 감싸야 한다 */
  // try {
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer")
  //   ) {
  //     try {
  //       token = req.headers.authorization.split(" ")[1];
  //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //       req.user = await User.findOne({ where: { uuid: decoded.uuid } });
  //       next();
  //     } catch (error) {
  //       res.status(401);
  //       throw new Error("Not authorized, token failed");
  //     }
  //   }

  //   if (!token) {
  //     res.status(401);
  //     throw new Error("Not authorized, no token");
  //   }
  // } catch (error) {
  //   next(error);
  // }
});

/* access-token */
// exports.auth = async (req, res, next) => {
//   console.log(req.headers);
//   next();
// };
exports.auth = async (req, res, next) => {
  const { cookie, authorization } = req.headers;

  // console.log(token, "access-token");
  const refreshToken = cookie.split("token=");
  const accessToken = authorization.split(" ");
  try {
    const decoded = jwt.verify(accessToken[1], process.env.ACCESS_JWT_SECRET);
    console.log(decoded, "decoded");
    if (decoded) {
      req.user = await User.findOne({
        where: { uuid: decoded.user.user.uuid },
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
    // if (error.message === "jwt expired") {
    //   res.json({
    //     success: false,
    //     msg: "Access token expired",
    //   });
    // } else {
    //   return res.json({ msg: "User not authenticated" });
    // }
  }

  if (!accessToken[1]) {
    res.status(401);
    throw new Error("has no token");
  }
};

exports.admin = async (req, res, next) => {
  console.log("admin middleware start", req.cookies);

  const userUUID =
    req.cookies && req.cookies.naver_token
      ? req.cookies.naver_token.userUUID
      : req.cookies.kakao_token
      ? req.cookies.kakao_token.userUUID
      : req.cookies.google_token
      ? req.cookies.google_token.userUUID
      : "";

  const login_error_URI = encodeURI(
    `${process.env.FRONT_ADDRESS}/login/error/eeee`
  );

  if (userUUID) {
    console.log("admin middleware second", req.cookies);
    const result = await User.findOne({
      where: { uuid: userUUID },
      raw: true,
    });

    console.log(result, "req.cookies.userUUID");
    if (result.isAdmin) {
      next();
    } else {
      console.log("error1", req.cookies);
      res.status(404).json("error");
      // res.redirect(404, login_error_URI);
    }
  } else {
    console.log("error2");
    // res.send({ path: "/", msg: "Not Login" });
    res.status(404).json("error");
    // res.redirect(404, login_error_URI);
  }
};

exports.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(404);
  }
};
