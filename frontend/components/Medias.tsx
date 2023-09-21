import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

import { Recommend } from "../src/state/category";
import { personCss } from "@/pages/person/[id]";
import { Toaster, toast } from "react-hot-toast";

type Props = {
  personCasts: Recommend[];
  extractYearFromDate: (dateString: string) => string;
};

const Medias = ({ extractYearFromDate, personCasts }: Props) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  const [visibleMovies, setVisibleMovies] = useState(8);
  const moviesToShow = 8;

  const handleLoadMore = () => {
    toast.loading("Fetching new page");
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + moviesToShow);

    toast.dismiss();
    toast.success("New page fetched successfully", {
      duration: 1500,
    });
  };

  return (
    <>
      <Toaster />
      <Typography
        component="h1"
        sx={{
          fontSize: {
            md: "23px",
            lg: "25px",
          },
          fontWeight: {
            md: "bold",
            lg: "550",
          },
          display: "inline-block",
          position: "relative",
          marginTop: "50px",
          marginLeft: {
            md: "30px",
          },
        }}
      >
        MEDIAS
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "0",
            width: "55%",
            borderBottom: "7px solid red",
            marginTop: "20px",
            borderRadius: "20px",
          }}
        ></span>
      </Typography>
      <Box
        sx={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "5px",
          rowGap: {
            lg: "15px",
          },
          cursor: "pointer",
        }}
      >
        {personCasts.slice(0, visibleMovies).map((personCast: Recommend) => (
          <Link
            href={
              personCast.title
                ? `/movies/${personCast.id}`
                : `/dramas/${personCast.id}`
            }
            passHref
          >
            <Box key={personCast.title} sx={personCss}>
              {personCast.poster_path ? (
                <Box
                  component="img"
                  className="image"
                  src={`${URL}${personCast.poster_path}`}
                  alt={personCast.title}
                  sx={{
                    width: "100%",
                    height: { lg: "65vh" },
                    objectFit: "cover",
                    zIndex: "1",
                    borderRadius: "10px",
                    marginTop: {
                      lg: "35px",
                    },
                  }}
                ></Box>
              ) : (
                <Box
                  component="img"
                  className="image"
                  sx={{
                    width: {
                      md: "93%",
                      lg: "95%",
                    },
                    height: {
                      md: "52.1vh",
                      lg: "63.3vh",
                    },
                    zIndex: "1",
                    borderRadius: "4px",
                    backgroundColor: "darkgrey",
                    marginTop: {
                      md: "5px",
                      lg: "40px",
                    },
                    marginLeft: "7px",
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
                    value={personCast.vote_average * 10}
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
                      fontSize: { lg: "14px" },
                      fontWeight: {
                        lg: "300",
                      },
                      left: "20px",
                    }}
                  >
                    {personCast.vote_average.toFixed(1)}
                  </Box>
                  <Box
                    sx={{
                      marginTop: "12px",
                      fontSize: {
                        lg: "15px",
                      },
                      fontWeight: {
                        lg: "300",
                      },
                    }}
                  >
                    {extractYearFromDate(personCast.release_date)}
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
                      fontWeight: "300",
                      marginTop: "8px",
                      fontSize: {
                        lg: "15px",
                      },
                    }}
                  >
                    {personCast.title}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
      {visibleMovies < personCasts.length && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            sx={{
              color: "#FF0000",
              fontSize: {
                md: "13px",
                lg: "16px",
              },
              fontWeight: "bold",
              marginTop: "20px",
              ":hover": {
                color: "white",
                backgroundColor: "red",
                opacity: 0.8,
              },
            }}
            // onClick={() => setVisibleMovies(visibleMovies + moviesToShow)}
            onClick={handleLoadMore}
          >
            LOAD MORE
          </Button>
        </Box>
      )}
    </>
  );
};

export default Medias;
