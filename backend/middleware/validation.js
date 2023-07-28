// 何かを処理するためのファイル

const { validationResult } = require("express-validator");

// バリデーションチェック時にエラーがあった場合にエラーを吐き出す
// validateの関数名で、バリデーションを宣言する
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  // !errors.isEmpty()で、空じゃない時に、エラーになる
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // ここより上で止まってしまった場合は、next()は走らないのでこれより下にはいかない
  next();
};
