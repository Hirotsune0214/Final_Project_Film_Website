import { userState } from "@/src/state/auth";
import authUtils from "@/utils/authUtils";
import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface Favorite {
  picture: string;
  title: string;
  date: string;
  vote_average: string;
}

const Favorites = ({ userId }: any) => {
  const URL = "https://image.tmdb.org/t/p/w780";
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useRecoilState(userState);
  const [ishover, setIshover] = useState(false);

  const [visibleMovies, setVisibleMovies] = useState(8);
  const moviesToShow = 8;

  // 再度読み込み直すと404エラーになる

  const fetchFavorites = async () => {
    try {
      const responseFav = await axios.get(
        `http://localhost:8080/api/favorites/user/${userId}`
      );
      // console.log(responseFav.data);
      console.log(responseFav.data.result);
      setFavorites(responseFav.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const boxSX = {
    maxWidth: "500px",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    background: "cover",
    "&:hover .text": {
      opacity: 1,
    },
    "&:hover .img": {
      transform: "scale(1.05) translateY(-10px)",
      // rgbaにして、alphaを0.1にする
      boxShadow: "8px -9px 20px -2px#777777",
      transition: ".3s ease-in-out",
      position: "relative",
      zIndex: "2",
      // transform: "scale(1.05) translateY(-10px)",
      // transition: ".3s ease-in-out",
      // position: "relative",
      // zIndex: "2",
      // border: "3.5px solid #9c9897",
      borderColor: "rgba(11, 64, 188, 0.775)",
    },
    "& .img": {
      width: "100%",
      height: "100%",
      transition: "transform 0.2",
      border: "5px solid transparent",
    },
    "& .text": {
      position: "absolute",
      width: "95%",
      height: "100%",
      top: 0,
      left: 0,
      textAlign: "center",
      color: "#fff",
      background:
        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
      transition: ".3s ease-in-out",
      opacity: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transform: "scaleX(1.05)",
      zIndex: "2",
      marginLeft: "5px",
    },
  };

  return (
    <>
      <Box
        sx={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "5px",
          rowGap: "48px",
          cursor: "pointer",
        }}
      >
        {favorites.map((favorite: Favorite) => (
          <Box
            onMouseEnter={() => {
              setIshover(true);
            }}
            onMouseLeave={() => {
              setIshover(false);
            }}
            sx={boxSX}
          >
            <img
              className="img"
              src={`${URL}${favorite.picture}`}
              alt={favorite.title}
              style={{
                width: "95%",
                height: "95%",
                objectFit: "cover",
                zIndex: "1",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            />
            <Box className="text">
              <div>{favorite.vote_average}</div>
              <div>{extractYearFromDate(favorite.date)}</div>
              <div>{favorite.title}</div>
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        sx={{
          color: "#FF0000",
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "20px",
          ":hover": {
            color: "white",
            backgroundColor: "red",
            opacity: 0.8,
          },
        }}
        onClick={() => setVisibleMovies(visibleMovies + moviesToShow)}
      >
        LOAD MORE
      </Button>
    </>
  );
};

export default Favorites;
