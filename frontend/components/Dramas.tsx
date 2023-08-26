import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, CircularProgress } from "@mui/material";
import Link from "next/link";

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
      transition: ".3s ease-in-out",
      position: "relative",
      zIndex: "2",
      boxShadow: "8px -9px 20px -2px rgba(119,119,119,0.6)",
      borderColor: "rgba(242, 30, 30, 0.8)",
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
      height: "98.5%",
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
              marginRight: "10px",
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
          <Link href={`/dramas/${drama.id}`} passHref>
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
                  height: "65vh",
                  objectFit: "cover",
                  zIndex: "1",
                  borderRadius: "10px",
                }}
              />
              <Box className="text">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    bottom: "25px",
                    left: "20px",
                    fontSize: "20px",
                    textAlign: "left",
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    color="success"
                    value={drama.vote_average * 10}
                    style={{ width: "40px" }}
                  />
                  <div
                    style={{
                      position: "fixed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "100",
                      left: "20px",
                    }}
                  >
                    {drama.vote_average}
                  </div>
                  <div>{extractYearFromDate(drama.first_air_date)}</div>
                  <div
                    style={{
                      alignSelf: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "250px",
                      fontWeight: "500",
                      marginTop: "8px",
                    }}
                  >
                    {drama.original_name}
                  </div>
                </div>
              </Box>
            </Box>
          </Link>
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
