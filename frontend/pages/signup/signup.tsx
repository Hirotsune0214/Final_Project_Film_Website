import React, { FC, useState } from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import authApi from "../api/authApi";
import Link from "next/link";

const signup: FC = () => {
  // エラー時の表示
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    // trimで空白を取り除いた状態でユーザーネームだけを取得できる
    // as stringをつけるtypescriptの意味
    const username = (data.get("username") as string).trim();
    const password = (data.get("password") as string).trim();
    const confirmPassword = (data.get("confirmPassword") as string).trim();

    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    let error = false;

    // ちゃんと入力されているかの確認するコード
    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmErrText("確認用パスワードを入力してください");
    }
    // パスワードと確認用パスワードの確認
    if (password !== confirmPassword) {
      error = true;
      setConfirmErrText("パスワードと確認用パスワードが異なります。");
    }

    // errorがあった場合、そのままreturnしてその下を実行しないようにする

    if (error) return;

    setLoading(true);

    // 新規登録APIを叩く
    // APIはtry、catchで記述する
    try {
      // authApiは、registerが存在する
      const res = await authApi.register({
        // parameter.
        // postmanのbodyになる
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      // 成功したらtokenの名称でローカルストレージに保存する
      localStorage.setItem("token", res.token);
      console.log("新規登録");
    } catch (err) {
      const errors = err.data.errors;
      console.log(errors);
      // エラーを展開する
      // TODO: forEachを使用して良いのか
      errors.forEach((err) => {
        if (err.path === "username") {
          setUsernameErrText(err.msg);
          console.log(err.msg);
        }
        if (err.path === "password") {
          setPasswordErrText(err.msg);
        }
        if (err.path === "confirmPassword") {
          setConfirmErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };

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
          Sign up
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirmPassword"
            type="password"
            id="confirmPassword"
            helperText={confirmErrText}
            // 空でなければエラーを出す。つまりエラーがあれば
            error={confirmErrText !== ""}
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
            SIGN UP
          </LoadingButton>
        </Box>
        {/* 位置を調整する */}
        <Button>
          <Link href="/login/login">Already have an account? LOGIN</Link>
        </Button>
      </Box>
    </>
  );
};

export default signup;
