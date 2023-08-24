import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { userState } from "@/src/state/auth";
import { useRecoilState } from "recoil";

const FavoriteWatch = ({ id }: { id: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const userId = user.username;
  console.log(userId);

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

  const favoriteContainer = {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    marginTop: "40px",
  };

  const handleFavorites = async () => {
    try {
      await axios.put(`http://localhost:8080/api/favorites/movies/${id}`, {
        userId: userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={favoriteContainer}>
        <FavoriteIcon
          sx={{ fill: isFavorite ? "red" : "black" }}
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
