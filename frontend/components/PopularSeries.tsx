import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

// interfaceを使い回して良いのか
interface films {
  id: string;
  poster_path: string;
  title: string;
}

const PopularMSeries = () => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const container = {
    padding: "16px",
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div style={container}>
      <h1>POPULAR SERIES</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        <div style={{ display: "flex" }}>
          {movies.map((movie: films) => (
            <SwiperSlide key={movie.id}>
              <img
                style={{ width: "100%" }}
                src={`${URL}${movie.poster_path}`}
                alt={movie.title}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default PopularMSeries;
