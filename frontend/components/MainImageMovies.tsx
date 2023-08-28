import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HomeMainImage from "@/src/state/main/homeMainImage";

const MainImageMovies = ({ movies }: { movies: HomeMainImage[] }) => {
  const URL = "https://image.tmdb.org/t/p/original"; // ポスター画像のベースURL

  const movieButton = {
    color: "white",
    backgroundColor: "#FF0D01",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "32px",
    "&:hover": {
      backgroundColor: "#ac0e06",
      opacity: "0.9",
    },
  };

  return (
    <div style={{}}>
      <Swiper slidesPerView="auto" grabCursor={true} direction="horizontal">
        {movies.map((movie: HomeMainImage) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{
                backgroundImage: `URL(${URL}${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  backgroundImage:
                    "linear-gradient(to right, rgb(245, 245, 245), rgba(0, 0, 0, 0))",
                }}
              ></div>
              <Box
                sx={{
                  position: "absolute",
                  top: "42%",
                  left: "30%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: "35px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {movie.title}
                </div>
                <Box style={{ fontSize: "20px", marginTop: "32px" }}>
                  <CircularProgress
                    variant="determinate"
                    color="success"
                    value={movie.vote_average * 10}
                    style={{ width: "50px" }}
                  />
                  <div
                    style={{
                      position: "fixed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      color: "black",
                      fontSize: "18px",
                      fontWeight: "700",
                      top: "73.5px",
                      left: "9px",
                    }}
                  >
                    {movie.vote_average}
                  </div>
                </Box>
                <div
                  style={{
                    width: "450px",
                    fontSize: "20px",
                    fontWeight: "400",
                    letterSpacing: "0.02000em",
                    // margin: "32px 0 0 50px",
                    marginTop: "32px",
                    whiteSpace: "normal",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3, // 最大表示行数
                    WebkitBoxOrient: "vertical",
                    textAlign: "left",
                  }}
                >
                  {movie.overview}
                </div>
                <Link href={`/movies/${movie.id}`} passHref>
                  <Button sx={movieButton}>
                    <PlayArrowIcon />
                    WATCH NOW
                  </Button>
                </Link>
              </Box>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainImageMovies;
