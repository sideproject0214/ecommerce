const jwt = require("jsonwebtoken");
const { Token } = require("../../models");
const {
  refreshTokenExpireValue,
  accessTokenExpireValue,
} = require("../../config/expireValue");

exports.generateAccessToken = async (user) => {
  const accessToken = jwt.sign({ user }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: accessTokenExpireValue,
  });
  console.log(accessToken, "accessToken");
  return accessToken;
};

exports.generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign({ user }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: refreshTokenExpireValue,
  });

  try {
    const result = await Token.findOne({
      where: { uuid: user.uuid },
    });
    if (result) {
      await Token.update(
        { refreshToken: refreshToken },
        { where: { uuid: user.uuid } }
      );
    } else {
      await Token.create({ uuid: user.uuid, refreshToken });
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log(refreshToken, "refreshToken");
    return refreshToken;
  }
};

exports.generateSnsRefreshToken = async (user) => {
  const refreshToken = jwt.sign({ user }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: refreshTokenExpireValue,
  });
  return refreshToken;
};
