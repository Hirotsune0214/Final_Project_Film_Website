import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Footer = () => {
  return (
    <Box>
      <Box
        component="footer"
        sx={{
          bgcolor: "#ffffff",
          padding: "15px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          top: "auto",
          bottom: 0,
          marginTop: "0px",
        }}
      >
        <Typography variant="h4">CineReviewHub</Typography>
        <Box
          sx={{
            display: "flex",
            justifyItems: "center",
            gap: "15px",
            mr: "40px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "17px",
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
                fontSize: "17px",
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
              fontSize: "17px",
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
              fontSize: "17px",
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
              fontSize: "17px",
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
