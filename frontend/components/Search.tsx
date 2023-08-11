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
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1); // ページ番号をリセット
  };

  const fetchPage = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${category}?query=${searchValue}&page=${currentPage}&api_key=${API_KEY}`
      );

      setSearchResults((prevPageLists) => [
        ...prevPageLists,
        ...response.data.results,
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    fetchSearch();
  }, [searchValue, category]);

  useEffect(() => {
    if (currentPage > 1) {
      // Only fetch new pages after the initial load
      fetchPage();
    }
  }, [currentPage]);

  const handleAddPages = () => {
    // 引数のprevPageは前の値を持っている
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
      <Box
        sx={{
          mt: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button
          onClick={() => handleCategoryChange("movie")}
          // onClick={() => setCategory("movie")}
          sx={{
            backgroundColor: category === "movie" ? "red" : "transparent",
            color: category === "movie" ? "#ffffff" : "#000000",
            padding: "15px",
            ":hover": {
              backgroundColor: "red",
              opacity: 0.8, // ボタンがホバーされた時の背景色の透明度を設定
            },
          }}
        >
          MOVIE
        </Button>
        <Button
          onClick={() => handleCategoryChange("tv")}
          // onClick={() => setCategory("tv")}
          sx={{
            backgroundColor: category === "tv" ? "red" : "transparent",
            color: category === "tv" ? "#ffffff" : "#000000",
            padding: "15px",
            ":hover": {
              backgroundColor: "red",
              opacity: 0.8, // ボタンがホバーされた時の背景色の透明度を設定
            },
          }}
        >
          TV
        </Button>
        <Button
          onClick={() => handleCategoryChange("person")}
          // onClick={() => setCategory("person")}
          sx={{
            backgroundColor: category === "person" ? "red" : "transparent",
            color: category === "person" ? "#ffffff" : "#000000",
            padding: "15px",

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
        {searchResults.length > 0 ? (
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
              onClick={() => handleAddPages()}
            >
              LOAD MORE
            </Button>
          </div>
        ) : null}
      </Box>
    </div>
  );
};

export default Search;
