const JWT = require("jsonwebtoken");
const newUser = require("../models/newUser");

// クライアントから渡されたJWTが正常か検証
//tokenDecode = 複合
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      // 秘密鍵やbearerが正しくない場合は、そのままfalseを返す
      return false;
    }
  } else {
    return false;
  }
};

// JWT認証を検証するためのミドルウェア
// tokenのバリデーションチェックのようなもの

exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    // tokenが存在すれば、そのJWTと一致するユーザーを探してくる
    // newUserモデルからユーザーを探してくる
    const user = await newUser.findById(tokenDecoded.id);
    // ユーザーが存在しない場合の処理
    if (!user) {
      return res.status(401).json("Not authorized");
    }
    // ユーザーが存在した場合は、ユーザー情報を更新
    req.user = user;
    next();
  } else {
    // JWTが存在しない場合のエラー判定
    return res.status(401).json("Not authorized");
  }
};
