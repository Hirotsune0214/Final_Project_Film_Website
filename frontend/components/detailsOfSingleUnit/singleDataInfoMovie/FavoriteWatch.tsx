import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { userState } from "@/src/state/auth";
import { useRecoilState } from "recoil";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const FavoriteWatch = ({ id }: { id: string }) => {
  const [user, setUser] = useRecoilState(userState);
  const [favorites, setFavorites] = useState([]); // 11 333 22
  const [isFavorite, setIsFavorite] = useState();

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

  const handleFavorites = async () => {
    try {
      await axios.put(`http://localhost:8080/api/favorites/movies/${id}`, {
        userId: userId,
      });

      setIsFavorite(!isFavorite);
      // favorites()
      // movieId === id
      // 4 -> 5
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const responseFav = await axios.get(
        `http://localhost:8080/api/favorites/user/${userId}`
      );
      // console.log(responseFav.data);
      console.log(responseFav.data.result);
      setFavorites(responseFav.data.result); // 4
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

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
        {isFavorite ? (
          <FavoriteIcon sx={{ fill: "red" }} onClick={handleFavorites} />
        ) : (
          <FavoriteBorderOutlinedIcon
            sx={{ fill: "red" }}
            onClick={handleFavorites}
          />
        )}

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
