import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import authUtils from "@/utils/authUtils";
import UserModal from "./UserMotal";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, MenuItem } from "@mui/material";
import { userState } from "@/src/state/auth";
import { useRecoilState } from "recoil";

export default function MobileTablet() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const currentUrl = router.pathname;

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
    <>
      <Box sx={{ flexGrow: 1, height: "45px" }}>
        <AppBar position="fixed">
          <Toolbar sx={{ backgroundColor: "#ffffff" }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "#000000" }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: currentUrl === "/" ? "red" : "transparent",
                    padding: {
                      md: "6px",
                      lg: "7px",
                      xl: "8px",
                    },
                    borderRadius: "10px",
                    fontSize: {
                      md: "15px",
                      lg: "15px",
                      xl: "15px",
                    },
                    "&:hover": {
                      backgroundColor: "red",
                      opacity: "0.7",
                    },
                    width: {
                      xs: "90px",
                    },
                  }}
                >
                  <Link
                    href="/"
                    style={{
                      textDecoration: "none",
                      color: currentUrl === "/" ? "#ffffff" : "#000",
                      display: "flex",
                      textAlign: "center",
                      flexDirection: "column",
                      fontSize: "15px",
                      fontFamily: "Roboto, Helvetica, Arial,sans-serif ",
                    }}
                  >
                    HOME
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor:
                      currentUrl === "/movies" ? "red" : "transparent",
                    padding: {
                      md: "6px",
                      lg: "7px",
                      xl: "8px",
                    },
                    borderRadius: "10px",
                    fontSize: {
                      md: "15px",
                      lg: "15px",
                      xl: "15px",
                    },
                    "&:hover": {
                      backgroundColor: "red",
                      opacity: "0.7",
                    },
                    width: {
                      xs: "90px",
                    },
                  }}
                >
                  <Link
                    href="/movies"
                    style={{
                      textDecoration: "none",
                      color: currentUrl === "/movies" ? "#ffffff" : "#000",
                      display: "flex",
                      textAlign: "center",
                      flexDirection: "column",
                      fontSize: "14px",
                      fontFamily: "Roboto, Helvetica, Arial,sans-serif ",
                    }}
                  >
                    MOVIES
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor:
                      currentUrl === "/dramas" ? "red" : "transparent",
                    padding: {
                      md: "6px",
                      lg: "7px",
                      xl: "8px",
                    },
                    borderRadius: "10px",
                    fontSize: {
                      md: "15px",
                      lg: "15px",
                      xl: "15px",
                    },
                    "&:hover": {
                      backgroundColor: "red",
                      opacity: "0.7",
                    },
                    width: {
                      xs: "90px",
                    },
                  }}
                >
                  <Link
                    href="/dramas"
                    style={{
                      textDecoration: "none",
                      color: currentUrl === "/dramas" ? "#ffffff" : "#000",
                      display: "flex",
                      textAlign: "center",
                      flexDirection: "column",
                      fontSize: "15px",
                      fontFamily: "Roboto, Helvetica, Arial,sans-serif ",
                    }}
                  >
                    TV SERIES
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor:
                      currentUrl === "/search" ? "red" : "transparent",
                    padding: {
                      md: "6px",
                      lg: "7px",
                      xl: "8px",
                    },
                    borderRadius: "10px",
                    fontSize: {
                      md: "14px",
                      lg: "15px",
                      xl: "15px",
                    },
                    "&:hover": {
                      backgroundColor: "red",
                      opacity: "0.7",
                    },
                    width: {
                      xs: "90px",
                    },
                  }}
                >
                  <Link
                    href="/search"
                    style={{
                      textDecoration: "none",
                      color: currentUrl === "/search" ? "#ffffff" : "#000",
                      display: "flex",
                      textAlign: "center",
                      flexDirection: "column",
                      fontSize: "15px",
                      fontFamily: "Roboto, Helvetica, Arial,sans-serif ",
                    }}
                  >
                    SEARCH
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "black" }}
            >
              CineReviewHub
            </Typography>

            {user && isAuth ? (
              <Typography sx={{ position: "absolute", right: "20px" }}>
                <UserModal user={user} />
              </Typography>
            ) : (
              <Button
                sx={{
                  padding: {
                    xl: "5px 7px",
                  },
                  border: "solid",
                  backgroundColor: "red",
                  borderColor: "red",
                  position: "absolute",
                  right: "20px",
                  "&:hover": {
                    backgroundColor: "red",
                    opacity: "0.7",
                  },
                  "& a": {
                    textDecoration: "none",
                    color: "#ffffff",
                    letterSpacing: "1.0px",
                    fontSize: {
                      xs: "15px",
                      md: "15px",
                      lg: "13px",
                      xl: "13px",
                    },
                  },
                }}
              >
                <Link href="/login">LOGIN</Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
