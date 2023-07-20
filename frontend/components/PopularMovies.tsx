import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper } from "swiper/react";

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
            <div key={movie.id}>
              <img src={`${URL}${movie.poster_path}`} alt={movie.title} />
            </div>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default MainImage;
