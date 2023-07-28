import axiosClient from "./axiosClient";

const authApi = {
  // TODO: paramsの型を変更する
  register: (params: any) => axiosClient.post("/register", params),
};

export default authApi;
