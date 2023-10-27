import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

import { Recommend } from "../src/state/category";
import { personLaptopMonitorCss } from "@/pages/person/[id]";
import { personMobileTabletCss } from "@/pages/person/[id]";
import { Toaster, toast } from "react-hot-toast";
import theme from "@/src/theme/theme";

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

  const isMobileMode = useMediaQuery(theme.breakpoints.down("lg"));

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
          marginTop: {
            xs: "20px",
            md: "50px",
            lg: "50px",
            xl: "50px",
          },
          marginLeft: {
            xs: "20px",
            md: "30px",
          },
          marginBottom: {
            md: "10px",
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
            // marginBottom: {
            //   md: "20px",
            // },
            borderRadius: "20px",
          }}
        ></span>
      </Typography>
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
            xs: "3px",
            lg: "5px",
            xl: "5px",
          },
          rowGap: { xs: "3px", lg: "15px" },
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
            <Box
              key={personCast.title}
              sx={isMobileMode ? personMobileTabletCss : personLaptopMonitorCss}
            >
              {personCast.poster_path ? (
                <Box
                  component="img"
                  className="image"
                  src={`${URL}${personCast.poster_path}`}
                  alt={personCast.title}
                  sx={{
                    width: {
                      xs: "100%",
                      md: "100%",
                      lg: "100%",
                      xl: "100%",
                    },
                    height: { xs: "35vh", md: "35vh", lg: "65vh" },
                    objectFit: {
                      xs: "cover",
                      md: "contain",
                      lg: "cover",
                      xl: "cover",
                    },
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
                      xs: "93%",
                      md: "93%",
                      lg: "95%",
                    },
                    height: {
                      xs: "35vh",
                      md: "35vh",
                      lg: "63.3vh",
                      xl: "63.6vh",
                    },
                    zIndex: "1",
                    borderRadius: "4px",
                    backgroundColor: "darkgrey",
                    marginTop: {
                      xs: "3px",
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
                      xs: "15px",
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
                      fontSize: { xs: "18px", lg: "14px" },
                      fontWeight: {
                        xs: "300",
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
                        xs: "17px",
                        lg: "15px",
                      },
                      fontWeight: {
                        xs: "300",
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
                        xs: "130px",
                        lg: "230px",
                      },
                      fontWeight: "300",
                      marginTop: "8px",
                      fontSize: {
                        xs: "18px",
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
