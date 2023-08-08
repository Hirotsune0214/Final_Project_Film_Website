import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LoadMore_movies = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [pageLists, setPageLists] = useState([]);
  const [ishover, setIshover] = useState(false);

  const URL = "https://image.tmdb.org/t/p/w780";

  interface PagesData {
    id: string;
    poster_path: string;
    title: string;
    original_title: string;
    release_date: string;
    vote_average: number;
    backdrop_path: "string";
  }

  const fetchNewPageMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${currentPage}&api_key=bb46848237eacc0a36827f6639b47ee3`
      );

      setPageLists((prevPageLists) => [
        ...prevPageLists,
        ...response.data.results,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPages = () => {
    // 引数のprevPageは前の値を持っている
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchNewPageMovies();
  }, [currentPage]);

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
      transform: "scale(1.04)",
      opacity: "1",
    },
    "& .img": {
      width: "100%",
      height: "100%",
      transition: "transform 0.2",
    },
    "& .text": {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      textAlign: "center",
      color: "#fff",
      backgroundColor: "rgba(0,0,0,0.6)",
      transition: ".3s ease-in-out",
      opacity: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "9px",
        rowGap: "14px",
        cursor: "pointer",
      }}
    >
      {pageLists.map((pageList: PagesData) => (
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
            src={`${URL}${pageList.poster_path}`}
            alt={pageList.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box className="text">
            <div>{pageList.vote_average}</div>
            <div>{extractYearFromDate(pageList.release_date)}</div>
            <div>{pageList.title}</div>
          </Box>
        </Box>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          mt: "20px",
        }}
      >
        <Button
          sx={{ color: "#FF0000", fontSize: "15px", fontWeight: "bold" }}
          onClick={() => handleAddPages()}
        >
          LOAD MORE
        </Button>
      </Box>
    </Box>
  );
};

export default LoadMore_movies;
