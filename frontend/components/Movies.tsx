import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

// TODO: リファクタリンで、type.tsに移動させる
interface MoviesData {
  id: string;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: "string";
}

type MovieLists = "popular" | "top_rated";

interface Props {
  movies: any[];
  movieLists: string;
  setMovies: any[];
  setMovieLists: (category: string) => void;
}

const Movies = ({ movies, movieLists, setMovieLists, setMovies }: Props) => {
  const URL = "https://image.tmdb.org/t/p/w500";

  const [currentPage, setCurrentPage] = useState(1);
  const [ishover, setIshover] = useState(false);

  const fetchNewPageMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieLists}?page=${currentPage}&api_key=bb46848237eacc0a36827f6639b47ee3`
      );

      setMovies((prevPageLists) => [
        ...prevPageLists,
        ...response.data.results,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMoviesPages = () => {
    // 引数のprevPageは前の値を持っている
    setCurrentPage((prevPage) => prevPage + 1);
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
      transform: "scale(1.05)",
      boxShadow: "8px -7px 20px -2px#777777",
      transition: ".3s ease-in-out",
      position: "relative",
      zIndex: "2",
    },
    "& .img": {
      width: "100%",
      height: "100%",
      transition: "transform 0.2",
    },
    "& .text": {
      position: "absolute",
      width: "100%",
      height: "102.5%",
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
    },
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
  };

  useEffect(() => {
    if (currentPage > 1) {
      // Only fetch new pages after the initial load
      fetchNewPageMovies();
    }
  }, [currentPage]);

  return (
    <div
      style={{
        display: "block",
        padding: "16px",
        overflow: "visible",
        backgroundColor: "#F5F5F5",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0 50px 0",
        }}
      >
        <h1>Movies</h1>

        <Box sx={{ gap: "10px" }}>
          <Button
            onClick={() => setMovieLists("popular")}
            sx={{
              backgroundColor: movieLists === "popular" ? "red" : "transparent",
              color: movieLists === "popular" ? "#ffffff" : "#000000",
              padding: "15px",
              ":hover": {
                backgroundColor: "red",
                opacity: 0.8,
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
                color: "white",
                backgroundColor: "red",
                opacity: 0.8,
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
        {movies.map((movie: MoviesData) => (
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
              src={`${URL}${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: "1",
              }}
            />
            <Box className="text">
              <div>{movie.vote_average}</div>
              <div>{extractYearFromDate(movie.release_date)}</div>
              <div>{movie.title}</div>
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
          onClick={() => handleAddMoviesPages()}
        >
          LOAD MORE
        </Button>
      </div>
    </div>
  );
};

export default Movies;
