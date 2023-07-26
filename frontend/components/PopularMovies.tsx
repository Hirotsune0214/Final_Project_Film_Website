import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface films {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const MainImage = () => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

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

  const boxSX = {
    "&:hover": {},
  };

  const container = {
    padding: "16px",
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(URL);
  return (
    <div style={container}>
      <h1>POPULAR MOVIES</h1>
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

export default MainImage;
