const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const crypto = require("crypto"); // node 자체 내장

const { User, Token } = require("../../../models");
const {
  generateRefreshToken,
  generateAccessToken,
  generateSnsRefreshToken,
} = require("../../utils/generateToken");
const { refreshTokenExpireValue } = require("../../../config/expireValue");

// @route    POST  api/auth/login
// @desc     original login
// @access   Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "login");

  const user = await User.findOne({
    where: { email },
  });
  // console.log(awaituser.isMatchedPassword(password), "login");
  try {
    const result = await user.isMatchedPassword(password);
    console.log(typeof result, "password");
    if (result) {
      // The res.cookie() function is used to set the cookie name to value.
      // The value parameter may be a string or an object coverted to JSON

      const {
        dataValues: { uuid: userUUID, name, email, isAdmin },
      } = user;

      const NormalCookieToken = { name, email, userUUID, isAdmin };
      const refreshToken = await generateRefreshToken(user);
      const accessToken = await generateAccessToken(user);
      res.cookie(
        "normal_token",
        {
          NormalCookieToken,
          refreshToken,
          accessToken,
          userUUID,
          isAdminResult: isAdmin,
        },
        {
          httpOnly: true,
          // maxAge: expiresIn,
          expires: new Date(Date.now() + 3000000),
        }
      );
      res.json({
        msg: "Login",
        password: `${user.isMatchedPassword(password)}`,
      });
    } else {
      res.status(400).json({ msg: "Email or Password incorrect" });
    }
  } catch (e) {
    console.error(e);
  }
};

// @route    POST  api/auth/login
// @desc     original login
// @access   Public
exports.refresh = asyncHandler(async (req, res) => {
  if (req.headers.cookie) {
    const data = req.headers.cookie;
    console.log(data, "refresh request");

    const refineToken = data.split("token=");
    console.log(refineToken[1], "refindetoken");

    try {
      const findRefreshToken = await Token.findOne({
        where: { refreshToken: refineToken[1] },
      });
      if (findRefreshToken) {
        console.log(findRefreshToken, "find Refrshtoken complete");

        const user = jwt.verify(refineToken[1], process.env.REFRESH_JWT_SECRET);
        const newAccessToken = await generateAccessToken(user);
        console.log(newAccessToken, "new access token");
        return res.json(newAccessToken);
      }
    } catch (error) {
      console.log(error);
      return res.json({ msg: "Faked Token!" });
    }
  } else {
    return res.json({ msg: "Refresh token not found, login again" });
  }

  // If the refresh token is valid, create a new accessToken and return it.
});

// @route    POST  api/auth/login
// @desc     original login
// @access   Public
exports.protected = asyncHandler(async (req, res) => {
  return res.json({ messgae: "Protected content" });
});

// @route    POST  api/auth/signup
// @desc     original register
// @access   Public
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error("이미 가입된 이메일입니다");
  }

  const user = await User.create({
    name,
    email,
    password,
    emailToken: crypto.randomBytes(64).toString("hex"),
    isVerified: false,
  });
  // const refreshToken = await generateRefreshToken(user);
  // const accessToken = await generateAccessToken(user);
  // console.log(user, "create user");
  // const token = await Object.assign(refreshToken, accessToken);
  // console.log(token, "create user2");

  if (user !== undefined) {
    console.log("Send Email", user.email);

    const msg = {
      to: user.email,
      from: "sideproject0214@gmail.com",
      subject: "Test",
      text: `
      가입해주셔서 감사합니다. 
      이메일 인증위해 아래 주소를 클릭하여 주시기 바랍니다. 
      ${process.env.FRONT_ADDRESS}/api/auth/verify/token=${user.emailToken}
      `,
      html: `
      <h1>안녕하세요</h1>
      <p>가입해주셔서 감사합니다. </p>
      <p>이메일 인증위해 아래를 클릭하여 주시기 바랍니다.  </p>
      <a href="${process.env.FRONT_ADDRESS}/auth/verify/${user.emailToken}">이메일 인증 클릭</a>
      `,
    };

    const emailHost = email.split("@")[1];
    const emailNameSplit = email.split("@")[1].split(".")[0];
    const emailName =
      emailNameSplit.charAt(0).toUpperCase() + emailNameSplit.slice(1);

    await sgMail.send(msg, (err, info) => {
      if (err) {
        console.log(err, "Email Not Sent");
      } else {
        console.log(info, "Email Sent");
        res.status(201).json({
          msg: "Email Send",
          emailHost: emailHost,
          emailName: emailName,
        });
      }
    });
  } else {
    res.status(400).json({
      msg: "Email Error",
    });
    console.log(error);
  }
});

// @route    POST  api/auth/verify
// @desc     original login
// @access   Public
exports.verify = async (req, res, next) => {
  console.log(req.query.token, "req.session");
  try {
    const user = await User.findOne({ where: { emailToken: req.query.token } });
    console.log(user, "user");

    if (user !== null) {
      const {
        dataValues: { uuid: userUUID, name, email },
      } = user;

      const NormalCookieToken = { name, email, userUUID };

      if (user.isVerified !== true) {
        await User.update(
          { isVerified: true },
          { where: { emailToken: req.query.token } }
        );
        const refreshToken = await generateRefreshToken(user);
        const accessToken = await generateAccessToken(user);
        res.cookie(
          "normal_token",
          { NormalCookieToken, refreshToken, accessToken, userUUID },
          {
            httpOnly: true,
            // maxAge: expiresIn,
            expires: new Date(Date.now() + 3000000),
          }
        );
        res.json(true);
      } else {
        res.json(false);
      }
    } else {
      res.json(false);
    }

    // user.emailToken = null;
    // user.isVerified = true;
    // await user.save(); // 업데이트

    // await req.login(user, async (err) => {
    //   if (err) return next(err);
    //   req.flash("success", `가입을 환영합니다. ${user.name}`);
    //   const redirectUrl = req.session.redirectTo || "";
    //   delete req.session.redirectTo;
    //   res.redirect(redirectUrl);
    // });
  } catch (error) {
    console.error(error);

    // res.redirect("/");
  }
};
// exports.register = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ where: { email } });

//   if (userExists) {
//     res.status(400);
//     throw new Error("이미 가입된 이메일입니다");
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//   });
//   const refreshToken = await generateRefreshToken(user);
//   const accessToken = await generateAccessToken(user);
//   const token = Object.assign(refreshToken, accessToken);

//   if (user) {
//     res.status(201).json({
//       id: user.uuid,
//       name: user.name,
//       email: user.email,
//       password: user.password,
//       isAdmin: user.isAdmin,
//       token,
//     });
//   } else {
//     res.status(400);
//     throw new Error("유저 정보 확인이 필요합니다");
//   }
// });

exports.loginCheck = asyncHandler((req, res) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);
  console.log("json:", cookieExist);
  if (cookieExist) {
    const result = cookieExist.split("=j:");
    const parsingJson = JSON.parse(result[1]);
    console.log(parsingJson, "cookie");
    res.json(parsingJson);
  } else {
    res.status(400);
    throw new Error("로그인이 필요합니다");
  }
});

exports.logout = asyncHandler((req, res) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);

  console.log("json:", cookieExist);
  if (cookieExist) {
    const result = cookieExist.split("=j:");
    // console.log(result[0]);
    res.clearCookie(result[0]);
    return res.json("/");
  } else {
    res.status(400);
    throw new Error("로그인이 필요합니다");
  }
});
