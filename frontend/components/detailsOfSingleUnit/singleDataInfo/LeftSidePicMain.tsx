import axios from "axios";
import React, { useEffect, useState } from "react";

// interfaceを使い回して良いのか
interface MoviePic {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
}

const LeftSidePicMain = ({ id }: { id: string }) => {
  const URL = "https://image.tmdb.org/t/p/original"; // ポスター画像のベースURL

  const [movie, setMovie] = useState<MoviePic | null>(null);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=bb46848237eacc0a36827f6639b47ee3`
      );
      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie) {
    return null; // ロード中やエラー時に null を返すなどの適切な表示を行う
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${URL}${movie.poster_path})`,
          backgroundSize: "contain", // 画像をコンテナー内にフィット
          backgroundRepeat: "no-repeat", // 画像のリピートを無効に
          backgroundPosition: "center", // 画像を中央に配置
          height: "90vh",
          width: "500px",
          marginRight: "32px",
        }}
      ></div>
    </div>
  );
};

export default LeftSidePicMain;
