import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { purple, red } from "@mui/material/colors";
import Link from "next/link";

interface films {
  id: string;
  poster_path: string;
  title: string;
  profile_path: string;
  vote_average: string;
  release_date: string;
  first_air_date: string;
  original_name: string;
}

const API_KEY = "bb46848237eacc0a36827f6639b47ee3";

const Search = () => {
  const URL = "https://image.tmdb.org/t/p/w500";
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("movie");
  const [currentPage, setCurrentPage] = useState(1);
  const [ishover, setIshover] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${category}?query=${searchValue}&api_key=${API_KEY}`
      );

      console.log(response.data.results);
      setSearchResults(response.data.results);
      // isLoadingで切り替え
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    // isLoadingで切り替え
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
      fetchPage();
    }
  }, [currentPage]);

  const handleAddPages = () => {
    // 引数のprevPageは前の値を持っている
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const extractYearFromDate = (dateString: string): string => {
    return dateString.substring(0, 4); // Extract the first 4 characters (the year)
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
      // rgbaにして、alphaを0.1にする
      boxShadow: "8px -9px 20px -2px#777777",
      transition: ".3s ease-in-out",
      position: "relative",
      zIndex: "2",
      borderColor: "rgba(11, 64, 188, 0.775)",
    },
    "& .img": {
      width: "100%",
      height: "100%",
      transition: "transform 0.2",
      border: "5px solid transparent",
    },
    "& .text": {
      position: "absolute",
      width: "98%",
      height: "100%",
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

  return (
    <div style={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
      <Box
        sx={{
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
            marginTop: "15px",
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
            marginTop: "15px",
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
            marginTop: "15px",
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
          color="success"
          autoComplete="off"
          sx={{ width: "700px" }}
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
              gridGap: "5px",
              rowGap: "48px",
              cursor: "pointer",
            }}
          >
            {/* isLoadingのステートが変わったら表示するようにする */}
            {/* isLoading */}
            {searchResults.map((searchResult: films) => (
              <div key={searchResult.id}>
                {category === "movie" && (
                  <Link href={`/movies/${searchResult.id}`} passHref>
                    <Box
                      onMouseEnter={() => {
                        setIshover(true);
                      }}
                      onMouseLeave={() => {
                        setIshover(false);
                      }}
                      sx={boxSX}
                      // ボタンを押下してデータを取得してからデータを表示
                    >
                      <img
                        className="img"
                        style={{
                          width: "98%",
                          // height: "100%",
                          height: "65vh",
                          objectFit: "cover",
                          zIndex: "1",
                          borderRadius: "10px",
                        }}
                        src={`${URL}${searchResult.poster_path}`}
                        alt={searchResult.title}
                      />
                      <Box className="text">
                        <div>{searchResult.vote_average}</div>
                        <div>
                          {searchResult.release_date &&
                            extractYearFromDate(searchResult.release_date)}
                        </div>
                        <div>{searchResult.title}</div>
                      </Box>
                    </Box>
                  </Link>
                )}
                {category === "tv" && (
                  <Link href={`/dramas/${searchResult.id}`} passHref>
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
                        style={{
                          width: "98%",

                          height: "65vh",
                          objectFit: "cover",
                          zIndex: "1",
                          borderRadius: "10px",
                        }}
                        src={`${URL}${searchResult.poster_path}`}
                        alt={searchResult.original_name}
                      />
                      <Box className="text">
                        <div>{searchResult.vote_average}</div>
                        <div>
                          {searchResult.first_air_date &&
                            extractYearFromDate(searchResult.first_air_date)}
                        </div>
                        <div>{searchResult.original_name}</div>
                      </Box>
                    </Box>
                  </Link>
                )}
                {category === "person" && (
                  <Link href={`/person/${searchResult.id}`} passHref>
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      {searchResult.profile_path ? (
                        <img
                          className="img"
                          style={{
                            width: "98%",
                            height: "65vh",
                            objectFit: "cover",
                            zIndex: "1",
                            borderRadius: "10px",
                          }}
                          src={`${URL}${searchResult.profile_path}`}
                          alt={searchResult.original_name}
                        />
                      ) : (
                        <p>No picture</p>
                      )}
                      {searchResult.profile_path ? (
                        <Box
                          sx={{
                            position: "absolute",
                            width: "98%",
                            height: "max-content",
                            bottom: "4px",
                            padding: "15px 0",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            color: "rgba(219, 219, 219, 0.9)",
                            fontSize: "23px",
                            textAlign: "center",
                            borderRadius: "10px",
                          }}
                        >
                          <div>{searchResult.original_name}</div>
                        </Box>
                      ) : null}
                    </Box>
                  </Link>
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
