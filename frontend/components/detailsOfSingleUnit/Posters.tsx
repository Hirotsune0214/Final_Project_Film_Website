import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Movie } from "@/src/state/category";

const Posters = ({ posters }: { posters: Movie[] }) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  const firstFivePosters = posters.slice(0, 10);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: {
            xs: "18px",
            md: "22px",
            lg: "24px",
            xl: "25px",
          },
          fontWeight: {
            xs: "bold",
            md: "bold",
            lg: "bold",
            xl: "bold",
          },
          letterSpacing: "0.5px",
          display: "inline-block",
          position: "relative",
          left: {
            lg: "2.1em",
            xl: "3.7em",
          },
          margin: {
            xs: "30px 0 40px 0",
            md: "50px 0 40px 0",
            lg: "30px 0 20px 0",
            xl: "30px 0 20px 0",
          },
        }}
      >
        POSTERS
        <span
          style={{
            position: "absolute",
            top: "2.3rem",
            left: "0",
            width: "90%",
            borderBottom: "7px solid red",
            borderRadius: "20px",
          }}
        ></span>
      </Typography>
      <Box
        sx={{
          width: {
            xs: "345px",
            md: "700px",
            lg: "1000px",
            xl: "1300px",
          },
          margin: "0 auto",
        }}
      >
        <Swiper
          slidesPerView={4}
          breakpoints={{
            375: {
              slidesPerView: 2,
              // spaceBetween: 10,
            },
            520: {
              slidesPerView: 3,
            },
            // 960px以上(laptop)になると3になる
            960: {
              slidesPerView: 4,
              // s
            },
            // 1200px(monitor)以上になると5になる
            1200: {
              slidesPerView: 5,
            },
          }}
          grabCursor={true}
          direction="horizontal"
        >
          {firstFivePosters.map((poster: any) => (
            <SwiperSlide key={poster.file_path}>
              <Box
                component="img"
                sx={{
                  width: {
                    xs: "175px",
                    md: "250px",
                    lg: "253px",
                    xl: "265px",
                  },
                  height: {
                    xs: "30vh",
                    md: "40vh",
                    lg: "60vh",
                    xl: "50vh",
                  },
                  objectFit: {
                    xs: "contain",
                    md: "contain",
                    lg: "contain",
                    xl: "cover",
                  },
                  marginTop: {
                    lg: "30px",
                    xl: "30px",
                  },
                }}
                src={`${URL}${poster.file_path}`}
                alt={poster.title}
              ></Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Posters;
