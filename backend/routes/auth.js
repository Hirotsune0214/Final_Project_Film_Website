// 認証用のAPIを格納していく

const router = require("express").Router();

// const User = require("./models/User");
const newUser = require("../models/newUser");
const validation = require("../middleware/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../middleware/tokenHandler");

require("dotenv").config();

const { body } = require("express-validator");
const generateIdenticon = require("../utils/generateIdenticon");

// const defaultIconImage = generateIdenticon(username);

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
  validation.validate,
  userController.register
);

// Login API
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

// // Logout API
// router.get("/logout", tokenHandler.verifyToken, async (req, res) => {
//   try {
//     console.log("Logged out successfully");
//     // return res.status(200).json({ message: "Logged out successfully" });
//   } catch (err) {
//     console.error(err);
//     return res.status(501).json({ message: "Error during logout" });
//   }
// });

// JWT認証API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

module.exports = router;
