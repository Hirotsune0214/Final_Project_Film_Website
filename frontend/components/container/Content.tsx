import React from "react";

import PopularMSeries from "./PopularSeries";
import PopularMovies from "./PopularMovies";
import TopRatedMovies from "./TopRatedMovies";
import TopRatedSeries from "./TopRatedSeries";
import { Box } from "@mui/material";

export const hoverCss = {
  maxWidth: "500px",
  margin: "0 auto",
  position: "relative",
  cursor: "pointer",
  background: "cover",
  "&:hover .text": {
    opacity: 1,
  },
  "&:hover .image": {
    transform: "scale(1.05) translateY(-10px)",
    transition: ".3s ease-in-out",
    position: "relative",
    zIndex: "2",
    boxShadow: "8px -9px 20px -2px rgba(119,119,119,0.6)",
    borderColor: "rgba(242, 30, 30, 0.8)",
  },
  "& .image": {
    transition: "transform 0.2s",
    border: "5px solid transparent",
  },
  "& .text": {
    position: "absolute",
    width: {
      lg: "94%",
      xl: "92%",
    },
    height: {
      lg: "55.1vh",
      xl: "47.8vh",
    },
    top: 0,
    left: -1,
    textAlign: "center",
    color: "#fff",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
    transition: "0.3s ease-in-out",
    opacity: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(1.05)",
    zIndex: "2",
    marginTop: "65.1px",
    marginLeft: "11.5px",
    borderRadius: "10px",
    fontSize: "20px",
  },
};

const Content = () => {
  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  return (
    <>
      <Box
        sx={{
          padding: {
            xs: "16px",
            md: "20px",
            lg: "20px",
            xl: "45px",
          },
          backgroundColor: "#ebebeb",
        }}
      >
        <PopularMovies extractYearFromDate={extractYearFromDate} />
        <PopularMSeries extractYearFromDate={extractYearFromDate} />
        <TopRatedMovies extractYearFromDate={extractYearFromDate} />
        <TopRatedSeries extractYearFromDate={extractYearFromDate} />
      </Box>
    </>
  );
};

export default Content;
