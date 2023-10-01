exports.accessTokenExport = (req) => {
  if (req.cookies.naver_token) {
    // console.log(req.cookies.naver_token.accessToken, "token");
    return req.cookies.naver_token.accessToken;
  } else if (req.cookies.kakao_token) {
    return req.cookies.kakao_token.accessToken;
  } else if (req.cookies.google_token) {
    return req.cookies.google_token.accessToken;
  } else {
    return req.cookies.normal_token.accessToken;
  }
};
