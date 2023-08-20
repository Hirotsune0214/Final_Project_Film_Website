import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

// interfaceを使い回して良いのか
interface SeriesData {
  id: string;
  poster_path: string;
  name: string;
  original_title: string;
  first_air_date: string;
  vote_average: number;
  backdrop_path: "string";
}

type DramaLists = "popular" | "top_rated";

interface Props {
  dramas: any[];
  movieLists: string;
  setDramas: any[];
  setMovieLists: (category: string) => void;
}

const Movies = ({ dramas, movieLists, setMovieLists, setDramas }: Props) => {
  const URL = "https://image.tmdb.org/t/p/w500";

  const [ishover, setIshover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNewPageDramas = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${movieLists}?page=${currentPage}&api_key=bb46848237eacc0a36827f6639b47ee3`
      );

      setDramas((prevPageLists) => [
        ...prevPageLists,
        ...response.data.results,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

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
      borderColor: "red",
    },
    "& .img": {
      width: "100%",
      height: "100%",
      transition: "transform 0.2",
      border: "5px solid transparent",
    },
    "& .text": {
      position: "absolute",
      width: "100%",
      height: "101.5%",
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
  const handleAddDramasPages = () => {
    // 引数のprevPageは前の値を持っている
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (currentPage > 1) {
      // Only fetch new pages after the initial load
      fetchNewPageDramas();
    }
  }, [currentPage]);

  return (
    <div
      style={{ display: "block", padding: "16px", backgroundColor: "#F5F5F5" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0 50px 0",
        }}
      >
        <h1>TV Series</h1>

        <Box>
          <Button
            onClick={() => setMovieLists("popular")}
            sx={{
              backgroundColor: movieLists === "popular" ? "red" : "transparent",
              color: movieLists === "popular" ? "#ffffff" : "#000000",
              padding: "15px",
              ":hover": {
                backgroundColor: "red",
                opacity: 0.8, // ボタンがホバーされた時の背景色の透明度を設定
              },
            }}
          >
            POPULAR
          </Button>
          <Button
            onClick={() => setMovieLists("top_rated")}
            sx={{
              backgroundColor:
                movieLists === "top_rated" ? "red" : "transparent",
              color: movieLists === "top_rated" ? "#ffffff" : "#000000",
              padding: "15px",
              ":hover": {
                backgroundColor: "red",
                opacity: 0.8, // ボタンがホバーされた時の背景色の透明度を設定
              },
            }}
          >
            TOP RATED
          </Button>
        </Box>
      </div>
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
        {dramas.map((drama: SeriesData) => (
          <Box
            onMouseEnter={() => {
              setIshover(true);
            }}
            onMouseLeave={() => {
              setIshover(false);
            }}
            sx={boxSX}
            key={drama.id}
          >
            <img
              className="img"
              src={`${URL}${drama.poster_path}`}
              alt={drama.name}
              style={{
                width: "99%",
                height: "100%",
                objectFit: "cover",
                zIndex: "1",
                borderRadius: "10px",
              }}
            />
            <Box className="text">
              <div>{drama.name}</div>
              <div>{extractYearFromDate(drama.first_air_date)}</div>
              <div>{drama.vote_average}</div>
            </Box>
          </Box>
        ))}
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "45px",
        }}
      >
        <Button
          sx={{
            color: "#FF0000",
            fontSize: "20px",
            fontWeight: "bold",
            ":hover": {
              color: "white",
              backgroundColor: "red",
              opacity: 0.8,
            },
          }}
          onClick={() => handleAddDramasPages()}
        >
          LOAD MORE
        </Button>
      </div>
    </div>
  );
};

export default Movies;
