import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box } from "@mui/material";

interface films {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const TopRatedMovies = () => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

  const boxSX = {
    "&:hover": {},
  };

  const container = {
    padding: "16px",
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // swiper.jsを使って画像を表示させる
  return (
    <div style={container}>
      <h1>TOP RATED MOVIES</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {movies.map((movie: films) => (
          <SwiperSlide key={movie.id}>
            <Box sx={boxSX}>
              <img
                style={{ width: "100%" }}
                src={`${URL}${movie.poster_path}`}
                alt={movie.title}
              />

              <div>{movie.vote_average}</div>
              <div>{extractYearFromDate(movie.release_date)}</div>
              <div>{movie.title}</div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedMovies;
