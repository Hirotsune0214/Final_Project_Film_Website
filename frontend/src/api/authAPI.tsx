import axiosClient from "./axiosClient";

const authApi = {
  // TODO: paramsの型を変更する
  register: (params: any) => axiosClient.post("/register", params),
  login: (params: any) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token "),
};

export default authApi;
