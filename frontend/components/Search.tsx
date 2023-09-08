import { Box, Button, CircularProgress, TextField } from "@mui/material";

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
          sx={{
            backgroundColor: category === "movie" ? "red" : "transparent",
            color: category === "movie" ? "#ffffff" : "#000000",
            padding: "15px",
            marginTop: "15px",
            ":hover": {
              backgroundColor: "red",
              opacity: 0.8,
            },
          }}
        >
          MOVIE
        </Button>
        <Button
          onClick={() => handleCategoryChange("tv")}
          sx={{
            backgroundColor: category === "tv" ? "red" : "transparent",
            color: category === "tv" ? "#ffffff" : "#000000",
            padding: "15px",
            marginTop: "15px",
            ":hover": {
              backgroundColor: "red",
              opacity: 0.8,
            },
          }}
        >
          TV
        </Button>
        <Button
          onClick={() => handleCategoryChange("person")}
          sx={{
            backgroundColor: category === "person" ? "red" : "transparent",
            color: category === "person" ? "#ffffff" : "#000000",
            padding: "15px",
            marginTop: "15px",
            ":hover": {
              backgroundColor: "red",
              opacity: 0.8,
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
          sx={{ width: "1000px" }}
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
                            width: "98%",
                            height: "63.8vh",
                            zIndex: "1",
                            borderRadius: "4px",
                            backgroundColor: "darkgrey",
                            marginTop: "6px",
                          }}
                        ></div>
                      )}

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
                            value={searchResult.vote_average * 10}
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
                            {searchResult.vote_average
                              ? searchResult.vote_average.toFixed(1)
                              : searchResult.vote_average}
                          </div>
                          <div style={{ marginTop: "8px" }}>
                            {searchResult.release_date &&
                              extractYearFromDate(searchResult.release_date)}
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
                            {searchResult.title}
                          </div>
                        </div>
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
                            width: "9%",
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
                            width: "97%",
                            height: "63.8vh",
                            zIndex: "1",
                            borderRadius: "4px",
                            backgroundColor: "darkgrey",
                            marginTop: "6px",
                          }}
                        ></div>
                      )}
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
                            value={searchResult.vote_average * 10}
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
                            {/* TODO: 三項演算子を使用しない場合は、peopleからtv、movieに遷移するとエラーになる
                                peopleにvote_averageが存在しないため？か値が0のが存在するため
                            */}
                            {searchResult.vote_average
                              ? searchResult.vote_average.toFixed(1)
                              : searchResult.vote_average}
                          </div>
                          <div style={{ marginTop: "8px" }}>
                            {searchResult.first_air_date &&
                              extractYearFromDate(searchResult.first_air_date)}
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
                            {searchResult.name}
                          </div>
                        </div>
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
                            width: "330px",
                            height: "64.8vh",
                            zIndex: "1",
                            borderRadius: "8px",
                            marginTop: "2px",
                            backgroundColor: "darkgrey",
                          }}
                        ></div>
                      )}
                      <Box
                        sx={{
                          position: "absolute",
                          width: "98.3%",
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
