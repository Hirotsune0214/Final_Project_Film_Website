import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import Movies from "@/src/state/main/movies";

type MovieLists = "popular" | "top_rated";

type Props = {
  movies: Movies[];
  movieLists: string;
  setMovies: React.Dispatch<React.SetStateAction<Movies[]>>;
  setMovieLists: (category: string) => void;
};

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

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  useEffect(() => {
    if (currentPage > 1) {
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
          margin: "20px 5px 50px 5px",
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
              marginRight: "10px",
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
        {movies.map((movie: Movies) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} passHref>
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
                    value={movie.vote_average * 10}
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
                    {movie.vote_average}
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    {extractYearFromDate(movie.release_date)}
                  </div>
                  <div
                    style={{
                      alignSelf: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "250px",
                      fontWeight: "300",
                      marginTop: "8px",
                    }}
                  >
                    {movie.title}
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
          onClick={() => handleAddMoviesPages()}
        >
          LOAD MORE
        </Button>
      </div>
    </div>
  );
};

export default Movies;
