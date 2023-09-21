import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Movie } from "@/src/state/category";

const Posters = ({ posters }: { posters: Movie[] }) => {
  const URL = process.env.NEXT_PUBLIC_IMAGE_780;

  return (
    <Box
      sx={{
        position: "relative",
        top: {
          md: "15rem",
          lg: "12rem",
          xl: "15rem",
        },
        left: {
          xl: "7%",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: {
            md: "22px",
            lg: "24px",
            xl: "25px",
          },
          fontWeight: {
            md: "bold",
            lg: "bold",
            xl: "bold",
          },
          letterSpacing: "0.5px",
        }}
      >
        POSTERS
        <span
          style={{
            position: "absolute",
            top: "2.3rem",
            left: "0",
            width: "8%",
            borderBottom: "7px solid red",
            borderRadius: "20px",
          }}
        ></span>
      </Typography>
      <Box sx={{ width: "1250px" }}>
        <Swiper
          slidesPerView={4}
          breakpoints={{
            375: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            520: {
              slidesPerView: 3,
            },
            // 960px以上(laptop)になると3になる
            960: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            // 1200px(monitor)以上になると5になる
            1200: {
              slidesPerView: 5,
            },
          }}
          grabCursor={true}
          direction="horizontal"
        >
          {posters.map((poster: any) => (
            <SwiperSlide key={poster.file_path}>
              <Box
                component="img"
                sx={{
                  width: {
                    md: "260px",
                    lg: "175px",
                    xl: "265px",
                  },
                  height: {
                    md: "70vh",
                    lg: "35vh",
                    xl: "50vh",
                  },
                  objectFit: {
                    md: "contain",
                    lg: "cover",
                    xl: "cover",
                  },
                  marginTop: {
                    md: "30px",
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
