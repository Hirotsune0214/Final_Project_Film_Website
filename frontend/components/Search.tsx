import { Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface films {
  id: string;
  poster_path: string;
  title: string;
  profile_path: string;
}

const API_KEY = "bb46848237eacc0a36827f6639b47ee3";
// const SEARCH_KEY = process.env.SEARCH_MOVIES;
// const img = process.env.IMG;

const Search = () => {
  const URL = "https://image.tmdb.org/t/p/w500";

  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchSearchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${API_KEY}`
      );

      console.log(response.data.results);
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchDramas = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/tv?query=${searchValue}&api_key=${API_KEY}`
      );

      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchPeople = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/person?query=${searchValue}&api_key=${API_KEY}`
      );

      // データの取得(+)
      console.log(response.data.results);
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchMovies();
    fetchSearchDramas();
    fetchSearchPeople();
  }, [searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
        <button onClick={fetchSearchMovies}>MOVIE</button>
        <button onClick={fetchSearchDramas}>TV</button>
        <button onClick={fetchSearchPeople}>PEOPLE</button>
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
            {searchResults.map((searchResult: films) => (
              <div key={searchResult.id}>
                {searchResult.poster_path ? (
                  <img
                    src={`${URL}${searchResult.poster_path}`}
                    alt={searchResult.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={`${URL}${searchResult.profile_path}`}
                    alt={searchResult.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Search;
