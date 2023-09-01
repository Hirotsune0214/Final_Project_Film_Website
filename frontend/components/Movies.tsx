import axios from "axios";

import React, { useState } from "react";

import { Box, Button, CircularProgress } from "@mui/material";

import Link from "next/link";

import { Movie } from "@/src/state/category";

import { MovieDramaCss } from "@/pages/movies";

/******************************************************************************************/

// TODO: 使われていないか確認する
// type MovieLists = "popular" | "top_rated";

type Props = {
  movies: Movie[];
  movieLists: string;
  setMovieLists: (category: string) => void;
  handleAddMoviesPages: () => void;
  extractYearFromDate: (dateString: string) => string;
};

const Movies = ({
  movies,
  movieLists,
  setMovieLists,
  handleAddMoviesPages,
  extractYearFromDate,
}: Props) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  // const [currentPage, setCurrentPage] = useState(1);
  const [ishover, setIshover] = useState(false);

  /*
  // TODO: propsで渡したら動いたが合っているか確認する
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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  
  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4);
  };

  useEffect(() => {
    if (currentPage > 1) {
      fetchNewPageMovies();
    }
  }, [currentPage]);

  */
  // const extractYearFromDate = (dateString: string): string => {
  //   return dateString.substring(0, 4);
  // };

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
        {movies.map((movie: Movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} passHref>
            <Box
              onMouseEnter={() => {
                setIshover(true);
              }}
              onMouseLeave={() => {
                setIshover(false);
              }}
              sx={MovieDramaCss}
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
