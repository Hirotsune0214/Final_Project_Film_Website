import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import authUtils from "@/utils/authUtils";

export default function Header({ user, setUser }: any) {
  const router = useRouter();
  const currentUrl = router.pathname;

  const [isAuth, setIsAuth] = useState(false);

  // console.log("Header user:", user); ユーザー名が表示されるか確認

  useEffect(() => {
    // JWTを持っているか確認する
    const checkAuth = async () => {
      // 認証チェック
      // userに権限があるかの確認
      const isAuth = await authUtils.isAuthenticated();
      // isAuthがtrueならメインページにリダイレクトするようにする
      if (isAuth) {
        setUser({ username: isAuth.username });
        setIsAuth(true);
      }
      console.log(isAuth);
    };
    checkAuth(); // 修正点：ここでの呼び出しを残すが、依存リストを空にする
  }, []); // 修正点：依存リストを空にする

  return (
    <Box>
      <AppBar position="static">
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            bgcolor: "#000101",
            height: "50px",
          }}
        >
          <Typography variant="h6" sx={{ ml: "30px" }}>
            Title
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: currentUrl === "/" ? "red" : "transparent",
              padding: "10px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "red",
                opacity: "0.7",
              },
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
                letterSpacing: "1.0px",
              }}
            >
              HOME
            </Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: currentUrl === "/movies" ? "red" : "transparent",
              padding: "10px",
              borderRadius: "10px",
              "&:hover": {
                color: "black",
                backgroundColor: "red",
                opacity: "0.4",
              },
            }}
          >
            <Link
              href="/movies"
              style={{
                textDecoration: "none",
                color: "white",
                letterSpacing: "1.0px",
              }}
            >
              MOVIES
            </Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: currentUrl === "/dramas" ? "red" : "transparent",
              padding: "10px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "red",
                opacity: "0.7",
              },
            }}
          >
            <Link
              href="/dramas"
              style={{
                textDecoration: "none",
                color: "white",
                letterSpacing: "1.0px",
              }}
            >
              TV SERIES
            </Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: currentUrl === "/search" ? "red" : "transparent",
              padding: "10px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "red",
                opacity: "0.7",
              },
            }}
          >
            <Link
              href="/search"
              style={{
                textDecoration: "none",
                color: "white",
                letterSpacing: "1.0px",
              }}
            >
              SEARCH
            </Link>
          </Typography>
          <DarkModeOutlinedIcon />

          {user && isAuth ? (
            <Typography
              sx={{ position: "absolute", right: "20px", fontSize: "20px" }}
            >
              {user.username}
            </Typography>
          ) : (
            <Button
              sx={{
                border: "solid",
                backgroundColor: "red",
                borderColor: "red",
                position: "absolute",
                right: "20px",
                "&:hover": {
                  backgroundColor: "red",
                  opacity: "0.7",
                },
              }}
            >
              <Link
                href="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  letterSpacing: "1.0px",
                }}
              >
                LOGIN
              </Link>
            </Button>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}
