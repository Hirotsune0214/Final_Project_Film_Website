import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box } from "@mui/material";

// interfaceを使い回して良いのか
interface films {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: "number";
  vote_average: "number";
}

const PopularMovies = () => {
  const boxSX = {
    "&:hover": {
      position: "absolute",
      left: 0,
      bottom: 0,
      maxHeight: "100%",
      backgroundColor: "gray",
      opacity: "0.9",
      color: "white",
      boxSizing: "borderBox",
      padding: "1rem",
      transition: "all 0.4s ease-in-out",
      overflowY: "auto",
      transform: "translateY(101%)",
    },
  };

  const URL = "https://image.tmdb.org/t/p/w500"; // ポスター画像のベースURL

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=bb46848237eacc0a36827f6639b47ee3&language=en-US&region=US&page=1"
      );
      setMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // swiper.jsを使って画像を表示させる
  return (
    <div>
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        <h1>Popular Movies</h1>

        <div style={{ display: "flex" }}>
          {movies.map((movie: films) => (
            <Box sx={boxSX} key={movie.id}>
              <div>
                <img src={`${URL}${movie.poster_path}`} alt={movie.title} />
                <div>{`${movie.vote_average}`}</div>
                <div>{extractYearFromDate(movie.release_date)}</div>
                <div>{`${movie.original_title}`}</div>
              </div>
            </Box>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default PopularMovies;

{
  /* <span style={spanStyle}>{`${
                  movie.vote_average
                }${extractYearFromDate(movie.release_date)}${
                  movie.original_title
                } `}</span> */
}
