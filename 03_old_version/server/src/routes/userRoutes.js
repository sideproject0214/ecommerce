const express = require("express");
const router = express.Router();
const {
  getUsers,
  loginUser,
  registerUser,
} = require("../controller/userController");
const { auth, admin } = require("../middlewares/authMiddleware");

/* 초기 라우터 */
// router.route("/").get((req, res) => {
//   res.send("hi");
// });

// @route    GET  api/users
// @desc     original register
// @access   Public
router.route("/").get(auth, getUsers).post(registerUser);
// router.post("/login", loginUser);

module.exports = router;
