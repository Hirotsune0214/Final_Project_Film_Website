import { Button } from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const LikesWatch = () => {
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

  return (
    <>
      <div>
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
