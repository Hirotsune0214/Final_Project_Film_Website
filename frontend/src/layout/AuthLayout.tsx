import { useRouter } from "next/router";
import React, { useEffect } from "react";
import authUtils from "../utils/authUtils";

const AuthLayout = () => {
  const router = useRouter();

  // userがloginとsignupに訪れる度に発火するuseEffect
  useEffect(() => {
    // ユーザーがページ遷移する度に発火
    // JWTを持っているのか確認する。
    const checkAuth = async () => {
      // 認証チェック -> utilsファイルのauthUtilsに作成
      // 権限があるかのチェック
      const isAuth = await authUtils.isAuthenticated();
      // trueならリダイレクトする構文
      if (isAuth) {
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

  return <div>AuthLayout</div>;
};

export default AuthLayout;
