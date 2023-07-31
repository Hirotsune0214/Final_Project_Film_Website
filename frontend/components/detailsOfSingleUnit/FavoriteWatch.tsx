import { Button } from "@mui/material";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const FavoriteWatch = () => {
  // const [favorites, setFavorites] = useState([]);

  // TODO: 後ほど削除
  const [favorites, setFavorites] = useState(10);
  // 押されているかの判定
  const [isfavorited, setIsFavorited] = useState(false);

  // TODO: ボタンの修正を行う
  const movieButton = {
    backgroundColor: "red",
    color: "white",
    display: "flex",
    textAlign: "center",
    gap: "10px",
  };

  const likesButton = {
    color: "red",
  };

  const handleFavorites = () => {
    // isLikedがtrue(押されているなら)ならlikeをマイナス1して、false(押されているなら)likeをプラス1する
    setFavorites(isfavorited ? favorites - 1 : favorites + 1);
    setIsFavorited(!isfavorited);
  };

  // const handleFavorites = () => {
  //   if (!favorites) {
  //     // お気に入りに追加する
  //     setFavorites((prevFavorites) => [...prevFavorites, movie]);
  //   } else {
  //     // お気に入りから削除
  //     prevFavorites.filter(favorite.id !== movieButton.id);
  //   }
  // };

  return (
    <>
      <div>
        <FavoriteBorderOutlinedIcon
          sx={likesButton}
          onClick={() => handleFavorites()}
        />
        <span>{favorites}people have added to their favorites</span>
        <Button sx={movieButton}>
          <PlayArrowIcon />
          WATCH NOW
        </Button>
      </div>
    </>
  );
};

export default FavoriteWatch;
