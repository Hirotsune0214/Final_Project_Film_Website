import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// interfaceを使い回して良いのか
interface films {
  id: string;
  poster_path: string;
  title: string;
}

const TopRatedMovies = () => {
  const URL = "https://image.tmdb.org/t/p/w500"; // ポスター画像のベースURL

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

  useEffect(() => {
    fetchMovies();
  }, []);

  // swiper.jsを使って画像を表示させる
  return (
    <div>
      <h1>Top Rated Movies</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {movies.map((movie: films) => (
          <SwiperSlide key={movie.id}>
            <img src={`${URL}${movie.poster_path}`} alt={movie.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedMovies;