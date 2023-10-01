exports.userUUIDExport = (cookie) => {
  if (cookie.naver_token) {
    return cookie.naver_token.userUUID;
  } else if (cookie.kakao_token) {
    return cookie.kakao_token.userUUID;
  } else if (cookie.google_token) {
    return cookie.google_token.userUUID;
  } else if (cookie.normal_token) {
    return cookie.normal_token.userUUID;
  }
};
