const express = require("express");
const app = express();
const PORT = 8080;

const mongoose = require("mongoose");
require("dotenv").config();
// corsでクライアントとサーバーのポート番号が違う場合でも繋げれるようにする
const cors = require("cors");

app.use(
  // 誰を許可するのか
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
// エンドポイントの準備を行う
// localhost:8080/api/registerのエンドポイントになる
// 第二引数にそれに適用するパスを指定する
app.use("/api", require("./routes"));

// DB接続
try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("Connect to DB");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log(`Server is working ${PORT}`);
});
