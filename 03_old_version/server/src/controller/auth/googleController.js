const {
  generateSnsRefreshToken,
  generateAccessToken,
} = require("../../utils/generateToken");
const axios = require("axios");
const { User } = require("../../../models");

const google_redirect_URI = encodeURI(
  "http://localhost:5000/api/auth/googlecallback"
);
const SCOPE = encodeURI("openid profile email");
// const SCOPE = encodeURI("https://www.googleapis.com/auth/userinfo.profile");

const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;
// const SCOPE = encodeURI([
//   "https://www.googleapis.com/auth/userinfo.email",
//   "https://www.googleapis.com/auth/userinfo.profile",
// ]);
// @route    POST  api/auth/googlecallback
// @desc     original login
// @access   Public

exports.googleLogin = (req, res) => {
  const api_url =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    "scope=" +
    SCOPE +
    "&access_type=offline&include_granted_scopes=true&response_type=code&" +
    "state=google" +
    "&redirect_uri=" +
    google_redirect_URI +
    "&client_id=" +
    google_client_id;

  // res.redirect(api_url);
  res.json(api_url);
};

// @route    POST  api/auth/navercallback
// @desc     original login
// @access   Public
const getGoogleUser = async (token) => {
  // console.log(token, "getgoogleUser");

  const { data } = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

exports.googleLoginCallback = async (req, res) => {
  console.log(req.query);
  const { code } = req.query;

  let googleUser = "";
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
        "https://oauth2.googleapis.com/token",
        {},
        {
          params: {
            grant_type: "authorization_code",
            client_id: google_client_id,
            client_secret: google_client_secret,
            redirect_uri: google_redirect_URI,
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
    const googleToken = await getAccessToken();
    const { access_token, expires_in } = googleToken;
    expiresIn = expires_in.toString(); // 카카오는 그냥 숫자로 넘오기에 expires를 쓰기 위해서는 스트링으로 바꾼다.
    console.log("token : ", googleToken);

    if (access_token) {
      const data = await getGoogleUser(access_token);
      googleUser = data;
      // console.log(data, "authcontroller");
    }
    console.log("googleUser11", googleUser);
    const { id, email, name, isAdmin } = googleUser;

    console.log("google", id, email, name);
    const GoogleCookieToken = Object.assign(googleToken, {
      id,
      email,
      name,
      isAdmin,
    });

    console.log("googleToken", GoogleCookieToken);

    const userExists = await User.findOne({
      where: { email: email },
    });

    console.log(userExists, "userExists");

    let refreshToken = "";
    let accessToken = "";
    let isAdminResult = "";

    if (userExists) {
      const {
        dataValues: { uuid, name, email, googleID },
      } = userExists;
      userUUID = uuid;
      // console.log("exist", userExists, name, email, googleID);
      const existRefreshToken = await generateSnsRefreshToken(
        name,
        email,
        googleID
      );

      console.log("existRefreshToken", existRefreshToken);

      const existAccessToken = await generateAccessToken(name, email, googleID);

      console.log("existAccessToken", existAccessToken);

      refreshToken = existRefreshToken;
      accessToken = existAccessToken;
      isAdminResult = isAdmin;
    } else {
      const result = await User.create({
        name,
        email,
        googleID: id,
        password: process.env.INITIAL_PASSWORD,
      });
      const {
        dataValues: { uuid },
      } = result;
      userUUID = uuid;

      const notExistrefreshToken = await generateSnsRefreshToken(
        name,
        email,
        id
      );
      const notExistaccessToken = await generateAccessToken(name, email, id);
      refreshToken = notExistrefreshToken;
      accessToken = notExistaccessToken;
      isAdminResult = isAdmin;
    }

    console.log(
      "googleCookieToken",
      GoogleCookieToken,
      refreshToken,
      accessToken
    );

    res.cookie(
      "google_token",
      { GoogleCookieToken, refreshToken, accessToken, userUUID, isAdminResult },
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
