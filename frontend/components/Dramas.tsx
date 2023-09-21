import React, { useEffect, useState } from "react";

import axios from "axios";

import { Box, Button, CircularProgress } from "@mui/material";

import Link from "next/link";

import { Drama } from "@/src/state/category";

import { MovieDramaCss } from "@/pages/dramas";

/******************************************************************************************/

// type DramaLists = "popular" | "top_rated";

interface Props {
  dramas: Drama[];
  dramaLists: string;
  setDramaLists: (category: string) => void;
  extractYearFromDate: (dateString: string) => string;
  handleAddDramasPages: () => void;
}

const Dramas = ({
  dramas,
  dramaLists,
  setDramaLists,
  extractYearFromDate,
  handleAddDramasPages,
}: Props) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  const [ishover, setIshover] = useState(false);

  return (
    <Box
      sx={{
        width: {
          xs: "92%",
          lg: "auto",
        },
        display: "block",
        padding: {
          xs: "16px",
          md: "16px",
          lg: "16px",
          xl: "20px",
        },
        paddingLeft: {
          xl: "90px",
        },
        paddingRight: {
          xl: "90px",
        },
        overflow: "visible",
        backgroundColor: "#ebebeb",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "grid",
            md: "grid",
            lg: "flex",
            xl: "flex",
          },
          justifyContent: {
            xs: "center",
            md: "center",
            lg: "space-between",
            xl: "space-between",
          },
          alignItems: "center",
          margin: {
            xs: "0px 0px 20px 0px",
            md: "0px 0px 45px 0px",
            lg: "20px 5px 15px 5px",
            xl: "20px 5px 50px 5px",
          },
        }}
      >
        <Box
          sx={{
            fontSize: {
              xs: "14px",
              md: "13px",
              lg: "15px",
            },
            display: {
              xs: "flex",
              md: "flex",
            },
            justifyContent: {
              xs: "center",
              md: "center",
            },
            alignItems: {
              xs: "center",
              md: "center",
            },
          }}
        >
          <h1>TV Series</h1>
        </Box>

        <Box sx={{ gap: "10px" }}>
          <Button
            onClick={() => setDramaLists("popular")}
            sx={{
              fontSize: {
                xs: "14px",
                lg: "13px",
              },
              padding: {
                xs: "10px 25px",
                md: "10px 25px",
                lg: "10px 15px",
                xl: "15px",
              },
              letterSpacing: {
                lg: "2.5px",
              },
              backgroundColor: dramaLists === "popular" ? "red" : "transparent",
              color: dramaLists === "popular" ? "#ffffff" : "#000000",

              marginRight: "10px",
              ":hover": {
                backgroundColor: "red",
                opacity: 0.8,
              },
            }}
          >
            POPULAR
          </Button>
          <Button
            onClick={() => setDramaLists("top_rated")}
            sx={{
              fontSize: {
                xs: "15px",
                lg: "13px",
              },
              padding: {
                xs: "10px 25px",
                md: "10px 25px",
                lg: "10px 15px",
                xl: "15px",
              },
              letterSpacing: {
                lg: "2.5px",
              },
              backgroundColor:
                dramaLists === "top_rated" ? "red" : "transparent",
              color: dramaLists === "top_rated" ? "#ffffff" : "#000000",
              ":hover": {
                backgroundColor: "red",
                opacity: 0.8,
              },
            }}
          >
            TOP RATED
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gridGap: {
            xs: "10px",
            lg: "5px",
          },
          rowGap: {
            xs: "1px",
            md: "10px",
            lg: "30px",
            xl: "38px",
          },
          cursor: "pointer",
        }}
      >
        {dramas.map((drama: Drama) => (
          <Link href={`/dramas/${drama.id}`} passHref>
            <Box
              onMouseEnter={() => {
                setIshover(true);
              }}
              onMouseLeave={() => {
                setIshover(false);
              }}
              sx={MovieDramaCss}
              key={drama.id}
            >
              {drama.poster_path ? (
                <Box
                  component="img"
                  className="image"
                  sx={{
                    width: { xs: "100%", md: "95%", lg: "99%", xl: "99%" },
                    height: {
                      xs: "41vh",
                      md: "67vh",
                      lg: "64vh",
                      xl: "61.5vh",
                    },
                    objectFit: "cover",
                    zIndex: "1",
                    borderRadius: "10px",
                  }}
                  src={`${URL}${drama.poster_path}`}
                  alt={drama.name}
                />
              ) : (
                <Box
                  component="img"
                  className="image"
                  sx={{
                    width: {
                      md: "97%",
                      lg: "96%",
                      xl: "99%",
                    },
                    height: {
                      md: "73.5vh",
                      lg: "63.6vh",
                      xl: "60.5vh",
                    },
                    zIndex: "1",
                    borderRadius: "4px",
                    backgroundColor: "darkgrey",
                    margin: "5px 0 0 5px",
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
                      lg: "20px",
                    },
                    left: "20px",
                    fontSize: "20px",
                    textAlign: "left",
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    color="success"
                    value={drama.vote_average * 10}
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
                      fontSize: { lg: "15px", xl: "15px" },
                      fontWeight: {
                        lg: "300",
                      },
                      left: "20px",
                    }}
                  >
                    {drama.vote_average}
                  </Box>
                  <Box
                    sx={{
                      marginTop: {
                        lg: "12px",
                        xl: "15px",
                      },
                      fontSize: {
                        lg: "16px",
                        xl: "15px",
                      },
                      fontWeight: {
                        lg: "300",
                      },
                    }}
                  >
                    {extractYearFromDate(drama.first_air_date)}
                  </Box>
                  <Box
                    sx={{
                      alignSelf: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: {
                        lg: "230px",
                      },
                      fontWeight: {
                        lg: "300",
                      },
                      marginTop: {
                        lg: "12px",
                        xl: "15px",
                      },
                      fontSize: {
                        lg: "16px",
                        xl: "17px",
                      },
                    }}
                  >
                    {drama.name}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          margin: {
            xs: "15px",
            lg: "45px",
          },
        }}
      >
        <Button
          sx={{
            padding: {
              xl: "4px 6px",
            },
            color: "#FF0000",
            fontSize: {
              xs: "15px",
              md: "15px",
              lg: "16px",
              xl: "17px",
            },
            fontWeight: "bold",
            ":hover": {
              color: "white",
              backgroundColor: "red",
              opacity: 0.8,
            },
          }}
          onClick={() => handleAddDramasPages()}
        >
          LOAD MORE
        </Button>
      </Box>
    </Box>
  );
};

export default Dramas;
