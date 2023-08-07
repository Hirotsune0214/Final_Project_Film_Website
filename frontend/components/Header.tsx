import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  // router.pathname is to get current url
  // console.log(router.pathname);
  const currentUrl = router.pathname;

  return (
    <Box>
      <AppBar position="fixed">
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
            }}
          >
            <Link href="/">HOME</Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: currentUrl === "/movies" ? "red" : "transparent",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Link href="/movies">MOVIES</Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: currentUrl === "/dramas" ? "red" : "transparent",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Link href="/dramas">TV SERIES</Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: currentUrl === "/search" ? "red" : "transparent",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Link href="/search">SEARCH</Link>
          </Typography>
          <DarkModeOutlinedIcon />
          <Button
            sx={{
              border: "solid",
              backgroundColor: "red",
              borderColor: "red",
              position: "absolute",
              right: "20px",
            }}
          >
            <Link href="/login">LOGIN</Link>
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
}
