import { Box, Button, TextField } from "@mui/material";

import React, { useState } from "react";

import Link from "next/link";

import { Searching } from "@/src/state/category";

import { SearchCss } from "@/pages/search";
/******************************************************************************************/

type Props = {
  handleAddPages: () => void;
  category: string;
  handleCategoryChange: (newCategory: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  searchResults: never[];
  extractYearFromDate: (dateString: string) => string;
};

const Search = ({
  handleAddPages,
  category,
  handleCategoryChange,
  handleSearch,
  searchValue,
  searchResults,
  extractYearFromDate,
}: Props) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  const [ishover, setIshover] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        height: "100%",
        minHeight: "700px",
      }}
    >
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
            {searchResults.map((searchResult: Searching) => (
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
                      sx={SearchCss}
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
                      sx={SearchCss}
                    >
                      {searchResult.poster_path ? (
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
                      ) : (
                        <div
                          className="img"
                          style={{
                            width: "298px",
                            height: "468px",
                            zIndex: "1",
                            borderRadius: "10px",
                            backgroundColor: "darkgrey",
                          }}
                        ></div>
                      )}
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
                        <div
                          className="img"
                          style={{
                            width: "298px",
                            height: "468px",
                            zIndex: "1",
                            borderRadius: "10px",
                            backgroundColor: "darkgrey",
                          }}
                        ></div>
                      )}
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
