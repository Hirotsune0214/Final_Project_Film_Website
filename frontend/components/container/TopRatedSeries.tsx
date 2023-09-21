import axios from "axios";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Box, CircularProgress, Typography } from "@mui/material";

import Link from "next/link";

import { Drama } from "@/src/state/category";
import { hoverCss } from "./Content";

const TopRatedSeries = ({
  // TODO: 下記の型の付け方が不明
  extractYearFromDate,
}: {
  extractYearFromDate: (date: string) => string;
}) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const [dramas, setDramas] = useState([]);
  const [ishover, setIshover] = useState(false);

  const fetchTopRatedSeries = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}`
      );
      setDramas(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopRatedSeries();
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
            xs: "30px 0 0 35px",
          },
          fontWeight: {
            xs: 550,
            md: "bold",
          },
        }}
      >
        TOP RATED SERIES
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
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
        {dramas.map((drama: Drama) => (
          <SwiperSlide key={drama.id}>
            <Link href={`/dramas/${drama.id}`} passHref>
              <Box
                onMouseEnter={() => {
                  setIshover(true);
                }}
                onMouseLeave={() => {
                  setIshover(false);
                }}
                sx={hoverCss}
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
                      xs: "41vh",
                      md: "73vh",
                      lg: "58vh",
                      xl: "50vh",
                    },
                    zIndex: "1",
                    margin: {
                      xs: "30px  0",
                      md: "30px 0 10px 0px",
                      lg: "50px 0 20px 5.5px",
                    },
                    borderRadius: "10px",
                  }}
                  src={`${URL}${drama.poster_path}`}
                  alt={drama.name}
                ></Box>
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
                        fontSize: {
                          lg: "15px",
                          xl: "14px",
                        },
                        fontWeight: {
                          lg: "300",
                          xl: "300",
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
                          lg: "15px",
                          xl: "16px",
                        },
                        fontWeight: {
                          lg: "300",
                          xl: "300",
                        },
                      }}
                    >
                      {extractYearFromDate(drama.first_air_date)}
                    </Box>
                    <Box
                      sx={{
                        alignSelf: {
                          md: "start",
                          lg: "start",
                          xl: "start",
                        },
                        fontSize: {
                          lg: "15px",
                        },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: {
                          lg: "200px",
                          xl: "220px",
                        },
                        fontWeight: {
                          lg: "300",
                        },
                        marginTop: {
                          lg: "12px",
                          xl: "15px",
                        },
                      }}
                    >
                      {drama.name}
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

export default TopRatedSeries;
