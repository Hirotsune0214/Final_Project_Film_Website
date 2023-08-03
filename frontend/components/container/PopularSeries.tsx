import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box } from "@mui/material";

// interfaceを使い回して良いのか
interface films {
  id: string;
  poster_path: string;
  original_name: string;
  vote_average: number;
  first_air_date: string;
}

const PopularMSeries = () => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [movies, setMovies] = useState([]);
  const [ishover, setIshover] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

  const boxSX = {
    maxWidth: "500px",
    margin: "0 auto",
    position: "relative",
    "&:hover .text": {
      opacity: 1,
    },
    "& .img": {
      width: "100%",
      height: "100%",
    },
    "& .text": {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      textAlign: "center",
      color: "#fff",
      backgroundColor: "rgba(0,0,0,0.6)",
      transition: ".3s ease-in-out",
      opacity: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& p": {
        lineHeight: 1.8,
      },
    },
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>POPULAR SERIES</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {movies.map((movie: films) => (
          <SwiperSlide key={movie.id}>
            <Box
              onMouseEnter={() => {
                setIshover(true);
              }}
              onMouseLeave={() => {
                setIshover(false);
              }}
              sx={boxSX}
            >
              <img
                className="img"
                style={{
                  width: "100%",
                  height: "70vh",
                  boxShadow: "0 12px 12px gray",
                  transition: "box-shadow .5s",
                }}
                src={`${URL}${movie.poster_path}`}
                alt={movie.original_name}
              />
              <Box className="text">
                <div>{movie.vote_average}</div>
                <div>{extractYearFromDate(movie.first_air_date)}</div>
                <div>{movie.original_name}</div>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default PopularMSeries;
