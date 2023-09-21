import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import authUtils from "@/utils/authUtils";
import UserModal from "./UserMotal";

export default function Header({ user, setUser }: any) {
  const router = useRouter();
  const currentUrl = router.pathname;

  const [isAuth, setIsAuth] = useState(false);

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
    };
    checkAuth(); // 修正点：ここでの呼び出しを残すが、依存リストを空にする
  }, []); // 修正点：依存リストを空にする

  return (
    <Box>
      <AppBar position="static">
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            bgcolor: "#ffffff",
            height: "75px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              ml: "30px",
              mr: "20px",
              color: "#252525",
              fontSize: {
                lg: "25px",
                xl: "30px",
              },
            }}
          >
            CineReviewHub
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: currentUrl === "/" ? "red" : "transparent",
              padding: "9px",
              borderRadius: "10px",
              fontSize: {
                lg: "15px",
                xl: "18px",
              },
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
                letterSpacing: "1.0px",
                color: "#252525",
              }}
            >
              HOME
            </Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: currentUrl === "/movies" ? "red" : "transparent",
              padding: "9px",
              borderRadius: "10px",
              fontSize: {
                lg: "15px",
                xl: "18px",
              },
              "&:hover": {
                color: "black",
                backgroundColor: "red",
                opacity: "0.7",
              },
            }}
          >
            <Link
              href="/movies"
              style={{
                textDecoration: "none",
                color: "#252525",
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
              padding: "9px",
              borderRadius: "10px",
              fontSize: {
                lg: "15px",
                xl: "18px",
              },
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
                color: "#252525",
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
              padding: "9px",
              borderRadius: "10px",
              fontSize: {
                lg: "15px",
                xl: "18px",
              },
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
                color: "#252525",
                letterSpacing: "1.0px",
              }}
            >
              SEARCH
            </Link>
          </Typography>
          {/* <LightModeOutlinedIcon style={{ color: "black", fontSize: "30px" }} /> */}

          {user && isAuth ? (
            <Typography sx={{ position: "absolute", right: "20px" }}>
              <UserModal user={user} />
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
                // TODO: 書き方について
                "& a": {
                  textDecoration: "none",
                  color: "#252525",
                  letterSpacing: "1.0px",
                  fontSize: {
                    lg: "13px",
                    xl: "15px",
                  },
                  padding: "2px",
                },
              }}
            >
              <Link href="/login">LOGIN</Link>
            </Button>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}
