import React, { FC, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import authUtils from "@/utils/authUtils";

const login: FC = () => {
  // JWTがあった場合に遷移する
  // const navigate = useNavigate();

  // エラー時の表示
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);

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

    console.log(username);
    console.log(password);

    let error = false;

    // ちゃんと入力されているかの確認
    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
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
      setLoading(false);
      // 成功したらtokenの名称でローカルストレージに保存する
      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました");
    } catch (err) {
      const errors = err.data.errors;
      console.log(errors);
      // エラーを展開する
      // TODO: forEachを使用して良いのか
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

  useEffect(() => {
    // JWTを持っているか確認する
    const checkAuth = async () => {
      // 認証チェック
      // userに権限があるかの確認
      const isAuth = await authUtils.isAuthenticated();
      // isAuthがtrueならメインページにリダイレクトするようにする
      if (isAuth) {
        // navigate("/")
      }
      checkAuth();
    };
    // ページ遷移する度に、useEffectが発火する
    // }, [navigate]);
  }, []);

  return (
    <>
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
          Sign in
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
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          /> */}
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
            SIGN IN
          </LoadingButton>
        </Box>
        {/* 位置を調整する */}
        <Button>Don't have an account? Sign Up</Button>
      </Box>
    </>
  );
};

export default login;
