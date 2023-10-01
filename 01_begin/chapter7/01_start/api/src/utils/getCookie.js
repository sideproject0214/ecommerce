exports.getCookie = (req) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);
  const result = cookieExist.split("=j:");
  const parsingJson = JSON.parse(result[1]);
  return parsingJson;
};

exports.getCookieAuth = (req, res, next) => {
  const cookieExist = decodeURIComponent(req.headers.cookie);

  try {
    const result = cookieExist.split("=j:");
    const { userUUID } = JSON.parse(result[1]);
    // console.log(userUUID, "server UserUUId");
    req.userUUID = userUUID;
    next();
  } catch (e) {
    console.log("No Cookie");
    return res.json({ msg: "No Cookie" }).status(404);
  }
};
