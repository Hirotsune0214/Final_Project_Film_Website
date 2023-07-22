import { Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface films {
  id: string;
  poster_path: string;
  title: string;
}

const API_KEY = "bb46848237eacc0a36827f6639b47ee3";
const SEARCH_KEY = process.env.SEARCH_MOVIES;
const img = process.env.IMG;

const Search = () => {
  const URL = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${API_KEY}`
      );
      setMovies(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  console.log(setSearchValue);

  const handleClick = (e: any) => {
    searchMovies();

    console.log(API_KEY);
    console.log(searchMovies());
  };

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
        <button onClick={handleClick}>Search</button>
      </Box>
      <Box sx={{ mt: "30px" }}>
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
              <div key={movie.id}>
                <img
                  src={`${URL}${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Search;
