const {
  generateSnsRefreshToken,
  generateAccessToken,
} = require("../../utils/generateToken");
const axios = require("axios");
const { User } = require("../../../models");
// @route    POST  api/auth/kakao
// @desc     original login
// @access   Public
const kakao_redirect_URI = encodeURI(
  "http://localhost:5000/api/auth/kakaocallback"
);
const kakao_client_id = process.env.KAKAO_CLIENT_ID;
const kakao_client_secret = process.env.KAKAO_CLIENT_SECRET;

// @route    POST  api/auth/kakao
// @desc     original login
// @access   Public

exports.kakaoLogin = (req, res) => {
  const api_url =
    "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" +
    kakao_client_id +
    "&redirect_uri=" +
    kakao_redirect_URI;

  // res.redirect(api_url);
  res.json(api_url);
};

// @route    POST  api/auth/navercallback
// @desc     original login
// @access   Public
const getKakaoUser = async (token) => {
  console.log(token, "getKakaoUser");

  const data = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  return data;
};

exports.kakaoLoginCallback = async (req, res) => {
  console.log(req.query);
  const { code } = req.query;

  let kakaoUser = "";
  let expiresIn = "";
  let kakaoStringID = "";
  let userUUID = "";

  const getAccessToken = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        {},
        {
          params: {
            grant_type: "authorization_code",
            client_id: kakao_client_id,
            client_secret: kakao_client_secret,
            redirect_uri: kakao_redirect_URI,
            code,
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
    const kakaoToken = await getAccessToken();
    const { access_token, expires_in } = kakaoToken;
    expiresIn = expires_in.toString(); // 카카오는 그냥 숫자로 넘오기에 expires를 쓰기 위해서는 스트링으로 바꾼다.
    console.log("token : ", kakaoToken);

    if (access_token) {
      const { data } = await getKakaoUser(access_token);
      kakaoUser = data;
      console.log(data, "authcontroller");
    }
    console.log("kakaoUser11", kakaoUser);
    const {
      kakao_account: {
        email,
        profile: { nickname: name },
      },
    } = kakaoUser;

    id = kakaoUser.id.toString(); // 카카오는 id, expires_in 모두 number로 보내주기에 express에서 옵션은 대부분 string이므로 string으로 바꿔야 함.

    console.log("kakao", id, email, name);
    const KakaoCookieToken = Object.assign(kakaoToken, { id, email, name });

    console.log("kakaoToken", KakaoCookieToken);

    const userExists = await User.findOne({
      where: { email: email },
    });

    console.log(userExists, "userExists");

    let refreshToken = "";
    let accessToken = "";
    let isAdminResult = "";

    if (userExists) {
      const {
        dataValues: { uuid, name, email, kakaoID, isAdmin },
      } = userExists;
      userUUID = uuid;
      // console.log("exist", userExists, name, email, kakaoID);
      const existRefreshToken = await generateSnsRefreshToken(
        name,
        email,
        kakaoID,
        isAdmin
      );

      console.log("existRefreshToken", existRefreshToken);

      const existAccessToken = await generateAccessToken(
        name,
        email,
        kakaoID,
        isAdmin
      );

      console.log("existAccessToken", existAccessToken);

      refreshToken = existRefreshToken;
      accessToken = existAccessToken;
      isAdminResult = isAdmin;
    } else {
      const result = await User.create({
        name,
        email,
        kakaoID: id,
        password: process.env.INITIAL_PASSWORD,
      });
      const {
        dataValues: { uuid, isAdmin },
      } = result;
      userUUID = uuid;
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

    console.log(
      "KakaoCookieToken",
      KakaoCookieToken,
      refreshToken,
      accessToken
    );

    res.cookie(
      "kakao_token",
      { KakaoCookieToken, refreshToken, accessToken, userUUID, isAdminResult },
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
