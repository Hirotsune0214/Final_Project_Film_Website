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
    <div style={{ display: "block", padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Movies</h1>

        <Box sx={{ gap: "10px" }}>
          <Button
            onClick={() => setMovieLists("popular")}
            sx={{
              backgroundColor: movieLists === "popular" ? "red" : "transparent",
              padding: "15px",
              color: "black",
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
              padding: "15px",
              color: "black",
              ":hover": {
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
          gridGap: "9px",
          rowGap: "14px",
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
              }}
            />
            <Box className="text">
              <div>{movie.vote_average}</div>
              <div>{extractYearFromDate(movie.release_date)}</div>
              <div>{movie.title}</div>
            </Box>
          </Box>
        ))}

        <Button
          sx={{ color: "#FF0000", fontSize: "15px", fontWeight: "bold" }}
          onClick={() => handleAddMoviesPages()}
        >
          LOAD MORE
        </Button>
      </Box>
    </div>
  );
};

export default Movies;
