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

const Recommend = () => {
  const URL = "https://image.tmdb.org/t/p/w500"; // ポスター画像のベースURL

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        // ここのAPIを確認する
        "https://api.themoviedb.org/3/trending/all/day?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // const extractYearFromDate = (dateString: string): string => {
  //   return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  // };

  const boxSX = {
    "&:hover": {},
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(URL);
  return (
    <div>
      <h1>YOU MAY ALSO LIKE</h1>
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
              <div>{movie.release_date}</div>
              <div>{movie.title}</div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommend;
