import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface films {
  id: string;
  poster_path: string;
  title: string;
  profile_path: string;
}

const API_KEY = "bb46848237eacc0a36827f6639b47ee3";

const Search = () => {
  const URL = "https://image.tmdb.org/t/p/w500";

  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("movie");

  const fetchSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${category}?query=${searchValue}&api_key=${API_KEY}`
      );

      console.log(response.data.results);
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [searchValue, category]);

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
        <Button
          onClick={() => setCategory("movie")}
          sx={{
            backgroundColor: category === "movie" ? "red" : "transparent",
            padding: "15px",
            color: "black",
            ":hover": {
              backgroundColor: "red",
              opacity: 0.8, // ボタンがホバーされた時の背景色の透明度を設定
            },
          }}
        >
          MOVIE
        </Button>
        <Button
          onClick={() => setCategory("tv")}
          sx={{
            backgroundColor: category === "tv" ? "red" : "transparent",
            padding: "15px",
            color: "black",
            ":hover": {
              backgroundColor: "red",
              opacity: 0.8, // ボタンがホバーされた時の背景色の透明度を設定
            },
          }}
        >
          TV
        </Button>
        <Button
          onClick={() => setCategory("person")}
          sx={{
            backgroundColor: category === "person" ? "red" : "transparent",
            padding: "15px",
            color: "black",
            ":hover": {
              backgroundColor: "red",
              opacity: 0.8, // ボタンがホバーされた時の背景色の透明度を設定
            },
          }}
        >
          PEOPLE
        </Button>
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
