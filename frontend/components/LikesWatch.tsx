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

  return (
    <>
      <div>
        {/* いいねボタンとして実装する */}
        <ThumbUpAltIcon onClick={() => handleLike()} />
        <span>{like}people gave likes</span>
        {/* favoriteに変更する？ */}
        <FavoriteBorderOutlinedIcon sx={likesButton} />
        <Button sx={movieButton}>
          <PlayArrowIcon />
          WATCH NOW
        </Button>
      </div>
    </>
  );
};

export default LikesWatch;

// "&:hover": {
//   border: "1px solid #00FF00",
//   color: "gray",
//   backgroundColor: "lightblue",
