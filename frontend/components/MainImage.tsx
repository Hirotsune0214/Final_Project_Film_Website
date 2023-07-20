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
  release_date: string;
  vote_average: number;
  backdrop_path: "string";
}

const PopularMovies = () => {
  const URL = "https://image.tmdb.org/t/p/w500"; // ポスター画像のベースURL

  const [movies, setMovies] = useState<films[]>([]);

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

  console.log(movies);

  return (
    <div>
      {/* Swiperコンポーネント */}
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {movies.map((movie: films) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{
                backgroundImage: `URL(${URL}${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
              }}
            >
              <div>{movie.vote_average}</div>
              <div>{extractYearFromDate(movie.release_date)}</div>
              <div>{movie.original_title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularMovies;

/*

return (
    <div>
      <div
        style={{
          backgroundImage: `URL(${URL}${
            movies.length > 0 ? movies[0].backdrop_path : ""
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      ></div>
      <div>{`${movie.vote_average}`}</div>
      <div>{extractYearFromDate(movie.release_date)}</div>
      <div>{`${movie.original_title}`}</div>
    </div>
  );
  */
