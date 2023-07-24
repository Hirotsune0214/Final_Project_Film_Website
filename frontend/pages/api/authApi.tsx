// auth関連(認証用)のAPIをまとめる

import axiosClient from "./axiosClient";

const authApi = {
  // 第二引数のparamsで、引数に入れたパラメーターはここに自動的に入る
  // TODO:paramsの方を変更する
  register: (params: any) => axiosClient.post("auth/register", params),
};

export default authApi;
