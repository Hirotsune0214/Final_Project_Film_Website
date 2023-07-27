// interceptorを使用して、リクエストとレスポンスを受け取る前の操作

import axios from "axios";

// 根本の部分になるので宣言しておく
const BASE_URL = "http://localhost:8080/api";
// ローカルストレージに保存したtokenを取得する
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  return {
    // スプリット構文にすることで、headersで生成したデータをconfigに挿入することができる
    ...config,
    // JWTを持っていた場合にそれをリクエストして送信しないといけないのでheadersを記述する
    headers: {
      // application/jsonは、JSON形式でやり取りする意味
      "Content-Type": "application/json",
      // リクエストヘッダにJWTを付けてサーバーに渡す
      // ${getToken()} = JWTになる
      authorization: `Bearer ${getToken()}`,
    },
  };
});

// レスポンスの処理。レスポンスを返すか、エラーを返す
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
