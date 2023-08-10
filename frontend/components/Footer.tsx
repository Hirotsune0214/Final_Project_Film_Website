import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <Box>
      <Box
        component="footer" // footer要素としてマークアップ
        sx={{
          bgcolor: "#ffffff",
          padding: "32px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          top: "auto", // topプロパティを指定しないことで、通常の流れに従って表示されるようにする
          bottom: 0,
          marginTop: "0px",
        }}
      >
        <Typography variant="h4">Title</Typography>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            mr: "40px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              padding: "10px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#ffecec",
              },
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "black",
                letterSpacing: "1.0px",
              }}
            >
              HOME
            </Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              padding: "10px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#ffecec",
              },
            }}
          >
            <Link
              href="/movies"
              style={{
                textDecoration: "none",
                color: "black",
                letterSpacing: "1.0px",
              }}
            >
              MOVIES
            </Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              padding: "10px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#ffecec",
              },
            }}
          >
            <Link
              href="/dramas"
              style={{
                textDecoration: "none",
                color: "black",
                letterSpacing: "1.0px",
              }}
            >
              TV SERIES
            </Link>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              padding: "10px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#ffecec",
              },
            }}
          >
            <Link
              href="/search"
              style={{
                textDecoration: "none",
                color: "black",
                letterSpacing: "1.0px",
              }}
            >
              SEARCH
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
