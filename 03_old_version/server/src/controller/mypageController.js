const { User } = require("../../models");
const { userUUIDExport } = require("../utils/userUUIDExport");
const bcrypt = require("bcryptjs");

// @route    POST  api/order/submit
// @desc     kakao pay
// @access   Public

exports.pwChange = async (req, res) => {
  const { currentPw, password, confirmPassword } = req.body;
  const uuid = userUUIDExport(req.cookies);
  console.log(req.body, "ini");

  const result = await User.findOne({ where: { uuid: uuid }, raw: true });
  console.log(result.password, "password");
  const currentPwCompareResult = await bcrypt.compare(
    currentPw,
    result.password
  );

  console.log(currentPwCompareResult, "currentPwCompareResult");
  if (currentPwCompareResult) {
    await User.update(
      {
        password: password,
      },
      { where: { uuid: uuid }, individualHooks: true }
    );
    res.json({ msg: "PW CHANGE SUCCESS" });
  } else {
    res.json({ msg: "CurrentPw do not match" });
  }

  // await User.update(
  //   {
  //     password: "123",
  //   },
  //   { where: { uuid: req.query.uuid }, individualHooks: true }
  // );
};
