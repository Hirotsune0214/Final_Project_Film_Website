const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // requireは、必ず必要
      required: true,
      min: 3,
      max: 25,
      // 重複してはいけない
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    // ログインしているかどうか
    isAdmin: {
      type: Boolean,
      default: false,
    },
  }, 
  // データを格納した日付
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
