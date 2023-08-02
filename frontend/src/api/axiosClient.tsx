import axios from "axios";

const BASE_URL = "http://localhost:8080/api";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  return {
    config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`, // リクエストヘッダにJWTを付けてサーバーに渡す
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
    // tokenがundefinedの場合は、下記に書き換える
    //return response.data;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
