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
}

const RightSideDetailMain = () => {
  const URL = "https://image.tmdb.org/t/p/w780"; // ポスター画像のベースURL

  const [movies, setMovies] = useState<films[]>([]);

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

  const constBox = {
    display: "flex",
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  // 最初の映画情報だけを取得
  const firstMovie = movies.length > 0 ? movies[0] : null;

  return (
    <Box sx={constBox}>
      {firstMovie && (
        <>
          <h2>
            {firstMovie.title}
            {extractYearFromDate(firstMovie.release_date)}
          </h2>
          <p>{firstMovie.vote_average}</p>

        </>
      )}
    </Box>
  );
};

export default RightSideDetailMain;
