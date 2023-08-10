import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Footer = () => {
  return (
    <Box>
      <Box
        component="footer" // footer要素としてマークアップ
        sx={{
          bgcolor: "#131313",
          color: "#ffffff",
          padding: "32px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          top: "auto", // topプロパティを指定しないことで、通常の流れに従って表示されるようにする
          bottom: 0,
          marginTop: "30px",
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
          <Typography>
            <Link href="/">HOME</Link>
          </Typography>
          <Typography>
            <Link href="/movies/movies">MOVIES</Link>
          </Typography>
          <Typography>
            <Link href="/dramas/dramas">TV SERIES</Link>
          </Typography>
          <Link href="/search/search">SEARCH</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
