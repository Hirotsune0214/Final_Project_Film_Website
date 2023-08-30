import axios from "axios";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Box, CircularProgress } from "@mui/material";

import Link from "next/link";

import { Category, Movie } from "@/src/state/category";
import { hoverCss } from "./Content";

/******************************************************************************************/

const PopularMovies = ({
  // TODO: 下記の型の付け方が不明
  extractYearFromDate,
}: {
  extractYearFromDate: (date: string) => string;
}) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const [movies, setMovies] = useState([]);
  const [ishover, setIshover] = useState(false);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1
        style={{
          display: "inline-block",
          position: "relative",
        }}
      >
        POPULAR MOVIES
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "45%",
            borderBottom: "7px solid red",
            marginTop: "20px",
            borderRadius: "20px",
          }}
        ></span>
      </h1>

      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {movies.map((movie: Movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movies/${movie.id}`} passHref>
              <Box
                onMouseEnter={() => {
                  setIshover(true);
                }}
                onMouseLeave={() => {
                  setIshover(false);
                }}
                sx={hoverCss}
                position={"relative"}
              >
                <img
                  className="img"
                  style={{
                    width: "92%",
                    height: "60vh",
                    zIndex: "1",
                    margin: "50px 0 25px 10.5px",
                    borderRadius: "10px",
                  }}
                  src={`${URL}${movie.poster_path}`}
                  alt={movie.title}
                />

                <Box className="text">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      position: "absolute",
                      bottom: "25px",
                      left: "20px",
                      fontSize: "20px",
                      textAlign: "left",
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      color="success"
                      value={movie.vote_average * 10}
                      style={{ width: "40px" }}
                    />
                    <div
                      style={{
                        position: "fixed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "100",
                        left: "20px",
                      }}
                    >
                      {movie.vote_average}
                    </div>
                    <div style={{ marginTop: "8px" }}>
                      {extractYearFromDate(movie.release_date)}
                    </div>
                    <div
                      style={{
                        alignSelf: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "250px",
                        fontWeight: "300",
                        marginTop: "8px",
                      }}
                    >
                      {movie.title}
                    </div>
                  </div>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularMovies;
