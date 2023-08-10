import { usersState } from "@/state/auth";
import { Box } from "@mui/material";
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
  overview: "string";
}

const RightSideDetailMain = () => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [movies, setMovies] = useState<films[]>([]);
  const [genre, setGenre] = useState([]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=bb46848237eacc0a36827f6639b47ee3"
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
    fetchMovie();
  }, []);

  // 最初の映画情報だけを取得
  const firstMovie = movies.length > 0 ? movies[0] : null;

  return (
    <Box>
      {firstMovie && (
        <>
          <h2>
            {firstMovie.title}
            {extractYearFromDate(firstMovie.release_date)}
          </h2>
          <Box sx={{ marginTop: "40px" }}>
            <p>{firstMovie.vote_average}</p>
          </Box>
          <Box sx={{ marginTop: "40px" }}>
            <span>{firstMovie.overview}</span>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RightSideDetailMain;
