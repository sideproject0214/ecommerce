/* 초기 라우터 */
// exports.getUsers = (req, res) => {
//   res.json("Hi");
// };
const { User } = require("../../models");
const { normalgenerateToken } = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

// @route   GET /api/users
// @desc    Get all users
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.findAll({});
    return res.json(users);
  } catch (err) {
    res.status(404);
    throw new Error("User not found");
  }
});

// @route   GET /api/users
// @desc    Register User
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ where: { email: email } });

  if (userExists) {
    res.status(401);
    throw new Error("유저가 이미 존재합니다");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: normalgenerateToken(user.uuid),
    });
  } else {
    res.status(403);
    throw new Error("유저가 이미 존재합니다");
  }
});

// exports.postUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const user = await User.create({ name, email, password });
//     return res.json(user);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// };

// @route   GET /api/users/login
// @desc    Login User
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user && user.isMatchedPassword(password)) {
    res.json({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: normalgenerateToken(user.uuid),
    });
  } else {
    res.status(401);
    throw new Error("이메일 또는 비밀번호가 유효하지 않습니다");
  }
});
