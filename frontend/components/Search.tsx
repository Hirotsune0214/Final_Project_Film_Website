import { Box, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface films {
  id: string;
  poster_path: string;
  title: string;
}

const apikey = process.env.API_KEY;
const searchApi = process.env.SEARCH_MOVIES;
const img = process.env.IMG;

const Search = () => {
  const URL = img; // ポスター画像のベースURL
  // https://developer.themoviedb.org/reference/movie-changesどこにsearchのurlがあるのか
  // const API_SEARCH =
  //   "https://api.themoviedb.org/3/search/movie?api_key=bb46848237eacc0a36827f6639b47ee3&query";

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<films[]>([]);

  // const fetchMovies = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.themoviedb.org/3/movie/now_playing?api_key=bb46848237eacc0a36827f6639b47ee3&language=en-US&region=US&page=1"
  //     );
  //     setMovies(response.data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  // const searchMovies = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.themoviedb.org/3/movie/now_playing?api_key=bb46848237eacc0a36827f6639b47ee3&language=en-US&region=US&page=1"
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const searchMovies = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axios.get(
        `${searchApi}?api_key=${apikey}&query=${searchValue}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
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
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </Box>
      <Box sx={{ mt: "30px" }}>
        <div>
          <div style={{ display: "flex" }}>
            {searchResults.map((movie: films) => (
              <div key={movie.id}>
                <img src={`${URL}${movie.poster_path}`} alt={movie.title} />
              </div>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Search;
