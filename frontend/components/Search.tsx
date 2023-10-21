import {
  Box,
  Button,
  CircularProgress,
  TextField,
  useMediaQuery,
} from "@mui/material";

import React, { useState } from "react";

import Link from "next/link";

import { Searching } from "@/src/state/category";

import { SearchLaptopMonitorCss } from "@/pages/search";
import { SearchMobileTabletCss } from "@/pages/search";
import theme from "@/src/theme/theme";
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

  const isMobileMode = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        width: {
          xs: "auto",
          md: "auto",
          lg: "100%",
          xl: "100%",
        },
        padding: {
          xs: "16px",
          md: "16px",
          lg: "17px",
          xl: "20px",
        },
        backgroundColor: "#ebebeb",
        height: "100%",
        minHeight: {
          xs: "800px",
          md: "750px",
          lg: "700px",
          xl: "800px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          position: "relative",
          top: {
            xs: "3rem",
            md: "4rem",
            lg: "4rem",
          },
        }}
      >
        <Button
          onClick={() => handleCategoryChange("movie")}
          sx={{
            backgroundColor: category === "movie" ? "red" : "transparent",
            color: category === "movie" ? "#ffffff" : "#000000",
            padding: {
              xs: "12px 22px",
              lg: "0px 15px",
              xl: "5px",
            },
            // marginTop: "15px",
            fontSize: {
              xs: "13px",
              lg: "14px",
              xl: "15px",
            },
            letterSpacing: {
              xs: "1.5px",
              lg: "0.8x",
              xl: "1px",
            },
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
            padding: {
              xs: "12px 22px",
              lg: "15px",
              xl: "15px",
            },
            // marginTop: "15px",
            fontSize: {
              xs: "13px",
              lg: "14px",
              xl: "15px",
            },
            letterSpacing: {
              xs: "0.8px",
              lg: "0.8x",
              xl: "1px",
            },
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
            padding: {
              xs: "12px 22px",
              lg: "15px",
              xl: "15px",
            },
            // marginTop: "15px",
            fontSize: {
              xs: "13px",
              lg: "14px",
              xl: "15px",
            },
            letterSpacing: {
              xs: "0.8px",
              lg: "0.8x",
              xl: "1px",
            },
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
          sx={{
            width: { xs: "360px", md: "800px", lg: "1000px", xl: "1290px" },
            marginBottom: {
              xl: "10px",
            },
            position: "relative",
            top: {
              xs: "3rem",
              md: "3.5rem",
              lg: "3rem",
            },
          }}
          value={searchValue}
          onChange={handleSearch}
        />
      </Box>

      <Box
        sx={{
          mt: {
            lg: "35px",
          },
          padding: {
            lg: "16px 30px",
            xl: "16px 30px",
          },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(4, 1fr)",
              },
              gridGap: {
                xs: "10px",
                md: "10px",
                lg: "5px",
                xl: "10px",
              },
              rowGap: {
                xs: "5px",
                md: "5px",
                lg: "30px",
                xl: "45px",
              },
              cursor: "pointer",
              marginTop: {
                xs: "80px",
                md: "75px",
                lg: "50px",
              },
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
                      sx={
                        isMobileMode
                          ? SearchMobileTabletCss
                          : SearchLaptopMonitorCss
                      }
                    >
                      {searchResult.poster_path ? (
                        <Box
                          component="img"
                          className="image"
                          sx={{
                            width: {
                              xs: "100%",
                              md: "100%",
                              lg: "100%",
                              xl: "100%",
                            },
                            height: {
                              xs: "27vh",
                              md: "35vh",
                              lg: "65vh",
                              xl: "70vh",
                            },
                            objectFit: {
                              xs: "contain",
                              md: "cover",
                              lg: "cover",
                              xl: "cover",
                            },
                            zIndex: "1",
                            borderRadius: "10px",
                          }}
                          src={`${URL}${searchResult.poster_path}`}
                          alt={searchResult.original_name}
                        ></Box>
                      ) : (
                        <Box
                          component="img"
                          className="image"
                          sx={{
                            width: {
                              xs: "95%",
                              md: "97%",
                              lg: "96%",
                              xl: "99%",
                            },
                            height: {
                              xs: "23.5vh",
                              md: "66vh",
                              lg: "63vh",
                              xl: "68.8vh",
                            },

                            zIndex: "1",
                            borderRadius: "4px",
                            backgroundColor: "darkgrey",
                            margin: {
                              xs: "10px 0 0 5px",
                              md: "5px 0 0 5px",
                              lg: "5px 0 0 5px",
                              xl: "5px 0 0 5px",
                            },
                          }}
                        ></Box>
                      )}

                      <Box className="text">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            position: "absolute",
                            bottom: {
                              xs: "10px",
                              lg: "25px",
                            },
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
                          <Box
                            sx={{
                              position: "fixed",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "40px",
                              height: "40px",
                              color: "white",
                              fontSize: {
                                xs: "15px",
                                md: "15px",
                                lg: "14px",
                                xl: "15px",
                              },
                              fontWeight: {
                                xs: "300",
                              },
                              left: "20px",
                            }}
                          >
                            {searchResult.vote_average
                              ? searchResult.vote_average.toFixed(1)
                              : searchResult.vote_average}
                          </Box>
                          <Box
                            sx={{
                              marginTop: {
                                xs: "13px",
                                lg: "12px",
                                xl: "13px",
                              },
                              fontSize: {
                                xs: "18px",
                                md: "17px",
                                lg: "15px",
                                xl: "17px",
                              },
                            }}
                          >
                            {searchResult.release_date &&
                              extractYearFromDate(searchResult.release_date)}
                          </Box>
                          <Box
                            sx={{
                              alignSelf: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: {
                                xs: "130px",
                                md: "220px",
                                lg: "200px",
                                xl: "250px",
                              },
                              fontWeight: "300",
                              marginTop: {
                                xs: "13px",
                                lg: "12px",
                                xl: "13px",
                              },
                              fontSize: {
                                xs: "18px",
                                md: "17px",
                                lg: "16px",
                                xl: "17px",
                              },
                            }}
                          >
                            {searchResult.title}
                          </Box>
                        </Box>
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
                      sx={
                        isMobileMode
                          ? SearchMobileTabletCss
                          : SearchLaptopMonitorCss
                      }
                    >
                      {searchResult.poster_path ? (
                        <Box
                          component="img"
                          className="image"
                          sx={{
                            width: {
                              xs: "100%",
                              md: "100%",
                              lg: "100%",
                              xl: "100%",
                            },
                            height: {
                              xs: "27vh",
                              md: "35vh",
                              lg: "65vh",
                              xl: "70vh",
                            },
                            objectFit: {
                              xs: "contain",
                              md: "cover",
                              lg: "cover",
                              xl: "cover",
                            },
                            zIndex: "1",
                            borderRadius: "10px",
                          }}
                          src={`${URL}${searchResult.poster_path}`}
                          alt={searchResult.original_name}
                        ></Box>
                      ) : (
                        <Box
                          component="img"
                          className="image"
                          sx={{
                            width: {
                              xs: "97.3%",
                              md: "96%",
                              lg: "96%",
                              xl: "99%",
                            },
                            height: {
                              xs: "26.3vh",
                              md: "35vh",
                              lg: "63.6vh",
                              xl: "68.8vh",
                            },
                            zIndex: "1",
                            borderRadius: "6px",
                            backgroundColor: "darkgrey",
                            margin: {
                              xs: "5px 0 0 2px",
                              md: "5px 0 0 5px",
                              lg: "5px 0 0 5px",
                              xl: "5px 0 0 5px",
                            },
                          }}
                        ></Box>
                      )}
                      <Box className="text">
                        <Box
                          sx={{
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
                          <Box
                            sx={{
                              position: "fixed",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "40px",
                              height: "40px",
                              color: "white",
                              fontSize: {
                                xs: "15px",
                                md: "15px",
                                lg: "14px",
                                xl: "15px",
                              },
                              fontWeight: {
                                xs: "300",
                              },
                              left: "20px",
                            }}
                          >
                            {/* TODO: 三項演算子を使用しない場合は、peopleからtv、movieに遷移するとエラーになる
                                peopleにvote_averageが存在しないため？か値が0のが存在するため
                            */}
                            {searchResult.vote_average
                              ? searchResult.vote_average.toFixed(1)
                              : searchResult.vote_average}
                          </Box>
                          <Box
                            sx={{
                              marginTop: {
                                xs: "13px",
                                lg: "12px",
                                xl: "13px",
                              },
                              fontSize: {
                                xs: "18px",
                                md: "17px",
                                lg: "16px",
                                xl: "17px",
                              },
                            }}
                          >
                            {searchResult.first_air_date &&
                              extractYearFromDate(searchResult.first_air_date)}
                          </Box>
                          <Box
                            sx={{
                              alignSelf: "center",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: {
                                xs: "130px",
                                md: "220px",
                                lg: "235px",
                                xl: "250px",
                              },
                              fontWeight: "300",
                              marginTop: {
                                xs: "13px",
                                lg: "12px",
                                xl: "13px",
                              },
                              fontSize: {
                                xs: "18px",
                                md: "17px",
                                lg: "16px",
                                xl: "17px",
                              },
                            }}
                          >
                            {searchResult.name}
                          </Box>
                        </Box>
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
                        <Box
                          component="img"
                          className="image"
                          sx={{
                            width: {
                              xs: "100%",
                              md: "100%",
                              lg: "100%",
                              xl: "100%",
                            },
                            height: {
                              xs: "27vh",
                              md: "35vh",
                              lg: "65vh",
                              xl: "70vh",
                            },
                            objectFit: {
                              xs: "cover",
                              md: "cover",
                              lg: "cover",
                              xl: "cover",
                            },
                            zIndex: "1",
                            borderRadius: "10px",
                            marginTop: {
                              xs: "10px",
                              // md: "75px",
                              // lg: "50px",
                            },
                          }}
                          src={`${URL}${searchResult.profile_path}`}
                          alt={searchResult.original_name}
                        ></Box>
                      ) : (
                        <Box
                          component="img"
                          className="image"
                          sx={{
                            width: {
                              xs: "152px",
                              md: "265px",
                              lg: "255px",
                              xl: "360px",
                            },
                            height: {
                              xs: "27vh",
                              md: "35vh",
                              lg: "65vh",
                              xl: "70vh",
                            },

                            zIndex: "1",
                            borderRadius: "10px",
                            backgroundColor: "darkgrey",
                            margin: {
                              xs: "0 0 0 5px",
                              md: "10px 0 0 5px",
                              lg: "10px 0 0 5px",
                              xl: "13px 0 0 5px",
                            },
                          }}
                        ></Box>
                      )}

                      <Box
                        sx={{
                          position: "absolute",
                          left: 2,
                          width: {
                            xs: "99%",
                            lg: "99%",
                            xl: "99%",
                          },
                          height: "max-content",
                          bottom: "4px",
                          padding: "15px 0",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          color: "rgba(219, 219, 219, 0.9)",
                          fontSize: {
                            xs: "19px",
                            lg: "23px",
                            xl: "23px",
                          },
                          textAlign: "center",
                          borderRadius: "10px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <div>{searchResult.original_name}</div>
                      </Box>
                    </Box>
                  </Link>
                )}
              </div>
            ))}
          </Box>
        </Box>
        {searchResults.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              marginTop: {
                xs: "15px",
                lg: "45px",
                xl: "45px",
              },
            }}
          >
            <Button
              sx={{
                color: "#FF0000",
                fontSize: {
                  xs: "14px",
                  lg: "16px",
                  xl: "15px",
                },
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
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default Search;
