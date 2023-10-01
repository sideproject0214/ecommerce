const {
  generateSnsRefreshToken,
  generateAccessToken,
} = require("../utils/generateToken");
const axios = require("axios");
const { User } = require("../models");
const { refreshTokenExpireValue } = require("../config/expireValue");
const asyncHandler = require("express-async-handler");

// @route    GET  api/auth/naver
// @desc     original login
// @access   Public
const naver_redirect_URI = encodeURI(
  `${process.env.BACKEND_ADDRESS}/auth/navercallback`
);
const naver_client_id = process.env.NAVER_CLIENT_ID;
const naver_client_secret = process.env.NAVER_CLIENT_SECRET;

// @route    GET  api/auth/naver
// @desc     original login
// @access   Public
exports.naverLogin = (req, res) => {
  const api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    naver_client_id +
    "&redirect_uri=" +
    naver_redirect_URI;
  // res.redirect(api_url);
  console.log(api_url);
  res.json(api_url);
};

// @route    POST  api/auth/navercallback
// @desc     original login
// @access   Public
const getNaverUser = asyncHandler(async (token) => {
  console.log(token, "getNaverUser");

  const data = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/xml",
    },
  });
  return data;
});

exports.naverLoginCallback = asyncHandler(async (req, res) => {
  console.log(req.query);
  const { code, state } = req.query;
  const realIP = req.rawHeaders[3];

  let naverUser = "";
  let expiresIn = "";
  let userUUID = "";

  const getAccessToken = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://nid.naver.com/oauth2.0/token",
        {},
        {
          params: {
            grant_type: "authorization_code",
            client_id: naver_client_id,
            client_secret: naver_client_secret,
            redirect_uri: naver_redirect_URI,
            code,
            state,
          },
          config,
        }
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  try {
    const naverToken = await getAccessToken();
    const { access_token, expires_in } = naverToken;
    expiresIn = expires_in;
    console.log("token : ", access_token, expiresIn);

    if (access_token) {
      const { data } = await getNaverUser(access_token);
      naverUser = data;
      console.log(data, "authcontroller");
    }

    const NaverCookieToken = Object.assign(naverToken, naverUser);

    const {
      response: { name, email, id },
    } = NaverCookieToken;

    const userExists = await User.findOne({
      where: { email: email },
    });
    console.log(userExists, "userExists");
    let refreshToken = "";
    let accessToken = "";
    let isAdminResult = "";

    if (userExists) {
      const {
        dataValues: { uuid, name, email, naverID, isAdmin },
      } = userExists;

      userUUID = uuid;
      console.log("exist 1", userExists, name, email, naverID);

      if (naverID === null) {
        await User.update(
          { naverID: id, name: NaverCookieToken.response.name },
          { where: { email: email } }
        );
        // 기존에 이메일로 가입한 경우 검증된 sns 로그인이 들어오면 올바른 정보로 대체한다
      }
      const existRefreshToken = await generateSnsRefreshToken(
        name,
        email,
        id,
        isAdmin
      );
      const existAccessToken = await generateAccessToken(
        name,
        email,
        id,
        isAdmin
      );
      refreshToken = existRefreshToken;
      accessToken = existAccessToken;
      isAdminResult = isAdmin;
    } else {
      const result = await User.create({
        name,
        email,
        naverID: id,
        password: process.env.INITIAL_PASSWORD,
      });
      const {
        dataValues: { uuid, isAdmin },
      } = result;
      userUUID = uuid;
      console.log(result, "exist2");

      const notExistrefreshToken = await generateSnsRefreshToken(
        name,
        email,
        id,
        isAdmin
      );
      const notExistaccessToken = await generateAccessToken(
        name,
        email,
        id,
        isAdmin
      );
      refreshToken = notExistrefreshToken;
      accessToken = notExistaccessToken;
      isAdminResult = isAdmin;
    }

    res.cookie(
      "naver_token",
      {
        NaverCookieToken,
        refreshToken,
        accessToken,
        userUUID,
        isAdminResult,
        realIP,
      },
      {
        httpOnly: true,
        // maxAge: expiresIn, 밀리초 단위 1000을 곱하면 본래 sns에서 의도한 refreshToken의 유효기간이 된다. 다만 개발을 위해
        expires: new Date(
          Date.now() + Number(expiresIn) * refreshTokenExpireValue
        ),
      }
    );
    console.log("Redirect Start");
    res.redirect(`${process.env.FRONT_ADDRESS}/login/success`);
  } catch (error) {
    console.log("authNaver Error", error.response);
  }
});
