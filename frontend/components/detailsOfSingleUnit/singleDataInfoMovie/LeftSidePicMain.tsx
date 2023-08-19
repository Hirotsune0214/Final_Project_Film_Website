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

const LeftSidePicMain = ({ leftPic }: { leftPic: any }) => {
  const URL = "https://image.tmdb.org/t/p/original"; // ポスター画像のベースURL

  if (!leftPic) {
    return null; // ロード中やエラー時に null を返すなどの適切な表示を行う
  }

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${URL}${leftPic.poster_path})`,
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
