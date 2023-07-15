const express = require("express");
const app = express();
const PORT = 8080;

const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
// エンドポイントの準備を行う
// localhost:8080/api/registerのエンドポイントになる
// 第二引数にそれに適用するパスを指定する
app.use("/api", require("./routes/auth"));

// DB接続
try {
  mongoose.connect(process.env.MONGOURL);
  console.log("Connect to DB");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log(`Server is working ${PORT}`);
});
