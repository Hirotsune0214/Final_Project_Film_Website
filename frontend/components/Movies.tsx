import React, { useEffect, useState } from "react";
import axios from "axios";

// TODO: リファクタリンで、type.tsに移動させる
interface MoviesData {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: "string";
}

const Movies = () => {
  const URL = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState<MoviesData[]>([]);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=bb46848237eacc0a36827f6639b47ee3"
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopRatedMovies = async () => {
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
    fetchPopularMovies();
  }, []);

  const handlePopularButton = () => {
    fetchPopularMovies();
  };

  const handleTopRatedButton = () => {
    fetchTopRatedMovies();
  };

  return (
    <div style={{ display: "block", padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Movies</h1>

        <div>
          <button onClick={handlePopularButton}>POPULAR</button>
          <button onClick={handleTopRatedButton}>TOP RATED</button>
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "10px",
          cursor: "pointer",
        }}
      >
        {movies.map((movie: MoviesData) => (
          <img
            src={`${URL}${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
