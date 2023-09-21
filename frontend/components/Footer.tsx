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
          padding: {
            xs: "35px",
            md: "15px",
            lg: "20px",
            xl: "15px",
          },
          height: {
            md: "65px",
            lg: "70px",
            xl: "75px",
          },
          // height: "70px",
          display: {
            xs: "block",
            lg: "flex",
            xl: "flex",
          },
          alignItems: "center",
          justifyContent: {
            xs: "none",
            lg: "space-between",
            xl: "space-between",
          },
          top: "auto",
          bottom: 0,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: {
              xs: "10px",
            },
            display: {
              xs: "flex",
            },
            justifyContent: {
              xs: "center",
            },
            fontSize: {
              xs: "23px",
            },
          }}
        >
          CineReviewHub
        </Typography>
        <Box
          sx={{
            display: {
              xs: "flex",
              lg: "flex",
              xl: "flex",
            },
            justifyItems: "center",
            gap: {
              xs: "5px",
              lg: "15px",
              xl: "15px",
            },
            mr: {
              xs: "10px",
              lg: "45px",
              xl: "45px",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "14px",
              padding: {
                xs: "5px",
                lg: "10px",
                xl: "10px",
              },
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#dcdcdc",
              },
            }}
          >
            <Link
              href="/"
              style={{
                // fontSize: "17px",
                fontSize: "14px",
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
              // fontSize: "17px",
              fontSize: "14px",
              padding: {
                xs: "5px",
                lg: "10px",
                xl: "10px",
              },
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#dcdcdc",
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
              whiteSpace: "nowrap",
              // fontSize: "17px",
              fontSize: "14px",
              padding: {
                xs: "5px",
                lg: "10px",
                xl: "10px",
              },
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#dcdcdc",
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
              // fontSize: "17px",
              fontSize: "14px",
              padding: {
                xs: "5px",
                lg: "10px",
                xl: "10px",
              },
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#dcdcdc",
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
