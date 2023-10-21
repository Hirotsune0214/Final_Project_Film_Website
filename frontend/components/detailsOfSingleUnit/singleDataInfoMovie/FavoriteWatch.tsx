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
    padding: {
      md: "10px 25px",
      lg: "10px",
      xl: "13px 20px",
    },
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

      // setIsFavorite(!isFavorite);
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

  const handleScroll = () => {
    // window.innerHeightで現在の高さを取得する

    const windowHeight = window.innerHeight;

    if (windowHeight < 375) {
      window.scrollTo({ top: 100, behavior: "smooth" });
    } else if (windowHeight < 768) {
      window.scrollTo({ top: 770, behavior: "smooth" });
      // } else if (windowHeight >= 768 && windowHeight < 1024) {
      //   window.scrollTo({ top: 750, behavior: "smooth" });
      // }
    } else {
      window.scrollTo({ top: 1000, behavior: "smooth" });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {
            xs: "20px",
            md: "20px",
            lg: "30px",
            xl: "40px",
          },
          marginTop: {
            xs: "30px",
            md: "30px",
            lg: "40px",
            xl: "50px",
          },
        }}
      >
        {isFavorite ? (
          <FavoriteIcon
            sx={{
              fill: "red",
            }}
            onClick={handleFavorites}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            sx={{ fill: "red" }}
            onClick={handleFavorites}
          />
        )}

        <Button sx={movieButton} onClick={handleScroll}>
          <PlayArrowIcon />
          WATCH NOW
        </Button>
      </Box>
    </>
  );
};

export default FavoriteWatch;
