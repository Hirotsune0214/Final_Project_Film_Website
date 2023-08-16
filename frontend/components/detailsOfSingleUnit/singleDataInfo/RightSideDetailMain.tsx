import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Movie {
  overview: string;
  original_title: string; // 追加: 映画のタイトル
  release_date: string; // 追加: 公開日
  vote_average: number; // 追加: 平均評価
}

const RightSideDetailMain = ({ id }: { id: string }) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=bb46848237eacc0a36827f6639b47ee3`
      );

      setMovie(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie) {
    return null; // ロード中やエラー時に null を返すなどの適切な表示を行う
  }

  return (
    <Box>
      <div>
        <h2>
          {movie.original_title}
          {extractYearFromDate(movie.release_date)}
        </h2>
        <Box sx={{ marginTop: "40px" }}>
          <div>{movie.vote_average.toFixed(1)}</div>
        </Box>
        <Box sx={{ marginTop: "40px" }}>
          <span>{movie.overview}</span>
        </Box>
      </div>
    </Box>
  );
};

export default RightSideDetailMain;
