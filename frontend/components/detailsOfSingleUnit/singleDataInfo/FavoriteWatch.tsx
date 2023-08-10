import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const FavoriteWatch = () => {
  // TODO: 後ほど削除
  const [favorites, setFavorites] = useState(10);
  // 押されているかの判定
  const [isfavorited, setIsFavorited] = useState(false);

  const movieButton = {
    color: "white",
    backgroundColor: "#FF0D01",
    padding: "10px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#ac0e06",
      opacity: "0.9",
    },
  };

  const favoriteButton = {
    color: "red",
  };

  const favoriteContainer = {
    display: "flex",
    gap: "10px",
    marginTop: "40px",
  };

  const handleFavorites = () => {
    // isLikedがtrue(押されているなら)ならlikeをマイナス1して、false(押されているなら)likeをプラス1する
    setFavorites(isfavorited ? favorites - 1 : favorites + 1);
    setIsFavorited(!isfavorited);
  };

  return (
    <>
      <Box sx={favoriteContainer}>
        <FavoriteBorderOutlinedIcon
          sx={favoriteButton}
          onClick={() => handleFavorites()}
        />
        <span>{favorites}people have added to their favorites</span>
        <a href="#sectionVideo">
          <Button sx={movieButton}>
            <PlayArrowIcon />
            WATCH NOW
          </Button>
        </a>
      </Box>
    </>
  );
};

export default FavoriteWatch;
