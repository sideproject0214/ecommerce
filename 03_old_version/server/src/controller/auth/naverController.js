const {
  generateSnsRefreshToken,
  generateAccessToken,
} = require("../../utils/generateToken");
const axios = require("axios");
const { User } = require("../../../models");
// NAVER LOGIN
// const state = "200";
// const redirectURI = encodeURI("/");

// exports.naver_api_url =
//   "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
//   process.env.NAVER_CLIENT_ID +
//   "&redirect_uri=" +
//   redirectURI +
//   "&state=" +
//   state;

// 내 도메인 new URL(document.referrer).searchParams.get("redirect_uri") 이걸로 리다이렉트 찾기

// @route    POST  api/auth/naver
// @desc     original login
// @access   Public
const naver_redirect_URI = encodeURI(
  `${process.env.BACKEND_ADDRESS}/api/auth/navercallback`
);
const naver_client_id = process.env.NAVER_CLIENT_ID;
const naver_client_secret = process.env.NAVER_CLIENT_SECRET;

// @route    POST  api/auth/naver
// @desc     original login
// @access   Public
exports.naverLogin = (req, res) => {
  const api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    naver_client_id +
    "&redirect_uri=" +
    naver_redirect_URI;
  // res.redirect(api_url);
  res.json(api_url);
};

// @route    POST  api/auth/navercallback
// @desc     original login
// @access   Public
const getNaverUser = async (token) => {
  console.log(token, "getNaverUser");

  const data = await axios.get("https://openapi.naver.com/v1/nid/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/xml",
    },
  });
  return data;
};

exports.naverLoginCallback = async (req, res) => {
  console.log(req.query);
  const { code, state } = req.query;

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
    // console.log("token : ", access_token, expiresIn);

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

    let refreshToken = "";
    let accessToken = "";
    let isAdminResult = "";

    if (userExists) {
      const {
        dataValues: { uuid, name, email, naverID, isAdmin },
      } = userExists;
      userUUID = uuid;
      // console.log("exist", userExists, name, email, naverID);
      const existRefreshToken = await generateSnsRefreshToken(
        name,
        email,
        naverID,
        isAdmin
      );
      const existAccessToken = await generateAccessToken(
        name,
        email,
        naverID,
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
      // console.log(result);

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

    // console.log(
    //   "NaverCookieToken",
    //   NaverCookieToken,
    //   refreshToken,
    //   accessToken
    // );

    res.cookie(
      "naver_token",
      { NaverCookieToken, refreshToken, accessToken, userUUID, isAdminResult },
      {
        httpOnly: true,
        // maxAge: expiresIn,
        expires: new Date(Date.now() + expiresIn),
      }
    );

    res.redirect(`${process.env.FRONT_ADDRESS}/login/success`);
  } catch (error) {
    console.log("에러", error.response);
  }
};
