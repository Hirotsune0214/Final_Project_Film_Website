const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // requireは、必ず必要な項目
      required: true,
      // 重複してはいけない
      unique: true,
    },
    // email: {
    //   type: String,
    //   max: 50,
    //   unique: true,
    // },
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

module.exports = mongoose.model("User", userSchema);
