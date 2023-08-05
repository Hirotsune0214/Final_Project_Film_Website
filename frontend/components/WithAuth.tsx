import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import authUtils from "../utils/authUtils";

export default function WithAuth({ children }: any) {
  const router = useRouter();

  // console.log("sssss");
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
        console.log(isAuth, "isAuth");
      }
    };
    checkAuth();
  }, [router]);

  return <div>{children}</div>;
}
