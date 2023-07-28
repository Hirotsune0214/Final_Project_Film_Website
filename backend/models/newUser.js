const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// どのファイルでもこのモデルを使用できるようにすることで、作成、削除等ができるようになる
module.exports = mongoose.model("newUser", newUserSchema);
