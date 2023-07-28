import { Button } from "@mui/material";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const LikesWatch = () => {
  // いいねを保存するための状態変数
  // TODO: 後ほどstateの初期値の値を変更する
  const [like, setLike] = useState(10);
  // 押されているかの判定
  const [isLiked, setIsLiked] = useState(false);
  const [favorites, setFavorites] = useState([]);

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

  const handleLike = () => {
    // isLikedがtrue(押されているなら)ならlikeをマイナス1して、false(押されているなら)likeをプラス1する
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleFavorites = () => {
    if (!favorites) {
      // お気に入りに追加する
      setFavorites((prevFavorites) => [...prevFavorites, movie]);
    } else {
      // お気に入りから削除
      prevFavorites.filter(favorite.id !== movieButton.id);
    }
  };

  return (
    <>
      <div>
        {/* いいねボタンとして実装する */}
        <ThumbUpAltIcon onClick={() => handleLike()} />
        <span>{like}people gave likes</span>
        {/* favoriteに変更する */}
        <FavoriteBorderOutlinedIcon
          sx={likesButton}
          onClick={() => handleFavorites()}
        />
        <Button sx={movieButton}>
          <PlayArrowIcon />
          WATCH NOW
        </Button>
      </div>
    </>
  );
};

export default LikesWatch;
