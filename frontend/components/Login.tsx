import React, { FC, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import authUtils from "@/utils/authUtils";
import Link from "next/link";
import { useRouter } from "next/router";
import authApi from "@/pages/api/authApi";
import { useRecoilState } from "recoil";
import { userState } from "@/src/state/auth";
import Head from "next/head";

const login: FC = () => {
  const router = useRouter();
  // JWTがあった場合に遷移する

  // エラー時の表示
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    // trimで空白を取り除いた状態でユーザーネームだけを取得できる
    // as stringをつけるtypescriptの意味
    const username = (data.get("username") as string).trim();
    const password = (data.get("password") as string).trim();

    let error = false;

    // ちゃんと入力されているかの確認
    if (username === "") {
      error = true;
      setUsernameErrText("Please enter your name");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("Please enter the password");
    }

    // errorがあった場合、そのままreturnしてその下を実行しないようにする

    if (error) return;

    setLoading(true);

    // 新規登録APIを叩く
    // APIはtry、catchで記述する
    try {
      // authApiは、registerが存在する
      const res = await authApi.login({
        // parameter.
        // postmanのbodyになる
        username,
        password,
      });

      // mongoDBからデータを取得。
      // responseでusenameを取得してrecoilに表示させるようにする

      setUser({ username: username }); // 修正点

      setLoading(false);
      // 成功したらtokenの名称でローカルストレージに保存する
      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました");
      router.push("/");
    } catch (err) {
      const errors = err.data.errors;
      console.log(errors);
      // エラーを展開する
      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
          console.log(err.msg);
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };

  // 確認する
  useEffect(() => {
    // JWTを持っているか確認する
    const checkAuth = async () => {
      // 認証チェック
      // userに権限があるかの確認
      const isAuth = await authUtils.isAuthenticated();
      // isAuthがtrueならメインページにリダイレクトするようにする
      if (isAuth) {
        setUser({ username: isAuth.username });
        router.push("/");
      }
    };

    checkAuth(); // 修正点：ここでの呼び出しを残すが、依存リストを空にする
  }, []); // 修正点：依存リストを空にする

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          height: "100vh",
          component: "form",
        }}
        onSubmit={handleSubmit}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: "black" }}>
          Login
        </Typography>
        {/* noValidateで、デフォルトで表示されるエラーを消してくれる */}
        <Box component="form" noValidate sx={{ mt: 1 }} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            // 下記2つが必要かわからない
            autoComplete="username"
            autoFocus
            // helperTextの中に入れるとエラーを表示してくれる
            helperText={usernameErrText}
            // 空でなければエラーを出す。つまりエラーがあれば
            error={usernameErrText !== ""}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            helperText={passwordErrText}
            // 空でなければエラーを出す。つまりエラーがあれば
            error={passwordErrText !== ""}
            disabled={loading}
          />
          <LoadingButton
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            type="submit"
            loading={loading}
            color="primary"
            variant="outlined"
          >
            LOGIN
          </LoadingButton>
        </Box>
        <Button>
          <Link href="/signup">Don't have an account? Sign Up</Link>
        </Button>
      </Box>
    </>
  );
};

export default login;
