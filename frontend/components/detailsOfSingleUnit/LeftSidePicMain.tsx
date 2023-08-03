import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [movie, setMovie] = useState<films[]>([]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setMovie(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  // 最初の映画のURLを取得
  const firstMovieURL =
    movie.length > 0 ? `${URL}${movie[0].backdrop_path}` : "";

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${firstMovieURL})`,
          backgroundSize: "cover",
          height: "400px",
          width: "400px",
        }}
      ></div>
    </div>
  );
};

export default PopularMovies;
