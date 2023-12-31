import axios from "axios";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Link from "next/link";

import { Movie } from "@/src/state/category";
import { hoverLaptopMonitorCss } from "./Content";
import { hoverMobileTabletCss } from "./Content";
import theme from "@/src/theme/theme";

/******************************************************************************************/

const TopRatedMovies = ({
  // TODO: 下記の型の付け方が不明
  extractYearFromDate,
}: {
  extractYearFromDate: (date: string) => string;
}) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const [movies, setMovies] = useState([]);
  const [ishover, setIshover] = useState(false);

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const isMobileMode = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  return (
    <div>
      <Typography
        component="h1"
        sx={{
          display: "inline-block",
          position: "relative",
          fontSize: {
            xs: "22px",
            md: "22px",
          },
          margin: {
            xs: "10px 0 0 20px",
          },
          fontWeight: {
            xs: 550,
            md: "bold",
          },
          right: {
            md: "15px",
          },
        }}
      >
        TOP RATED MOVIES
        <span
          style={{
            position: "absolute",
            bottom: "-5px",
            left: "0",
            width: "45%",
            borderBottom: "7px solid red",
            marginTop: "20px",
            borderRadius: "20px",
          }}
        ></span>
      </Typography>
      <Swiper
        slidesPerView={4}
        breakpoints={{
          375: {
            slidesPerView: 2,
          },
          520: {
            slidesPerView: 3,
          },
          // 960px以上(laptop)になると3になる
          960: {
            slidesPerView: 4,
          },
          // 1200px(monitor)以上になると5になる
          1200: {
            slidesPerView: 5,
          },
        }}
        grabCursor={true}
        direction="horizontal"
      >
        {movies.map((movie: Movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movies/${movie.id}`} passHref>
              <Box
                onMouseEnter={() => {
                  setIshover(true);
                }}
                onMouseLeave={() => {
                  setIshover(false);
                }}
                sx={isMobileMode ? hoverMobileTabletCss : hoverLaptopMonitorCss}
              >
                <Box
                  component="img"
                  className="image"
                  sx={{
                    width: {
                      xs: "97%",
                      md: "100%",
                      lg: "92%",
                      xl: "91.5%",
                    },
                    height: {
                      xs: "35vh",
                      md: "35vh",
                      lg: "58vh",
                      xl: "50vh",
                    },
                    zIndex: "1",
                    margin: {
                      xs: "30px  0",
                      md: "30px 0 10px 0px",
                      lg: "50px 0 20px 5.5px",
                    },
                    borderRadius: {
                      md: "0px",
                      lg: "10px",
                      xl: "10px",
                    },
                  }}
                  src={`${URL}${movie.poster_path}`}
                  alt={movie.title}
                ></Box>
                <Box className="text">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      position: "absolute",
                      bottom: {
                        xs: "10px",
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
                      value={movie.vote_average * 10}
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
                          xs: "17px",
                          lg: "15px",
                          xl: "14px",
                        },
                        fontWeight: {
                          xs: "300",
                          lg: "300",
                          xl: "300",
                        },
                        left: "20px",
                      }}
                    >
                      {movie.vote_average}
                    </Box>
                    <Box
                      sx={{
                        marginTop: {
                          xs: "10px",
                          lg: "12px",
                          xl: "15px",
                        },
                        fontSize: {
                          xs: "18px",
                          lg: "15px",
                          xl: "16px",
                        },
                        fontWeight: {
                          xs: "300",
                          lg: "300",
                          xl: "300",
                        },
                      }}
                    >
                      {extractYearFromDate(movie.release_date)}
                    </Box>
                    <Box
                      sx={{
                        alignSelf: {
                          md: "start",
                          lg: "start",
                          xl: "start",
                        },
                        fontSize: {
                          xs: "18px",
                          lg: "15px",
                          xl: "16px",
                        },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: {
                          xs: "130px",
                          lg: "200px",
                          xl: "220px",
                        },
                        fontWeight: {
                          xs: "300",
                          lg: "300",
                        },
                        marginTop: {
                          xs: "15px",
                          lg: "12px",
                          xl: "15px",
                        },
                      }}
                    >
                      {movie.title}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedMovies;
