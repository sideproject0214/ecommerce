const express = require("express");
const { pwChange } = require("../controller/mypageController");
const router = express.Router();

// @route    PUT  api/mypage/pwchange
// @desc     change password
// @access   Private
router.route("/pwchange").put(pwChange);

module.exports = router;
