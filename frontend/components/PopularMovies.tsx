import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface films {
  id: string;
  poster_path: string;
  title: string;
}

const MainImage = () => {
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

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(URL);
  return (
    <div>
      <h1>Popular Movies</h1>
      <Swiper slidesPerView={4} grabCursor={true} direction="horizontal">
        {movies.map((movie: films) => (
          <SwiperSlide key={movie.id}>
            <img
              style={{ width: "100%" }}
              src={`${URL}${movie.poster_path}`}
              alt={movie.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainImage;
