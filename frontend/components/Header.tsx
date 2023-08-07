import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Link from "next/link";

import { userState } from "@/src/state/auth";
import { useRecoilValue } from "recoil";

export default function Header() {
  // 読み取りのみ
  const user = useRecoilValue(userState);

  console.log("Header user:", user); // ユーザー名が表示されるか確認

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
              border: "solid",
              backgroundColor: "red",
              borderColor: "red",
              borderRadius: "3px",
            }}
          >
            <Link href="/">HOME</Link>
          </Typography>
          <Typography variant="h6">
            <Link href="/movies">MOVIES</Link>
          </Typography>
          <Typography variant="h6">
            <Link href="/dramas">TV SERIES</Link>
          </Typography>
          <Typography variant="h6">
            <Link href="/search">SEARCH</Link>
          </Typography>
          <DarkModeOutlinedIcon />
          <Button
            color="inherit"
            sx={{
              border: "solid",
              backgroundColor: "red",
              borderColor: "red",
              position: "absolute",
              right: "20px",
            }}
          >
            <Link href="/login">LOGIN</Link>
            <Typography>{user.username}</Typography>
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
}
