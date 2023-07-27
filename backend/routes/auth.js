// 認証用のAPIを格納していく

const router = require("express").Router();

// const User = require("./models/User");
const newUser = require("../models/newUser");
const validation = require("../middleware/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../middleware/tokenHandler");

require("dotenv").config();

const { body } = require("express-validator");

// Create new user
router.post(
  "/register",
  // バリデーションチェック
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Confirm password must be at least 8 characters"),
  // value = ユーザーが入力したvalue
  body("username").custom((value) => {
    // {username: value}は、一般的にキーと値のペア
    return newUser.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("User already in use");
      }
    });
  }),
  // 下記の書き方の意図がわからない
  validation.validate,
  userController.register
);

// ログイン用のAPI
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  validation.validate,
  userController.login
);

// JWT認証API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

module.exports = router;
