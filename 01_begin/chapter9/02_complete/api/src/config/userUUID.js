exports.exportUserUUID = (req) =>
  req.cookies && req.cookies.naver_token
    ? req.cookies.naver_token.userUUID
    : req.cookies.kakao_token
    ? req.cookies.kakao_token.userUUID
    : req.cookies.google_token
    ? req.cookies.google_token.userUUID
    : req.cookies.normal_token.userUUID;
