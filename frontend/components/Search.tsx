import { Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface films {
  id: string;
  poster_path: string;
  title: string;
  release_date: string;
  backdrop_path: "string";
  vote_average: number;
}

const API_KEY = "bb46848237eacc0a36827f6639b47ee3";
const SEARCH_KEY = process.env.SEARCH_MOVIES;
const img = process.env.IMG;

const Search = () => {
  const URL = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [ishover, setIshover] = useState(false);

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${API_KEY}`
      );

      if (response.data.results) {
        setMovies(response.data.results);
      }
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
    "&:hover .text": {
      opacity: 1,
    },
    "& .img": {
      width: "100%",
      height: "100%",
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
      "& p": {
        lineHeight: 1.8,
      },
    },
  };

  useEffect(() => {
    searchMovies();
  }, [searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  console.log(setSearchValue);

  return (
    <div>
      <Box
        sx={{
          mt: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button>MOVIE</button>
        <button>TV</button>
        <button>PEOPLE</button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "30px",
        }}
      >
        <TextField
          label="Search"
          color="secondary"
          autoComplete="off"
          sx={{ width: "500px" }}
          value={searchValue}
          onChange={handleSearch}
        />
      </Box>

      <Box sx={{ mt: "30px", padding: "16px" }}>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridGap: "10px",
              cursor: "pointer",
            }}
          >
            {movies.map((movie: films) => (
              <Box
                onMouseEnter={() => {
                  setIshover(true);
                }}
                onMouseLeave={() => {
                  setIshover(false);
                }}
                sx={boxSX}
                key={movie.id}
              >
                <img
                  src={`${URL}${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Box className="text">
                  <div>{movie.title}</div>
                  <div>{extractYearFromDate(movie.release_date)}</div>
                  <div>{movie.vote_average}</div>
                </Box>
              </Box>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Search;
