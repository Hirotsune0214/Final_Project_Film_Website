//  ユーザーの新規作成とパスワードの暗号化を行うファイル

const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

// const User = require("./models/User");
const newUser = require("../models/newUser");

exports.register = async (req, res) => {
  // Receive Password
  const password = req.body.password;

  try {
    // encrypt password
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);

    // Create new user to mongo DB
    const user = await newUser.create(req.body);

    // Publish JWT
    // mongoにあるidを元にtokenを発行していく
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// User login API
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // DBからユーザーが存在するか探してくる
    const user = await newUser.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid username",
          },
        ],
      });
    }

    // パスワードが合っているか照合する
    // 暗号化されたパスワードを複合化する必要がある
    const descryptedPassword = CryptoJS.AES.decrypt(
      // パスワードは、user変数の中に存在するので下記の書き方にしている
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    // .toString(CryptoJS.enc.Utf8);で複合したパスワードを文字列として認識することができる

    // descryptedPasswordが入力されたパスワードと合っていない場合エラーになる
    if (descryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "Invalid password",
          },
        ],
      });
    }

    // JWTを発行する
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
