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

  const handleFavorites = () => {
    // isLikedがtrue(押されているなら)ならlikeをマイナス1して、false(押されているなら)likeをプラス1する
    setFavorites(isfavorited ? favorites - 1 : favorites + 1);
    setIsFavorited(!isfavorited);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          marginTop: "40px",
        }}
      >
        <FavoriteBorderOutlinedIcon
          sx={favoriteButton}
          onClick={() => handleFavorites()}
        />

        <Button
          sx={movieButton}
          onClick={() => window.scrollTo({ top: 790, behavior: "smooth" })}
        >
          <PlayArrowIcon />
          WATCH NOW
        </Button>
      </Box>
    </>
  );
};

export default FavoriteWatch;
